import mongoose from "mongoose";
const healthMetricHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    weightKg: {
      type: Number,
      required: true
    },
    bmi: {
      type: Number,
      required: true
    },
    sleepGoalHours: {
      type: Number,
      required: true
    },
    recordedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);
const HealthMetricHistory = mongoose.model(
  "HealthMetricHistory",
  healthMetricHistorySchema
);
export default HealthMetricHistory;
