import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import assessmentService from '../services/assessmentService';

const AssessmentJourney = () => {
  const [loading, setLoading] = useState(true);
  const [contentAnalysis, setContentAnalysis] = useState(null);
  const [questionTypes, setQuestionTypes] = useState([]);

  // Load content analysis and question types
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const analysis = await assessmentService.getContentAnalysis();
        setContentAnalysis(analysis);
        setQuestionTypes(assessmentService.getQuestionTypes());
      } catch (error) {
        console.error('Error loading assessment data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Dynamic assessment cards based on RAG content analysis
  const getAssessmentCards = () => {
    if (!contentAnalysis || !questionTypes.length) {
      return [
        {
          title: "Verbal Ability",
          subtitle: "Language and Communication Skills",
          rating: 5,
          time: "20 min",
          points: "130 XP",
          action: "Start Assessment",
          pathId: "verbal-ability",
          description: "Test your vocabulary, comprehension, and verbal reasoning skills"
        },
        {
          title: "Quantitative Reasoning",
          subtitle: "Mathematical and Numerical Skills",
          rating: 5,
          time: "20 min",
          points: "130 XP",
          action: "Start Assessment",
          pathId: "quantitative",
          description: "Assess your mathematical problem-solving abilities"
        },
        {
          title: "Logical Reasoning",
          subtitle: "Problem-solving and Pattern Recognition",
          rating: 5,
          time: "20 min",
          points: "130 XP",
          action: "Start Assessment",
          pathId: "logical",
          description: "Evaluate your logical thinking and pattern recognition"
        },
        {
          title: "Analytical Thinking",
          subtitle: "Critical Thinking and Analysis",
          rating: 5,
          time: "20 min",
          points: "130 XP",
          action: "Start Assessment",
          pathId: "analytical",
          description: "Test your analytical and critical thinking skills"
        },
        {
          title: "Mixed Assessment",
          subtitle: "Comprehensive Aptitude Test",
          rating: 5,
          time: "25 min",
          points: "200 XP",
          action: "Start Assessment",
          pathId: "mixed",
          description: "Complete assessment covering all aptitude areas"
        }
      ];
    }

    return questionTypes.map(type => ({
      title: type.label,
      subtitle: type.description,
      rating: 5,
      time: "20 min",
      points: "130 XP",
      action: "Start Assessment",
      pathId: type.value,
      description: type.description
    }));
  };

  const cards = getAssessmentCards();

  // Example stage data
  const stages = [
    { id: 1, label: "Stage 1: Foundational Aptitude", status: "completed" },
    { id: 2, label: "Stage 2: Core Skills", status: "active" },
    { id: 3, label: "Stage 3: Advanced Challenges", status: "locked" },
    { id: 4, label: "Stage 4: Mastery", status: "locked" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#000000] font-sans text-gray-900 dark:text-white transition-colors duration-200">
        <div className="px-8">
          <div className="glass-card glow-sm p-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <span className="ml-3 text-lg">Loading assessments...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000000] font-sans text-gray-900 dark:text-white transition-colors duration-200">
      <div className="px-8">
        <div className="glass-card glow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gradient">
            Assessment Journey
          </h2>
          
          {contentAnalysis && (
            <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
                📚 RAG-Powered Assessments
              </h3>
              <p className="text-orange-700 dark:text-orange-300 text-sm">
                Questions are dynamically generated using our AI-powered RAG system, 
                ensuring content is always relevant and up-to-date based on the latest reference materials.
              </p>
            </div>
          )}

          {/* 🔹 Modern Timeline Progression */}
          <div className="flex items-center justify-between mb-12 relative">
            {stages.map((stage, idx) => (
              <div
                key={stage.id}
                className="flex flex-col items-center flex-1 relative"
              >
                {/* Double-ring Node with Icon */}
                <div className="relative z-10">
                  {/* Outer ring */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center relative
                      ${
                        stage.status === "completed"
                          ? "bg-gradient-to-r from-orange-500 to-pink-500"
                          : stage.status === "active"
                          ? "bg-gradient-to-r from-orange-500 to-pink-500"
                          : "bg-gray-700"
                      }
                    `}
                  >
                    {/* Inner ring */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center
                        ${
                          stage.status === "completed"
                            ? "bg-gray-900"
                            : stage.status === "active"
                            ? "bg-gray-900"
                            : "bg-gray-800"
                        }
                      `}
                    >
                      {/* Icon */}
                      {stage.status === "completed" ? (
                        <svg
                          className="w-6 h-6 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : stage.status === "active" ? (
                        <svg
                          className="w-6 h-6 text-orange-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Label */}
                <p className="text-sm mt-3 text-gray-300 text-center max-w-32">
                  {stage.label}
                </p>
                
                {/* Centered Connector line */}
                {idx < stages.length - 1 && (
                  <div
                    className={`absolute top-8 left-1/2 w-full h-0.5 -translate-x-1/2 z-0
                      ${
                        stage.status === "completed" || stage.status === "active"
                          ? "bg-gradient-to-r from-orange-500 to-pink-500"
                          : "bg-gray-600"
                      }
                    `}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* 🔹 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="glass-card p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">{card.subtitle}</p>

                  {/* Rating Stars */}
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${
                          i < card.rating ? "text-yellow-400" : "text-gray-500"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.378 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.378-2.455a1 1 0 00-1.176 0l-3.378 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.287-3.966z" />
                      </svg>
                    ))}
                  </div>

                  {/* Time + Points */}
                  <p className="text-sm text-gray-400">
                    ⏱ {card.time} • 🎯 {card.points}
                  </p>
                </div>

                {/* Action Button */}
                {card.pathId && (card.action === "Start Assessment" || card.action === "Start Quiz") ? (
                  <Link
                    to={`/assessment/${card.pathId}`}
                    className={`mt-4 w-full py-2 rounded-lg font-semibold text-center block transition-all duration-200
                      ${
                        card.disabled
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
                      }`}
                  >
                    {card.action}
                  </Link>
                ) : (
                  <button
                    className={`mt-4 w-full py-2 rounded-lg font-semibold 
                      ${
                        card.disabled
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg"
                      }`}
                    disabled={card.disabled}
                  >
                    {card.action}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentJourney;
