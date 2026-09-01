import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../../actions/client";

// In-memory cache for live user query embeddings
const embeddingCache = new Map();
const MAX_CACHE_SIZE = 500;

function getGenAI() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not configured");
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Generates a fast 384-dimensional vector embedding for text using Google Gemini.
 * Latency is ~300ms compared to ~6000ms with older HuggingFace endpoints.
 */
export async function getFreeEmbedding(text) {
  if (!text || typeof text !== "string") {
    throw new Error("No valid text provided for embedding");
  }

  const normalizedText = text.trim().toLowerCase();
  if (embeddingCache.has(normalizedText)) {
    return embeddingCache.get(normalizedText);
  }

  try {
    const genAI = getGenAI();
    // Use gemini-embedding-001 with 384 output dimensions to match postgres vector(384)
    const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const result = await model.embedContent({
      content: { parts: [{ text: text.trim() }] },
      outputDimensionality: 384,
    });

    const values = result.embedding?.values;
    if (values && values.length === 384) {
      if (embeddingCache.size >= MAX_CACHE_SIZE) {
        const firstKey = embeddingCache.keys().next().value;
        embeddingCache.delete(firstKey);
      }
      embeddingCache.set(normalizedText, values);
      return values;
    }

    throw new Error("Invalid embedding dimensions returned from Google AI");
  } catch (error) {
    console.warn("Google embedding failed, attempting HuggingFace fallback:", error.message);
    try {
      // Fallback to HuggingFace if Google API ever has an outage
      const MODEL_URL = "https://router.huggingface.co/hf-inference/models/BAAI/bge-small-en-v1.5";
      const response = await fetch(MODEL_URL, {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
          "Content-Type": "application/json",
          "x-use-pipeline": "feature-extraction",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: text,
          options: { wait_for_model: true },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const vector = Array.isArray(result[0]) ? result[0] : result;
        if (vector?.length === 384) {
          embeddingCache.set(normalizedText, vector);
          return vector;
        }
      }
    } catch (hfErr) {
      console.error("HuggingFace fallback also failed:", hfErr.message);
    }
    throw error;
  }
}

/**
 * Embeds product name and description and stores in Postgres pgvector column.
 */
export async function addEmbedding({ productId, productName, description = "" }) {
  const textToEmbed = description ? `${productName}. ${description}` : productName;
  const embeddingArray = await getFreeEmbedding(textToEmbed);

  const vectorString = `[${embeddingArray.join(",")}]`;

  await prisma.$executeRaw`
    UPDATE "Product" 
    SET embedding = ${vectorString}::vector 
    WHERE id = ${productId}
  `;
}