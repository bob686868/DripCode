// import React from 'react'
// import OrderItem from './OrderItem'
// import { IoBagCheckOutline } from "react-icons/io5";
// const Orders =async ({orders,status,query}) => {
//   return (
//     <div>
//         {query && (
//             <div className='text-neutral-100 mb-1'>
//                 {`${orders.length > 0 ? `Showing ${orders.length} result${orders.length>1?"s" : ""} for "${query}"` : `No results found for "${query}"`}`}
//             </div>
//         )}
//         {orders?.length>0 &&
//     <div className='flex flex-col gap-y-3 rounded-lg bg-neutral-900  '>
//       {orders?.map((order,index)=>(
//           <div key={order.id} className='bg-neutral-950 py-4 px-3 border-b border-neutral-800  shadow-sm shadow-black '>
//             <h1 className='text-neutral-100 font-bold text-2xl flex gap-x-2 mb-2'><IoBagCheckOutline/> CTH - {index}</h1>
//         <div  className='flex flex-col gap-y-2 pl-5 '>
//             {order.orderItems.map((orderItem)=>(
//                 <OrderItem key={orderItem.id} orderItem={orderItem} />
//             ))}
//             </div>
//             <div className='text-neutral-100 border-t border-neutral-400/20 pt-2 mt-2 flex justify-between items-center'>
//                 <span>
//                     Total Price : ${order.totalPrice.toFixed(2)}
//                 </span>
//                 <span className=' bg-blue-600 rounded-full px-4 p-2 '>
//                     Details
//                 </span>
//             </div>
//         </div>
//         ))}
//         </div>
//     }
//     {(!orders || !orders.length) &&
//     <div className='h-80 bg-neutral-950 mt-4 rounded-md flex items-center justify-center w-full text-4xl text-neutral-100 font-bold'>
//         You have no {status} orders
//     </div>
//     }
//     </div>
//   )
// }

// export default Orders

import { IoBagCheckOutline } from "react-icons/io5";
import OrderItem from "./OrderItem";

const Orders = ({ orders, status, query }) => {
  return (
    <div className="space-y-6">
      {query && (
        <p className="text-neutral-400 text-sm mb-4 px-1">
          Showing {orders?.length || 0}{" "}
          {orders?.length === 1 ? "result" : "results"} for
          <span className="text-neutral-100 font-semibold ml-1 italic">
            "{query}"
          </span>
        </p>
      )}

      {orders?.length > 0 ? (
        orders.map((order, index) => (
          <div
            key={order.id}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Order Card Header */}
            <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neutral-800 rounded-lg text-blue-500">
                  <IoBagCheckOutline size={20} />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold">
                    Order Reference
                  </p>
                  {/* FIX: Convert ID to String before slicing */}
                  <h3 className="text-neutral-100 font-mono text-sm uppercase">
                    CTH-ORD-{String(order.id).slice(-6)}
                  </h3>
                </div>
              </div>
              <span className="text-xs font-medium px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full border border-neutral-700">
                {status}
              </span>
            </div>

            {/* Order Items */}
            <div className="p-6 space-y-4">
              {order.orderItems?.map((item) => (
                <OrderItem key={item.id} orderItem={item} />
              ))}
            </div>

            {/* Order Card Footer */}
            <div className="px-6 py-4 bg-neutral-900/30 border-t border-neutral-800 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-xs text-neutral-500 font-medium">
                  Grand Total
                </span>
                <span className="text-neutral-100 font-bold text-xl">
                  ${order.totalPrice?.toFixed(2)}
                </span>
              </div>
              <button className="cursor-pointer bg-neutral-100 hover:bg-neutral-300 text-neutral-900 px-6 py-2 rounded-xl text-sm font-bold transition-colors">
                Order Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="h-64 flex flex-col items-center justify-center bg-neutral-950 rounded-2xl border border-dashed border-neutral-800">
          <p className="text-neutral-500 text-lg font-medium tracking-tight">
            You have no {status?.toLowerCase()} orders
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
