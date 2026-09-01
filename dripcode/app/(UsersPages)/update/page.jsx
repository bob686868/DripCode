import React from "react";
import { getProductsByCategory } from "../../../actions/stock";
import { addEmbedding } from "../../lib/embeddings";

export const dynamic = "force-dynamic";

const Page = async () => {
  const result = await getProductsByCategory({ category: "All" });
  const products = result?.products || [];

  if (Array.isArray(products) && products.length > 0) {
    for (const p of products) {
      try {
        await addEmbedding({ productId: p.id, productName: p.name });
        console.log(`✅ Success: ${p.name}`);
        await new Promise(resolve => setTimeout(resolve, 100)); 
      } catch (err) {
        console.error(`❌ Failed: ${p.name}`, err.message);
      }
    }
  }

  return <div className="p-10 text-center">✅ All products vectorized!</div>;
};

export default Page;