// backend/routes/ai.route.js

import express from "express";
import { generateDescription } from "../controllers/ai.controller.js";
// Assuming you have these middleware functions for authentication and authorization
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/ai/generate-description
// This route is protected and only accessible by users with 'admin' privileges
router.post(
    "/generate-description", 
    protectRoute, 
    adminRoute, 
    generateDescription
);

export default router;