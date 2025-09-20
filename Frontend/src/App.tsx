import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/DashboardPage';
import ProfileSettings from './pages/ProfileSettingSPage';
import CareerExploration from './pages/CareerExplorationPage';
import SkillDevelopment from './pages/SkillDevelopment';
import Mentorship from './pages/MentorshipPage';
import JobMarketplace from './pages/jobMarketplacePage';
import AssessmentJourney from './pages/AssessmentsPage';
import AssessmentPage from './pages/AssessmentPage';
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
                ? <ProfileSettings />
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
                ? <AssessmentJourney />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/assessment/:id"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <AssessmentPage />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/resources"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <Dashboard />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/career-exploration"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <CareerExploration />
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
                ? <Mentorship />
                : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/job-marketplace"
            element={
              localStorage.getItem('isAuthenticated') === 'true'
                ? <JobMarketplace />
                : <Navigate to="/signin" replace />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
