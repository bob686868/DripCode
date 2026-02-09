import React from 'react'

const SkeletonCard = () => {
  return (
    <div
      className={`animate-pulse w-full aspect-square flex shrink bg-neutral-800   text-neutral-100 rounded-md `}
      >
      {/* <div
        className="w-[60%]  h-60 rounded-md transition duration-200 group-hover:scale-105"
      />
      <div className="flex gap-2 w-fit text-sm space-between items-center rounded-full max-w-[100%] py-1 px-2  border mr-auto border-neutral-100/15  mt-auto">
        <div className=" text-[13px] tracking-tight ">{name}</div>
        <div className="rounded-full  text-xs px-2 py-2 whitespace-nowrap bg-blue-600">
          ${price} USD
        </div>
      </div> */}
    </div>
  )
}

export default SkeletonCard
