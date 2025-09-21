import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI for content analysis
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_CLOUD_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const analysisConfig = {
  maxOutputTokens: 1024,
  temperature: 0.3, // Lower temperature for more consistent analysis
  topP: 0.9,
};

/**
 * Enhanced Content Analyzer using Google AI
 * This provides more intelligent content analysis using Google's AI
 */
export class GoogleAIContentAnalyzer {
  constructor() {
    this.contentStructure = {
      topics: new Map(),
      concepts: new Map(),
      questionTypes: new Map(),
      difficultyLevels: new Map(),
      relationships: new Map()
    };
  }

  // Analyze content using Google AI for better understanding
  async analyzeContentWithAI(chunks) {
    console.log('🧠 Analyzing content with Google AI...');
    
    const analysisPromises = chunks.slice(0, 10).map((chunk, index) => 
      this.analyzeChunkWithAI(chunk, index)
    );
    
    const analyses = await Promise.all(analysisPromises);
    
    analyses.forEach(analysis => {
      this.updateContentStructure(analysis);
    });

    console.log('✅ Google AI content analysis complete!');
    return this.generateContentReport();
  }

  // Analyze individual chunk using Google AI
  async analyzeChunkWithAI(chunk, index) {
    try {
      const prompt = `Analyze this text for aptitude test content. Identify:
1. Main topics (mathematics, logic, verbal, analytical, etc.)
2. Key concepts and terms
3. Question types this content could support (verbal, quantitative, logical, analytical)
4. Difficulty level (easy, medium, hard)
5. Keywords for search

Text: "${chunk.text.slice(0, 800)}"

Return JSON format:
{
  "topics": ["topic1", "topic2"],
  "concepts": ["concept1", "concept2"],
  "questionTypes": ["type1", "type2"],
  "difficulty": "easy|medium|hard",
  "keywords": ["keyword1", "keyword2"],
  "summary": "brief summary of content"
}`;

      const result = await model.generateContent({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: analysisConfig
      });

      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON response
      let aiAnalysis;
      try {
        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          aiAnalysis = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.warn('Failed to parse AI analysis, using fallback');
        aiAnalysis = this.fallbackAnalysis(chunk.text);
      }

      return {
        chunkId: chunk.id,
        chunkIndex: index,
        ...aiAnalysis,
        aiGenerated: true
      };

    } catch (error) {
      console.error('Error in AI analysis:', error);
      return this.fallbackAnalysis(chunk.text, chunk.id, index);
    }
  }

  // Fallback analysis when AI fails
  fallbackAnalysis(text, chunkId = 'unknown', index = 0) {
    const textLower = text.toLowerCase();
    
    const topics = [];
    if (textLower.includes('math') || textLower.includes('algebra') || textLower.includes('geometry')) {
      topics.push('mathematics');
    }
    if (textLower.includes('logic') || textLower.includes('reasoning') || textLower.includes('deduction')) {
      topics.push('logic');
    }
    if (textLower.includes('verbal') || textLower.includes('reading') || textLower.includes('comprehension')) {
      topics.push('verbal');
    }
    if (textLower.includes('analysis') || textLower.includes('critical') || textLower.includes('evaluation')) {
      topics.push('analytical');
    }

    const concepts = textLower.split(/\s+/)
      .filter(word => word.length > 4)
      .slice(0, 5);

    const questionTypes = [];
    if (topics.includes('mathematics')) questionTypes.push('quantitative');
    if (topics.includes('logic')) questionTypes.push('logical');
    if (topics.includes('verbal')) questionTypes.push('verbal');
    if (topics.includes('analytical')) questionTypes.push('analytical');

    return {
      chunkId,
      chunkIndex: index,
      topics,
      concepts,
      questionTypes,
      difficulty: 'medium',
      keywords: concepts,
      summary: text.slice(0, 100) + '...',
      aiGenerated: false
    };
  }

  // Update content structure with analysis results
  updateContentStructure(analysis) {
    // Update topics
    analysis.topics.forEach(topic => {
      if (!this.contentStructure.topics.has(topic)) {
        this.contentStructure.topics.set(topic, []);
      }
      this.contentStructure.topics.get(topic).push({
        chunkId: analysis.chunkId,
        aiGenerated: analysis.aiGenerated
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
      if (!this.contentStructure.questionTypes.has(qType)) {
        this.contentStructure.questionTypes.set(qType, []);
      }
      this.contentStructure.questionTypes.get(qType).push({
        chunkId: analysis.chunkId,
        aiGenerated: analysis.aiGenerated
      });
    });
  }

  // Generate comprehensive content report
  generateContentReport() {
    const report = {
      summary: {
        totalTopics: this.contentStructure.topics.size,
        totalConcepts: this.contentStructure.concepts.size,
        totalQuestionTypes: this.contentStructure.questionTypes.size,
        aiAnalyzed: true
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
      if (chunks.length > 3) {
        recommendations.push({
          type: 'topic_focus',
          topic,
          suggestion: `Strong content support for ${topic}. Generate multiple question types.`,
          priority: 'high',
          chunkCount: chunks.length
        });
      }
    });

    // Question type recommendations
    this.contentStructure.questionTypes.forEach((chunks, qType) => {
      if (chunks.length > 2) {
        recommendations.push({
          type: 'question_type',
          questionType: qType,
          suggestion: `Good content support for ${qType} questions.`,
          priority: 'medium',
          chunkCount: chunks.length
        });
      }
    });

    return recommendations;
  }
}

export default GoogleAIContentAnalyzer;
