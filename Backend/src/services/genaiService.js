import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_CLOUD_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generationConfig = {
  maxOutputTokens: 1024,
  temperature: 0.7,
  topP: 0.95,
};

export async function generateAIResponse(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
}
