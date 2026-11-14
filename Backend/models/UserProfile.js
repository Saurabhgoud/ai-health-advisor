import mongoose from "mongoose";
const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    age: {
      type: Number,
      min: 1,
      max: 120,
      default: null
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer-not-to-say"],
      default: "prefer-not-to-say"
    },
    heightCm: {
      type: Number,
      min: 50,
      max: 250,
      default: null
    },
    weightKg: {
      type: Number,
      min: 10,
      max: 500,
      default: null
    },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very-active"],
      default: "sedentary"
    },
    fitnessGoal: {
      type: String,
      enum: [
        "weight-loss",
        "weight-gain",
        "maintain-weight",
        "muscle-gain",
        "general-fitness"
      ],
      default: "general-fitness"
    },
    dietPreference: {
      type: String,
      enum: ["vegetarian", "non-vegetarian", "vegan", "eggetarian", "other"],
      default: "vegetarian"
    },
    dailyWaterGoalLitres: {
      type: Number,
      min: 0.5,
      max: 10,
      default: 3
    },
    sleepGoalHours: {
      type: Number,
      min: 1,
      max: 16,
      default: 8
    },
    allergies: {
      type: [String],
      default: []
    },
    medicalConditions: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);
const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
