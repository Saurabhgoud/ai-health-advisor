import HealthMetricHistory from "../models/HealthMetricHistory.js";
const getMyHealthHistory = async (req, res) => {
  try {
    const history = await HealthMetricHistory.find({
      user: req.userId
    }).sort({
      recordedAt: 1
    }).limit(30);
    return res.status(200).json({
      success: true,
      history
    });
  } catch (error) {
    console.error("Health history fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch health history"
    });
  }
};
export { getMyHealthHistory };
