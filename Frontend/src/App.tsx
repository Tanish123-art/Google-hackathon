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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/onboarding" element={<OnboardingChat />} />
            <Route path="/assessments" element={<AssessmentJourney />} />
            <Route path="/assessment/:id" element={<AssessmentPage />} />
            <Route path="/resources" element={<Dashboard />} />
            <Route path="/career-exploration" element={<CareerExploration />} />
            <Route path="/skill-development" element={<SkillDevelopment />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/job-marketplace" element={<JobMarketplace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
