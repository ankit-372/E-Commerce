// backend/controllers/imageSearch.controller.js

import Product from "../models/product.model.js";
import { getClipEmbedding } from "../lib/clip.js";

// Helper function to compute Cosine Similarity (Vector comparison)
const similarity = (a, b) => {
  if (a.length !== b.length) return 0;
  
  // Dot Product
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  
  // Magnitudes
  const magA = Math.sqrt(a.reduce((s, val) => s + val ** 2, 0));
  const magB = Math.sqrt(b.reduce((s, val) => s + val ** 2, 0));
  
  if (magA === 0 || magB === 0) return 0;

  return dot / (magA * magB);
};

export const imageSearch = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No image uploaded" });

    // 1. Get embedding of uploaded query image
    // file.buffer comes from multer memory storage
    
    const queryVector = await getClipEmbedding(file.buffer);

    // 2. Fetch all products with stored embeddings
    // NOTE: This will be slow for large catalogs! (Switch to MongoDB Vector Search for production)
    const products = await Product.find({ embedding: { $exists: true, $ne: null } }).lean();

    // 3. Compute similarity and prepare results
    // ... inside imageSearch function ...

    // ... inside the .map() function ...

      const results = products
        .map((p) => {
          if (!p.embedding || p.embedding.length !== queryVector.length) {
              return null;
          }
          
          const score = similarity(queryVector, p.embedding);
          
          // Debug logs to see the math in action
          console.log(`Product: ${p.name} | Score: ${score}`);

          // UPDATED THRESHOLD:
          // Since random items score ~0.88, we only want items > 0.90
          if (score < 0.90) return null; 

          return {
            product: p,
            score: score,
          };
        })
        .filter(r => r !== null) 
        .sort((a, b) => b.score - a.score) 
        .slice(0, 10);

    res.json({ success: true, results });
  } catch (err) {
    console.error("Image search error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};