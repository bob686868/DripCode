import React from "react";
import { getOrderById } from "@/actions/orders"; // Assume you have this action
import { Package, User, CreditCard, Calendar, ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const OrderDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {order} = await getOrderById(Number(id));
  console.log(order)

  if (!order) return <div className="p-20 text-center text-white">Order not found.</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8">
      {/* --- TOP NAVIGATION & ACTIONS --- */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Link href="/orders/all" className="flex items-center text-neutral-500 hover:text-white transition-colors text-sm mb-2 group">
            <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Orders
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">Order #ACME-{order.id}</h1>
          <p className="text-neutral-500 flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4" /> {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl hover:bg-neutral-800 transition-all text-sm font-medium">
          <Printer className="w-4 h-4" /> Print Invoice
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: ITEM LIST --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-neutral-800 bg-neutral-900/80">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Package className="w-5 h-5 text-neutral-400" /> Order Items ({order.orderItems.length})
              </h2>
            </div>
            <div className="divide-y divide-neutral-800">
              {order.orderItems.map((item) => (
                <div key={item.id} className="p-6 flex items-center gap-6 group hover:bg-neutral-800/30 transition-colors">
                  <div className="relative w-20 h-20 bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700">
                    <Image 
                      src={item.url} 
                      alt={item.name} 
                      fill 
                      className="object-cover p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-neutral-500">
                      Color: <span className="text-neutral-300 capitalize">{item.color.toLowerCase()}</span> | 
                      Qty: <span className="text-neutral-300">{item.quantity}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs text-neutral-500">${item.price.toFixed(2)} / unit</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR INFO --- */}
        <div className="space-y-6">
          {/* Customer Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
              <User className="w-4 h-4" /> Customer Information
            </h2>
            <div className="space-y-1">
              <p className="text-white font-bold text-lg">{order.user.username}</p>
              <p className="text-neutral-400 text-sm">{order.user.email}</p>
              <div className="pt-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold badge-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 bg-gradient-to-b from-neutral-900 to-neutral-950">
            <h2 className="text-sm font-black uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Payment Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono">${order.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Shipping</span>
                <span className="text-green-500 font-mono">FREE</span>
              </div>
              <div className="h-px bg-neutral-800 my-2" />
              <div className="flex justify-between text-xl font-black">
                <span>Total</span>
                <span className="text-white font-mono">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsPage;