// backend/server.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import { initializeClip } from "./lib/clip.js";

import { connectDB } from "./lib/db.js";

import aiRoutes from "./routes/ai.route.js";
import imageSearchRoutes from "./routes/imageSearch.route.js";

await initializeClip();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Register API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ai", imageSearchRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

async function startServer() {
	try {
		await connectDB();
		console.log("Database connected successfully.");

		app.listen(PORT, () => {
			console.log(`🚀 Server is running on http://localhost:${PORT}`);
		});

	} catch (error) {
		console.error("🔴 Fatal error during server startup:", error);
		process.exit(1);
	}
}

startServer();
