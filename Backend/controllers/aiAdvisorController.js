import UserProfile from "../models/UserProfile.js";
import { askGemini } from "../services/geminiService.js";
const buildProfileContext = (profile) => {
  if (!profile) {
    return "User has not completed their health profile.";
  }
  const allergies = profile.allergies?.length > 0 ? profile.allergies.join(", ") : "None reported";
  const medicalConditions = profile.medicalConditions?.length > 0 ? profile.medicalConditions.join(", ") : "None reported";
  return `
Age: ${profile.age ?? "Not provided"}
Gender: ${profile.gender ?? "Not provided"}
Height: ${profile.heightCm ?? "Not provided"} cm
Weight: ${profile.weightKg ?? "Not provided"} kg
Activity level: ${profile.activityLevel ?? "Not provided"}
Fitness goal: ${profile.fitnessGoal ?? "Not provided"}
Diet preference: ${profile.dietPreference ?? "Not provided"}
Daily water goal: ${profile.dailyWaterGoalLitres ?? "Not provided"} litres
Sleep goal: ${profile.sleepGoalHours ?? "Not provided"} hours
Allergies: ${allergies}
Medical conditions: ${medicalConditions}
  `.trim();
};
const chatWithAdvisor = async (req, res) => {
  try {
    const message = req.body?.message?.trim();
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Please enter a health question."
      });
    }
    if (message.length > 1e3) {
      return res.status(400).json({
        success: false,
        message: "Question must be under 1000 characters."
      });
    }
    const profile = await UserProfile.findOne({
      user: req.userId
    }).lean();
    const profileContext = buildProfileContext(profile);
    const prompt = `
Logged-in user's health profile:

${profileContext}

User's current question:

${message}

Answer the user's current question according to their health profile.

If any required information is missing, clearly mention it.
Do not assume missing health information.
    `.trim();
    const answer = await askGemini(prompt);
    return res.status(200).json({
      success: true,
      message: "AI response generated successfully.",
      reply: answer,
      profileComplete: Boolean(profile)
    });
  } catch (error) {
    const errorStatus = error?.statusCode || error?.status;
    if (errorStatus === 429) {
      const retryMatch = error?.message?.match(/retry in ([\d.]+)s/i);
      const retrySeconds = retryMatch ? Math.ceil(Number(retryMatch[1])) : 60;
      console.warn(
        `Gemini rate limit reached. Retry in ${retrySeconds} seconds.`
      );
      return res.status(429).json({
        success: false,
        message: `Gemini's free request limit has been exceeded. Please try again after ${retrySeconds} seconds.`,
        retryAfter: retrySeconds
      });
    }
    if (error?.message?.includes("GEMINI_API_KEY")) {
      console.error("Gemini configuration error:", error.message);
      return res.status(503).json({
        success: false,
        message: "The service is not configured. Check GEMINI_API_KEY."
      });
    }
    console.error("AI Advisor error:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "The advisor could not generate a response. Please try again."
    });
  }
};
export { chatWithAdvisor };
