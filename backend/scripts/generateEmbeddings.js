import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { getClipEmbedding } from "../lib/clip.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend folder
dotenv.config({ path: path.join(__dirname, "../.env") });

async function generate() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    const products = await Product.find();
    console.log(`Found ${products.length} products`);

    for (const p of products) {
      try {
        console.log("Generating embedding for:", p.name);

        // 🔥 Download image from URL
        const response = await fetch(p.image);
        const arrayBuffer = await response.arrayBuffer();

        // 🔥 FIX: Convert ArrayBuffer → Uint8Array (VALID input for CLIP)
        const imageData = new Uint8Array(arrayBuffer);

        // 🔥 Generate CLIP embedding
        const embedding = await getClipEmbedding(imageData);

        // Save to DB
        p.embedding = embedding;
        await p.save();

        console.log(`✓ Saved embedding for: ${p.name}`);
      } catch (err) {
        console.log(`✗ Failed embedding for ${p.name}:`, err.message);
      }
    }

    console.log("🔥 Embedding generation completed!");
    process.exit(0);
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
}

generate();
