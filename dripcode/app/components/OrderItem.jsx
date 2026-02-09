// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// const OrderItem = ({ orderItem}) => {
//     console.log(orderItem)
//   let { productId,color, url, quantity,name, price } = orderItem;
//     productId=21
//   return (
//     <div className="p-2  border rounded-l-3xl flex justify-between border-neutral-400/20">
//       {/*left part*/}
//       <div className="flex justify-between flex-1 items-center">

//         <div className="flex relative gap-x-2">

//             <div className="rounded-md ">
//             <Image src={url} width={50} height={50} alt="product" className="rounded-l-2xl h-full w-15 aspect-square" />
//             </div>
//             <div className="text-sm inline-block pt-2">
//             <h3 className="text-neutral-100">{name}</h3>
//             <h4 className="text-neutral-400">{color}</h4>
//                 <div className="inline-block text-neutral-400 text-sm">
//                 ${(price * quantity).toFixed(2)} USD
//                 </div>
//             </div>
//       </div>
//              <Link href={`/details/${productId}`} className=' bg-blue-600 text-neutral-100 hover:brightness-110 h-fit rounded-full px-4 p-2 '>
//                     View Product
//             </Link>
//       </div>

//     </div>
//   );
// };

// export default OrderItem;

import React from "react";
import Image from "next/image";
import Link from "next/link";
const OrderItem = ({ orderItem }) => {
  const { productId, color, url, quantity, name, price } = orderItem;

  return (
    <div className="group flex items-center justify-between p-3 rounded-xl border border-neutral-800/50 hover:border-neutral-700 transition-colors">
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="h-16 w-16 relative bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={url}
            fill
            alt={name}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h4 className="text-neutral-100 font-semibold text-sm leading-tight">
            {name}
          </h4>
          <p className="text-neutral-500 text-xs mt-1">
            {color} • Qty: {quantity}
          </p>
          <p className="text-neutral-100 font-medium text-xs mt-1">
            ${(price * quantity).toFixed(2)}
          </p>
        </div>
      </div>

      <Link
        href={`/details/${productId}`}
        className="text-xs font-bold text-blue-500 hover:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-500/10 transition-all"
      >
        View Product
      </Link>
    </div>
  );
};

export default OrderItem;
