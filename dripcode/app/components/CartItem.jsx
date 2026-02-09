"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import Image from "next/image";

const CartItem = ({ data,update }) => {
  const { id:cartItemId,product, color, url, quantity } = data;
  const { name, price } = product;
  console.log('cartItem')
  // useEffect(() => {
  //   if (quantity == quantityState) return;
  //   const timer = setTimeout(
  //     async () =>
  //       await updateQuantity({ cartItemId, quantity: quantityState }),
  //     500,
  //   );
  //   return () => clearTimeout(timer);
  // }, [quantityState, id, quantity,cartItemId]);
  return (
    <div className="p-2 border-b flex justify-between border-neutral-400/20">
      {/*left part*/}
      <div className="flex relative gap-x-2">
        <span
          className="absolute z-99 h-fit  rounded-full p-1 bg-neutral-500"
          onClick={()=>update({cartItemId,newQuantity:0})}
        >
          <IoMdClose className="size-3 text-neutral-800 cursor-pointer" />
        </span>
        <div className="p-1.5 rounded-md border bg-neutral-900 border-neutral-400">
          <Image src={url} width={50} height={50} alt="product" className="aspect-square" />
        </div>
        <div className="text-sm inline-block">
          <h3 className="text-neutral-100">{name}</h3>
          <h4 className="text-neutral-400">{color}</h4>
        </div>
      </div>
      {/*right part*/}
      <div className="flex flex-col gap-y-2">
        <div className="inline-block text-neutral-100 text-sm">
          ${(price * quantity).toFixed(2)} USD
        </div>
        <div className="rounded-full text-neutral-400 flex justify-between items-center border border-neutral-400/10 p-1.5 text-sm">
          <span onClick={()=>update({cartItemId,newQuantity:Math.max(quantity-1,0)})} className="cursor-pointer">
            <FaMinus />
          </span>
          <span className="text-neutral-100 px-3">{quantity}</span>
          <span onClick={()=> update({cartItemId,newQuantity:quantity+1})} className="cursor-pointer">
            <FaPlus />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
