import mongoose from "mongoose";
const waterIntakeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amountMl: {
      type: Number,
      required: true,
      min: 1
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
const WaterIntake = mongoose.model("WaterIntake", waterIntakeSchema);
export default WaterIntake;
