import React from 'react'
import {clearProducts} from '../../../actions/stock'
import {prisma} from '@/actions/client'

const page =async () => {
  //  await  clearProducts()
  //  await prisma.cartItem.deleteMany({});
   console.log("cleare successfully")
  return (
    <div>
      clearPage
    </div>
  )
}

export default page
