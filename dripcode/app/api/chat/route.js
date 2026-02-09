import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { prisma } from '../../../actions/client';
import { getFreeEmbedding } from '../../lib/embeddings';
export async function POST(req) {
  console.log('enterd post route ')
  

  const {messages}= await req.json();

// 1. Find the last message sent by the user
const lastUserMessage = messages.filter((m) => m.role === "user").pop();

// 2. Extract the text from the parts array (specifically looking for the 'text' type)
const lastMessage = lastUserMessage?.parts
  ?.filter((part) => part.type === "text")
  .map((part) => part.text)
  .join("") || "Hello"; // Fallback if no text part is found
  console.time("embedding")
  const userVector = await getFreeEmbedding(lastMessage);
  console.timeEnd("embedding")
  // 2. Search Supabase (Free via pgvector)
  const userVectorString = `[${userVector.join(",")}]`;

  console.time('db_search')
  const products = await prisma.$queryRaw`
  SELECT name, description, price
  FROM "Product"
  ORDER BY embedding <=> ${userVectorString}::vector
  LIMIT 3;
`;
  console.timeEnd('db_search')


  const context = products.map(p => `${p.name}: ${p.description}`).join("\n");

  console.time("stream_text")
  // 3. Generate response (Free via Gemini Flash)
  const result = await streamText({
    model: google('gemini-3-flash-preview'),
    prompt: `You are a store assistant. Use this product context: ${context}. User asked: ${lastMessage}`,
  });
  console.timeEnd("stream_text")
  return result.toUIMessageStreamResponse();
}
