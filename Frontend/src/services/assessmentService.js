import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

class AssessmentService {
  // Create a new assessment using RAG
  async createAssessment(assessmentData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai/intelligent-aptitude-test`, {
        questionTypes: assessmentData.questionTypes || ['verbal', 'quantitative', 'logical', 'analytical'],
        numQuestions: assessmentData.numQuestions || 5,
        difficulty: assessmentData.difficulty || 'medium',
        topics: assessmentData.topics || []
      });
      return response.data;
    } catch (error) {
      console.error('Error creating assessment:', error);
      // Fallback to mock data if backend is not available
      return this.getMockAssessment(assessmentData);
    }
  }

  // Create a random aptitude test
  async createRandomAptitudeTest(questionTypes = ['verbal', 'quantitative', 'logical', 'analytical'], numQuestions = 5) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai/random-aptitude-questions`, {
        questionTypes,
        numQuestions
      });
      return response.data;
    } catch (error) {
      console.error('Error creating random aptitude test:', error);
      // Fallback to mock data
      return this.getMockRandomTest(questionTypes, numQuestions);
    }
  }

  // Get assessment by ID
  async getAssessment(assessmentId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ai/tests/${assessmentId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting assessment:', error);
      throw error;
    }
  }

  // Get question by index
  async getQuestion(assessmentId, questionIndex) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ai/tests/${assessmentId}/question?idx=${questionIndex}`);
      return response.data;
    } catch (error) {
      console.error('Error getting question:', error);
      throw error;
    }
  }

  // Submit answer
  async submitAnswer(assessmentId, questionIndex, selectedIndex, userId = 'default') {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai/tests/${assessmentId}/submit`, {
        questionIdx: questionIndex,
        selectedIndex,
        userId
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting answer:', error);
      throw error;
    }
  }

  // Get content analysis
  async getContentAnalysis() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ai/content-analysis`);
      return response.data;
    } catch (error) {
      console.error('Error getting content analysis:', error);
      // Fallback to mock data
      return this.getMockContentAnalysis();
    }
  }

  // Get available question types
  getQuestionTypes() {
    return [
      { value: 'verbal', label: 'Verbal Ability', description: 'Language and communication skills' },
      { value: 'quantitative', label: 'Quantitative Reasoning', description: 'Mathematical and numerical skills' },
      { value: 'logical', label: 'Logical Reasoning', description: 'Problem-solving and pattern recognition' },
      { value: 'analytical', label: 'Analytical Thinking', description: 'Critical thinking and analysis' }
    ];
  }

  // Get difficulty levels
  getDifficultyLevels() {
    return [
      { value: 'easy', label: 'Easy', description: 'Basic level questions' },
      { value: 'medium', label: 'Medium', description: 'Intermediate level questions' },
      { value: 'hard', label: 'Hard', description: 'Advanced level questions' }
    ];
  }

  // Mock data methods for fallback
  getMockRandomTest(questionTypes, numQuestions) {
    const questions = [];
    const questionTemplates = {
      verbal: [
        {
          questionText: "Which word is most similar in meaning to 'ubiquitous'?",
          options: ["Rare", "Common", "Everywhere", "Nowhere"],
          correctAnswer: 2,
          questionType: "verbal",
          reasoningType: "synonym"
        },
        {
          questionText: "Complete the analogy: Book is to Library as Car is to ___?",
          options: ["Highway", "Garage", "Driver", "Engine"],
          correctAnswer: 1,
          questionType: "verbal",
          reasoningType: "analogy"
        }
      ],
      quantitative: [
        {
          questionText: "If a train travels 120 km in 2 hours, what is its average speed?",
          options: ["60 km/h", "40 km/h", "80 km/h", "100 km/h"],
          correctAnswer: 0,
          questionType: "quantitative",
          reasoningType: "calculation"
        },
        {
          questionText: "What is 25% of 200?",
          options: ["50", "25", "75", "100"],
          correctAnswer: 0,
          questionType: "quantitative",
          reasoningType: "percentage"
        }
      ],
      logical: [
        {
          questionText: "If all roses are flowers and some flowers are red, which statement is true?",
          options: ["All roses are red", "Some roses are red", "No roses are red", "Cannot be determined"],
          correctAnswer: 3,
          questionType: "logical",
          reasoningType: "syllogism"
        }
      ],
      analytical: [
        {
          questionText: "A company's revenue increased by 20% in Q1 and decreased by 15% in Q2. What is the net change?",
          options: ["+5%", "+2%", "-5%", "Cannot be determined"],
          correctAnswer: 1,
          questionType: "analytical",
          reasoningType: "compound_percentage"
        }
      ]
    };

    // Generate questions based on types
    questionTypes.forEach(type => {
      const typeQuestions = questionTemplates[type] || [];
      const questionsToAdd = Math.min(numQuestions, typeQuestions.length);
      for (let i = 0; i < questionsToAdd; i++) {
        questions.push(typeQuestions[i]);
      }
    });

    return {
      testId: `mock-${Date.now()}`,
      questions: questions.slice(0, numQuestions),
      questionTypes,
      difficulty: 'medium'
    };
  }

  getMockAssessment(assessmentData) {
    return this.getMockRandomTest(
      assessmentData.questionTypes || ['verbal', 'quantitative', 'logical', 'analytical'],
      assessmentData.numQuestions || 5
    );
  }

  getMockContentAnalysis() {
    return {
      totalChunks: 150,
      topics: ['Mathematics', 'Language', 'Logic', 'Analytics'],
      lastUpdated: new Date().toISOString(),
      status: 'mock_data'
    };
  }
}

export default new AssessmentService();
