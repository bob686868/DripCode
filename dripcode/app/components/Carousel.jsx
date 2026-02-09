import React from 'react'
import ProdudctCard from './ProductCard'

const Carousel = ({products}) => {
  return (
    <div className='w-full  pb-2 overflow-x-auto [scrollbar-color:var(--color-neutral-800)_transparent] 
               hover:[scrollbar-color:var(--color-neutral-700)_transparent] overflow-y-hidden mt-5'>
      <div className='flex  no-wrap gap-x-3 '>
        {products.map((product)=>(
            <div className='w-[35%] lg:w-[25%] shrink-0' key={product.id}>
            <ProdudctCard  data={product}/>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
