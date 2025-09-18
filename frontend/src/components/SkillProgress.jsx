import React from 'react';

const skills = [
  { id: 1, name: 'Programming', progress: 75 },
  { id: 2, name: 'Communication', progress: 50 },
];

const SkillProgress = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Skill Progress</h3>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.id}>
            <p className="text-gray-700 font-medium mb-2">{skill.name}</p>
            <div className="flex items-center space-x-3">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-orange-500 h-2.5 rounded-full"
                  style={{ width: `${skill.progress}%` }}
                ></div>
              </div>
              <span className="text-gray-600 text-sm">{skill.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillProgress;
