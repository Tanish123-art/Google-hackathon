import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BOOK_CONFIG } from '../config/bookConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Content Analysis System for Reference Book
export class ContentAnalyzer {
  constructor() {
    this.contentStructure = {
      topics: new Map(),
      concepts: new Map(),
      questionTypes: new Map(),
      difficultyLevels: new Map(),
      relationships: new Map()
    };
  }

  // Analyze content structure and extract key information
  analyzeContent(chunks) {
    console.log('🔍 Analyzing reference book content...');
    
    chunks.forEach((chunk, index) => {
      const analysis = this.analyzeChunk(chunk, index);
      this.updateContentStructure(analysis);
    });

    console.log('✅ Content analysis complete!');
    return this.generateContentReport();
  }

  // Analyze individual chunk for patterns and concepts
  analyzeChunk(chunk, index) {
    const text = chunk.text.toLowerCase();
    
    return {
      chunkId: chunk.id,
      chunkIndex: index,
      topics: this.extractTopics(text),
      concepts: this.extractConcepts(text),
      questionTypes: this.identifyQuestionTypes(text),
      difficulty: this.assessDifficulty(text),
      keywords: this.extractKeywords(text),
      structure: this.analyzeStructure(text),
      length: text.length
    };
  }

  // Extract topics from text using pattern matching
  extractTopics(text) {
    const topicPatterns = {
      mathematics: ['mathematics', 'math', 'algebra', 'geometry', 'calculus', 'statistics', 'probability', 'arithmetic'],
      science: ['science', 'physics', 'chemistry', 'biology', 'experiment', 'hypothesis', 'theory', 'research'],
      logic: ['logic', 'reasoning', 'deduction', 'induction', 'syllogism', 'premise', 'conclusion', 'argument'],
      language: ['language', 'grammar', 'vocabulary', 'syntax', 'semantics', 'linguistics', 'communication'],
      psychology: ['psychology', 'behavior', 'cognitive', 'mental', 'intelligence', 'perception', 'memory'],
      problem_solving: ['problem', 'solution', 'solve', 'approach', 'method', 'strategy', 'technique'],
      critical_thinking: ['critical', 'analysis', 'evaluation', 'assessment', 'judgment', 'reasoning'],
      data_analysis: ['data', 'analysis', 'statistics', 'interpretation', 'chart', 'graph', 'trend'],
      spatial: ['spatial', 'visual', 'pattern', 'shape', 'geometry', 'orientation', 'direction'],
      numerical: ['number', 'calculation', 'computation', 'formula', 'equation', 'numeric']
    };

    const foundTopics = [];
    Object.entries(topicPatterns).forEach(([topic, patterns]) => {
      const matches = patterns.filter(pattern => text.includes(pattern));
      if (matches.length > 0) {
        foundTopics.push({
          topic,
          matches,
          confidence: matches.length / patterns.length
        });
      }
    });

    return foundTopics;
  }

  // Extract key concepts and terms
  extractConcepts(text) {
    const conceptPatterns = [
      // Mathematical concepts
      /\b(?:equation|formula|theorem|proof|calculation|computation)\b/g,
      // Logical concepts  
      /\b(?:premise|conclusion|inference|deduction|induction|syllogism)\b/g,
      // Problem-solving concepts
      /\b(?:strategy|method|approach|technique|algorithm|process)\b/g,
      // Analytical concepts
      /\b(?:analysis|evaluation|assessment|interpretation|comparison)\b/g,
      // Pattern concepts
      /\b(?:pattern|sequence|series|progression|trend|relationship)\b/g
    ];

    const concepts = [];
    conceptPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        concepts.push(...matches);
      }
    });

    return [...new Set(concepts)]; // Remove duplicates
  }

  // Identify potential question types based on content
  identifyQuestionTypes(text) {
    const questionTypeIndicators = {
      verbal: ['read', 'comprehend', 'understand', 'interpret', 'analyze text', 'passage'],
      quantitative: ['calculate', 'compute', 'solve', 'equation', 'formula', 'number'],
      logical: ['reason', 'deduce', 'infer', 'conclude', 'premise', 'logic'],
      analytical: ['analyze', 'evaluate', 'compare', 'contrast', 'assess', 'critique'],
      spatial: ['visual', 'pattern', 'shape', 'orientation', 'spatial', 'geometric'],
      numerical: ['sequence', 'series', 'pattern', 'trend', 'progression', 'number']
    };

    const identifiedTypes = [];
    Object.entries(questionTypeIndicators).forEach(([type, indicators]) => {
      const matches = indicators.filter(indicator => text.includes(indicator));
      if (matches.length > 0) {
        identifiedTypes.push({
          type,
          confidence: matches.length / indicators.length,
          indicators: matches
        });
      }
    });

    return identifiedTypes;
  }

  // Assess difficulty level based on content complexity
  assessDifficulty(text) {
    const difficultyIndicators = {
      easy: ['basic', 'simple', 'fundamental', 'introductory', 'basic concept'],
      medium: ['intermediate', 'moderate', 'standard', 'typical', 'common'],
      hard: ['advanced', 'complex', 'sophisticated', 'intricate', 'challenging', 'expert']
    };

    let difficultyScore = { easy: 0, medium: 0, hard: 0 };
    
    Object.entries(difficultyIndicators).forEach(([level, indicators]) => {
      indicators.forEach(indicator => {
        const matches = (text.match(new RegExp(indicator, 'g')) || []).length;
        difficultyScore[level] += matches;
      });
    });

    // Determine primary difficulty
    const maxScore = Math.max(...Object.values(difficultyScore));
    const primaryDifficulty = Object.keys(difficultyScore).find(
      key => difficultyScore[key] === maxScore
    );

    return {
      primary: primaryDifficulty || 'medium',
      scores: difficultyScore,
      confidence: maxScore / (Object.values(difficultyScore).reduce((a, b) => a + b, 0) || 1)
    };
  }

  // Extract important keywords
  extractKeywords(text) {
    // Remove common words and extract meaningful terms
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those'
    ]);

    const words = text.split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word))
      .map(word => word.replace(/[^\w]/g, ''))
      .filter(word => word.length > 0);

    // Count word frequency
    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Return top keywords
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  }

  // Analyze text structure
  analyzeStructure(text) {
    return {
      hasNumbers: /\d+/.test(text),
      hasFormulas: /[=+\-*/]/.test(text),
      hasLists: /[•\-\*]\s/.test(text) || /\d+\.\s/.test(text),
      hasQuestions: /\?/.test(text),
      hasExamples: /example|for instance|such as/i.test(text),
      hasDefinitions: /is defined as|means|refers to/i.test(text),
      sentenceCount: text.split(/[.!?]+/).length,
      avgSentenceLength: text.length / text.split(/[.!?]+/).length
    };
  }

  // Update content structure with analysis results
  updateContentStructure(analysis) {
    // Update topics
    analysis.topics.forEach(topic => {
      if (!this.contentStructure.topics.has(topic.topic)) {
        this.contentStructure.topics.set(topic.topic, []);
      }
      this.contentStructure.topics.get(topic.topic).push({
        chunkId: analysis.chunkId,
        confidence: topic.confidence,
        matches: topic.matches
      });
    });

    // Update concepts
    analysis.concepts.forEach(concept => {
      if (!this.contentStructure.concepts.has(concept)) {
        this.contentStructure.concepts.set(concept, []);
      }
      this.contentStructure.concepts.get(concept).push(analysis.chunkId);
    });

    // Update question types
    analysis.questionTypes.forEach(qType => {
      if (!this.contentStructure.questionTypes.has(qType.type)) {
        this.contentStructure.questionTypes.set(qType.type, []);
      }
      this.contentStructure.questionTypes.get(qType.type).push({
        chunkId: analysis.chunkId,
        confidence: qType.confidence,
        indicators: qType.indicators
      });
    });
  }

  // Generate comprehensive content report
  generateContentReport() {
    const report = {
      summary: {
        totalTopics: this.contentStructure.topics.size,
        totalConcepts: this.contentStructure.concepts.size,
        totalQuestionTypes: this.contentStructure.questionTypes.size
      },
      topics: Object.fromEntries(this.contentStructure.topics),
      concepts: Object.fromEntries(this.contentStructure.concepts),
      questionTypes: Object.fromEntries(this.contentStructure.questionTypes),
      recommendations: this.generateRecommendations()
    };

    return report;
  }

  // Generate recommendations for question generation
  generateRecommendations() {
    const recommendations = [];

    // Topic-based recommendations
    this.contentStructure.topics.forEach((chunks, topic) => {
      if (chunks.length > 5) {
        recommendations.push({
          type: 'topic_focus',
          topic,
          suggestion: `High content density for ${topic}. Generate multiple question types.`,
          priority: 'high'
        });
      }
    });

    // Question type recommendations
    this.contentStructure.questionTypes.forEach((chunks, qType) => {
      if (chunks.length > 3) {
        recommendations.push({
          type: 'question_type',
          questionType: qType,
          suggestion: `Strong content support for ${qType} questions.`,
          priority: 'medium'
        });
      }
    });

    return recommendations;
  }
}

// Smart Question Generator that uses content analysis
export class SmartQuestionGenerator {
  constructor(contentAnalyzer) {
    this.analyzer = contentAnalyzer;
    this.questionTemplates = this.initializeQuestionTemplates();
  }

  // Initialize question templates based on aptitude test patterns
  initializeQuestionTemplates() {
    return {
      verbal: {
        reading_comprehension: {
          template: "Based on the following passage: '{context}', {question}",
          questions: [
            "What is the main idea?",
            "Which statement best summarizes the author's position?",
            "What can be inferred from the passage?",
            "Which word best describes the tone?"
          ]
        },
        analogy: {
          template: "{concept1} is to {concept2} as {concept3} is to:",
          questions: [
            "Complete the analogy",
            "Find the relationship",
            "Identify the pattern"
          ]
        }
      },
      quantitative: {
        word_problem: {
          template: "If {scenario}, and {condition}, then {question}",
          questions: [
            "What is the result?",
            "How much does it cost?",
            "What percentage is represented?",
            "What is the total?"
          ]
        },
        data_interpretation: {
          template: "Given the following data: {data}, {question}",
          questions: [
            "What trend is shown?",
            "Which value is highest?",
            "What is the average?",
            "What percentage change occurred?"
          ]
        }
      },
      logical: {
        syllogism: {
          template: "If {premise1} and {premise2}, then {question}",
          questions: [
            "What conclusion follows?",
            "Which statement is true?",
            "What can be deduced?",
            "What is the logical conclusion?"
          ]
        },
        pattern_recognition: {
          template: "In the sequence: {sequence}, {question}",
          questions: [
            "What comes next?",
            "What is the pattern?",
            "What is the rule?",
            "What is missing?"
          ]
        }
      },
      analytical: {
        critical_analysis: {
          template: "Given the argument: '{argument}', {question}",
          questions: [
            "What is the strongest evidence?",
            "What assumption is made?",
            "What weakens the argument?",
            "What conclusion is supported?"
          ]
        },
        problem_solving: {
          template: "To solve {problem}, {question}",
          questions: [
            "What is the best approach?",
            "What step comes first?",
            "What information is needed?",
            "What is the most efficient method?"
          ]
        }
      }
    };
  }

  // Generate intelligent questions based on content analysis
  generateSmartQuestions(chunks, numQuestions = 5, difficulty = 'medium') {
    const contentReport = this.analyzer.generateContentReport();
    const questions = [];

    // Select chunks based on content analysis
    const selectedChunks = this.selectOptimalChunks(chunks, contentReport, numQuestions);

    selectedChunks.forEach((chunk, index) => {
      const chunkAnalysis = this.analyzer.analyzeChunk(chunk, index);
      const question = this.generateQuestionFromChunk(chunk, chunkAnalysis, difficulty);
      if (question) {
        questions.push(question);
      }
    });

    return questions;
  }

  // Select optimal chunks based on content analysis
  selectOptimalChunks(chunks, contentReport, numQuestions) {
    const scoredChunks = chunks.map(chunk => {
      let score = 0;
      
      // Score based on topic diversity
      const chunkAnalysis = this.analyzer.analyzeChunk(chunk, 0);
      score += chunkAnalysis.topics.length * 2;
      
      // Score based on concept density
      score += chunkAnalysis.concepts.length;
      
      // Score based on question type potential
      score += chunkAnalysis.questionTypes.length * 1.5;
      
      // Score based on structure complexity
      const structure = chunkAnalysis.structure;
      if (structure.hasExamples) score += 1;
      if (structure.hasDefinitions) score += 1;
      if (structure.hasNumbers) score += 0.5;
      
      return { chunk, score };
    });

    // Sort by score and select top chunks
    return scoredChunks
      .sort((a, b) => b.score - a.score)
      .slice(0, numQuestions)
      .map(item => item.chunk);
  }

  // Generate question from individual chunk
  generateQuestionFromChunk(chunk, analysis, difficulty) {
    const questionType = this.selectQuestionType(analysis);
    const template = this.questionTemplates[questionType.category]?.[questionType.subtype];
    
    if (!template) return null;

    const questionText = this.buildQuestionText(template, chunk.text, analysis);
    
    return {
      id: `smart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question: questionText,
      options: this.generateOptions(questionType, analysis),
      answer: 0, // Will be determined by AI
      explanation: `This question tests ${questionType.category} reasoning based on the reference material.`,
      difficulty,
      questionType: questionType.category,
      reasoningType: questionType.category,
      sourceChunk: chunk.id,
      analysis: {
        topics: analysis.topics.map(t => t.topic),
        concepts: analysis.concepts.slice(0, 5),
        keywords: analysis.keywords.slice(0, 5)
      }
    };
  }

  // Select appropriate question type based on chunk analysis
  selectQuestionType(analysis) {
    const typeScores = {};
    
    analysis.questionTypes.forEach(qType => {
      typeScores[qType.type] = qType.confidence;
    });

    // Default to highest scoring type
    const bestType = Object.keys(typeScores).reduce((a, b) => 
      typeScores[a] > typeScores[b] ? a : b
    ) || 'analytical';

    // Select subtype based on content
    const subtypes = Object.keys(this.questionTemplates[bestType] || {});
    const subtype = subtypes[Math.floor(Math.random() * subtypes.length)] || 'critical_analysis';

    return { category: bestType, subtype };
  }

  // Build question text using template
  buildQuestionText(template, context, analysis) {
    let questionText = template.template;
    
    // Replace placeholders with actual content
    questionText = questionText.replace('{context}', context.slice(0, 200) + '...');
    questionText = questionText.replace('{question}', 
      template.questions[Math.floor(Math.random() * template.questions.length)]
    );
    
    // Replace other placeholders with analysis data
    if (analysis.concepts.length > 0) {
      questionText = questionText.replace('{concept1}', analysis.concepts[0]);
      questionText = questionText.replace('{concept2}', analysis.concepts[1] || analysis.concepts[0]);
      questionText = questionText.replace('{concept3}', analysis.concepts[2] || analysis.concepts[0]);
    }

    return questionText;
  }

  // Generate plausible options
  generateOptions(questionType, analysis) {
    const options = ['Option A', 'Option B', 'Option C', 'Option D'];
    
    // For now, return generic options - these would be enhanced with AI
    return options.map((option, index) => ({
      text: option,
      isCorrect: index === 0 // First option is correct by default
    }));
  }
}

export default { ContentAnalyzer, SmartQuestionGenerator };
