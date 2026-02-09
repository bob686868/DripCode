// import React from 'react'

// const SkeletonOrder = () => {
//   return (
//     <div className='w-full bg-neutral-900 h-60 animate-pulse'>
      
//     </div>
//   )
// }

// export default SkeletonOrder


import React from 'react'

const SkeletonOrder = () => {
  return (
    <div className='w-full bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl'>
      {/* Header Skeleton */}
      <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-neutral-800 rounded-lg animate-pulse" />
          <div className="space-y-2">
            <div className="h-2 w-24 bg-neutral-800 rounded animate-pulse" />
            <div className="h-3 w-32 bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-6 w-20 bg-neutral-800 rounded-full animate-pulse" />
      </div>
      
      {/* Content Skeleton (mimicking 2 items) */}
      <div className="p-6 space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-neutral-800/50">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-neutral-800 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-32 bg-neutral-800 rounded animate-pulse" />
                <div className="h-2 w-20 bg-neutral-800 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-8 w-24 bg-neutral-800 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="px-6 py-4 bg-neutral-900/30 border-t border-neutral-800 flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-2 w-16 bg-neutral-800 rounded animate-pulse" />
          <div className="h-5 w-24 bg-neutral-800 rounded animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-neutral-100/10 rounded-xl animate-pulse" />
      </div>
    </div>
  )
}

export default SkeletonOrder