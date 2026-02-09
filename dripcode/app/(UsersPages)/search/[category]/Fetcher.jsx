import React from 'react'
import Products from "../../../components/Products";
import { getProductsByCategory } from '../../../../actions/stock';


const Fetcher = async ({category,sortBy,query}) => {
    console.log('fetcher')
    console.log(sortBy)
  const {products}=await getProductsByCategory({category,sortBy,query})

  return (
    <div>
      {query && <div className='text-neutral-100 mb-2'>{products.length > 0 ? `Showing ${products.length} product${products.length >1 ? "s" : ""} for "${query}"` : `No results found for "${query}"`}</div>}
              <Products products={products} ></Products>

    </div>
  )
}

export default Fetcher
