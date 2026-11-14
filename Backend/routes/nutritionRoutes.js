import express from "express";
import {
  getFoods,
  addMeal,
  getMeals,
  updateMeal,
  deleteMeal
} from "../controllers/nutritionController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/search", getFoods);
router.post("/meals", protect, addMeal);
router.get("/meals", protect, getMeals);
router.put("/meals/:id", protect, updateMeal);
router.delete("/meals/:id", protect, deleteMeal);
export default router;
