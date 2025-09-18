import React from 'react';
import { BookOpen } from 'lucide-react';

const modules = [
  { id: 1, title: 'Data Department', description: 'Module 1 of 2' },
  { id: 2, title: 'Digital Marketing', description: 'Module 1 of 3' },
];

const UpcomingLearningModules = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Learning Modules</h3>
      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-700">{module.title}</p>
              <p className="text-sm text-gray-500">{module.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingLearningModules;
