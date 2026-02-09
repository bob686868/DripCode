import React from 'react'
import ProductDetails from '../../../components/ProductDetails'
import {getProductById} from '../../../../actions/stock'
const page = async ({params}) => {
    let {id}=await params
    let {product}=await getProductById(id)
  return (
    <div className='mx-3'>
      <ProductDetails product={product}></ProductDetails>
    </div>
  )
}

export default page
