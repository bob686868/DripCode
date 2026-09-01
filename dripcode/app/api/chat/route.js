import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { prisma } from "../../../actions/client";
import { getFreeEmbedding } from "../../lib/embeddings";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // 1. Find the last message sent by the user
    const lastUserMessage = messages?.filter((m) => m.role === "user").pop();

    let lastMessage = "Hello";
    if (lastUserMessage?.parts && Array.isArray(lastUserMessage.parts)) {
      lastMessage =
        lastUserMessage.parts
          .filter((part) => part.type === "text" && part.text)
          .map((part) => part.text)
          .join(" ") || "Hello";
    } else if (typeof lastUserMessage?.content === "string") {
      lastMessage = lastUserMessage.content;
    }

    // 2. Fast Embedding & Semantic Search
    let context = "";
    try {
      const userVector = await getFreeEmbedding(lastMessage);
      const userVectorString = `[${userVector.join(",")}]`;

      const products = await prisma.$queryRaw`
        SELECT id, name, description, price, category
        FROM "Product"
        WHERE embedding IS NOT NULL
        ORDER BY embedding <=> ${userVectorString}::vector
        LIMIT 4;
      `;

      if (products && products.length > 0) {
        context = products
          .map(
            (p) =>
              `- [ID: ${p.id}] ${p.name} ($${p.price} USD, Category: ${p.category}): ${p.description || "Premium product."}`
          )
          .join("\n");
      }
    } catch (embErr) {
      console.warn("Vector search fallback:", embErr.message);
      // Fallback: fetch general popular products if embedding failed
      const fallbackProducts = await prisma.product.findMany({
        take: 4,
        select: { id: true, name: true, price: true, category: true, description: true },
      });
      context = fallbackProducts
        .map(
          (p) =>
            `- [ID: ${p.id}] ${p.name} ($${p.price} USD, Category: ${p.category}): ${p.description || "Premium product."}`
        )
        .join("\n");
    }

    // 3. Generate stream with high-speed Gemini Flash Lite
    const systemPrompt = `You are ACME Store AI Assistant, an intelligent, ultra-fast shopping guide for our modern streetwear & lifestyle store.
Here are relevant products from our inventory:
${context || "No specific products found for this query."}

Guidelines:
- Recommend relevant products enthusiastically with their exact price and category.
- Keep answers concise, clear, stylish, and helpful.
- If the user asks general questions or greetings, be friendly and suggest checking out trending gear.`;

    const result = await streamText({
      model: google("gemini-3.1-flash-lite"),
      system: systemPrompt,
      prompt: lastMessage,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API route error:", error);
    // Fallback response with gemini-3.5-flash if flash-lite had an issue
    try {
      const result = await streamText({
        model: google("gemini-3.5-flash"),
        prompt: "You are the ACME Store Assistant. Briefly apologize for a momentary system glitch and offer to help find products.",
      });
      return result.toUIMessageStreamResponse();
    } catch (fatalError) {
      return new Response(
        JSON.stringify({ error: "Failed to generate AI response. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
}
