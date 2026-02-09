"use client"
import React from 'react'

const Error = () => {
  return (
    <div className='h-full w-full flex justify-center items-center text-2xl font-bold text-neutral-100'>
      <div>
        Sorry, Something went wrong 
      </div>
      <div className='w-[60%] flex justify-center'>
        Please make sure the products you purchased are still available
      </div>

    </div>
)
}

export default Error
