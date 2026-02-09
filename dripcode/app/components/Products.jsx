import React from "react";
import ProductCard from "./ProductCard";

// export const mockProducts = [
//   {
//     id: 1,
//     name: "Classic Crewneck",
//     description: "A soft, everyday staple made from 100% organic cotton.",
//     slug: "classic-crewneck",
//     price: 45.0,
//     stock: 120,
//     category: "Apparel",
//     colors: [
//       {
//         id: 101,
//         color: "Navy",
//         url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
//         productId: 1,
//       },
//       {
//         id: 102,
//         color: "Heather Gray",
//         url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
//         productId: 1,
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Urban Tech Backpack",
//     description:
//       "Water-resistant exterior with a dedicated 16-inch laptop sleeve.",
//     slug: "urban-tech-backpack",
//     price: 125.5,
//     stock: 45,
//     category: "Accessories",
//     colors: [
//       {
//         id: 201,
//         color: "Matte Black",
//         url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
//         productId: 2,
//       },
//       {
//         id: 202,
//         color: "Forest Green",
//         url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
//         productId: 2,
//       },
//     ],
//   },
// ];
const Products =async ({products}) => {
  return (
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3">
      {products && products.length>0 && products.map((data) => (
        <ProductCard data={data} key={data.id} />
      ))}
    </div>
  );
};

export default Products;
