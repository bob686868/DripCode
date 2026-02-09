"use client";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

export default function UserSync() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          // We call our OWN API route instead of Supabase directly
          const response = await fetch('/api/sync-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clerkId: userId,
              email: user.primaryEmailAddress?.emailAddress,
              username: user.username || user.firstName || "New User",
            }),
          })

          if (!response.ok) throw new Error('Failed to sync')
          console.log('✅ User and Cart synced via Prisma!')
        } catch (error) {
          console.error('Sync Error:', error.message)
        }
      }
    }

    syncUser()
  }, [isLoaded, isSignedIn, user, userId])

  return <div></div>;
}
