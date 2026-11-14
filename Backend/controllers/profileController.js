import HealthMetricHistory from "../models/HealthMetricHistory.js";
import UserProfile from "../models/UserProfile.js";
const saveMyProfile = async (req, res) => {
  try {
    console.log("Profile request received");
    console.log("Logged-in user ID:", req.userId);
    console.log("Profile request body:", req.body);
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in the token"
      });
    }
    const {
      age,
      gender,
      heightCm,
      weightKg,
      activityLevel,
      fitnessGoal,
      dietPreference,
      dailyWaterGoalLitres,
      sleepGoalHours,
      allergies,
      medicalConditions
    } = req.body;
    if (!age || !heightCm || !weightKg) {
      return res.status(400).json({
        success: false,
        message: "Age, height and weight are required"
      });
    }
    const profile = await UserProfile.findOneAndUpdate(
      {
        user: req.userId
      },
      {
        $set: {
          age,
          gender,
          heightCm,
          weightKg,
          activityLevel,
          fitnessGoal,
          dietPreference,
          dailyWaterGoalLitres,
          sleepGoalHours,
          allergies: Array.isArray(allergies) ? allergies : [],
          medicalConditions: Array.isArray(medicalConditions) ? medicalConditions : []
        },
        $setOnInsert: {
          user: req.userId
        }
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );
    console.log("Saved profile:", profile);
    const heightInMetres = profile.heightCm / 100;
    const bmi = Number(
      (profile.weightKg / (heightInMetres * heightInMetres)).toFixed(1)
    );
    await HealthMetricHistory.create({
      user: req.userId,
      weightKg: profile.weightKg,
      bmi,
      sleepGoalHours: profile.sleepGoalHours,
      recordedAt: new Date()
    });
    console.log("Health history saved:", {
      weightKg: profile.weightKg,
      bmi,
      sleepGoalHours: profile.sleepGoalHours
    });
    return res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      profile,
      bmi
    });
  } catch (error) {
    console.error("Save profile error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)[0]?.message || "Invalid profile data"
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to save profile"
    });
  }
};
const getMyProfile = async (req, res) => {
  try {
    console.log("Fetching profile for user:", req.userId);
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in the token"
      });
    }
    const profile = await UserProfile.findOne({
      user: req.userId
    }).populate("user", "name email");
    if (!profile) {
      return res.status(200).json({
        success: true,
        message: "Profile not created yet",
        profile: null
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      profile
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch profile"
    });
  }
};
export { saveMyProfile, getMyProfile };
