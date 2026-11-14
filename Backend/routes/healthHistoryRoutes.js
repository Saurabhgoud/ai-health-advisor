import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getMyHealthHistory } from "../controllers/healthHistoryController.js";
const router = express.Router();
router.get("/", protect, getMyHealthHistory);
export default router;
