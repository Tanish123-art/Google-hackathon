import React from 'react';
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="nav-gradient rounded-b-lg transition-colors duration-200 relative z-50 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase size={24} className="text-orange-500" />
            <span className="font-bold text-lg text-gradient">Career Counselling</span>
          </Link>

          {/* Auth Actions */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/signin" 
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link to="/signup" className="btn-image-flow"><span>Sign Up</span></Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
