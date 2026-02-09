import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen bg-neutral-950 p-4 md:p-8'>
      {/* --- TOP NAV SKELETON --- */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-2">
          {/* Back button link */}
          <div className="h-4 w-24 bg-neutral-900 rounded animate-pulse"></div>
          {/* Order ID Title */}
          <div className="h-10 w-64 bg-neutral-900 rounded-lg animate-pulse"></div>
          {/* Date subtitle */}
          <div className="h-4 w-40 bg-neutral-900/50 rounded animate-pulse"></div>
        </div>
        {/* Print Button */}
        <div className="h-10 w-32 bg-neutral-900 border border-neutral-800 rounded-xl animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: ITEMS LIST SKELETON --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden">
            {/* List Header */}
            <div className="p-6 border-b border-neutral-800 bg-neutral-900/80 h-16 animate-pulse"></div>
            
            {/* Skeleton Rows */}
            <div className="divide-y divide-neutral-800">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 flex items-center gap-6">
                  {/* Image Square */}
                  <div className="w-20 h-20 bg-neutral-800 rounded-2xl animate-pulse"></div>
                  {/* Text Details */}
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-1/2 bg-neutral-800 rounded animate-pulse"></div>
                    <div className="h-4 w-1/3 bg-neutral-900 rounded animate-pulse"></div>
                  </div>
                  {/* Price info */}
                  <div className="w-20 h-8 bg-neutral-800 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR SKELETON --- */}
        <div className="space-y-6">
          {/* Customer Info Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
            <div className="h-4 w-1/2 bg-neutral-800 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-neutral-800 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-neutral-800 rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-20 bg-neutral-800 rounded-full animate-pulse"></div>
          </div>

          {/* Payment Summary Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
            <div className="h-4 w-1/2 bg-neutral-800 rounded animate-pulse"></div>
            <div className="space-y-3">
              <div className="flex justify-between"><div className="h-4 w-20 bg-neutral-800 rounded animate-pulse"></div><div className="h-4 w-16 bg-neutral-800 rounded animate-pulse"></div></div>
              <div className="flex justify-between"><div className="h-4 w-20 bg-neutral-800 rounded animate-pulse"></div><div className="h-4 w-16 bg-neutral-800 rounded animate-pulse"></div></div>
              <div className="h-px bg-neutral-800 my-2" />
              <div className="flex justify-between"><div className="h-6 w-20 bg-neutral-800 rounded animate-pulse"></div><div className="h-6 w-24 bg-neutral-800 rounded animate-pulse"></div></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Loading