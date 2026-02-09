"use client"
import React, { useOptimistic, startTransition } from 'react'
import { updateOrderStatus } from '../../../../actions/orders'
import DeliveryCrewCard from '../../components/DeliveryCrewCard'
const Page = ({orders}) => {
    const [optimisticOrders,deleteOptimisicOrder]=useOptimistic(orders,
       (state,id)=> state.filter((order)=>order.id!=id)
    )
    async function handleDelete(id){
        startTransition(()=>{
          deleteOptimisicOrder(id)
        })
        await updateOrderStatus({orderId:id,status:"DELIVERED"})
    }
  return (
    <div>
      <div className='mt-3 px-2 grid gird-cols-1 gap-x-2 md:grid-cols-2 gap-y-2'>

        {optimisticOrders.map((order)=>(
          <DeliveryCrewCard data={order} handleDelete={handleDelete} key={order.id}/>
      ))}
      </div>
    </div>
  )
}

export default Page
