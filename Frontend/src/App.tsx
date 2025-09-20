import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardPage from './pages/DashboardPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import CareerExplorationPage from './pages/CareerExplorationPage';
import SkillDevelopment from './pages/SkillDevelopment';
import MentorshipPage from './pages/MentorshipPage';
import JobMarketplacePage from './pages/JobMarketplacePage';
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
                ? <DashboardPage />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/signin"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <Navigate to="/" replace />
                : <SignInPage />
            }
          />
          <Route
            path="/signup"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <Navigate to="/" replace />
                : <SignUpPage />
            }
          />
          <Route
            path="/profile"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <ProfileSettingsPage />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/onboarding"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <OnboardingChat />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/assessments"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <DashboardPage />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/resources"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <DashboardPage />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/career-exploration"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <CareerExplorationPage />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/skill-development"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <SkillDevelopment />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/mentorship"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <MentorshipPage />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/job-marketplace"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <JobMarketplacePage />
                : <Navigate to="/signin" replace />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
