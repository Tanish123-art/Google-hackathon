import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './Dashboard';
import ProfileSettings from './ProfileSettings';
import CareerExploration from './CareerExploration';
import SkillDevelopment from './SkillDevelopment';
import Mentorship from './Mentorship';
import JobMarketplace from './JobMarketplace';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import OnboardingChat from './pages/OnboardingChat';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <Dashboard />
                : <Navigate to="/signin" replace />
            }
          />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/onboarding" element={<OnboardingChat />} />
          <Route path="/assessments" element={<Dashboard />} /> {/* Placeholder */}
          <Route path="/resources" element={<Dashboard />} /> {/* Placeholder */}
          <Route path="/career-exploration" element={<CareerExploration />} />
          <Route path="/skill-development" element={<SkillDevelopment />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/job-marketplace" element={<JobMarketplace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
