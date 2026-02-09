// import React from 'react'
// import SkeletonOrder from './SkeletonOrder'

// const loading = () => {
//   return (
//     <div className='bg-neutral-900 -mt-4'>

//     <div className='mx-4 px-4 bg-neutral-950 pt-3'>
//         <div className='h-40 mb-5 mt-5 w-full  bg-neutral-900 animate-pulse'>
        
//         </div>
//          <div className='flex flex-col gap-y-6'>
//             {Array.from({length:3}).map((_,index)=>(
//                 <SkeletonOrder key={index}/>
//             ))}
//         </div>
//     </div>
//             </div>
//   )
// }

// export default loading

import React from 'react'
import SkeletonOrder from './SkeletonOrder'

const Loading = () => {
  return (
    <div className='max-w-5xl mx-auto px-4 py-8 bg-neutral-900 min-h-screen'>
      {/* Header Skeleton */}
      <header className='mb-10'>
        <div className="h-10 w-48 bg-neutral-800 rounded-lg mb-6 animate-pulse" />
        
        {/* Nav Tabs Skeleton */}
        <div className='flex gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800 shadow-inner'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-1 h-10 bg-neutral-900/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </header>

      {/* Orders List Skeleton */}
      <div className='flex flex-col gap-y-6'>
        {Array.from({ length: 2 }).map((_, index) => (
          <SkeletonOrder key={index} />
        ))}
      </div>
    </div>
  )
}

export default Loading