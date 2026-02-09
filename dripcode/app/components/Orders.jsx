import React from 'react'
import OrderItem from './OrderItem'
import { IoBagCheckOutline } from "react-icons/io5";
const Orders =async ({orders,status,query}) => {
  return (
    <div>
        {query && (
            <div className='text-neutral-100 mb-1'>
                {`${orders.length > 0 ? `Showing ${orders.length} result${orders.length>1?"s" : ""} for "${query}"` : `No results found for "${query}"`}`}
            </div>
        )}
        {orders?.length>0 &&
    <div className='flex flex-col gap-y-3 rounded-lg bg-neutral-900  '>
      {orders?.map((order,index)=>(
          <div key={order.id} className='bg-neutral-950 py-4 px-3 border-b border-neutral-800  shadow-sm shadow-black '>
            <h1 className='text-neutral-100 font-bold text-2xl flex gap-x-2 mb-2'><IoBagCheckOutline/> CTH - {index}</h1> 
        <div  className='flex flex-col gap-y-2 pl-5 '>
            {order.orderItems.map((orderItem)=>(
                <OrderItem key={orderItem.id} orderItem={orderItem} />
            ))}
            </div>
            <div className='text-neutral-100 border-t border-neutral-400/20 pt-2 mt-2 flex justify-between items-center'>
                <span>
                    Total Price : ${order.totalPrice.toFixed(2)}
                </span>
                <span className=' bg-blue-600 rounded-full px-4 p-2 '>
                    Details
                </span>
            </div>
        </div>
        ))}
        </div>
    }
    {(!orders || !orders.length) &&
    <div className='h-80 bg-neutral-950 mt-4 rounded-md flex items-center justify-center w-full text-4xl text-neutral-100 font-bold'>
        You have no {status} orders
    </div>
    }
    </div>
  )
}

export default Orders
