import React from "react";
import {prisma} from '../../../actions/client'
import { addEmbedding } from "../../lib/embeddings";
const page = async () => {

const products = [
  {
    name: "Acme Classic Tee",
    description: "A soft, everyday essential made from 100% organic cotton.",
    price: 25.00,
    stock: 150,
    category: "Shirts",
    slug: "acme-classic-tee",
    colors: {
      create: [
        { color: "BLACK", url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800", imageId: 101 },
        { color: "WHITE", url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800", imageId: 102 },
        { color: "NAVY", url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800", imageId: 103 },
      ]
    }
  },
  {
    name: "Urban Hoodie",
    description: "Heavyweight fleece hoodie designed for maximum comfort and style.",
    price: 55.00,
    stock: 80,
    category: "Hoodies",
    slug: "urban-hoodie",
    colors: {
      create: [
        { color: "GRAY", url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800", imageId: 201 },
        { color: "MAROON", url: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800", imageId: 202 },
        { color: "FORREST", url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800", imageId: 203 },
      ]
    }
  },
  {
    name: "Tech Backpack",
    description: "Water-resistant laptop bag with modular storage compartments.",
    price: 85.00,
    stock: 45,
    category: "Bags",
    slug: "tech-backpack",
    colors: {
      create: [
        { color: "BLACK", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800", imageId: 301 },
        { color: "SILVER", url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800", imageId: 302 },
        { color: "OLIVE", url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800", imageId: 303 },
      ]
    }
  },
  {
    name: "Stainless Bottle",
    description: "Vacuum insulated bottle that keeps drinks cold for 24 hours.",
    price: 32.00,
    stock: 200,
    category: "Drinkware",
    slug: "stainless-bottle",
    colors: {
      create: [
        { color: "TEAL", url: "https://images.unsplash.com/photo-1602143393494-112e40bc843a?auto=format&fit=crop&q=80&w=800", imageId: 401 },
        { color: "ORANGE", url: "https://images.unsplash.com/photo-1589365278144-c9e705b843ba?auto=format&fit=crop&q=80&w=800", imageId: 402 },
        { color: "YELLOW", url: "https://images.unsplash.com/photo-1544003385-a496891a00c3?auto=format&fit=crop&q=80&w=800", imageId: 403 },
      ]
    }
  },
  {
    name: "Canvas Snapback",
    description: "Structured 6-panel hat with an adjustable brass closure.",
    price: 28.00,
    stock: 100,
    category: "Headwear",
    slug: "canvas-snapback",
    colors: {
      create: [
        { color: "TAN", url: "https://images.unsplash.com/photo-1588850561447-417f33188db0?auto=format&fit=crop&q=80&w=800", imageId: 501 },
        { color: "SAND", url: "https://images.unsplash.com/photo-1572307480813-ceb0e59d832e?auto=format&fit=crop&q=80&w=800", imageId: 502 },
        { color: "BROWN", url: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800", imageId: 503 },
      ]
    }
  },
  {
    name: "Minimalist Wallet",
    description: "Slim RFID-blocking wallet crafted from premium leather.",
    price: 40.00,
    stock: 60,
    category: "Accessories",
    slug: "minimalist-wallet",
    colors: {
      create: [
        { color: "BLACK", url: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800", imageId: 601 },
        { color: "BEIGE", url: "https://images.unsplash.com/photo-1559251643-c797697db990?auto=format&fit=crop&q=80&w=800", imageId: 602 },
        { color: "PURPLE", url: "https://images.unsplash.com/photo-1614030424754-24d1fbf48944?auto=format&fit=crop&q=80&w=800", imageId: 603 },
      ]
    }
  },
  {
    name: "Studio Headphones",
    description: "Wireless noise-cancelling headphones with 40h battery life.",
    price: 199.00,
    stock: 30,
    category: "Electronics",
    slug: "studio-headphones",
    colors: {
      create: [
        { color: "SILVER", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800", imageId: 701 },
        { color: "BLACK", url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800", imageId: 702 },
        { color: "GOLD", url: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=800", imageId: 703 },
      ]
    }
  },
  {
    name: "Cloud Joggers",
    description: "Tapered fit sweatpants made from ultra-soft cloud-knit fabric.",
    price: 48.00,
    stock: 90,
    category: "Apparel",
    slug: "cloud-joggers",
    colors: {
      create: [
        { color: "GRAY", url: "https://images.unsplash.com/photo-1580487212103-2b5b79104021?auto=format&fit=crop&q=80&w=800", imageId: 801 },
        { color: "NAVY", url: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800", imageId: 802 },
        { color: "CREAM", url: "https://images.unsplash.com/photo-1506629082923-f9ad3391f1ad?auto=format&fit=crop&q=80&w=800", imageId: 803 },
      ]
    }
  },
  {
    name: "Retro Sneakers",
    description: "Classic low-top sneakers with a recycled rubber sole.",
    price: 110.00,
    stock: 25,
    category: "Footware",
    slug: "retro-sneakers",
    colors: {
      create: [
        { color: "WHITE", url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800", imageId: 901 },
        { color: "RED", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", imageId: 902 },
        { color: "VIOLET", url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800", imageId: 903 },
      ]
    }
  },
  {
    name: "Logo Sticker Pack",
    description: "Heavy-duty vinyl stickers that are weather-proof and fade-resistant.",
    price: 12.00,
    stock: 500,
    category: "Stickers",
    slug: "logo-sticker-pack",
    colors: {
      create: [
        { color: "PINK", url: "https://images.unsplash.com/photo-1589384267710-7a25993e040f?auto=format&fit=crop&q=80&w=800", imageId: 1001 },
        { color: "TURQUOISE", url: "https://images.unsplash.com/photo-1618331812910-001dd32400bc?auto=format&fit=crop&q=80&w=800", imageId: 1002 },
        { color: "YELLOW", url: "https://images.unsplash.com/photo-1598948485421-33a763569769?auto=format&fit=crop&q=80&w=800", imageId: 1003 },
      ]
    }
  }
];

// const prisma = new PrismaClient();

const productsData = [
  {
    name: "Urban Explorer Backpack",
    description: "Durable water-resistant backpack for daily use.",
    price: 85.00,
    category: "Bags",
    stock: 50,
    colors: [
      { color: "BLACK", url: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800" },
      { color: "NAVY", url: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=800" },
      { color: "OLIVE", url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800" },
    ]
  },
  
  {
    name: "Active Noise Headphones",
    description: "Premium sound quality with active noise cancellation.",
    price: 299.00,
    category: "Electronics",
    stock: 30,
    colors: [
      { color: "BLACK", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800" },
      { color: "SILVER", url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800" },
      { color: "BEIGE", url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800" },
    ]
  },
  {
    name: "Classic Canvas Sneakers",
    description: "Timeless design for everyday comfort.",
    price: 65.00,
    category: "Footware",
    stock: 75,
    colors: [
      { color: "WHITE", url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800" },
      { color: "RED", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800" },
      { color: "BLACK", url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800" },
    ]
  },
  {
    name: "Streetwear Dad Hat",
    description: "Adjustable cotton cap with a curved brim.",
    price: 25.00,
    category: "Headwear",
    stock: 120,
    colors: [
      { color: "BEIGE", url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800" },
      { color: "NAVY", url: "https://images.unsplash.com/photo-1576850738804-2eb906723302?q=80&w=800" },
      { color: "BLACK", url: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800" },
    ]
  },
  {
    name: "Essential Fleece Hoodie",
    description: "Soft inner lining for maximum warmth.",
    price: 55.00,
    category: "Hoodies",
    stock: 60,
    colors: [
      { color: "GRAY", url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" },
      { color: "BLACK", url: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800" },
      { color: "GREEN", url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800" },
    ]
  },
  {
    name: "Lightweight Puffer Jacket",
    description: "Insulated but packable jacket for travel.",
    price: 120.00,
    category: "Jackets",
    stock: 25,
    colors: [
      { color: "ORANGE", url: "https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=800" },
      { color: "BLUE", url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800" },
      { color: "BLACK", url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800" },
    ]
  },
  {
    name: "Kids Graphic Tee",
    description: "100% organic cotton with fun prints.",
    price: 18.00,
    category: "Kids",
    stock: 90,
    colors: [
      { color: "YELLOW", url: "https://images.unsplash.com/photo-1519706887233-45f448172f6a?q=80&w=800" },
      { color: "PINK", url: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800" },
      { color: "BLUE", url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800" },
    ]
  },
  {
    name: "Premium Dog Collar",
    description: "Leather collar with heavy-duty buckle.",
    price: 22.00,
    category: "Pets",
    stock: 45,
    colors: [
      { color: "BROWN", url: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=800" },
      { color: "TAN", url: "https://images.unsplash.com/photo-1623961980058-9445856939d1?q=80&w=800" },
      { color: "RED", url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800" },
    ]
  },
  {
    name: "Oversized Cotton Shirt",
    description: "Breathable fabric with a relaxed fit.",
    price: 40.00,
    category: "Shirts",
    stock: 80,
    colors: [
      { color: "WHITE", url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800" },
      { color: "OLIVE", url: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?q=80&w=800" },
      { color: "TEAL", url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800" },
    ]
  }
];


  console.log("Seeding products...");
  
  for (const item of productsData) {
    const { colors, ...productInfo } = item;
    
    const p=await prisma.product.create({
      data: {
        ...productInfo,
        slug: productInfo.name.toLowerCase().replace(/ /g, '-'),
        colors: {
          create: colors // This handles the ProductColor relation automatically
        }
      }
    });
    await addEmbedding({productId:p.id,productName:p.name})
  }
  
  console.log("Seeding finished!");

seedProducts()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
  async function seedProducts() {
    for (const product of products) {
      await prisma.product.create({
        data: product,
      });
    }
    console.log("Database seeded successfully!");
  // seedProducts();

}
  return <div>add Page</div>;
}
export default page;
