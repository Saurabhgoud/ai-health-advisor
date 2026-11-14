import mongoose from "mongoose";
const mealSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    foodName: {
      type: String,
      required: true,
      trim: true
    },
    calories: {
      type: Number,
      required: true,
      min: 0
    },
    protein: {
      type: Number,
      default: 0,
      min: 0
    },
    carbs: {
      type: Number,
      default: 0,
      min: 0
    },
    fats: {
      type: Number,
      default: 0,
      min: 0
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0
    },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack"],
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);
const Meal = mongoose.model("Meal", mealSchema);
export default Meal;
