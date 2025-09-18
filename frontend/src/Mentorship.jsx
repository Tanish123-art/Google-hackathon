import React from 'react';
import Navbar from './components/Navbar';

const Mentorship = () => {
  return (
    <div className="min-h-screen bg-[#1a2035] font-sans text-white">
      <Navbar />
      <div className="px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Mentorship and Community Engagement</h1>
        <p className="text-lg">Connect with industry professionals and peers through mentor connect, community forums, and live events.</p>
        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon: Mentor Connect</h2>
          <p className="text-gray-300">Find and connect with industry professionals for guidance, filtered by industry, company, or area of expertise.</p>
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Mentorship Placeholder"
            className="mt-6 rounded-lg object-cover w-full h-64"
          />
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
