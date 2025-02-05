import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser()); //allows you to parse the body of the request

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is runnig on http://localhost:", PORT);

  connectDB();
});
