// Express router exposing three endpoints:
// POST /api/ai/tests         -> create test (topics, numQuestions)
// GET  /api/ai/tests/:id/question?idx=0 -> get question by index
// POST /api/ai/tests/:id/submit -> submit an answer (questionIdx, selectedIndex, userId)

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import makeId from '../utils/id.js';
import { saveTest, getTest, updateTest } from '../store/testStore.js';
import { generateQuestionWithRAG, generateIntelligentAptitudeQuestions } from '../rag/generateQuestion.js';
import { getChunksOutputPath, checkReferenceBookExists, getReferenceBookPath } from '../config/bookConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Load chunks from the configured path
let globalChunks = [];
const CHUNKS_PATH = getChunksOutputPath();

// Check if reference book exists and chunks are available
if (!checkReferenceBookExists()) {
  console.warn('⚠️ Reference book not found at:', getReferenceBookPath());
  console.warn('Please run "npm run process-book" to process the reference book.');
}

if (fs.existsSync(CHUNKS_PATH)) {
  try { 
    globalChunks = JSON.parse(fs.readFileSync(CHUNKS_PATH, 'utf8')); 
    console.log(`✅ Loaded ${globalChunks.length} chunks from reference book`);
  } catch(e){ 
    console.error('❌ Error loading chunks:', e.message);
    globalChunks = []; 
  }
} else {
  console.warn('⚠️ Chunks file not found. Please run "npm run process-book" to generate chunks.');
}

// POST /api/ai/tests
router.post('/tests', async (req, res) => {
  try {
    const { 
      topics = [], 
      numQuestions = 5, 
      difficulty = 'medium',
      questionTypes = ['mixed'] // Array of question types
    } = req.body;
    
    if (!topics.length) return res.status(400).json({ error: 'Provide at least one topic in topics[]' });

    const testId = makeId();
    const questions = [];

    // round-robin topics and question types until we have numQuestions
    let tIdx = 0;
    let typeIdx = 0;
    
    while (questions.length < numQuestions) {
      const topic = topics[tIdx % topics.length];
      const questionType = questionTypes[typeIdx % questionTypes.length];
      
      // generate an aptitude question using RAG
      const q = await generateQuestionWithRAG(topic, globalChunks, difficulty, questionType);
      questions.push({ 
        id: `${testId}-q${questions.length+1}`, 
        topic, 
        questionType,
        ...q 
      });
      
      tIdx++;
      typeIdx++;
      // safety: break if stuck
      if (tIdx > topics.length * numQuestions * 2) break;
    }

    const test = { 
      id: testId, 
      topics, 
      questionTypes,
      questions, 
      createdAt: Date.now(), 
      responses: {},
      testType: 'aptitude'
    };
    saveTest(test);
    res.json({ 
      testId, 
      numQuestions: questions.length,
      questionTypes,
      testType: 'aptitude'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create aptitude test' });
  }
});

// GET question by index
router.get('/tests/:id/question', (req, res) => {
  try {
    const test = getTest(req.params.id);
    if (!test) return res.status(404).json({ error: 'Test not found' });
    const idx = parseInt(req.query.idx || '0', 10);
    if (isNaN(idx) || idx < 0 || idx >= test.questions.length) return res.status(400).json({ error: 'Invalid index' });

    const q = test.questions[idx];
    // do not send correct answer key
    const { answer, ...publicQ } = q;
    return res.json({ questionIndex: idx, question: publicQ });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

// POST submit an answer
router.post('/tests/:id/submit', (req, res) => {
  try {
    const test = getTest(req.params.id);
    if (!test) return res.status(404).json({ error: 'Test not found' });
    const { userId = 'anon', questionIndex, selectedIndex } = req.body;
    if (typeof questionIndex !== 'number') return res.status(400).json({ error: 'questionIndex required' });
    const q = test.questions[questionIndex];
    if (!q) return res.status(400).json({ error: 'question not found' });

    const correct = q.answer === selectedIndex ? 1 : 0;
    // record response
    if (!test.responses[userId]) test.responses[userId] = [];
    test.responses[userId].push({ questionId: q.id, questionIndex, selectedIndex, correct, timestamp: Date.now() });

    updateTest(test.id, test);
    return res.json({ correct, explanation: q.explanation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

// POST /api/ai/random-aptitude-questions - Generate completely random aptitude questions
router.post('/random-aptitude-questions', async (req, res) => {
  try {
    const { 
      numQuestions = 5, 
      difficulty = 'medium',
      questionTypes = ['verbal', 'quantitative', 'logical', 'analytical'] // Mix of aptitude types
    } = req.body;
    
    if (globalChunks.length === 0) {
      return res.status(400).json({ 
        error: 'No chunks available. Please run "npm run process-book" first.' 
      });
    }

    const questions = [];
    
    // Generate random aptitude questions from random chunks
    for (let i = 0; i < numQuestions; i++) {
      // Pick a random chunk
      const randomChunk = globalChunks[Math.floor(Math.random() * globalChunks.length)];
      
      // Extract a random topic/keyword from the chunk
      const words = randomChunk.text.toLowerCase().split(/\s+/)
        .filter(word => word.length > 4 && !['this', 'that', 'with', 'from', 'they', 'have', 'been', 'were', 'said', 'each', 'which', 'their', 'time', 'will', 'about', 'would', 'there', 'could', 'other'].includes(word));
      
      const randomTopic = words[Math.floor(Math.random() * words.length)] || 'reasoning';
      
      // Pick a random aptitude question type
      const randomQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      // Generate aptitude question using RAG
      const q = await generateQuestionWithRAG(randomTopic, globalChunks, difficulty, randomQuestionType);
      questions.push({ 
        id: `aptitude-${Date.now()}-${i}`, 
        topic: randomTopic, 
        questionType: randomQuestionType,
        sourceChunk: randomChunk.id,
        ...q 
      });
    }

    res.json({ 
      questions,
      totalQuestions: questions.length,
      difficulty,
      questionTypes,
      testType: 'aptitude',
      generatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate random aptitude questions' });
  }
});

// POST /api/ai/intelligent-aptitude-test - Generate intelligent aptitude test using content analysis
router.post('/intelligent-aptitude-test', async (req, res) => {
  try {
    const { 
      numQuestions = 5, 
      difficulty = 'medium',
      analyzeContent = true 
    } = req.body;
    
    if (globalChunks.length === 0) {
      return res.status(400).json({ 
        error: 'No chunks available. Please run "npm run process-book" first.' 
      });
    }

    console.log('🧠 Generating intelligent aptitude test...');
    
    // Use the intelligent question generation system
    const result = await generateIntelligentAptitudeQuestions(
      globalChunks, 
      numQuestions, 
      difficulty
    );

    // Create test record
    const testId = makeId();
    const test = {
      id: testId,
      questions: result.questions,
      createdAt: Date.now(),
      responses: {},
      testType: 'intelligent_aptitude',
      contentAnalysis: analyzeContent ? result.contentReport : null,
      metadata: result.metadata
    };
    
    saveTest(test);

    res.json({
      testId,
      questions: result.questions,
      totalQuestions: result.questions.length,
      difficulty,
      testType: 'intelligent_aptitude',
      contentAnalysis: analyzeContent ? {
        topics: result.contentReport.summary.totalTopics,
        concepts: result.contentReport.summary.totalConcepts,
        questionTypes: result.contentReport.summary.totalQuestionTypes,
        recommendations: result.contentReport.recommendations
      } : null,
      metadata: result.metadata
    });
  } catch (err) {
    console.error('Intelligent test generation error:', err);
    res.status(500).json({ error: 'Failed to generate intelligent aptitude test' });
  }
});

// POST /api/ai/google-ai-test - Generate aptitude test using Google AI
router.post('/google-ai-test', async (req, res) => {
  try {
    const { 
      numQuestions = 5, 
      difficulty = 'medium',
      useGoogleAI = true 
    } = req.body;
    
    if (globalChunks.length === 0) {
      return res.status(400).json({ 
        error: 'No chunks available. Please run "npm run create-content" first.' 
      });
    }

    console.log('🤖 Generating Google AI-powered aptitude test...');
    
    // Use the Google AI-powered question generation
    const result = await generateIntelligentAptitudeQuestions(
      globalChunks, 
      numQuestions, 
      difficulty
    );

    // Create test record
    const testId = makeId();
    const test = {
      id: testId,
      questions: result.questions,
      createdAt: Date.now(),
      responses: {},
      testType: 'google_ai_aptitude',
      contentAnalysis: result.contentReport,
      metadata: result.metadata
    };
    
    saveTest(test);

    res.json({
      testId,
      questions: result.questions,
      totalQuestions: result.questions.length,
      difficulty,
      testType: 'google_ai_aptitude',
      googleAI: true,
      contentAnalysis: {
        topics: result.contentReport.summary.totalTopics,
        concepts: result.contentReport.summary.totalConcepts,
        questionTypes: result.contentReport.summary.totalQuestionTypes,
        aiAnalyzed: result.contentReport.summary.aiAnalyzed,
        recommendations: result.contentReport.recommendations
      },
      metadata: result.metadata
    });
  } catch (err) {
    console.error('Google AI test generation error:', err);
    res.status(500).json({ error: 'Failed to generate Google AI aptitude test' });
  }
});

// GET /api/ai/content-analysis - Get content analysis of the reference book
router.get('/content-analysis', async (req, res) => {
  try {
    if (globalChunks.length === 0) {
      return res.status(400).json({ 
        error: 'No chunks available. Please run "npm run process-book" first.' 
      });
    }

    // Import Google AI ContentAnalyzer
    const GoogleAIContentAnalyzer = (await import('../analysis/googleAIContentAnalyzer.js')).default;
    const analyzer = new GoogleAIContentAnalyzer();
    
    // Analyze content using Google AI
    const contentReport = await analyzer.analyzeContentWithAI(globalChunks);
    
    res.json({
      analysis: contentReport,
      totalChunks: globalChunks.length,
      analyzedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Content analysis error:', err);
    res.status(500).json({ error: 'Failed to analyze content' });
  }
});

export default router;
