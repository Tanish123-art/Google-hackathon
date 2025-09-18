import React from 'react';
import Navbar from './components/Navbar';
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
    <div className="min-h-screen bg-[#1a2035] font-sans text-white">
      <Navbar />
      <div className="px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Skill Development Hub</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gamified Roadmap */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Gamified Roadmap</h2>
              <Settings size={20} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-4">Your Skill Quest</h3>
            <div className="relative flex flex-wrap justify-center items-center gap-x-12 gap-y-8 py-8">
              {roadmapLevels.map((level, index) => (
                <React.Fragment key={level.id}>
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${index === 0 ? 'border-orange-500 bg-orange-500' : 'border-gray-600 bg-gray-700'}`}>
                      {level.icon}
                    </div>
                    <p className="text-xs mt-2 text-center">{level.name}</p>
                  </div>
                  {index < roadmapLevels.length - 1 && (
                    <div className="absolute h-0.5 bg-gray-600" style={{
                      width: `${100 / (roadmapLevels.length - 1) * 0.8}vw`, // Adjust width dynamically
                      left: `${(index + 0.5) * (100 / roadmapLevels.length)}%`, // Position between circles
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 0
                    }}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <button className="mt-6 w-full py-3 bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium">
              Continue Your Journey
            </button>
          </div>

          {/* My Learning Path */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">My Learning Path</h2>
              <Settings size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {learningPathModules.map((module, index) => (
                <div key={module.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    {module.icon}
                    <div className="ml-3">
                      <p className="font-medium">{module.title}</p>
                      <p className="text-gray-400 text-sm">{module.platform}</p>
                    </div>
                  </div>
                  {module.type === 'module' ? (
                    <button className="px-4 py-2 bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm font-medium">
                      Start Module
                    </button>
                  ) : (
                    <Play size={24} className="text-orange-500 cursor-pointer hover:text-orange-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Skill Gap Analysis */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Skill Gap Analysis</h2>
              <Settings size={20} className="text-gray-400" />
            </div>
            <p className="text-gray-300 text-sm mb-4">Target Role Requirements</p>
            <div className="flex items-end h-32 mb-4">
              <div className="flex flex-col items-center mx-2">
                <div className="w-8 bg-orange-500 rounded-t-sm" style={{ height: '20%' }}></div>
                <span className="text-xs text-gray-400 mt-1">0-30</span>
              </div>
              <div className="flex flex-col items-center mx-2">
                <div className="w-8 bg-orange-500 rounded-t-sm" style={{ height: '40%' }}></div>
                <span className="text-xs text-gray-400 mt-1">30-90</span>
              </div>
              <div className="flex flex-col items-center mx-2">
                <div className="w-8 bg-orange-500 rounded-t-sm" style={{ height: '80%' }}></div>
                <span className="text-xs text-gray-400 mt-1">90-100</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2 text-sm mb-6">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                <span>Current of Analysis</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span>SQL Databases</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                <span>Resgemses (High Priority)</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-2">Current Skills</p>
            <div className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
              <p className="font-medium">Sugeestebases (High Priority)</p>
              <ArrowRight size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Overall Tracking */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center">
            <div className="flex justify-between items-center w-full mb-4">
              <h2 className="text-2xl font-semibold">Overall Tracking</h2>
              <Settings size={20} className="text-gray-400" />
            </div>
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <div className="absolute w-full h-full rounded-full border-4 border-gray-700"></div>
              <div
                className="absolute w-full h-full rounded-full border-4 border-orange-500"
                style={{
                  clipPath: 'polygon(50% 0%, 50% 50%, 100% 50%, 100% 0%)', // Placeholder for 72%
                  transform: 'rotate(130deg)' // Adjust rotation for 72%
                }}
              ></div>
              <span className="text-3xl font-bold text-orange-500 z-10">72%</span>
            </div>
            <p className="text-gray-300 text-lg mb-4">Complete</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-300">
              <p>Courses Completes: <span className="font-medium text-white">5</span></p>
              <p>Hours Logged: <span className="font-medium text-white">35</span></p>
              <p>Hours Logged: <span className="font-medium text-white">35</span></p>
              <p>Badges Earned: <span className="font-medium text-white">3</span></p>
            </div>
          </div>
        </div>

        {/* Featured Badges */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Featured Badges</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {badges.map((badge) => (
              <div key={badge.id} className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
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
