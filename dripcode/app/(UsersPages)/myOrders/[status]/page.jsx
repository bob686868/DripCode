import {getMyOrders} from '../../../../actions/orders'
import React from 'react'
import Orders from '../../../components/Orders'
import Link from 'next/link'

const page = async ({params,searchParams}) => {
  let {status}=await params
  let {query}=await searchParams
  console.log(query)
  const {orders}=await getMyOrders(undefined,query)
    let indexMappping={
        'SHIPPING':0,
        'DELIVERED':1,
        'CANCELED':2,
    }
    const counts=[0,0,0]
    const pages=['Shipping','Delivered','Canceled']
    const activeIndex=pages.indexOf(status)
    const groupedOrders=[[],[],[]]
    orders?.forEach(order => {
            counts[indexMappping[order.status]]++
            groupedOrders[indexMappping[order.status]].push(order)
            
    });
  return (
    <div className='px-4 bg-neutral-900'>
        <h1 className='bg-neutral-950 mb-4 px-2 py-4 border-b border-neutral-800 shadow-sm shadow-black'>
          <h1 className='text-neutral-100 font-bold text-2xl mb-6'>My Orders</h1>
          <div className='flex gap-x-2  justify-between '>
              {pages.map((page,index)=>(
                <Link key={index} href={`/myOrders/${page}`}className={`${page==status ? 'bg-neutral-200  text-neutral-900' : " bg-neutral-900 text-neutral-100 hover:bg-neutral-200/[88%] text-neutral-800 group"}  rounded-lg py-2 transition duration-100 flex flex-1 shadow-b gap-x-2 justify-center items-center shadow-4xl ]`}>
                      <span className={`${page==status ? '' : "text-neutral-400 group-hover:text-neutral-900"}`}>{page}</span>
                      <span className={`${page==status ? 'bg-neutral-800 text-neutral-100' : "  group-hover:text-neutral-100 duration-0 group-hover:bg-neutral-900  text-neutral-400"} text-sm flex items-center  rounded-full px-1.5 `}>{counts[index]}</span>
                  </Link>
              ))}
          </div>
        </h1>
      <Orders orders={groupedOrders[activeIndex]}  status={status} query={query}/>

    </div>
  )
}

export default page
