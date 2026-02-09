import Image from "next/image";
import React from "react";

const DeliveryCrewCard = ({ data,handleDelete }) => {
  const { id, totalPrice, user, orderItems } = data;
  console.log(orderItems[0]);
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl mb-6">
      {/* Header: Order & Status */}
      <div className="bg-neutral-800/50 p-4 flex justify-between items-center border-b border-neutral-700">
        <div>
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
        Package ID
          </span>
          <h2 className="text-lg text-white font-mono">#ACME-{id}</h2>
        </div>
        <div className="badge-shipping p-1 rounded-lg">In Transit</div>
      </div>

      {/* Body: Product Details */}
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-neutral-800 rounded-lg border border-neutral-700 flex items-center justify-center">
            {/* Placeholder for Product Image */}
            <Image
              alt="product"
              width={20}
              height={20}
              src={orderItems.length > 0 ? orderItems[0].url : ""}
              className="w-full h-full p-1"
            />
          </div>
          <div>
            <p className="text-white font-medium">Order for {user.username}</p>
            <p className="text-sm text-neutral-500">
              Weight: {totalPrice / 50} Kg | Fragile: {totalPrice <2000 ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Delivery Actions */}
        <div className="space-y-2 pt-2">
          <button className="w-full badge-delivered  py-4 rounded-xl font-black text-lg shadow-lg shadow-green-900/20 cursor-pointer transition-all" onClick={()=>handleDelete(id)}>
            COMPLETE DELIVERY
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCrewCard;
