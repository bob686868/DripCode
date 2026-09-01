import React from 'react'
import ProductDetails from '../../../components/ProductDetails'
import {getProductById} from '../../../../actions/stock'
export const dynamic = "force-dynamic";

const page = async ({params}) => {
    let {id}=await params
    let res = await getProductById(id)
    let product = res?.product || null;
  return (
    <div className='mx-3'>
      {product && <ProductDetails product={product}></ProductDetails>}
    </div>
  )
}

export default page
