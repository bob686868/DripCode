import React from 'react'
import SkeletonCard from '../../../components/SkeletonCard'

const SkeletonGrid = () => {
  return (
        <div className="w-full pt-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3">
            {Array.from({length:12}).map((_,i)=>(
                <SkeletonCard key={i}/>
            ))}
            </div>
  )
}

export default SkeletonGrid
