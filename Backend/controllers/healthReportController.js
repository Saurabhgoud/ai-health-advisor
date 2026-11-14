import HealthMetricHistory from "../models/HealthMetricHistory.js";
const getHealthReport = async (req, res) => {
  try {
    const records = await HealthMetricHistory.find({
      user: req.userId
    }).sort({
      recordedAt: -1
    });
    return res.status(200).json({
      success: true,
      totalRecords: records.length,
      records
    });
  } catch (error) {
    console.error("Health Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not fetch the health report"
    });
  }
};
export default getHealthReport;
