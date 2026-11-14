import mongoose from "mongoose";
import { searchFoods } from "../config/foodApi.js";
import Meal from "../models/Meal.js";
const isValidNumber = (value) => {
  return value !== "" && value !== null && value !== void 0 && Number.isFinite(Number(value)) && Number(value) >= 0;
};
export const getFoods = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a food name"
      });
    }
    const foods = await searchFoods(query.trim());
    res.status(200).json({
      success: true,
      count: foods.length,
      foods
    });
  } catch (error) {
    console.error("Food Search Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to search foods"
    });
  }
};
export const addMeal = async (req, res) => {
  try {
    const {
      foodName,
      calories,
      protein,
      carbs,
      fats,
      quantity,
      mealType,
      date
    } = req.body;
    if (typeof foodName !== "string" || !foodName.trim() || !isValidNumber(calories) || !mealType) {
      return res.status(400).json({
        success: false,
        message: "Food name, valid calories and meal type are required"
      });
    }
    const nutritionValues = [protein, carbs, fats, quantity];
    if (nutritionValues.some(
      (value) => value !== void 0 && !isValidNumber(value)
    )) {
      return res.status(400).json({
        success: false,
        message: "Nutrition values and quantity must be valid numbers"
      });
    }
    if (quantity !== void 0 && Number(quantity) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than zero"
      });
    }
    const validMealTypes = ["breakfast", "lunch", "dinner", "snack"];
    if (!validMealTypes.includes(mealType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal type"
      });
    }
    if (date !== void 0 && Number.isNaN(Date.parse(date))) {
      return res.status(400).json({
        success: false,
        message: "Invalid date"
      });
    }
    const newMeal = await Meal.create({
      userId: req.userId,
      foodName: foodName.trim(),
      calories: Number(calories),
      protein: protein === void 0 ? 0 : Number(protein),
      carbs: carbs === void 0 ? 0 : Number(carbs),
      fats: fats === void 0 ? 0 : Number(fats),
      quantity: quantity === void 0 ? 1 : Number(quantity),
      mealType,
      ...date !== void 0 && { date }
    });
    res.status(201).json({
      success: true,
      message: "Meal added successfully",
      meal: newMeal
    });
  } catch (error) {
    console.error("Add Meal Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add meal"
    });
  }
};
export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({
      userId: req.userId
    }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: meals.length,
      meals
    });
  } catch (error) {
    console.error("Get Meals Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch meals"
    });
  }
};
export const updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal ID"
      });
    }
    const {
      foodName,
      calories,
      protein,
      carbs,
      fats,
      quantity,
      mealType,
      date
    } = req.body;
    const updateData = {};
    if (foodName !== void 0) {
      if (typeof foodName !== "string" || !foodName.trim()) {
        return res.status(400).json({
          success: false,
          message: "Invalid food name"
        });
      }
      updateData.foodName = foodName.trim();
    }
    const numericFields = {
      calories,
      protein,
      carbs,
      fats,
      quantity
    };
    for (const [field, value] of Object.entries(numericFields)) {
      if (value !== void 0) {
        if (!isValidNumber(value) || field === "quantity" && Number(value) <= 0) {
          return res.status(400).json({
            success: false,
            message: `Invalid ${field} value`
          });
        }
        updateData[field] = Number(value);
      }
    }
    if (mealType !== void 0) {
      const validMealTypes = ["breakfast", "lunch", "dinner", "snack"];
      if (!validMealTypes.includes(mealType)) {
        return res.status(400).json({
          success: false,
          message: "Invalid meal type"
        });
      }
      updateData.mealType = mealType;
    }
    if (date !== void 0) {
      if (Number.isNaN(Date.parse(date))) {
        return res.status(400).json({
          success: false,
          message: "Invalid date"
        });
      }
      updateData.date = date;
    }
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update"
      });
    }
    const updatedMeal = await Meal.findOneAndUpdate(
      {
        _id: id,
        userId: req.userId
      },
      {
        $set: updateData
      },
      {
        new: true,
        runValidators: true
      }
    );
    if (!updatedMeal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      meal: updatedMeal
    });
  } catch (error) {
    console.error("Update Meal Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update meal"
    });
  }
};
export const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal ID"
      });
    }
    const deletedMeal = await Meal.findOneAndDelete({
      _id: id,
      userId: req.userId
    });
    if (!deletedMeal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Meal deleted successfully"
    });
  } catch (error) {
    console.error("Delete Meal Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete meal"
    });
  }
};
