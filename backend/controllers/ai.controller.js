// backend/controllers/ai.controller.js

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini client. 
// We explicitly set the apiEndpoint to 'v1' to ensure compatibility with the
// latest model names and the @google/generative-ai SDK.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  apiEndpoint: "https://generativelanguage.googleapis.com/v1"
});

/**
 * Generates an SEO-friendly product description using the Gemini API.
 */
export const generateDescription = async (req, res) => {
  try {
    // 1. Get product details from the request body (sent by the frontend)
    const { title, specs } = req.body;

    // 2. Construct the detailed, structured prompt for the AI
    const prompt = `
Generate a short, crisp, high-conversion product description for an ecommerce website.
Keep everything minimal, clean, and easy to read. Avoid long paragraphs.

Product Name: ${title}
Specifications: ${specs}

Return exactly in this format (markdown):

- 1 line only. Very crisp. Focus on the main benefit.

- 1–2 short sentences max. No storytelling. No fluff.

* 3 bullet points only.
* Each bullet must be short (4–8 words).
* Focus on benefits, not long explanations.
`;


    // 3. Select the model. Using 'models/gemini-2.5-flash' for speed and capability.
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash" 
    });

    // 4. Call the Gemini API to generate content
    const result = await model.generateContent(prompt);

    // 5. Extract the generated text from the response
    const output = result.response.text();

    // 6. Send the generated description back to the frontend
    res.json({ success: true, description: output });
  } catch (error) {
    // Log the full error to the console for debugging
    console.error("Gemini AI Error:", error);
    
    // Send a user-friendly error response
    res.status(500).json({ 
      success: false, 
      error: "AI failed to generate description. Please check the server logs." 
    });
  }
};