import { GoogleGenAI } from "@google/genai";
const HEALTH_ADVISOR_INSTRUCTIONS = `
You are an AI Health Advisor.

Follow these rules:

- Give only general health, nutrition, fitness and wellness guidance.
- Do not diagnose any disease.
- Do not prescribe medicines.
- Do not tell the user to stop or change prescribed medicine.
- Do not recommend crash diets or dangerous exercises.
- Respect the user's allergies and medical conditions.
- If the user describes a medical emergency, advise them to contact local emergency services immediately.
- Reply in simple, professional English.
- Keep the answer practical and easy to understand.
- Mention that AI advice is not a replacement for a qualified doctor.
`;
let aiClient = null;
const getGeminiClient = () => {
  if (!process.env.GEMINI_API_KEY?.trim()) {
    throw new Error(
      "GEMINI_API_KEY is not set. Please add it to the Backend/.env file."
    );
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({});
  }
  return aiClient;
};
const askGemini = async (prompt) => {
  if (!prompt?.trim()) {
    throw new Error("Prompt is empty. Please provide a valid prompt.");
  }
  const ai = getGeminiClient();
  const interaction = await ai.interactions.create({
    model: process.env.GEMINI_MODEL?.trim() || "gemini-3.7-flash",
    input: prompt.trim(),
    system_instruction: HEALTH_ADVISOR_INSTRUCTIONS,
    store: false,
    generation_config: {
      temperature: 0.4
    }
  });
  const answer = interaction.output_text?.trim();
  if (!answer) {
    throw new Error("Gemini returned an empty response. Please try again.");
  }
  return answer;
};
export { askGemini };
