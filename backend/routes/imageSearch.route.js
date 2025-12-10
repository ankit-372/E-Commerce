import express from "express";
import multer from "multer";
import { imageSearch } from "../controllers/imageSearch.controller.js";

const router = express.Router();
const upload = multer(); // <-- memory storage, needed for file.buffer

router.post("/image-search", upload.single("image"), imageSearch);

export default router;
