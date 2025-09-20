import React from 'react';
import { BookOpen } from 'lucide-react';

const modules = [
  { id: 1, title: 'Data Department', description: 'Module 1 of 2' },
  { id: 2, title: 'Digital Marketing', description: 'Module 1 of 3' },
];

const UpcomingLearningModules = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-200">Upcoming Learning Modules</h3>
      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="flex items-center space-x-4">
            <div className="bg-orange-100 dark:bg-blue-900 p-3 rounded-full transition-colors duration-200">
              <BookOpen size={20} className="text-orange-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">{module.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">{module.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingLearningModules;
