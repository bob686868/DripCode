"use client";
import Link from "next/link";
import { useEffect } from "react";
import { createOrder } from "../../../actions/orders";
import { FaCheck } from "react-icons/fa";
import ConfettiEffect from "../../components/confettiEffect";
export default function SuccessPage() {
  useEffect(()=>{
      createOrder()
  },[])
  return (
    <div className="flex flex-col h-full bg-neutral-950 fixed top-0 inset-0 z-999 pt-10 w-full justify-center items-center">
      <div className="rounded-full p-6 bg-[#10b981]">
        <FaCheck className="size-8 text-neutral-100" />
      </div>
      <h1 className="mt-10 text-3xl text-neutral-100 font-bold">
        Payment Sucessful !
      </h1>
      <h3 className="mt-3 text-neutral-400">
        Thank You For Your Purchase
      </h3>
      <Link
        href="/myOrders/Shipping"
        className="bg-[#10b981] hover:brightness-110 mb-10 rounded-full px-5 py-2 mt-10 text-neutral-100"
      >
        My Orders
      </Link>
      <ConfettiEffect />
    </div>
  );
}
