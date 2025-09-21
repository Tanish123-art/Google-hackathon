import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Authenticated Layout - With navbar for logged-in users
const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="w-full px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
