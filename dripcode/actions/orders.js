"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./client";
import { auth } from "@clerk/nextjs/server";

export async function createOrder(explicitUserId) {
  try {
    let resolvedUserId = explicitUserId;
    if (!resolvedUserId) {
      const { userId } = await auth();
      resolvedUserId = userId;
    }
    if (!resolvedUserId) throw new Error("Unauthorized");

    await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: {
          userId: resolvedUserId,
        },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      });
      if (!cart || cart.cartItems.length === 0) {
        throw new Error("Cannot place an order with an empty cart");
      }
      const cartItems = [];
      /* create the cartItem with the order */
      for (const item of cart.cartItems) {
        if (item.product.stock < item.quantity) {
          throw new Error(`Product ${item.product.name} is out of stock`);
        }
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
        cartItems.push({
          description: item.product.description,
          name: item.product.name,
          slug: item.product.slug,
          price: item.product.price,
          category: item.product.category,
          quantity: item.quantity,
          color: item.color,
          url: item.url,
          productId: item.productId,
        });
      }
      const rawTotal = cartItems.reduce(
        (acc, cur) => acc + cur.quantity * cur.price,
        0,
      );
      // Ensure totalPrice is an integer to match Prisma schema
      const totalPrice = Math.round(rawTotal);

      await tx.order.create({
        data: {
          userId: resolvedUserId,
          orderItems: {
            createMany: { data: cartItems },
          },
          totalPrice,
        },
      });

      /*delete old cartItems*/
      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
    });

    return { status: 200, message: "order created successfully" };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: error.message || "failed to create your order" };
  }
}

export async function getAllOrders() {
  try {
    const { sessionClaims } = await auth();
    const role = sessionClaims?.metadata?.role;
    if (role !== "admin") return { status: 403, message: "Unauthorized" };

    let orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return { orders, status: 200, message: "orders return successfully" };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: "error getting orders" };
  }
}
export async function getMyOrders(status, query = "") {
  try {
    let { userId } = await auth();
    if (!userId) return { status: 401, message: "Unauthorized", orders: [] };

    let orders = await prisma.order.findMany({
      where: {
        userId,
        status,
        orderItems: {
          some: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: true,
      },
    });
    return { orders, status: 200, message: "orders return successfully" };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: "error getting orders" };
  }
}

export async function getOrdersByStatus(status) {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;
  if (role !== "admin" && role !== "delivery") {
    return { status: 403, message: "Unauthorized", orders: [] };
  }

  status = status.toUpperCase();
  const where = status == "ALL" ? {} : { status };
  try {
    let orders = await prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
          },
        },
        orderItems: {
          take: 1,
          select: {
            url: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { orders, status: 200, message: "orders return successfully" };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: "error getting orders" };
  }
}

export async function updateOrderStatus({ orderId, status }) {
  try {
    const { sessionClaims } = await auth();
    const role = sessionClaims?.metadata?.role;
    if (role !== "admin" && role !== "delivery") {
      return { status: 403, message: "Unauthorized" };
    }

    let orders = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
    revalidatePath("/delivery/orders");
    return { orders, status: 200, message: "order updated successfully" };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: "error updating order" };
  }
}

export async function getOrderById(orderId) {
  try {
    const { userId, sessionClaims } = await auth();
    const role = sessionClaims?.metadata?.role;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
        orderItems: true,
      },
    });

    if (!order) return { status: 404, message: "Order not found" };

    if (role !== "admin" && role !== "delivery" && order.userId !== userId) {
      return { status: 403, message: "Unauthorized" };
    }

    return { status: 200, order };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: "failed to get order" };
  }
}
