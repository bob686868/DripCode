// // lib/prisma.js
// import { PrismaClient } from "../../lib/generated/client"

// const globalForPrisma = global;

// export const prisma = globalForPrisma.prisma || new PrismaClient({
//   datasourceUrl: process.env.DATABASE_URL, // Pass the URL here
// })



// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
// import { PrismaClient } from "../../lib/generated/client"
// // or relative path

// const globalForPrisma = global;

// Initialize without any arguments. 
// Prisma will automatically look for DATABASE_URL in your .env file.
// export const prisma = globalForPrisma.prisma || new PrismaClient({
//   // This satisfies the "non-empty" requirement without 
//   // triggering the "Unknown property" validation errors
//   log: ['error'], 
// })

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// lib/prisma.ts
import { PrismaClient } from "../../lib/generated/client/client";
import { PrismaPg } from '@prisma/adapter-pg'
// const adapter = new PrismaPg({
//     connectionString:process.env.DATABASE_URL
// })
const globalForPrisma = global;
const getPrismaClient=()=>{
  const adapter= new PrismaPg({
    connectionString:process.env.DATABASE_URL
  })
  return new PrismaClient({adapter})
}
export const prisma =
  globalForPrisma.prisma || getPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;