import React from "react";
import Image from "next/image";
import Link from 'next/link'

// const ProdudctCard = ({ size = "small", data }) => {
//   const { id,name, price, colors } = data;
//   const classes =
//     size == "small"
//       ? "  px-1 pb-2 pt-13 lg:px-[2vw] lg:pb-4 lg:pt-15"
//       : "p-6 max-w-[60vw] ";
//   return (
//     <Link href={`/details/${id}`} className="w-full h-full ">
//     <div
//       className={`bg-neutral-950 flex flex-col justify-center h-full items-center  text-neutral-100 rounded-md border border-transparent hover:border-blue-500 cursor-pointer group ${classes}`}
//       >
//       <Image
//         src={colors[0].url}
//         width={200}
//         height={200}
//         className="w-[70%] lg:w-[50%] aspect-square rounded-md transition duration-200 group-hover:scale-105"
//         alt="product"
//       />
//       <div className="flex gap-2 w-fit text-sm space-between items-center rounded-full max-w-[100%] py-1 px-2  border mr-auto border-neutral-100/15  mt-auto">
//         <div className=" text-[13px] tracking-tight ">{name}</div>
//         <div className="rounded-full  text-xs px-2 py-2 whitespace-nowrap bg-blue-600">
//           ${price} USD
//         </div>
//       </div>
//     </div>
//         </Link>
//   );
// };

// export default ProdudctCard;

const ProdudctCard = ({ data }) => {
  const { id, name, price, colors } = data;

  return (
    <Link href={`/details/${id}`} className="group relative w-full block overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 aspect-square">
      {/* Image Container */}
      <div className="relative w-full h-full">
        <Image
          src={colors[0].url}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Darker gradient for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* Label Bar */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="flex items-center justify-between gap-2 bg-neutral-950/80 backdrop-blur-md border border-white/10 p-1.5 pl-3 rounded-full">
          <h3 className="text-white text-[13px] font-medium truncate">
            {name}
          </h3>
          <span className="bg-blue-600 text-white text-[11px] font-bold py-1.5 px-3 rounded-full whitespace-nowrap">
            ${price} USD
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProdudctCard;


