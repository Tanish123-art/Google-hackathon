import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, BookOpen, Target, ArrowRight, Menu, X, ChevronUp } from 'lucide-react';

const GuestLandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="text-orange-500" size={24} sm:size={32} />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              Career Counselling
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link 
              to="/signin" 
              className="text-base text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors text-base"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 z-50">
            <div className="px-4 py-4 space-y-3">
              <Link 
                to="/signin" 
                className="block text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center w-full">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Discover Your Perfect Career Path
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 w-full leading-relaxed">
            Get personalized career guidance, skill assessments, and mentorship opportunities 
            to advance your professional journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
            <Link 
              to="/signup" 
              className="w-full sm:w-auto bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Start Your Journey
              <ArrowRight className="ml-2" size={18} sm:size={20} />
            </Link>
            <Link 
              to="/signin" 
              className="w-full sm:w-auto border-2 border-orange-500 text-orange-500 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-orange-500" size={32} sm:size={40} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Career Assessment
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Take comprehensive aptitude tests to discover your strengths and career preferences.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-orange-500" size={32} sm:size={40} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Skill Development
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Access personalized learning modules and track your skill development progress.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-orange-500" size={32} sm:size={40} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Mentorship
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Connect with industry professionals and get guidance for your career growth.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 lg:mt-20 py-6 sm:py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm sm:text-base">&copy; 2024 Career Counselling. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
};

export default GuestLandingPage;
