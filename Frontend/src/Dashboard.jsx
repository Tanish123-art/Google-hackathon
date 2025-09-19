import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CareerRecommendations from './components/CareerRecommendations';
import SkillProgress from './components/SkillProgress';
import UpcomingLearningModules from './components/UpcomingLearningModules';
import Achievements from './components/Achievements';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getUserName = () => {
    if (user && user.fullName) {
      return user.fullName.split(' ')[0]; // Get first name
    }
    return 'Aditi'; // Default fallback
  };

  const getUserAvatar = () => {
    if (user && user.avatar) {
      return user.avatar;
    }
    const name = getUserName();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=F97316&color=fff`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000000] font-sans transition-colors duration-200">
      <div className="bg-gray-50 dark:bg-[#000000] overflow-hidden transition-colors duration-200">
        <Navbar />

        <div className="px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-4 sm:mb-0">Good afternoon, {getUserName()}</h1>
            <span className="avatar-gradient">
              <img
                src={getUserAvatar()}
                alt={getUserName()}
                onError={(e) => {
                  const name = getUserName();
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=F97316&color=fff`;
                }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
              />
            </span>
          </div>

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
