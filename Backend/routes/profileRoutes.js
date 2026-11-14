import express from "express";
import {
  saveMyProfile,
  getMyProfile
} from "../controllers/profileController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/me", protect, getMyProfile);
router.put("/me", protect, saveMyProfile);
export default router;
