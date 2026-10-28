import { prisma } from '../../../../actions/client.js';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req) {
  try {
    const { userId: authUserId } = await auth();
    const { clerkId, email, username } = await req.json();

    if (!authUserId || authUserId !== clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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