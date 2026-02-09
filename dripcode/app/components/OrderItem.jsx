import React from "react";
import Image from "next/image";
import Link from "next/link";

const OrderItem = ({ orderItem}) => {
    console.log(orderItem)
  let { productId,color, url, quantity,name, price } = orderItem;
    productId=21
  return (
    <div className="p-2  border rounded-l-3xl flex justify-between border-neutral-400/20">
      {/*left part*/}
      <div className="flex justify-between flex-1 items-center">

        <div className="flex relative gap-x-2">
            
            <div className="rounded-md ">
            <Image src={url} width={50} height={50} alt="product" className="rounded-l-2xl h-full w-15 aspect-square" />
            </div>
            <div className="text-sm inline-block pt-2">
            <h3 className="text-neutral-100">{name}</h3>
            <h4 className="text-neutral-400">{color}</h4>
                <div className="inline-block text-neutral-400 text-sm">
                ${(price * quantity).toFixed(2)} USD
                </div>
            </div>
      </div>
             <Link href={`/details/${productId}`} className=' bg-blue-600 text-neutral-100 hover:brightness-110 h-fit rounded-full px-4 p-2 '>
                    View Product
            </Link>
      </div>
      
    </div>
  );
};

export default OrderItem;
