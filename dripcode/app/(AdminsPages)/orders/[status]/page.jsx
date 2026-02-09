import React from "react";
import { getOrdersByStatus } from "../../../../actions/orders";
import Row from "../../components/Row";
import Headers from "../../components/Headers";
import Link from "next/link";
// import Chart from '../../components/TrendChart'

 const Page = async ({ params }) => {
  const { status } = await params;
  const { orders } = await getOrdersByStatus(status.toUpperCase());
  const total = orders.reduce((acc, order) => order.totalPrice + acc, 0);
  
  const statuses = ["all", "shipping", "delivered", "canceled"];
  const statusesTitles = ["All", "Shipping", "Delivered", "Canceled"];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Orders</h1>
          <p className="text-neutral-500">Manage and track your store's performance.</p>
        </div>

        {/* Stats Summary Card */}
        <div className="flex gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl min-w-[160px]">
            <p className="text-xs text-neutral-500 uppercase font-semibold mb-1">Total Orders</p>
            <p className="text-2xl font-mono">{orders.length}</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl min-w-[200px] bg-gradient-to-br from-neutral-900 to-neutral-950">
            <p className="text-xs text-green-500/80 uppercase font-semibold mb-1">Total Revenue</p>
            <p className="text-2xl font-mono text-green-400">${total.toLocaleString()}</p>
          </div>
        </div>
      </div>
      {/* <Chart order={orders}/> */}

      {/* --- CONTROLS SECTION --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-neutral-800 pb-6">
        <nav className="flex p-1 bg-neutral-900 rounded-xl border border-neutral-800">
          {statuses.map((s, i) => {
            const isActive = s === status;
            return (
              <Link
                key={i}
                href={`/orders/${s}`}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? `badge-${s} shadow-lg brightness-110 scale-105 z-10` 
                    : "text-neutral-500 hover:text-neutral-200"
                }`}
              >
                {statusesTitles[i]}
              </Link>
            );
          })}
        </nav>
        
        <div className="text-sm text-neutral-500 italic">
          Showing {orders.length} results for <span className="text-neutral-300 capitalize">"{status}"</span>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-neutral-900/30 rounded-3xl border border-neutral-800 overflow-hidden">
        {orders.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Headers />
            {orders.map((order) => (
              <Row key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="py-40 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-4 text-neutral-600">
               📦
            </div>
            <h3 className="text-xl font-bold">No orders found</h3>
            <p className="text-neutral-500 max-w-xs">
              There are currently no orders with the status "{status}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;