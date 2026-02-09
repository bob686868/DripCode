import React from 'react'

const Headers = () => {
  const headers=['Buyer Info','Ordered Date','Total Charge','Status']

  return (
      <div className='flex justify-between border-y border-neutral-400/20 py-2 px-2 text-neutral-400 bg-neutral-950 w-full '>
          {headers.map((header,i)=>(
            <div className='flex-1 ' key={i}>{header}</div>
          ))}
      </div>
  )
}

export default Headers
