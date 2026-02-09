import { prisma } from '../../../../actions/client'; // Adjust this path to your prisma client
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { clerkId, email, username } = await req.json();

    // The 'upsert' command checks if the user exists.
    // If NO: It creates the user AND a cart.
    // If YES: It just updates the username/email.
    const user = await prisma.user.upsert({
      where: { id: clerkId },
      update: {
        email: email,
        username: username,
      },
      create: {
        id: clerkId,
        email: email,
        username: username,
        isAdmin: false, 
        cart: {
          create: {} 
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Prisma Sync Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}