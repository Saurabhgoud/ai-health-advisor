import express from "express";
import {
  addWaterIntake,
  getTodayWaterIntake,
  deleteWaterIntake
} from "../controllers/waterController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
router.use(protect);
router.post("/", addWaterIntake);
router.get("/", getTodayWaterIntake);
router.delete("/:id", deleteWaterIntake);
export default router;
