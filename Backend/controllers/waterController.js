import WaterIntake from "../models/WaterIntake.js";
export const addWaterIntake = async (req, res) => {
  try {
    const { amountMl } = req.body;
    if (!amountMl || Number(amountMl) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid water amount."
      });
    }
    const waterEntry = await WaterIntake.create({
      user: req.userId,
      amountMl: Number(amountMl),
      recordedAt: new Date()
    });
    return res.status(201).json({
      success: true,
      message: "Water intake saved successfully.",
      waterEntry
    });
  } catch (error) {
    console.error("Add Water Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save water intake."
    });
  }
};
export const getTodayWaterIntake = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const entries = await WaterIntake.find({
      user: req.userId,
      recordedAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).sort({ recordedAt: -1 });
    const totalWater = entries.reduce(
      (total, entry) => total + entry.amountMl,
      0
    );
    return res.status(200).json({
      success: true,
      count: entries.length,
      totalWater,
      entries
    });
  } catch (error) {
    console.error("Get Water History Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch water history."
    });
  }
};
export const deleteWaterIntake = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await WaterIntake.findOneAndDelete({
      _id: id,
      user: req.userId
    });
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Water entry not found."
      });
    }
    return res.status(200).json({
      success: true,
      message: "Water entry deleted successfully."
    });
  } catch (error) {
    console.error("Delete Water Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete water entry."
    });
  }
};
