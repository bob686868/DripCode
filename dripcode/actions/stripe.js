"use server";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "./client.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession() {
  const { userId } = await auth();
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      cartItems: {
        include: { product: true },
      },
    },
  });
  if (!cart || cart.cartItems.length == 0) {
    throw new Error("Cart is empty");
  }
  const outOfStock = cart.cartItems.find(
    (item) => item.quantity > item.product.stock,
  );
  if (outOfStock)
    return { error: `${outOfStock.product.name} is out of stock!` };
  const line_items = cart.cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
        description: item.product.description,
        images: [item.url],
        metadata: {
          productId: item.productId.toString(),
          color: item.color,
        },
      },
      unit_amount: Math.round(item.product.price * 100),
    },
    quantity: item.quantity,
  }));
  const base_url =
    process.env.NODE_ENV === "production"
      ? "https://drip-code-coral.vercel.app"
      : "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${base_url}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base_url}/`,
    metadata: {
      userId,
    },
  });

  redirect(session.url);
}

export async function confirmOrderFromSession(sessionId) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, message: "Unauthorized" };
    if (!sessionId) return { success: false, message: "Missing session ID" };

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session || session.metadata?.userId !== userId) {
      return { success: false, message: "Invalid session" };
    }

    if (session.payment_status !== "paid") {
      return { success: false, message: "Payment incomplete" };
    }

    // Import createOrder dynamically or at top level to complete order
    const { createOrder } = await import("./orders");
    const result = await createOrder(userId);
    return { success: true, result };
  } catch (error) {
    console.error("Payment confirmation error:", error.message);
    return { success: false, message: error.message };
  }
}
