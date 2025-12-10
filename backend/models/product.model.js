import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: { // Stores the URL or path to the main image
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    // 🔥 AI Embedding Vector (512 numbers from CLIP)
    embedding: { 
      type: [Number],
      default: null,
      index: true, 
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;