import express from "express";
import getHealthReport from "../controllers/healthReportController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", protect, getHealthReport);
export default router;
