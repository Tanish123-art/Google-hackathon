import React from 'react';
import { Outlet } from 'react-router-dom';

// Guest Layout - No navbar, just the content
const GuestLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
