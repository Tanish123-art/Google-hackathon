import React from 'react';
import { Briefcase, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleBellClick = () => {
    alert('Notifications clicked!');
    console.log('Notifications icon clicked');
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#1a2035] text-white rounded-t-lg border-b border-gray-700">
      {/* Left side: Logo */}
      <div className="flex items-center space-x-2">
        <Briefcase size={24} className="text-orange-500" />
        <span className="font-bold text-lg">Career Courssting</span>
      </div>

      {/* Right side: Nav links and Icons */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-orange-400 transition-colors duration-200">Dashboard</Link>
        <Link to="/career-exploration" className="hover:text-orange-400 transition-colors duration-200">Career Exploration</Link>
        <Link to="/skill-development" className="hover:text-orange-400 transition-colors duration-200">Skill Development</Link>
        <Link to="/mentorship" className="hover:text-orange-400 transition-colors duration-200">Mentorship</Link>
        <Link to="/job-marketplace" className="hover:text-orange-400 transition-colors duration-200">Job Marketplace</Link>
        <Link to="/assessments" className="hover:text-orange-400 transition-colors duration-200">Assessments</Link>
        <Link to="/resources" className="hover:text-orange-400 transition-colors duration-200">Resources</Link>
        <Bell size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" onClick={handleBellClick} />
        <Link to="/profile">
          <User size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
