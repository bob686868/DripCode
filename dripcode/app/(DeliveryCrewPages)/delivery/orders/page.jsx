import React from 'react'
import Orders from './Orders'
import { getOrdersByStatus } from '../../../../actions/orders'
export const dynamic = "force-dynamic";

const page = async() => {
  const result = await getOrdersByStatus("Shipping");
  const orders = result?.orders || [];

  return (
    <div>
      <Orders orders={orders}/>
    </div>
  )
}

export default page
