import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AssessmentPage = () => {
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessmentData, setAssessmentData] = useState(null);

  // Mock API data - in a real app, this would come from an API call
  const mockApiData = {
    'verbal-ability': {
      title: 'Verbal Ability Assessment',
      duration: 20, // minutes
      questions: [
        {
          questionText: 'Which word is most similar in meaning to "ubiquitous"?',
          options: [
            'Rare',
            'Common',
            'Everywhere',
            'Nowhere'
          ]
        },
        {
          questionText: 'Complete the analogy: Book is to Library as Car is to ___?',
          options: [
            'Highway',
            'Garage',
            'Driver',
            'Engine'
          ]
        },
        {
          questionText: 'What is the opposite of "benevolent"?',
          options: [
            'Kind',
            'Generous',
            'Malevolent',
            'Helpful'
          ]
        }
      ]
    },
    'design-principles': {
      title: 'Design Principles Assessment',
      duration: 40,
      questions: [
        {
          questionText: 'What is the primary purpose of white space in design?',
          options: [
            'To save ink',
            'To create visual breathing room',
            'To make text smaller',
            'To reduce file size'
          ]
        },
        {
          questionText: 'Which principle states that related elements should be grouped together?',
          options: [
            'Contrast',
            'Proximity',
            'Alignment',
            'Repetition'
          ]
        }
      ]
    },
    'personality-quiz': {
      title: 'Work Style Compass Quiz',
      duration: 20,
      questions: [
        {
          questionText: 'When working on a project, you prefer to:',
          options: [
            'Work independently and focus deeply',
            'Collaborate with a team',
            'Follow a structured plan',
            'Adapt as you go'
          ]
        },
        {
          questionText: 'You are most energized by:',
          options: [
            'Solving complex problems',
            'Helping others succeed',
            'Meeting deadlines',
            'Learning new things'
          ]
        }
      ]
    }
  };

  useEffect(() => {
    // Find assessment data based on URL id
    const data = mockApiData[id];
    if (data) {
      setAssessmentData(data);
      setTimeLeft(data.duration * 60); // Convert minutes to seconds
    }
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

  const handleNextQuestion = () => {
    if (selectedOption !== null && assessmentData) {
      if (currentQuestionIndex < assessmentData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        // Assessment completed - in a real app, you'd submit results
        alert('Assessment completed! Results would be submitted here.');
      }
    }
  };

  if (!assessmentData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#000000] font-sans text-gray-900 dark:text-white transition-colors duration-200">
        <Navbar />
        <div className="px-8 py-8">
          <div className="glass-card glow-sm p-6">
            <h2 className="text-2xl font-bold mb-4 text-gradient">Assessment Not Found</h2>
            <p className="text-gray-400 mb-4">The requested assessment could not be found.</p>
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
      <Navbar />
      <div className="px-8 py-8">
        <div className="glass-card glow-sm p-6 max-w-4xl mx-auto">
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
              disabled={selectedOption === null}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedOption !== null
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex < assessmentData.questions.length - 1 
                ? 'Next Question' 
                : 'Complete Assessment'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
