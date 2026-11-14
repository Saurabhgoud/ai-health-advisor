import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import healthHistoryRoutes from "./routes/healthHistoryRoutes.js";
import aiAdvisorRoutes from "./routes/aiAdvisorRoutes.js";
import healthReportRoutes from "./routes/healthReportRoutes.js";
import waterTrackerRoutes from "./routes/waterTrackerRoutes.js";
import nutritionRoutes from "./routes/nutritionRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "ai-health-advisor" });
});
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/health-history", healthHistoryRoutes);
app.use("/api/ai-advisor", aiAdvisorRoutes);
app.use("/api/health-report", healthReportRoutes);
app.use("/api/water", waterTrackerRoutes);
app.use("/api/nutrition", nutritionRoutes);
export default app;
