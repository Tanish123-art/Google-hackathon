import React, { useState, useEffect } from 'react';
import { Briefcase, Bell, User, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    if (typeof window !== 'undefined') {
      window.location.replace('/signin');
    } else {
      navigate('/signin', { replace: true });
    }
  };

  // Helper function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 nav-gradient text-gray-900 dark:text-white rounded-t-lg relative z-50 overflow-visible">
      {/* Left side: Logo */}
      <div className="flex items-center space-x-2 group">
        <span className="icon-btn bg-transparent p-0"><Briefcase size={24} className="text-orange-500 icon icon-hover" /></span>
        <span className="font-bold text-lg text-gradient">Career Counselling</span>
      </div>

      {/* Right side: Nav links and Icons */}
      <div className="flex items-center space-x-6">
        {isAuthenticated ? (
          <>
            <Link to="/" className={`relative hover:text-orange-500 transition-colors duration-200 ${isActive('/') ? 'text-orange-500' : ''}`}>
              Dashboard
              {isActive('/') && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 animate-pulse"></div>}
            </Link>
            <Link to="/career-exploration" className={`relative hover:text-orange-500 transition-colors duration-200 ${isActive('/career-exploration') ? 'text-orange-500' : ''}`}>
              Career Exploration
              {isActive('/career-exploration') && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 animate-pulse"></div>}
            </Link>
            <Link to="/skill-development" className={`relative hover:text-orange-500 transition-colors duration-200 ${isActive('/skill-development') ? 'text-orange-500' : ''}`}>
              Skill Development
              {isActive('/skill-development') && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 animate-pulse"></div>}
            </Link>
            <Link to="/mentorship" className={`relative hover:text-orange-500 transition-colors duration-200 ${isActive('/mentorship') ? 'text-orange-500' : ''}`}>
              Mentorship
              {isActive('/mentorship') && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 animate-pulse"></div>}
            </Link>
            <Link to="/job-marketplace" className={`relative hover:text-orange-500 transition-colors duration-200 ${isActive('/job-marketplace') ? 'text-orange-500' : ''}`}>
              Job Marketplace
              {isActive('/job-marketplace') && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 animate-pulse"></div>}
            </Link>
            <Link to="/assessments" className={`relative hover:text-orange-500 transition-colors duration-200 ${isActive('/assessments') ? 'text-orange-500' : ''}`}>
              Assessments
              {isActive('/assessments') && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 animate-pulse"></div>}
            </Link>
            <button onClick={handleBellClick} className="icon-btn bg-transparent p-0 group" title="Notifications">
              <Bell size={20} className="text-gray-600 dark:text-gray-400 icon icon-hover" />
            </button>
            <ThemeToggle />
            <Link to="/profile" className="icon-btn bg-transparent p-0 group" title="Profile">
              <User size={20} className="text-gray-600 dark:text-gray-400 icon icon-hover" />
            </Link>
            <button onClick={handleLogout} className="icon-btn bg-transparent p-0 group" title="Logout">
              <LogOut size={20} className="text-gray-600 dark:text-gray-400 icon icon-hover" />
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className={`relative hover:text-orange-500 transition-colors duration-200 ${isActive('/signin') ? 'text-orange-500' : ''}`}>
              Sign In
              {isActive('/signin') && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 animate-pulse"></div>}
            </Link>
            <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200">Sign Up</Link>
            <ThemeToggle />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
