import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Search, Lightbulb, TrendingUp, GraduationCap, Briefcase, FlaskConical, Brain, Rocket, Users, Code, BarChart, Settings, Plus } from 'lucide-react';

const CareerExploration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [selectedRole1, setSelectedRole1] = useState('Select Aunis');
  const [selectedRole2, setSelectedRole2] = useState('Des Auris');

  const aiRecommendedRoles = [
    {
      id: 1,
      title: 'AI Prompt Engineer',
      recommended: '103 SQL',
      icon: <Brain size={20} className="text-orange-500" />,
    },
    {
      id: 2,
      title: 'Ethical Ehicsk Hacker',
      recommended: '103 SQL',
      icon: <Code size={20} className="text-blue-500" />,
    },
  ];

  const detailedCareerCards = [
    {
      id: 1,
      title: 'Data Scientist',
      company: 'Company Name',
      description: 'Aropteaf or corees st ollus in the tirrdicrenger. Ttbe nute 8 vior fote',
      skills: ['#Pida', '#Irupltcase'],
      logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'Company Name',
      description: 'Arode af corees st ollus in the tirrdicrenger. Ttbe nute 8 vior fote',
      skills: ['#Agile', '#Poaes'],
      logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      title: 'Cloud Architect',
      company: 'Company Name',
      description: 'Tingde af corees st ollus in the tirrdicrenger. Ttbe nute 8 vior fote',
      skills: ['#Agile', '#Tttoan'],
      logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      title: 'Product Manager',
      company: 'Company Name',
      description: 'Aropteaf or corees st ollus in the tirrdicrenger. Ttbe nute 8 vior fote',
      skills: ['#Pida', '#Irupltcase'],
      logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log('Searching for:', e.target.value);
  };

  const handleFilterClick = (filterType) => {
    alert(`Filter by ${filterType} clicked!`);
    console.log(`Filter by ${filterType} clicked`);
  };

  const handleMapPlusClick = () => {
    alert('Interactive Career Map "Plus" button clicked!');
    console.log('Interactive Career Map "Plus" button clicked');
  };

  const handleInterestInputChange = (e) => {
    setInterestInput(e.target.value);
    console.log('AI-Powered Discovery input:', e.target.value);
  };

  const handleExplorePaths = () => {
    alert(`Exploring paths for ${selectedRole1} and ${selectedRole2}!`);
    console.log(`Exploring paths for ${selectedRole1} and ${selectedRole2}`);
  };

  const handleExpandMore = () => {
    alert('Expand More button clicked!');
    console.log('Expand More button clicked');
  };

  const handleCardAction = (action, cardTitle) => {
    alert(`${action} for ${cardTitle} clicked!`);
    console.log(`${action} for ${cardTitle} clicked`);
  };

  return (
    <div className="min-h-screen bg-[#1a2035] font-sans text-white">
      <Navbar />
      <div className="px-8 py-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="relative flex-grow w-full sm:w-auto">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for jobs, companies..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleFilterClick('Role')}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
            >
              Filter by Role
            </button>
            <button
              onClick={() => handleFilterClick('Location')}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
            >
              Filter by Location
            </button>
            <button
              onClick={() => handleFilterClick('Experience Level')}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
            >
              Experience Level
            </button>
            <button
              onClick={() => handleFilterClick('Experience Level')}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
            >
              Experience Level
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Career Exploration</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Career Map */}
          <div className="lg:col-span-1 p-6 bg-gray-800 rounded-lg shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Interactive Career Map</h2>
            <img
              src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Career Map Placeholder"
              className="mt-2 rounded-lg object-cover w-full h-48"
            />
            <button
              onClick={handleMapPlusClick}
              className="absolute top-6 right-6 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
            >
              <Plus size={20} className="text-white" />
            </button>
          </div>

          {/* AI-Powered Discovery */}
          <div className="lg:col-span-1 p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">AI-Powered Discovery</h2>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Describe your interests..."
                value={interestInput}
                onChange={handleInterestInputChange}
                className="w-full pl-4 pr-10 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Lightbulb size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {aiRecommendedRoles.map((role) => (
                <div key={role.id} className="bg-gray-700 p-4 rounded-lg flex flex-col items-start">
                  <div className="flex items-center mb-2">
                    {role.icon}
                    <span className="ml-2 text-sm font-medium">{role.title}</span>
                  </div>
                  <p className="text-gray-400 text-xs">Recommended</p>
                  <p className="text-gray-300 text-xs">{role.recommended}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Comparison Tool */}
          <div className="lg:col-span-1 p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Career Comparison Tool</h2>
            <div className="mb-4">
              <label htmlFor="role1" className="block text-gray-300 text-sm mb-2">Select Role:</label>
              <div className="flex items-center gap-2">
                <select
                  id="role1"
                  value={selectedRole1}
                  onChange={(e) => setSelectedRole1(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-300"
                >
                  <option>Select Aunis</option>
                  <option>Data Scientist</option>
                  <option>Software Engineer</option>
                </select>
                <button
                  onClick={handleExplorePaths}
                  className="px-4 py-2 bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium text-sm"
                >
                  Explore Paths
                </button>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="role2" className="block text-gray-300 text-sm mb-2">Select Role:</label>
              <select
                id="role2"
                value={selectedRole2}
                onChange={(e) => setSelectedRole2(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-300"
              >
                <option>Des Auris</option>
                <option>Cloud Architect</option>
                <option>Project Manager</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <BarChart size={16} className="text-gray-400 mr-2" />
                <span>Average Salary</span>
              </div>
              <div className="flex items-center">
                <TrendingUp size={16} className="text-gray-400 mr-2" />
                <span>Growth Potential</span>
              </div>
              <div className="flex items-center">
                <GraduationCap size={16} className="text-gray-400 mr-2" />
                <span>Required Education</span>
              </div>
              <div className="flex items-center">
                <Briefcase size={16} className="text-gray-400 mr-2" />
                <span>Top Skills</span>
              </div>
            </div>
            <button
              onClick={handleExpandMore}
              className="mt-6 w-full py-2 bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium"
            >
              Expand More
            </button>
          </div>
        </div>

        {/* Detailed Career Cards */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Detailed Career Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {detailedCareerCards.map((card) => (
              <div key={card.id} className="bg-gray-800 p-5 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-3">
                    <img src={card.logo} alt="Company Logo" className="w-10 h-10 rounded-full object-cover mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold">{card.title}</h3>
                      <p className="text-gray-400 text-sm">{card.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mb-4">{card.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleCardAction('Review / Move', card.title)}
                    className="flex-1 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium text-sm"
                  >
                    Review / Move
                  </button>
                  <button
                    onClick={() => handleCardAction('Apply Now', card.title)}
                    className="flex-1 py-2 bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium text-sm"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerExploration;
