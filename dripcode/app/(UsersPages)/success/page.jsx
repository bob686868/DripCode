// "use client";
// import Link from "next/link";
// import { useEffect } from "react";
// import { createOrder } from "../../../actions/orders";
// import { FaCheck } from "react-icons/fa";
// import ConfettiEffect from "../../components/confettiEffect";
// export default function SuccessPage() {
//   useEffect(()=>{
//       createOrder()
//   },[])
//   return (
//     <div className="flex flex-col h-full bg-neutral-950 fixed top-0 inset-0 z-999 pt-10 w-full justify-center items-center">
//       <div className="rounded-full p-6 bg-[#10b981]">
//         <FaCheck className="size-8 text-neutral-100" />
//       </div>
//       <h1 className="mt-10 text-3xl text-neutral-100 font-bold">
//         Payment Sucessful !
//       </h1>
//       <h3 className="mt-3 text-neutral-400">
//         Thank You For Your Purchase
//       </h3>
//       <Link
//         href="/myOrders/Shipping"
//         className="bg-[#10b981] hover:brightness-110 mb-10 rounded-full px-5 py-2 mt-10 text-neutral-100"
//       >
//         My Orders
//       </Link>
//       <ConfettiEffect />
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createOrder } from "../../../actions/orders";
import { FaCheck } from "react-icons/fa";
import { IoArrowBackOutline, IoReceiptOutline } from "react-icons/io5";
import ConfettiEffect from "../../components/confettiEffect";

export default function SuccessPage() {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleOrder = async () => {
      try {
        await createOrder();
      } catch (error) {
        console.error("Order creation failed", error);
      } finally {
        setIsProcessing(false);
      }
    };
    handleOrder();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950 px-4 text-center">
      <ConfettiEffect />

      <div className="max-w-md w-full">
        {/* Success Icon Animation Wrapper */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 scale-150 animate-ping rounded-full bg-emerald-500/20 blur-xl"></div>
          <div className="relative rounded-full p-6 bg-emerald-500 shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)]">
            <FaCheck className="size-8 text-neutral-100" />
          </div>
        </div>

        <h1 className="mt-10 text-4xl font-extrabold tracking-tight text-neutral-100">
          Payment Successful
        </h1>
        
        <p className="mt-4 text-neutral-400 text-lg">
          {isProcessing 
            ? "Finalizing your order details..." 
            : "Your order has been confirmed and is being prepared for shipment."}
        </p>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col gap-4">
          <Link
            href="/myOrders/Shipping"
            className="group flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-black/20"
          >
            <IoReceiptOutline className="size-5" />
            View My Orders
          </Link>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors py-2 font-medium"
          >
            <IoArrowBackOutline className="size-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Small Footer Detail */}
        {!isProcessing && (
          <div className="mt-12 pt-8 border-t border-neutral-900">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">
              A confirmation email will be sent to you shortly
            </p>
          </div>
        )}
      </div>
    </div>
  );
}