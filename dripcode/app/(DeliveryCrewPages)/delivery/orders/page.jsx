import React from 'react'
import Orders from './Orders'
import { getOrdersByStatus } from '../../../../actions/orders'
const page = async() => {
  let {orders}=await getOrdersByStatus("Shipping")

  return (
    <div>
      <Orders orders={orders}/>
    </div>
  )
}

export default page
