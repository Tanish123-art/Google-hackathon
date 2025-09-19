import React from 'react';
import { ChevronRight } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: 'Software Developer',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    secondaryAvatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'Data Scientist',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    secondaryAvatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Marketing Manager',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    secondaryAvatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const CareerRecommendations = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-200">Career Recommendations</h3>
      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div key={rec.id} className="flex items-center justify-between group transform transition-all duration-200 hover:translate-x-0.5">
            <div className="flex items-center space-x-3">
              <img src={rec.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:shadow-md transition-shadow duration-200" />
              <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-200">{rec.title}</span>
            </div>
            <img src={rec.secondaryAvatar} alt="avatar" className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:shadow-md transition-shadow duration-200" />
          </div>
        ))}
      </div>
      <button className="mt-6 w-full btn-image-flow" style={{ ['--flow-gradient']: `linear-gradient(135deg, rgba(251,146,60,0.95), rgba(236,72,153,0.95))` }}>
        <span>View All</span>
      </button>
    </div>
  );
};

export default CareerRecommendations;
