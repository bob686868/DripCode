const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { PrismaClient } = require("../lib/generated/client");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getEmbeddingWithRetry(text, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
      const result = await model.embedContent({
        content: { parts: [{ text }] },
        outputDimensionality: 384,
      });
      return result.embedding.values;
    } catch (err) {
      if (attempt === retries) {
        // Fallback to gemini-embedding-2
        try {
          const model2 = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
          const result2 = await model2.embedContent({
            content: { parts: [{ text }] },
            outputDimensionality: 384,
          });
          return result2.embedding.values;
        } catch (err2) {
          throw err;
        }
      }
      console.log(`   (Rate limited, waiting 3s before retry ${attempt + 1}/${retries}...`);
      await sleep(3000 * attempt);
    }
  }
}

const productsToSeed = [
  // 1. Shirts
  {
    name: "Acme Cyberpunk Boxy Tee",
    description: "Heavyweight 280 GSM luxury combed cotton t-shirt with a relaxed drop-shoulder silhouette and minimalist typographic graphic.",
    slug: "acme-cyberpunk-boxy-tee",
    price: 42.0,
    stock: 85,
    category: "Shirts",
    colors: [
      { color: "BLACK", url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80" },
      { color: "WHITE", url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80" },
      { color: "OLIVE", url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    name: "Minimalist Oversized Crewneck Tee",
    description: "Premium breathable organic cotton everyday tee tailored with refined seam detailing and signature vintage garment wash.",
    slug: "minimalist-oversized-crewneck-tee",
    price: 38.0,
    stock: 120,
    category: "Shirts",
    colors: [
      { color: "BEIGE", url: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=800&q=80" },
      { color: "NAVY", url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80" },
      { color: "GRAY", url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  // 2. Hoodies
  {
    name: "Tech Fleece Stealth Hoodie",
    description: "Architectural heavyweight double-knit fleece hoodie with thermal insulation, ergonomic raglan sleeves, and hidden zip kangaroo pocket.",
    slug: "tech-fleece-stealth-hoodie",
    price: 88.0,
    stock: 50,
    category: "Hoodies",
    colors: [
      { color: "BLACK", url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80" },
      { color: "GRAY", url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80" },
      { color: "GREEN", url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    name: "Acid Wash Streetwear Pullover",
    description: "Vintage-distressed mineral wash oversized hoodie crafted with 450 GSM French Terry for ultimate drape and comfort.",
    slug: "acid-wash-streetwear-pullover",
    price: 79.0,
    stock: 40,
    category: "Hoodies",
    colors: [
      { color: "PURPLE", url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80" },
      { color: "TEAL", url: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80" },
      { color: "BROWN", url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  // 3. Jackets
  {
    name: "Modular Puffer Jacket",
    description: "Ultra-warm lightweight insulated down jacket with weather-resistant DWR shell, internal storm cuffs, and matte finish.",
    slug: "modular-puffer-jacket",
    price: 145.0,
    stock: 35,
    category: "Jackets",
    colors: [
      { color: "BLACK", url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80" },
      { color: "ORANGE", url: "https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&w=800&q=80" },
      { color: "BLUE", url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    name: "Tactical Utility Windbreaker",
    description: "Lightweight windproof and water-repellent shell jacket equipped with multi-functional modular cargo pockets and taped waterproof seams.",
    slug: "tactical-utility-windbreaker",
    price: 115.0,
    stock: 45,
    category: "Jackets",
    colors: [
      { color: "OLIVE", url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80" },
      { color: "BLACK", url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80" },
      { color: "NAVY", url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  // 4. Bags
  {
    name: "Urban Rolltop Waterproof Backpack",
    description: "Cordura ballistic nylon rolltop backpack with waterproof magnetic closures, dedicated padded 16-inch laptop compartment, and luggage pass-through.",
    slug: "urban-rolltop-waterproof-backpack",
    price: 95.0,
    stock: 60,
    category: "Bags",
    colors: [
      { color: "BLACK", url: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80" },
      { color: "NAVY", url: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=800&q=80" },
      { color: "OLIVE", url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    name: "Minimalist Crossbody Sling",
    description: "Compact tactical sling bag featuring quick-release Fidlock buckle, weather-sealed YKK zips, and versatile ambidextrous strap.",
    slug: "minimalist-crossbody-sling",
    price: 48.0,
    stock: 75,
    category: "Bags",
    colors: [
      { color: "BLACK", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" },
      { color: "BEIGE", url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80" },
      { color: "SILVER", url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  // 5. Drinkware
  {
    name: "Matte Vacuum Insulated Tumbler",
    description: "Double-wall stainless steel thermal tumbler that keeps drinks iced for 24 hours or piping hot for 12 hours. Sweat-free powder coat exterior.",
    slug: "matte-vacuum-insulated-tumbler",
    price: 34.0,
    stock: 90,
    category: "Drinkware",
    colors: [
      { color: "BLACK", url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80" },
      { color: "WHITE", url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80" },
      { color: "TEAL", url: "https://images.unsplash.com/photo-1570857502809-08184874388e?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    name: "Ceramic Artisan Coffee Mug",
    description: "Handcrafted speckled ceramic coffee mug with ergonomic handle and tactile matte satin glaze finish. 350ml capacity.",
    slug: "ceramic-artisan-coffee-mug",
    price: 24.0,
    stock: 110,
    category: "Drinkware",
    colors: [
      { color: "CREAM", url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80" },
      { color: "BROWN", url: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80" },
      { color: "GRAY", url: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  // 6. Electronics
  {
    name: "Studio Pro Active Noise Headphones",
    description: "Audiophile-grade 40mm titanium drivers with hybrid Active Noise Cancellation, spatial audio tracking, and 45-hour battery life.",
    slug: "studio-pro-active-noise-headphones",
    price: 299.0,
    stock: 30,
    category: "Electronics",
    colors: [
      { color: "BLACK", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" },
      { color: "SILVER", url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80" },
      { color: "BEIGE", url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    name: "Wireless Mechanical Keyboard",
    description: "Compact 75% wireless mechanical keyboard with hot-swappable tactile switches, RGB per-key backlighting, and CNC aluminum frame.",
    slug: "wireless-mechanical-keyboard",
    price: 139.0,
    stock: 45,
    category: "Electronics",
    colors: [
      { color: "BLACK", url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80" },
      { color: "WHITE", url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80" },
      { color: "GRAY", url: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  // 7. Footware
  {
    name: "Classic Low Canvas Sneakers",
    description: "Timeless vulcanized rubber sole low-top canvas sneakers featuring reinforced double-stitching and high-traction honeycomb grip.",
    slug: "classic-low-canvas-sneakers",
    price: 65.0,
    stock: 80,
    category: "Footware",
    colors: [
      { color: "WHITE", url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80" },
      { color: "RED", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" },
      { color: "BLACK", url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    name: "Aero Cushion Running Shoes",
    description: "Responsive engineered mesh running trainers with high-rebound nitrogen-infused foam midsole and carbon plate support.",
    slug: "aero-cushion-running-shoes",
    price: 125.0,
    stock: 55,
    category: "Footware",
    colors: [
      { color: "BLUE", url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80" },
      { color: "GRAY", url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" },
      { color: "BLACK", url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  // 8. Headwear
  {
    name: "Vintage Washed Cotton Dad Hat",
    description: "Unstructured 6-panel low-profile curved brim cap in garment-washed breathable cotton twill with brass buckle strap closure.",
    slug: "vintage-washed-cotton-dad-hat",
    price: 26.0,
    stock: 130,
    category: "Headwear",
    colors: [
      { color: "BEIGE", url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80" },
      { color: "NAVY", url: "https://images.unsplash.com/photo-1576850738804-2eb906723302?auto=format&fit=crop&w=800&q=80" },
      { color: "BLACK", url: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    name: "Merino Wool Ribbed Beanie",
    description: "Superfine 100% Australian Merino wool cuffed beanie providing breathable, itch-free warmth and a snug contemporary fit.",
    slug: "merino-wool-ribbed-beanie",
    price: 32.0,
    stock: 95,
    category: "Headwear",
    colors: [
      { color: "ORANGE", url: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80" },
      { color: "GRAY", url: "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?auto=format&fit=crop&w=800&q=80" },
      { color: "BROWN", url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  // 9. Kids
  {
    name: "Kids Explorer Adventure Tee",
    description: "Ultra-soft 100% organic ring-spun cotton everyday play t-shirt with tagless comfort neckline and fade-resistant print.",
    slug: "kids-explorer-adventure-tee",
    price: 22.0,
    stock: 90,
    category: "Kids",
    colors: [
      { color: "YELLOW", url: "https://images.unsplash.com/photo-1519706887233-45f448172f6a?auto=format&fit=crop&w=800&q=80" },
      { color: "PINK", url: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80" },
      { color: "BLUE", url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    name: "Kids Cozy Fleece Pullover",
    description: "Warm and plush sherpa fleece pullover hoodie designed for active kids with reinforced elbows and soft ribbed cuffs.",
    slug: "kids-cozy-fleece-pullover",
    price: 36.0,
    stock: 70,
    category: "Kids",
    colors: [
      { color: "BLUE", url: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80" },
      { color: "RED", url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80" },
      { color: "GREEN", url: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  // 10. Pets
  {
    name: "Artisan Leather Pet Collar",
    description: "Full-grain genuine vegetable-tanned leather dog collar with solid brass hardware, smooth burnished edges, and D-ring attachment.",
    slug: "artisan-leather-pet-collar",
    price: 28.0,
    stock: 65,
    category: "Pets",
    colors: [
      { color: "BROWN", url: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=800&q=80" },
      { color: "TAN", url: "https://images.unsplash.com/photo-1623961980058-9445856939d1?auto=format&fit=crop&w=800&q=80" },
      { color: "RED", url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    name: "Reflective All-Weather Pet Harness",
    description: "No-pull ergonomic chest harness with breathable air-mesh padding, 3M reflective safety piping, and dual leash rings.",
    slug: "reflective-all-weather-pet-harness",
    price: 38.0,
    stock: 50,
    category: "Pets",
    colors: [
      { color: "BLACK", url: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80" },
      { color: "ORANGE", url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80" },
      { color: "BLUE", url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  // 11. Stickers
  {
    name: "Holographic Cyber Drip Sticker Pack",
    description: "Set of 5 heavy-duty die-cut weatherproof vinyl stickers with dynamic rainbow holographic finish for laptops, bottles, and boards.",
    slug: "holographic-cyber-drip-sticker-pack",
    price: 14.0,
    stock: 250,
    category: "Stickers",
    colors: [
      { color: "SILVER", url: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=800&q=80" },
      { color: "PURPLE", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" },
      { color: "BLACK", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    name: "Minimal Geometric Decal Set",
    description: "Matte finish premium waterproof vinyl sticker pack featuring modern architectural and typography badge designs.",
    slug: "minimal-geometric-decal-set",
    price: 12.0,
    stock: 300,
    category: "Stickers",
    colors: [
      { color: "WHITE", url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80" },
      { color: "BLACK", url: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80" },
      { color: "GOLD", url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80" },
    ],
  },
];

async function ensureAllEmbeddings() {
  const products = await prisma.$queryRaw`
    SELECT id, name, category, description
    FROM "Product"
    WHERE embedding IS NULL;
  `;

  if (products.length === 0) {
    console.log("All products already have embeddings!");
    return;
  }


  console.log(`Generating embeddings for ${products.length} remaining products...`);
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const textToEmbed = `${p.name}. ${p.category}. ${p.description || ""}`;
    try {
      const vector = await getEmbeddingWithRetry(textToEmbed);
      const vectorString = `[${vector.join(",")}]`;

      await prisma.$executeRaw`
        UPDATE "Product"
        SET embedding = ${vectorString}::vector
        WHERE id = ${p.id}
      `;
      console.log(`[${i + 1}/${products.length}] ✓ Embedded "${p.name}"`);
      await sleep(1500); // 1.5s delay to stay comfortably within rate limit
    } catch (err) {
      console.error(`[${i + 1}/${products.length}] ✗ Failed to embed "${p.name}":`, err.message);
    }
  }
}

async function seed() {
  console.log("--- Checking / Seeding Database ---");
  const count = await prisma.product.count();

  if (count < productsToSeed.length) {
    console.log(`Found ${count} products. Re-populating complete catalog...`);
    await prisma.cartItem.deleteMany();
    await prisma.productColor.deleteMany();
    await prisma.product.deleteMany();

    for (let i = 0; i < productsToSeed.length; i++) {
      const item = productsToSeed[i];
      console.log(`[${i + 1}/${productsToSeed.length}] Creating product: ${item.name} (${item.category})...`);

      const createdProduct = await prisma.product.create({
        data: {
          name: item.name,
          description: item.description,
          slug: item.slug,
          price: item.price,
          stock: item.stock,
          category: item.category,
          colors: {
            create: item.colors.map((c) => ({
              color: c.color,
              url: c.url,
            })),
          },
        },
      });

      try {
        const textToEmbed = `${item.name}. ${item.category}. ${item.description}`;
        const vector = await getEmbeddingWithRetry(textToEmbed);
        const vectorString = `[${vector.join(",")}]`;

        await prisma.$executeRaw`
          UPDATE "Product"
          SET embedding = ${vectorString}::vector
          WHERE id = ${createdProduct.id}
        `;
        console.log(`   ✓ Vector embedding attached`);
        await sleep(1200);
      } catch (embErr) {
        console.error(`   ✗ Embedding deferred:`, embErr.message);
      }
    }
  }

  // Ensure any missing embeddings are filled
  await ensureAllEmbeddings();

  const finalCount = await prisma.product.count();
  const colorCount = await prisma.productColor.count();
  console.log(`\n🎉 Database ready! Total Products: ${finalCount}, Total Colors: ${colorCount}`);
}

seed()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
