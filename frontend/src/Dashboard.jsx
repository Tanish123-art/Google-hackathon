import React from 'react';
import Navbar from './components/Navbar';
import CareerRecommendations from './components/CareerRecommendations';
import SkillProgress from './components/SkillProgress';
import UpcomingLearningModules from './components/UpcomingLearningModules';
import Achievements from './components/Achievements';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#1a2035] font-sans">
      <div className="bg-[#1a2035] overflow-hidden">
        <Navbar />

        <div className="px-8 py-8"> {/* Adjusted padding for consistent full-width layout */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-0">Good afternoon, Aditi</h1>
            <img
              src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Aditi"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CareerRecommendations />
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <SkillProgress />
              </div>
              <UpcomingLearningModules />
              <Achievements />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
