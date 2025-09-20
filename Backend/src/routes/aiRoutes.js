import express from 'express';
import { generateAIResponse } from '../services/genaiService.js';

const router = express.Router();

// POST /api/ai/ask
router.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await generateAIResponse(prompt);
    res.json({ response });
  } catch (err) {
    console.error('AI Error:', err);
    res.status(500).json({ 
      error: 'Something went wrong',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export default router;
