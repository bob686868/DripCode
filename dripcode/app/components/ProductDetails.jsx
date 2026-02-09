"use client";
import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { addItemToCartAction } from "../serverActions";
import { useState } from "react";
import { useCartStore } from "../../stores/useCartStore";
import SubmitButton from "./SubmitButton";
const ProductDetails = ({ product }) => {
  const { id, name, description, price, stock, colors } = product;
  const [activeIndex, setActiveIndex] = useState(0);
  const openCart = useCartStore((state) => state.openCart);
  function increment(func) {
    func((prev) => (prev + 1) % colors.length);
  }
  function decrement(func) {
    func((prev) => (prev - 1 + colors.length) % colors.length);
  }
  async function handler(formData) {
    await addItemToCartAction(formData);
    window.dispatchEvent(new Event("cart-updated"));
    setTimeout(() => openCart(), 2000);

    // openCart()
  }
  return (
    <div className="rounded-md flex flex-col lg:justify-between lg:flex-row items-center lg:items-start bg-neutral-950 pt-20 pb-7 px-4">
      <div className="flex flex-col lg:w-[60vw] shrink-0 lg:justify-center items-center">
        <div className="w-[40vw]  relative ">
          <Image
            alt="product"
            width={300}
            height={300}
            src={colors[activeIndex].url}
            className="object-cover mx-auto aspect-square rounded-md"
            priority // Loads this image immediately
          />
        </div>
        <span className="relative w-40 flex justify-between -top-3 rounded-full p-2 px-3 bg-neutral-900/50 text-neutral-400 mb-20">
          <FaArrowLeft
            className="size-8 hover:text-neutral-100 hover:scale-105 cursor-pointer px-2"
            onClick={() => decrement(setActiveIndex)}
          ></FaArrowLeft>
          <span className="px-6">|</span>
          <FaArrowRight
            className="px-2 size-8 hover:text-neutral-100 hover:scale-105 cursor-pointer"
            onClick={() => increment(setActiveIndex)}
          ></FaArrowRight>
        </span>
        <span className="mb-10">
          {colors.map((variant, index) => (
            <div
              className={`border hover:border-blue-600  rounded-md inline-block p-2 ${activeIndex === index ? "border-blue-600 border-2" : "border-neutral-400/10"}`}
              key={variant.id}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                alt="variant"
                src={variant.url}
                width={100}
                height={100}
                className="aspect-square border-4 rounded-md "
              />
            </div>
          ))}
        </span>
      </div>
      <div className="w-full  lg:pr-10">
        <h1 className="text-5xl w-full mt-5 lg:mt-0 text-neutral-100 font-bold">
          {name}
        </h1>
        <div className="w-full flex justify-between items-center">
          <div className="rounded-full w-fit bg-blue-600 text-sm mt-2 p-2 py-[6px] text-neutral-100">
            ${price.toFixed(2)} USD
          </div>
          {stock > 0 ? (
            <div className="text-green-500 ">In Stock</div>
          ) : (
            <div className="text-red-400">Out Of Stock</div>
          )}
        </div>

        <hr className="border-none h-0.5 bg-white/10 my-5 w-full" />
        <h3 className="w-full">COLOR</h3>
        <div className="flex mt-5 mb-8 w-full ">
          {colors.map((variant, index) => (
            <div
              onClick={() => setActiveIndex(index)}
              key={index}
              className={`border  ${index == activeIndex ? " border-blue-600 border-2" : "border-neutral-400/20  cursor-pointer hover:border hover:border-blue-500"} text-center  p-2 py-1.5 pt-2 rounded-full text-sm text-neutral-100`}
            >
              {variant.color}
            </div>
          ))}
        </div>
        <p className="text-neutral-400 w-full mb-2">{description}</p>
        <form action={handler} className="w-full">
          <SubmitButton isDisabled={!stock} />
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={colors[activeIndex].url} />
          <input type="hidden" name="color" value={colors[activeIndex].color} />
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
