import express from "express";
import { chatWithAdvisor } from "../controllers/aiAdvisorController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/chat", protect, chatWithAdvisor);
export default router;
