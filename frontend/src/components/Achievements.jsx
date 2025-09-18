import React from 'react';
import { Award, Search, Lightbulb, MessageSquare } from 'lucide-react';

const achievements = [
  { id: 1, icon: Award, color: 'text-orange-500' },
  { id: 2, icon: Search, color: 'text-orange-500' },
  { id: 3, icon: Lightbulb, color: 'text-orange-500' },
  { id: 4, icon: MessageSquare, color: 'text-orange-500' },
];

const Achievements = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Achievements</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {achievements.map((ach) => (
          <div key={ach.id} className="flex items-center justify-center w-14 h-14 bg-orange-100 rounded-full">
            <ach.icon size={24} className={ach.color} />
          </div>
        ))}
        <div className="flex items-center justify-center w-14 h-14 bg-orange-100 rounded-full">
          <span className="text-orange-500 font-bold text-lg">+</span>
        </div>
      </div>
      <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors">
        View All
      </button>
    </div>
  );
};

export default Achievements;
