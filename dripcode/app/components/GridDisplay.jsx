// import React from "react";
// import ProdudctCard from "./ProductCard";

// // const GridDisplay = ({ products }) => {
// //   return (
// //     <div className="grid px-4 grid-cols-12 grid-rows-3 md:grid-rows-2 w-full h-500 md:h-120 gap-x-4 gap-y-4">
// //       <div className="row-span-1 h-full col-span-12 md:col-span-8 md:row-span-2">
// //         <ProdudctCard data={products[0]} />
// //       </div>
// //       <div className="row-span-1 col-span-12 md:col-span-4 md:row-span-1">
// //         <ProdudctCard data={products[1]} />
// //       </div>
// //       <div className="row-span-1 col-span-12 md:col-span-4 md:row-span-1">
// //         <ProdudctCard data={products[2]} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default GridDisplay;
// const GridDisplay = ({ products }) => {
//   return (
//     <div className="grid px-4 grid-cols-12 gap-x-4 w-full h-500 max-w-7xl mx-auto md:h-[600px]">
//       {/* Featured Card (Left) */}
//       <div className="col-span-12 md:col-span-8 h-[400px] md:h-full">
//         <ProdudctCard data={products[0]} size="large" />
//       </div>
      
//       {/* Side Stack (Right) */}
//       <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-x-4 h-[600px] md:h-full">
//         <div className="row-span-2">
//           <ProdudctCard data={products[1]} size="small" />
//         </div>
//         <div className="row-span-2">
//           <ProdudctCard data={products[2]} size="small" />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default GridDisplay;

import React from "react";
import HomeProductCard from "./HomeProductCard";

const GridDisplay = ({ products }) => {
  if (!products || products.length < 3) return null;

  return (
    <div className="grid px-4 grid-cols-12 gap-4 w-full max-w-7xl mx-auto h-[700px] md:h-[600px]">
      {/* Main Featured Item */}
      <div className="col-span-12 md:col-span-8 relative">
        <HomeProductCard data={products[0]} priority={true} />
      </div>
      
      {/* Right Stack */}
      <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-4">
        <HomeProductCard data={products[1]} />
        <HomeProductCard data={products[2]} />
      </div>
    </div>
  );
};

export default GridDisplay