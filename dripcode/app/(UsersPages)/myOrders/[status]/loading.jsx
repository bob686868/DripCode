import React from 'react'
import SkeletonOrder from './SkeletonOrder'

const loading = () => {
  return (
    <div className='bg-neutral-900 -mt-4'>

    <div className='mx-4 px-4 bg-neutral-950 pt-3'>
        <div className='h-40 mb-5 mt-5 w-full  bg-neutral-900 animate-pulse'>
        
        </div>
         <div className='flex flex-col gap-y-6'>
            {Array.from({length:3}).map((_,index)=>(
                <SkeletonOrder key={index}/>
            ))}
        </div>
    </div>
            </div>
  )
}

export default loading
