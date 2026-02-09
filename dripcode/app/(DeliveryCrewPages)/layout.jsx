import React from 'react'
import '../globals.css'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
const layout = async ({children}) => {
  let {sessionClaims}=await auth()
  const role=sessionClaims?.metadata?.role

  console.log(role)
  console.log("delivery")
  if(role!="delivery crew" && role!="admin") redirect("/")
  return (
    <html className='bg-neutral-900'>
      
      <body className='bg-neutral-950'>{children}</body>
    </html>
  )
}

export default layout
