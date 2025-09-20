import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CareerRecommendations from './components/CareerRecommendations';
import SkillProgress from './components/SkillProgress';
import UpcomingLearningModules from './components/UpcomingLearningModules';
import Achievements from './components/Achievements';

// 🔹 New Component for Assessment Journey UI
const AssessmentJourney = () => {
  // Example stage data
  const stages = [
    { id: 1, label: "Stage 1: Foundational Aptitude", active: true },
    { id: 2, label: "Stage 2: Core Skills", active: true },
    { id: 3, label: "Stage 3: Advanced Challenges", active: true },
    { id: 4, label: "Stage 4: Mastery", active: false },
  ];

  // Example card data
  const cards = [
    {
      title: "Aptitude Tests",
      subtitle: "Quantitative Reasoning",
      rating: 5,
      time: "20 min",
      points: "130 XP",
      action: "View",
    },
    {
      title: "Skill-Based Challenges",
      subtitle: "Verbal Ability",
      rating: 5,
      time: "20 min",
      points: "130 XP",
      action: "Start Assessment",
    },
    {
      title: "Personality Quizzes",
      subtitle: "Work Style Compass",
      rating: 5,
      time: "20 min",
      points: "150 XP",
      action: "Start Quiz",
    },
    {
      title: "Coding Logic",
      subtitle: "Score: 92% (Completed)",
      rating: 5,
      time: "25 min",
      points: "200 XP",
      action: "Completed",
      disabled: true,
    },
    {
      title: "Design Principles",
      subtitle: "Creative Design Tasks",
      rating: 5,
      time: "40 min",
      points: "230 XP",
      action: "Start Assessment",
    },
    {
      title: "Recommended Next Steps",
      subtitle: "Project Management Simulation",
      rating: 4,
      time: "30 min",
      points: "520 XP",
      action: "Explore",
    },
  ];

  return (
    <div className="glass-card glow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gradient">Assessment Journey</h2>

      {/* 🔹 Timeline Progression */}
      <div className="flex items-center justify-between mb-12 relative">
        {stages.map((stage, idx) => (
          <div key={stage.id} className="flex flex-col items-center flex-1 relative">
            {/* Node */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 
              ${stage.active ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white" : "bg-gray-700 text-gray-400"}
            `}
            >
              {stage.id}
            </div>
            {/* Label */}
            <p className="text-sm mt-2 text-gray-300 text-center">{stage.label}</p>
            {/* Connector line */}
            {idx < stages.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-1 -translate-x-1/2 
                ${stage.active ? "bg-gradient-to-r from-orange-500 to-pink-500" : "bg-gray-600"}`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* 🔹 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="glass-card p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1 text-white">{card.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{card.subtitle}</p>

              {/* Rating Stars */}
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${i < card.rating ? "text-yellow-400" : "text-gray-500"}`}
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
            <button
              className={`mt-4 w-full py-2 rounded-lg font-semibold 
              ${
                card.disabled
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
              }`}
              disabled={card.disabled}
            >
              {card.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getUserName = () => {
    if (user && user.fullName) {
      return user.fullName.split(' ')[0];
    }
    return 'Aditi';
  };

  const getUserAvatar = () => {
    if (user && user.avatar) {
      return user.avatar;
    }
    const name = getUserName();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=F97316&color=fff`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000000] font-sans transition-colors duration-200">
      <div className="bg-gray-50 dark:bg-[#000000] overflow-hidden transition-colors duration-200">
        <Navbar />

        <div className="px-8 py-8">
          {/* Greeting + Avatar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-4 sm:mb-0">
              Good afternoon, {getUserName()}
            </h1>
            <span className="avatar-gradient">
              <img
                src={getUserAvatar()}
                alt={getUserName()}
                onError={(e) => {
                  const name = getUserName();
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    name
                  )}&background=F97316&color=fff`;
                }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
              />
            </span>
          </div>

          {/* 🔹 Add Assessment Journey Here */}
          {/* <AssessmentJourney /> */}

          {/* Existing Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="glass-card glow-sm p-4">
                <CareerRecommendations />
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <div className="glass-card glow-sm p-4">
                  <SkillProgress />
                </div>
              </div>
              <div className="glass-card glow-sm p-4">
                <UpcomingLearningModules />
              </div>
              <div className="glass-card glow-sm p-4">
                <Achievements />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
