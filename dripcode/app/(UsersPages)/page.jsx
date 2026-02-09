// import { getProducts } from "../../actions/stock";
// import Carousel from "../components/Carousel";
// import GridDisplay from "../components/GridDisplay";
// export default async function Home() {
//   const { products } = await getProducts();
//   return (
//     <div className="dark:bg-neutral-900 text-neutral-100">
 
//       <GridDisplay products={products && products.slice(0, 3)} />
//       <div className="text-neutral-100 font-bold mt-12 mb-10 pl-4 pt-6 border-t border-neutral-400/40  text-5xl">
//         Best Sellers
//       </div>
//       <Carousel products={products && products.slice(3)} />
//     </div>
//   );
// }

// import { getProducts } from "../../actions/stock";
// import Carousel from "../components/Carousel";
// import GridDisplay from "../components/GridDisplay";

// export default async function Home() {
//   const { products } = await getProducts();
  
//   // Safety check for products
//   if (!products || products.length === 0) return null;

//   return (
//     <main className="min-h-screen bg-neutral-950 text-neutral-100">
//       {/* Hero Section / Featured Grid */}
//       <section className="py-8 md:py-12">
//         <GridDisplay products={products.slice(0, 3)} />
//       </section>

//       {/* Best Sellers Section */}
//       <section className="py-12 border-t border-neutral-800">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-end justify-between mb-8">
//             <div>
//               <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
//                 Best Sellers
//               </h2>
//               <p className="text-neutral-500 mt-2 text-sm md:text-base">
//                 Our most popular picks, curated for you.
//               </p>
//             </div>
//             <div className="hidden md:block text-sm font-medium text-blue-500 hover:underline cursor-pointer">
//               View All →
//             </div>
//           </div>
//           <Carousel products={products.slice(3)} />
//         </div>
//       </section>
//     </main>
//   );
// }


import { getProducts } from "../../actions/stock";
import Carousel from "../components/Carousel";
import GridDisplay from "../components/GridDisplay";

export default async function Home() {
  const { products } = await getProducts();
  if (!products || products.length === 0) return null;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* WRAP THIS IN THE SAME CONTAINER AS BEST SELLERS */}
      <section className="py-8 md:py-12 max-w-7xl mx-auto px-4 w-full">
        <GridDisplay products={products.slice(0, 3)} />
      </section>

      <section className="py-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex items-end justify-between mb-8">
            {/* ... title logic ... */}
          </div>
          <Carousel products={products.slice(3)} />
        </div>
      </section>
    </main>
  );
}
