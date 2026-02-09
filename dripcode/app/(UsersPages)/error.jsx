"use client"
import React from 'react'
import Link from 'next/link'

const Error = () => {
  return (
    <div className="h-full w-full min-h-[60vh] flex flex-col justify-center items-center px-4 text-center">
      {/* Optional: Add a subtle icon or illustration here */}
      <div className="mb-6 text-6xl">⚠️</div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
        Something went wrong
      </h1>
      
      <p className="max-w-md text-neutral-400 text-lg mb-8">
        We couldn't process your request. This might be because the products 
        you purchased are no longer available or there was a connection glitch.
      </p>

      <div className="flex gap-4">
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 cursor-pointer bg-neutral-100 text-neutral-900 font-semibold rounded-lg hover:bg-neutral-300 transition-colors"
        >
          Try Again
        </button>
        
        <Link 
          href="/" 
          className="px-6 py-2 border border-neutral-700 text-neutral-100 font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Back to Store
        </Link>
      </div>
    </div>
  )
}
export default Error