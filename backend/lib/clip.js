import { AutoProcessor, CLIPVisionModelWithProjection, RawImage } from "@xenova/transformers";
import sharp from "sharp";

// We separate the processor and the model variables
let processor = null;
let vision_model = null;

export const initializeClip = async () => {
  if (!vision_model) {
    console.log("Initializing CLIP Vision Model...");
    
    // 1. Load the Processor (handles image resizing/normalization)
    processor = await AutoProcessor.from_pretrained("Xenova/clip-vit-base-patch32");
    
    // 2. Load the Vision Model (handles the actual embedding generation)
    // We use 'WithProjection' to map it to the same space as text
    vision_model = await CLIPVisionModelWithProjection.from_pretrained("Xenova/clip-vit-base-patch32");
    
    console.log("✅ CLIP Vision Model ready!");
  }
};

export const getClipEmbedding = async (imageBuffer) => {
  try {
    if (!vision_model) {
      await initializeClip();
    }

    // 1. Convert image to raw RGB (3 channels) using Sharp
    const { data, info } = await sharp(imageBuffer)
      .ensureAlpha() // Ensure alpha channel exists so we can remove it consistently
      .removeAlpha() // Remove alpha to get exactly 3 channels (RGB)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // 2. Create the RawImage object
    const rawImage = new RawImage(new Uint8Array(data), info.width, info.height, 3);

    // 3. Process the image
    // This converts the raw pixels into the math tensors the model needs
    const image_inputs = await processor(rawImage);

    // 4. Run the Vision Model
    const { image_embeds } = await vision_model(image_inputs);

    // 5. Return the embedding as a standard array
    return Array.from(image_embeds.data);

  } catch (err) {
    console.error("❌ CLIP Image Embedding Error:", err);
    throw err;
  }
};