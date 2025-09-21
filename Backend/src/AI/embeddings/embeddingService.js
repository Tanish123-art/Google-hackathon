// Google Cloud AI integration for embeddings and question generation
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateAIResponse } from '../../services/genaiService.js';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_CLOUD_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generationConfig = {
  maxOutputTokens: 2048,
  temperature: 0.7,
  topP: 0.95,
};

/**
 * Generate embeddings using Google AI (text-based similarity for now)
 * Note: Google's Gemini doesn't have direct embedding API, so we use text similarity
 */
async function getEmbedding(text) {
  try {
    // For now, we'll use a text-based approach since Gemini doesn't have embeddings
    // This creates a semantic fingerprint based on text content
    const prompt = `Analyze this text and provide a semantic summary for similarity matching: "${text.slice(0, 500)}"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    
    // Convert summary to a numerical vector for similarity
    const words = summary.toLowerCase().split(/\s+/);
    const vector = new Array(128).fill(0);
    
    words.forEach((word, index) => {
      const hash = word.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      vector[index % 128] += Math.abs(hash) % 100 / 100;
    });
    
    return vector;
  } catch (error) {
    console.error('Error generating embedding:', error);
    // Fallback to simple hash-based embedding
    const len = Math.min(128, Math.max(64, Math.floor(text.length / 10) + 64));
    const emb = new Array(len).fill(0).map((_, i) => ((text.charCodeAt(i % text.length) || 31) % 100) / 100);
    return emb;
  }
}

/**
 * Generate aptitude questions using Google Cloud AI (Gemini)
 * This replaces the mock implementation with real AI generation
 */
async function callGenAI(prompt, options = {}) {
  try {
    console.log('🤖 Generating question with Google AI...');
    
    // Enhanced prompt for better aptitude question generation
    const enhancedPrompt = `${prompt}

IMPORTANT INSTRUCTIONS:
- Generate ONLY valid JSON output
- Ensure the question tests reasoning ability, not memorization
- Make options plausible but clearly distinguishable
- Provide detailed explanation for the correct answer
- Focus on aptitude testing principles

Return ONLY the JSON object, no additional text.`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: enhancedPrompt }] }],
      generationConfig: {
        ...generationConfig,
        temperature: options.difficulty === 'hard' ? 0.8 : 
                    options.difficulty === 'easy' ? 0.5 : 0.7
      }
    });

    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Google AI response received');
    return text;
    
  } catch (error) {
    console.error('Error calling Google AI:', error);
    
    // Fallback to mock response if Google AI fails
    const fallbackQuestion = {
      question: `Based on the provided context, which of the following best demonstrates ${options.questionType || 'analytical'} reasoning?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 1,
      explanation: 'This question tests reasoning ability based on the provided context. Please check your Google AI configuration.',
      difficulty: options.difficulty || 'medium',
      questionType: options.questionType || 'analytical',
      reasoningType: options.questionType || 'analytical',
      sources: options.sources || [],
      fallback: true
    };
    
    return JSON.stringify(fallbackQuestion);
  }
}

export { getEmbedding, callGenAI };
