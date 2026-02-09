// lib/embeddings.js

export async function getFreeEmbedding(text) {
  if (!text) throw new Error("No text provided for embedding");

  // Hugging Face now requires the router domain for newer accounts/apps
const MODEL_URL = "https://router.huggingface.co/hf-inference/models/BAAI/bge-small-en-v1.5";  
try {
    const response = await fetch(MODEL_URL, {
      headers: { 
        Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
        "x-use-pipeline": "feature-extraction"
      },
      method: "POST",
      // IMPORTANT: Use 'inputs' (plural) for this specific model
      body: JSON.stringify({ 
        inputs: text,
        options: { wait_for_model: true } 
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HF API Error:", errorText);
      // Status 410 means "Gone" (the old URL), Status 400 means body format error
      throw new Error(`HF API failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();

    // Flattening logic: MiniLM-L6-v2 returns [[number, number...]]
    return Array.isArray(result[0]) ? result[0] : result;
    
  } catch (error) {
    console.error("Embedding function crashed:", error);
    throw error;
  }
}


/* test*/






export async function addEmbedding({ productId, productName }) {
  const embeddingArray = await getFreeEmbedding(productName);
  
  // 1. Convert [0.1, 0.2] to "[0.1, 0.2]" string for Postgres
  const vectorString = `[${embeddingArray.join(',')}]`;

  // 2. Use $executeRaw with the stringified vector
  await prisma.$executeRaw`
    UPDATE "Product" 
    SET embedding = ${vectorString}::vector 
    WHERE id = ${productId}
  `;
}