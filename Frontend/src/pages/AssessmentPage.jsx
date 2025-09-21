import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import assessmentService from '../services/assessmentService';

const AssessmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load assessment data from RAG system
  useEffect(() => {
    const loadAssessment = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // If id is a predefined assessment type, create a new RAG-based assessment
        if (id && ['verbal-ability', 'quantitative', 'logical', 'analytical', 'mixed'].includes(id)) {
          const questionTypes = id === 'mixed' ? ['verbal', 'quantitative', 'logical', 'analytical'] : [id];
          const assessment = await assessmentService.createRandomAptitudeTest(questionTypes, 5);
          
          setAssessmentData({
            id: assessment.testId,
            title: `${id.charAt(0).toUpperCase() + id.slice(1)} Assessment`,
            duration: 20, // Default 20 minutes
            questions: assessment.questions,
            questionTypes: questionTypes
          });
          setTimeLeft(20 * 60); // 20 minutes in seconds
        } else if (id) {
          // Try to load existing assessment by ID
          const assessment = await assessmentService.getAssessment(id);
          setAssessmentData(assessment);
          setTimeLeft(assessment.duration * 60);
        } else {
          setError('Invalid assessment ID');
        }
      } catch (err) {
        console.error('Error loading assessment:', err);
        setError('Failed to load assessment. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadAssessment();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = async () => {
    if (selectedOption !== null && assessmentData) {
      try {
        setIsSubmitting(true);
        
        // Store the answer
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = selectedOption;
        setAnswers(newAnswers);
        
        // Submit answer to backend
        if (assessmentData.id) {
          await assessmentService.submitAnswer(assessmentData.id, currentQuestionIndex, selectedOption);
        }
        
        if (currentQuestionIndex < assessmentData.questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null);
        } else {
          // Assessment completed
          alert('Assessment completed! Your results have been saved.');
          navigate('/assessments');
        }
      } catch (error) {
        console.error('Error submitting answer:', error);
        alert('Error submitting answer. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#000000] font-sans text-gray-900 dark:text-white transition-colors duration-200">
        <div className="px-8">
          <div className="glass-card glow-sm p-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <span className="ml-3 text-lg">Loading assessment...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !assessmentData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#000000] font-sans text-gray-900 dark:text-white transition-colors duration-200">
        <div className="px-8">
          <div className="glass-card glow-sm p-6">
            <h2 className="text-2xl font-bold mb-4 text-gradient">Assessment Error</h2>
            <p className="text-gray-400 mb-4">{error || 'The requested assessment could not be found.'}</p>
            <Link to="/assessments" className="btn-primary">
              Back to Assessments
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = assessmentData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessmentData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000000] font-sans text-gray-900 dark:text-white transition-colors duration-200">
      <div className="px-8 py-8">
        <div className="glass-card glow-sm p-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gradient mb-2">
                {assessmentData.title}
              </h2>
              <p className="text-gray-400">
                Question {currentQuestionIndex + 1} of {assessmentData.questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-500 mb-1">
                {formatTime(timeLeft)}
              </div>
              <p className="text-sm text-gray-400">Time Remaining</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6">
              {currentQuestion.questionText}
            </h3>
            
            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedOption === index
                      ? 'border-orange-500 bg-orange-500/10 text-orange-300'
                      : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                  }`}
                >
                  <span className="font-medium mr-3 text-orange-500">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Link 
              to="/assessments" 
              className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
            >
              ← Exit Assessment
            </Link>
            
            <button
              onClick={handleNextQuestion}
              disabled={selectedOption === null || isSubmitting}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedOption !== null && !isSubmitting
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                currentQuestionIndex < assessmentData.questions.length - 1 
                  ? 'Next Question' 
                  : 'Complete Assessment'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
