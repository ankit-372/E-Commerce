<img width="2045" height="1086" alt="image" src="https://github.com/user-attachments/assets/8aa216ff-5c1f-4596-8e71-55bba2accf5b" />
<img width="2103" height="1127" alt="image" src="https://github.com/user-attachments/assets/c8827127-73e3-4aa0-92a6-5ae5b465154f" />
<img width="2103" height="1131" alt="image" src="https://github.com/user-attachments/assets/f3940800-2e75-4cf2-a13b-9b0fea02acea" />
<img width="2102" height="1122" alt="image" src="https://github.com/user-attachments/assets/6cf28fb8-0af0-4da0-9276-a457d17438d9" />
<img width="2107" height="1146" alt="image" src="https://github.com/user-attachments/assets/6898f93b-68ff-4eb6-9fd5-16ef72ee9064" />
<img width="2833" height="1453" alt="image" src="https://github.com/user-attachments/assets/b5286809-094c-47b6-bfe3-527022a458e9" />
<img width="2831" height="1449" alt="image" src="https://github.com/user-attachments/assets/46950457-5844-4bc4-8ef9-ec0db18177f6" />
<img width="2114" height="1134" alt="image" src="https://github.com/user-attachments/assets/303cc674-dcfd-41db-8cc8-dab2ff718a91" />
<img width="2106" height="1137" alt="image" src="https://github.com/user-attachments/assets/18653c08-9002-4c24-a997-0d82f546690f" />
<img width="2117" height="1098" alt="image" src="https://github.com/user-attachments/assets/a78bb6b6-4ed3-4636-8eea-8cd565adcbbf" />
<img width="2106" height="1125" alt="image" src="https://github.com/user-attachments/assets/0ceb2cc3-611f-48d2-a032-ba3ad037b4ac" />
<img width="2104" height="1137" alt="image" src="https://github.com/user-attachments/assets/9f2d45f0-bc6c-4c15-b466-73847082eff9" />
<img width="2114" height="1132" alt="image" src="https://github.com/user-attachments/assets/cea7d733-0c28-4fac-aaff-268cb948a02c" />
<img width="2107" height="1136" alt="image" src="https://github.com/user-attachments/assets/ed3baf84-3ffb-4938-ae95-fad3182a6bb2" />
<img width="2107" height="1104" alt="image" src="https://github.com/user-attachments/assets/f4897dad-cbb2-4493-9c9c-343d6b9b24a2" />

# 🛍️ AI-Powered MERN E-Commerce Store

A full-stack E-Commerce application featuring a **Visual Search Engine** and **AI Content Generation**. This system uses a "Dual AI" approach: **Vector Similarity** to find products by image, and **Generative AI** to automate content creation for admins.

The core visual search processing happens entirely **locally** on the server using ONNX models, while text generation utilizes Google's Gemini API.

-----

## 🚀 Key Features

  * **🛒 Full E-Commerce Functionality:** Browse products, cart management, and checkout.
  * **🔍 AI Visual Search:** Upload an image to find visually similar products (powered by local CLIP models).
  * **✍️ AI Product Writer:** Auto-generate compelling product titles and descriptions in the Admin Dashboard using **Google Gemini**.
  * **⚡ Local Inference:** Runs state-of-the-art vision models directly in Node.js without Python.
  * **🖼️ High-Performance Image Processing:** Automatic resizing and tensor conversion using C++ bindings.

-----

## 🛠️ Technology Stack

  * **Frontend:** React, Tailwind CSS, Vite
  * **Backend:** Node.js, Express
  * **Database:** MongoDB (with Vector Search ready schemas)
  * **AI & Processing:**
      * **@xenova/transformers:** Runs the CLIP vision model locally.
      * **Google Gemini API:** Generative AI for text content.
      * **Sharp:** High-speed image processing (C++ based).
      * **ONNX Runtime:** Executes neural networks efficiently on CPU.

-----

## 🧠 Technical Deep Dive: The Dual AI Architecture

This project implements two distinct types of Artificial Intelligence:

### 1\. Visual Search Engine (Discriminative AI)

  * **Goal:** To understand *what* an image looks like.
  * **Engine:** We use the **CLIP (Contrastive Language-Image Pretraining)** model locally via `@xenova/transformers`.
  * **Process:**
    1.  **Preprocessing:** **Sharp** decodes and resizes the user's uploaded image to `224x224px`.
    2.  **Vectorization:** The CLIP model converts the pixel data into a **512-dimensional vector embedding**.
    3.  **Search:** The system performs a **Cosine Similarity** search against the database to rank products by visual similarity.

### 2\. Smart Admin Dashboard (Generative AI)

  * **Goal:** To create high-quality marketing copy from raw data.
  * **Engine:** **Google Gemini Pro** model.
  * **Workflow:**
    1.  Admin provides basic details (e.g., "Red leather bag, luxury").
    2.  The backend constructs a structured prompt.
    3.  Gemini returns a polished, SEO-friendly product description and catchy title, streamlining the inventory management process.

-----

## ⚠️ Important: System Requirements (Windows Users)

This project relies on **Native Modules** (C++ binaries) for image processing speed.

**If you encounter `ERR_DLOPEN_FAILED`:**
This means your system is missing the C++ dictionaries needed to run `sharp`.

**The Fix:**

1.  Download the **Visual C++ Redistributable** (x64 version).
2.  [Official Microsoft Download Link](https://www.google.com/search?q=https://aka.ms/vs/17/release/vc_redist.x64.exe)
3.  Install and **Restart your computer**.

-----











