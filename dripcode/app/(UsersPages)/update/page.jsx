import React from "react";
import { getProductsByCategory } from "../../../actions/stock";
import { addEmbedding } from "../../lib/embeddings";
const Page = async () => {
// In your page.jsx
const { products } = await getProductsByCategory({category:"All"});

// Use for...of instead of forEach for sequential processing
for (const p of products) {
  try {
    await addEmbedding({ productId: p.id, productName: p.name });
    console.log(`✅ Success: ${p.name}`);
    
    // Optional: add a tiny delay (100ms) to avoid hitting free-tier rate limits
    await new Promise(resolve => setTimeout(resolve, 100)); 
  } catch (err) {
    console.error(`❌ Failed: ${p.name}`, err.message);
  }
}

  return <div className="p-10 text-center">✅ All products vectorized!</div>;
};
export default Page