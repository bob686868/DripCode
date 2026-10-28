"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./client";
import { auth } from "@clerk/nextjs/server";

// export async function createCart(userId){
//     try {
//         await prisma.cart.create({
//             data:{
//                 userId
//             }
//         })
//         return {status:200,message:"cart created"}
//     } catch (error) {
//         console.error(error.message)
//         return {status:500,message:"error creating cart"}
//     }
// }

export async function addItemToCart({ productId, color, quantity = 1, url }) {
  try {
    const { userId } = await auth();
    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) return { status: 500, message: "User doesn't have cart" };

    await prisma.cartItem.upsert({
      where: {
        cartId_productId_color: {
          cartId: cart.id,
          productId: Number(productId),
          color,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        cartId: cart.id,
        productId: Number(productId),
        color,
        quantity,
        url,
      },
    });

    revalidatePath("/", "layout");
    return { status: 200, message: "Items handled successfully" };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: "Error adding item" };
  }
}

export async function updateQuantity({ cartItemId, quantity }) {
  try {
    const { userId } = await auth();
    if (!userId) return { status: 401, message: "Unauthorized" };

    const item = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true },
    });
    if (!item || item.cart.userId !== userId) {
      return { status: 403, message: "Unauthorized" };
    }

    if (quantity == 0) {
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
    } else {
      await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
      });
    }
    revalidatePath("/", "layout");

    return { status: 200, message: "quantity modified" };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: "error updating cart quantity" };
  }
}

export async function deleteFromCart(id) {
  try {
    const { userId } = await auth();
    if (!userId) return { status: 401, message: "Unauthorized" };

    const item = await prisma.cartItem.findUnique({
      where: { id },
      include: { cart: true },
    });
    if (!item || item.cart.userId !== userId) {
      return { status: 403, message: "Unauthorized" };
    }

    await prisma.cartItem.delete({
      where: { id },
    });
    revalidatePath("/", "layout");
    return { status: 200, message: "product deleted" };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: "error deleting product" };
  }
}

export async function getCartItems(explicitUserId) {
  try {
    const { userId } = await auth();
    const targetUserId = userId || explicitUserId;
    if (!targetUserId) return { cartItems: null, status: 401 };

    let cartProducts = await prisma.cart.findUnique({
      where: {
        userId: targetUserId,
      },
      select: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    return { cartItems: cartProducts, status: 200 };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: "error fetching cart" };
  }
}
