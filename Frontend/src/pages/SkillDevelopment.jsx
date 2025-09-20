import React from 'react';
import Navbar from '../components/Navbar';
import { Book, Play, BarChart, Award, ArrowRight, User, Code, Database, FlaskConical, Rocket, Settings, CircleDot, Square, Mail, GraduationCap } from 'lucide-react';

const SkillDevelopment = () => {
  const roadmapLevels = [
    { id: 1, name: 'Level 1: Basics', icon: <User size={16} className="text-white" /> },
    { id: 2, name: 'Level 2: Dotorost', icon: <Square size={16} className="text-white" /> },
    { id: 3, name: 'Level 3: Lopreest', icon: <Mail size={16} className="text-white" /> },
    { id: 4, name: 'Level 4: Reywbadion', icon: <FlaskConical size={16} className="text-white" /> },
    { id: 5, name: 'Level 2: Data Machine Learning', icon: <Code size={16} className="text-white" /> },
    { id: 6, name: 'Level 1: Eartbtis', icon: <Rocket size={16} className="text-white" /> },
  ];

  const learningPathModules = [
    { id: 1, title: 'Intro to Python for Data Science', platform: 'Coursera', icon: <Book size={20} className="text-gray-400" />, type: 'course' },
    { id: 2, title: 'Advanced SQL Techniques', platform: 'Coursera', icon: <GraduationCap size={20} className="text-gray-400" />, type: 'certification' },
    { id: 3, title: 'Advanced SQL Techniques', platform: 'Udemy', icon: <Mail size={20} className="text-gray-400" />, type: 'course' },
    { id: 4, title: 'Courep tdlqyret oat', platform: 'Udemy', icon: <Book size={20} className="text-gray-400" />, type: 'module' },
  ];

  const badges = [
    { id: 1, icon: <Award size={32} className="text-orange-500" /> },
    { id: 2, icon: <BarChart size={32} className="text-blue-500" /> },
    { id: 3, icon: <Database size={32} className="text-green-500" /> },
    { id: 4, icon: <Code size={32} className="text-purple-500" /> },
    { id: 5, icon: <Settings size={32} className="text-red-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000000] font-sans text-gray-900 dark:text-white transition-colors duration-200">
      <Navbar />
      <div className="px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gradient">Skill Development Hub</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gamified Roadmap */}
          <div className="p-6 glass-card glow-sm animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Gamified Roadmap</h2>
              <Settings size={20} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Your Skill Quest</h3>
            <div className="relative flex flex-wrap justify-center items-center gap-x-12 gap-y-8 py-8">
              {roadmapLevels.map((level, index) => (
                <React.Fragment key={level.id}>
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${index === 0 ? 'border-orange-500 bg-orange-500' : 'border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700'}`}>
                      {level.icon}
                    </div>
                    <p className="text-xs mt-2 text-center text-gray-700 dark:text-white">{level.name}</p>
                  </div>
                  {index < roadmapLevels.length - 1 && (
                    <div className="absolute h-1 rounded-full" style={{
                      width: `${100 / (roadmapLevels.length - 1) * 0.8}vw`,
                      left: `${(index + 0.5) * (100 / roadmapLevels.length)}%`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'linear-gradient(90deg, rgba(107,114,128,0.5), rgba(31,41,55,0.5))',
                      zIndex: 0
                    }}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <button className="mt-6 w-full btn-image-flow" style={{ ['--flow-gradient']: `linear-gradient(135deg, rgba(251,146,60,0.95), rgba(236,72,153,0.95))` }}>
              <span>Continue Your Journey</span>
            </button>
          </div>

          {/* My Learning Path */}
          <div className="p-6 glass-card glow-sm animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">My Learning Path</h2>
              <Settings size={20} className="text-gray-500 dark:text-gray-400" />
            </div>
            <div className="space-y-4">
              {learningPathModules.map((module, index) => (
                <div key={module.id} className="flex items-center justify-between bg-orange-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                  <div className="flex items-center">
                    {module.icon}
                    <div className="ml-3">
                      <p className="font-medium text-gray-900 dark:text-white">{module.title}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{module.platform}</p>
                    </div>
                  </div>
                  {module.type === 'module' ? (
                    <button className="px-4 py-2 btn-image-flow text-sm" style={{ ['--flow-gradient']: `linear-gradient(135deg, rgba(251,146,60,0.95), rgba(236,72,153,0.95))` }}>
                      <span>Start Module</span>
                    </button>
                  ) : (
                    <Play size={24} className="text-orange-500 cursor-pointer hover:text-orange-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Skill Gap Analysis */}
          <div className="p-6 glass-card glow-sm animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Skill Gap Analysis</h2>
              <Settings size={20} className="text-gray-500 dark:text-gray-400" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Target Role Requirements</p>
            <div className="flex items-end h-32 mb-4">
              <div className="flex flex-col items-center mx-2">
                <div className="w-8 bg-orange-500 rounded-t-sm" style={{ height: '20%' }}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">0-30</span>
              </div>
              <div className="flex flex-col items-center mx-2">
                <div className="w-8 bg-orange-500 rounded-t-sm" style={{ height: '40%' }}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">30-90</span>
              </div>
              <div className="flex flex-col items-center mx-2">
                <div className="w-8 bg-orange-500 rounded-t-sm" style={{ height: '80%' }}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">90-100</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2 text-sm mb-6">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                <span className="text-gray-700 dark:text-white">Current of Analysis</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-gray-700 dark:text-white">SQL Databases</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                <span className="text-gray-700 dark:text-white">Resgemses (High Priority)</span>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Current Skills</p>
            <div className="flex justify-between items-center bg-orange-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
              <p className="font-medium text-gray-900 dark:text-white">Sugeestebases (High Priority)</p>
              <ArrowRight size={20} className="text-gray-500 dark:text-gray-400" />
            </div>
          </div>

          {/* Overall Tracking */}
          <div className="p-6 glass-card glow-sm flex flex-col items-center justify-center animate-fade-in">
            <div className="flex justify-between items-center w-full mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Overall Tracking</h2>
              <Settings size={20} className="text-gray-500 dark:text-gray-400" />
            </div>
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <div className="absolute w-full h-full rounded-full border-4 border-gray-300 dark:border-gray-700"></div>
              <div
                className="absolute w-full h-full rounded-full border-4 border-orange-500"
                style={{
                  clipPath: 'polygon(50% 0%, 50% 50%, 100% 50%, 100% 0%)', // Placeholder for 72%
                  transform: 'rotate(130deg)' // Adjust rotation for 72%
                }}
              ></div>
              <span className="text-3xl font-bold text-orange-500 z-10">72%</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">Complete</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>Courses Completes: <span className="font-medium text-gray-900 dark:text-white">5</span></p>
              <p>Hours Logged: <span className="font-medium text-gray-900 dark:text-white">35</span></p>
              <p>Hours Logged: <span className="font-medium text-gray-900 dark:text-white">35</span></p>
              <p>Badges Earned: <span className="font-medium text-gray-900 dark:text-white">3</span></p>
            </div>
          </div>
        </div>

        {/* Featured Badges */}
        <div className="p-6 glass-card glow-sm animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Featured Badges</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {badges.map((badge) => (
              <div key={badge.id} className="w-20 h-20 bg-orange-50 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-orange-200 dark:border-gray-600 transition-colors duration-200">
                {badge.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopment;
