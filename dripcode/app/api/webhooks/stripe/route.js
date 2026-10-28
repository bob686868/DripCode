import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "../../../../actions/orders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // If no webhook secret is set in local environment, parse JSON payload
      event = JSON.parse(body);
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle successful checkout session
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;

    if (userId) {
      try {
        console.log(`Processing verified order creation for user: ${userId}`);
        await createOrder(userId);
      } catch (orderError) {
        console.error("Webhook order creation error:", orderError.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}
