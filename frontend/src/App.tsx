import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProfileSettings from './ProfileSettings';
import CareerExploration from './CareerExploration';
import SkillDevelopment from './SkillDevelopment';
import Mentorship from './Mentorship';
import JobMarketplace from './JobMarketplace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/assessments" element={<Dashboard />} /> {/* Placeholder */}
        <Route path="/resources" element={<Dashboard />} /> {/* Placeholder */}
        <Route path="/career-exploration" element={<CareerExploration />} />
        <Route path="/skill-development" element={<SkillDevelopment />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/job-marketplace" element={<JobMarketplace />} />
      </Routes>
    </Router>
  );
}

export default App;
