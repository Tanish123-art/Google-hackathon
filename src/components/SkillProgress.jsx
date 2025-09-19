import React from 'react';

const skills = [
  { id: 1, name: 'Programming', progress: 75 },
  { id: 2, name: 'Communication', progress: 50 },
];

const SkillProgress = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-200">Skill Progress</h3>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.id}>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-200">{skill.name}</p>
            <div className="flex items-center space-x-3">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 transition-colors duration-200">
                <div
                  className="bg-orange-500 h-2.5 rounded-full transition-colors duration-200"
                  style={{ width: `${skill.progress}%` }}
                ></div>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-200">{skill.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillProgress;
