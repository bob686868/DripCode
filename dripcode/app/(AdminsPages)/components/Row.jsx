import Link from "next/link";
import React from "react";

const Row = ({ order }) => {
  const date = new Date(order.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const columns = [
    order.user.username,
    formattedDate,
    `$${order.totalPrice.toFixed(2)}`
  ];

  return (
    <Link href={`/order/${order.id}`} className="grid grid-cols-4 border-b border-b-neutral-400/20 bg-neutral-900 justify-between w-full px-4 hover:bg-blue-500/30 hover:border-l-6 border-l-6 border-transparent hover:border-l-blue-500 ">
      {columns.map((col, i) => (
        <div
          key={i}
          className={`text-neutral-100 py-3 flex  items-center flex-1 `}
        >
          {i == 0 ? (
            <span className="rounded-full p-1  w-10 h-10 flex justify-center items-center  bg-neutral-800 mr-1">
              {order.user.username[0]}
            </span>
          ) : (
            ""
          )}
          {col}
        </div>
      ))}
      <div className=" text-neutral-100 flex items-center">
        <span className={` p-2 rounded-md badge-${order.status.toLowerCase()}`}>
        {order.status}
        </span>
      </div>
    </Link>
  );
};

export default Row;
