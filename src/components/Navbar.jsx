import React, { useState, useEffect } from 'react';
import { Briefcase, Bell, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication status on component mount
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleBellClick = () => {
    alert('Notifications clicked!');
    console.log('Notifications icon clicked');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/signin');
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-[#1a2035] text-gray-900 dark:text-white rounded-t-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      {/* Left side: Logo */}
      <div className="flex items-center space-x-2">
        <Briefcase size={24} className="text-orange-500" />
        <span className="font-bold text-lg">Career Counselling</span>
      </div>

      {/* Right side: Nav links and Icons */}
      <div className="flex items-center space-x-6">
        {isAuthenticated ? (
          <>
            <Link to="/" className="hover:text-orange-500 transition-colors duration-200">Dashboard</Link>
            <Link to="/career-exploration" className="hover:text-orange-500 transition-colors duration-200">Career Exploration</Link>
            <Link to="/skill-development" className="hover:text-orange-500 transition-colors duration-200">Skill Development</Link>
            <Link to="/mentorship" className="hover:text-orange-500 transition-colors duration-200">Mentorship</Link>
            <Link to="/job-marketplace" className="hover:text-orange-500 transition-colors duration-200">Job Marketplace</Link>
            <Link to="/assessments" className="hover:text-orange-500 transition-colors duration-200">Assessments</Link>
            <Link to="/resources" className="hover:text-orange-500 transition-colors duration-200">Resources</Link>
            <Bell size={20} className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-white cursor-pointer transition-colors duration-200" onClick={handleBellClick} />
            <ThemeToggle />
            <Link to="/profile">
              <User size={20} className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-white cursor-pointer transition-colors duration-200" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-white cursor-pointer transition-colors duration-200"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="hover:text-orange-500 transition-colors duration-200">Sign In</Link>
            <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200">Sign Up</Link>
            <ThemeToggle />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
