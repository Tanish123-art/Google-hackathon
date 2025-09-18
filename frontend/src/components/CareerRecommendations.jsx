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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Career Recommendations</h3>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={rec.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
              <span className="text-gray-700 font-medium">{rec.title}</span>
            </div>
            <img src={rec.secondaryAvatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          </div>
        ))}
      </div>
      <button className="mt-6 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors">
        View All
      </button>
    </div>
  );
};

export default CareerRecommendations;
