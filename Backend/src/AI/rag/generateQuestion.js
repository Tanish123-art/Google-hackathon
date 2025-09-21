// Enhanced RAG system with Google Cloud AI integration
import { getEmbedding, callGenAI } from '../embeddings/embeddingService.js';
import { ContentAnalyzer, SmartQuestionGenerator } from '../analysis/contentAnalyzer.js';
import GoogleAIContentAnalyzer from '../analysis/googleAIContentAnalyzer.js';

/**
 * Enhanced retrieval with randomization for diverse question generation
 * Replace this with actual vector DB (Pinecone, Milvus, Vertex Matching Engine).
 */
async function retrieveChunksByKeyword(queryText, chunks = [], topK = 4, randomize = true) {
  // Simple ranking: count keyword occurrences
  const q = queryText.toLowerCase();
  const scored = chunks.map(c => {
    const count = (c.text.toLowerCase().match(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    return { ...c, score: count + (c.text.length > 500 ? 0.1 : 0) };
  });
  
  // Sort by relevance
  scored.sort((a,b)=> b.score - a.score);
  
  if (randomize && scored.length > topK) {
    // Take top 50% most relevant, then randomly sample from them
    const topHalf = Math.max(topK, Math.floor(scored.length * 0.5));
    const topChunks = scored.slice(0, topHalf);
    
    // Shuffle and take topK
    const shuffled = topChunks.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, topK);
  }
  
  return scored.slice(0, topK);
}

/**
 * Generate aptitude question with RAG
 * - topic: string seed
 * - chunks: array of {id,text}
 * - difficulty: easy|medium|hard
 * - questionType: verbal|quantitative|logical|analytical
 */
async function generateQuestionWithRAG(topic, chunks, difficulty='medium', questionType='mixed') {
  const contexts = await retrieveChunksByKeyword(topic, chunks, 4);
  const contextText = contexts.map((c, i) => `Context${i+1}:\n${c.text}\n`).join('\n');

  // Define aptitude question types and their characteristics
  const aptitudeTypes = {
    verbal: "verbal reasoning, reading comprehension, vocabulary, analogies, sentence completion",
    quantitative: "mathematical reasoning, numerical analysis, data interpretation, arithmetic, algebra",
    logical: "logical reasoning, pattern recognition, sequence completion, syllogisms, deductive reasoning",
    analytical: "critical thinking, problem-solving, analytical reasoning, decision making, evaluation",
    mixed: "any combination of verbal, quantitative, logical, or analytical reasoning"
  };

  const typeDescription = aptitudeTypes[questionType] || aptitudeTypes.mixed;

  const prompt = `
You are an expert aptitude test writer. Using the CONTEXT below (reference material), create ONE high-quality multiple-choice aptitude question.

QUESTION REQUIREMENTS:
- Topic: "${topic}"
- Type: ${questionType} (${typeDescription})
- Difficulty: ${difficulty}
- Must test reasoning ability, not just memorization
- Should require analytical thinking
- Options should be plausible but only one correct answer

QUESTION FORMATS BY TYPE:
- Verbal: Reading comprehension, analogies, vocabulary in context, sentence completion
- Quantitative: Word problems, data interpretation, mathematical reasoning, numerical patterns
- Logical: Pattern recognition, sequence completion, syllogisms, logical deductions
- Analytical: Critical analysis, problem-solving, evaluation of arguments, decision making

Return JSON only in this exact format:
{
 "question":"<clear, well-formatted aptitude question>",
 "options":["Option A","Option B","Option C","Option D"],
 "answer":<index 0-3>,
 "explanation":"Detailed explanation of why the answer is correct and why others are wrong",
 "difficulty":"${difficulty}",
 "questionType":"${questionType}",
 "reasoningType":"verbal|quantitative|logical|analytical",
 "sources":["Context1","Context2"]
}

CONTEXT:
${contextText}
  `;
  
  const raw = await callGenAI(prompt, { difficulty, sources: contexts.map(c=>c.id), questionType });

  // parse the output
  let parsed;
  try {
    parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch (err) {
    // if parsing fails, return a fallback aptitude question
    parsed = {
      question: `Based on the context provided, which of the following best demonstrates ${topic}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 0,
      explanation: 'This is a fallback aptitude question. Please check the AI service configuration.',
      difficulty,
      questionType,
      reasoningType: questionType,
      sources: contexts.map(c=>c.id)
    };
  }
  
  // Ensure required fields are present
  parsed.questionType = parsed.questionType || questionType;
  parsed.reasoningType = parsed.reasoningType || questionType;
  
  // attach source chunk texts for traceability (optional)
  parsed._context = contexts.map(c => ({ id: c.id, text: c.text.slice(0,400) }));
  return parsed;
}

/**
 * Intelligent question generation using Google AI content analysis
 * This function studies the reference book content using Google AI and generates smart aptitude questions
 */
async function generateIntelligentAptitudeQuestions(chunks, numQuestions = 5, difficulty = 'medium') {
  console.log('🧠 Starting Google AI-powered aptitude question generation...');
  
  // Initialize Google AI content analyzer
  const aiAnalyzer = new GoogleAIContentAnalyzer();
  
  // Analyze the content using Google AI
  const contentReport = await aiAnalyzer.analyzeContentWithAI(chunks);
  console.log('📊 Google AI Content Analysis Complete:', {
    topics: contentReport.summary.totalTopics,
    concepts: contentReport.summary.totalConcepts,
    questionTypes: contentReport.summary.totalQuestionTypes,
    aiAnalyzed: contentReport.summary.aiAnalyzed
  });

  // Generate questions using Google AI
  const questions = [];
  const selectedChunks = selectOptimalChunksForAI(chunks, contentReport, numQuestions);
  
  for (let i = 0; i < selectedChunks.length && questions.length < numQuestions; i++) {
    try {
      const chunk = selectedChunks[i];
      const question = await generateQuestionWithGoogleAI(chunk, contentReport, difficulty);
      if (question) {
        questions.push(question);
      }
    } catch (error) {
      console.error(`Error generating question ${i}:`, error);
    }
  }
  
  console.log(`✅ Generated ${questions.length} Google AI-powered aptitude questions`);
  
  return {
    questions,
    contentReport,
    metadata: {
      totalChunks: chunks.length,
      analyzedTopics: contentReport.summary.totalTopics,
      generatedAt: new Date().toISOString(),
      difficulty,
      intelligenceLevel: 'google_ai',
      aiPowered: true
    }
  };
}

/**
 * Select optimal chunks for Google AI question generation
 */
function selectOptimalChunksForAI(chunks, contentReport, numQuestions) {
  // Score chunks based on content analysis
  const scoredChunks = chunks.map(chunk => {
    let score = 0;
    
    // Score based on topic diversity
    const chunkTopics = Object.keys(contentReport.topics).filter(topic => 
      contentReport.topics[topic].some(item => item.chunkId === chunk.id)
    );
    score += chunkTopics.length * 2;
    
    // Score based on concept density
    const chunkConcepts = Object.keys(contentReport.concepts).filter(concept => 
      contentReport.concepts[concept].includes(chunk.id)
    );
    score += chunkConcepts.length;
    
    // Score based on question type potential
    const chunkQuestionTypes = Object.keys(contentReport.questionTypes).filter(qType => 
      contentReport.questionTypes[qType].some(item => item.chunkId === chunk.id)
    );
    score += chunkQuestionTypes.length * 1.5;
    
    return { chunk, score };
  });

  // Sort by score and select top chunks
  return scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, numQuestions * 2) // Get more chunks than needed for variety
    .map(item => item.chunk);
}

/**
 * Generate question using Google AI with enhanced prompts
 */
async function generateQuestionWithGoogleAI(chunk, contentReport, difficulty) {
  const prompt = `
You are an expert aptitude test writer using Google AI. Create a high-quality aptitude question based on the provided content.

CONTENT ANALYSIS SUMMARY:
- Available topics: ${Object.keys(contentReport.topics).join(', ')}
- Key concepts: ${Object.keys(contentReport.concepts).slice(0, 10).join(', ')}
- Supported question types: ${Object.keys(contentReport.questionTypes).join(', ')}

REFERENCE CONTENT:
"${chunk.text.slice(0, 600)}"

REQUIREMENTS:
- Difficulty: ${difficulty}
- Test reasoning ability, not memorization
- Create a question that requires analytical thinking
- Make options plausible but clearly distinguishable
- Provide detailed explanation

Return ONLY valid JSON in this exact format:
{
  "question": "Clear, well-formatted aptitude question",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": 0,
  "explanation": "Detailed explanation of why the answer is correct and why others are wrong",
  "difficulty": "${difficulty}",
  "questionType": "verbal|quantitative|logical|analytical",
  "reasoningType": "verbal|quantitative|logical|analytical",
  "sources": ["${chunk.id}"],
  "contentBased": true,
  "aiGenerated": true
}`;

  try {
    const raw = await callGenAI(prompt, { difficulty, sources: [chunk.id] });
    
    let parsed;
    try {
      parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (err) {
      console.error('Failed to parse Google AI response:', err);
      return null;
    }
    
    // Ensure required fields
    parsed.id = `google-ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    parsed.sourceChunk = chunk.id;
    parsed.aiGenerated = true;
    parsed.googleAI = true;
    
    return parsed;
    
  } catch (error) {
    console.error('Error generating question with Google AI:', error);
    return null;
  }
}

/**
 * Enhanced RAG question generation with content understanding
 */
async function generateQuestionWithRAG(topic, chunks, difficulty='medium', questionType='mixed') {
  // First, analyze the chunks to understand the content better
  const analyzer = new ContentAnalyzer();
  const contentReport = analyzer.analyzeContent(chunks);
  
  // Find chunks most relevant to the topic
  const relevantChunks = findRelevantChunks(topic, chunks, contentReport);
  
  if (relevantChunks.length === 0) {
    console.warn(`No relevant chunks found for topic: ${topic}`);
    return generateFallbackQuestion(topic, difficulty, questionType);
  }

  const contexts = await retrieveChunksByKeyword(topic, relevantChunks, 4);
  const contextText = contexts.map((c, i) => `Context${i+1}:\n${c.text}\n`).join('\n');

  // Enhanced prompt that understands the content structure
  const prompt = `
You are an expert aptitude test writer who has thoroughly studied the reference material. 

CONTENT ANALYSIS SUMMARY:
- Topics found: ${Object.keys(contentReport.topics).join(', ')}
- Key concepts: ${Object.keys(contentReport.concepts).slice(0, 10).join(', ')}
- Question types supported: ${Object.keys(contentReport.questionTypes).join(', ')}

QUESTION REQUIREMENTS:
- Topic: "${topic}"
- Type: ${questionType} (focus on reasoning ability, not memorization)
- Difficulty: ${difficulty}
- Must test analytical thinking and problem-solving skills
- Should be based on the actual content provided

CONTEXT FROM REFERENCE MATERIAL:
${contextText}

Create ONE high-quality aptitude question that:
1. Tests reasoning ability, not just knowledge recall
2. Uses the provided context intelligently
3. Has plausible but clearly distinguishable options
4. Requires analytical thinking to solve

Return JSON only in this exact format:
{
 "question":"<clear, well-formatted aptitude question>",
 "options":["Option A","Option B","Option C","Option D"],
 "answer":<index 0-3>,
 "explanation":"Detailed explanation of why the answer is correct and why others are wrong",
 "difficulty":"${difficulty}",
 "questionType":"${questionType}",
 "reasoningType":"verbal|quantitative|logical|analytical",
 "sources":["Context1","Context2"],
 "contentBased":true
}
  `;
  
  const raw = await callGenAI(prompt, { difficulty, sources: contexts.map(c=>c.id), questionType });

  // parse the output
  let parsed;
  try {
    parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch (err) {
    console.error('Failed to parse AI response:', err);
    return generateFallbackQuestion(topic, difficulty, questionType);
  }
  
  // Ensure required fields are present
  parsed.questionType = parsed.questionType || questionType;
  parsed.reasoningType = parsed.reasoningType || questionType;
  parsed.contentBased = true;
  
  // attach source chunk texts for traceability
  parsed._context = contexts.map(c => ({ id: c.id, text: c.text.slice(0,400) }));
  parsed._contentAnalysis = {
    topics: Object.keys(contentReport.topics),
    concepts: Object.keys(contentReport.concepts).slice(0, 5)
  };
  
  return parsed;
}

/**
 * Find chunks most relevant to a topic using content analysis
 */
function findRelevantChunks(topic, chunks, contentReport) {
  const topicLower = topic.toLowerCase();
  
  // Find chunks that contain the topic or related concepts
  const relevantChunks = chunks.filter(chunk => {
    const text = chunk.text.toLowerCase();
    
    // Direct topic match
    if (text.includes(topicLower)) return true;
    
    // Check if chunk contains related concepts
    const relatedConcepts = Object.keys(contentReport.concepts).filter(concept => 
      concept.toLowerCase().includes(topicLower) || topicLower.includes(concept.toLowerCase())
    );
    
    return relatedConcepts.some(concept => text.includes(concept.toLowerCase()));
  });
  
  return relevantChunks.length > 0 ? relevantChunks : chunks.slice(0, 10);
}

/**
 * Generate fallback question when no relevant content is found
 */
function generateFallbackQuestion(topic, difficulty, questionType) {
  return {
    question: `Based on general ${questionType} reasoning principles, which of the following best demonstrates understanding of ${topic}?`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 0,
    explanation: 'This is a fallback question. Please ensure the reference material contains relevant content for the requested topic.',
    difficulty,
    questionType,
    reasoningType: questionType,
    sources: [],
    contentBased: false,
    fallback: true
  };
}

export { 
  generateQuestionWithRAG, 
  retrieveChunksByKeyword, 
  generateIntelligentAptitudeQuestions 
};
