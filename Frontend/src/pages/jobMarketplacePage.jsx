import React from 'react';
import { Search, Briefcase, MapPin, CheckCircle, Bookmark } from 'lucide-react';

const JobMarketplacePage = () => {
  const recommendedJobs = [
    {
      id: 1,
      title: 'Senior Data Analyst',
      company: 'Company Name',
      location: 'IT Management SQL',
      description: 'Perlürcltiere',
      skills: ['Peat Python'],
      logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      title: 'Sed Software Engineer',
      company: 'Company Name',
      location: 'IT Hermagent SQL',
      description: 'Perfahcttiane',
      skills: ['Peat Python'],
      logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      title: 'Lead Software Engineer',
      company: 'Company Name',
      location: 'IT Hermagent SQL',
      description: 'Perlutrctiere',
      skills: ['Peat Python'],
      logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      title: 'Project Manager - IT',
      company: 'Company Name',
      location: 'IT Hermagent SQL',
      description: 'Portlncttiane',
      skills: ['Peat Python'],
      logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 5,
      title: 'Senior Data Manager - IT',
      company: 'Company Name',
      location: 'IT Hermagent SQL',
      description: 'Perlürcltiere',
      skills: ['Peat Python'],
      logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 6,
      title: 'Senior Dotware Manger IT',
      company: 'Company Name',
      location: 'IT Hermagent SQL',
      description: 'Perfahcttiane',
      skills: ['Peat Python'],
      logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  const skillsMatch = [
    { skill: 'Data Analysis', match: 85 },
    { skill: 'Cloud Computing', match: 70 },
    { skill: 'Cloud Analysis', match: 50 },
  ];

  const savedJobs = [
    { id: 1, title: 'Data Analysis', company: 'Pas Aunis' },
    { id: 2, title: 'Digital Marketing', company: 'Digtal Mkt' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#000000] font-sans text-gray-900 dark:text-white transition-colors duration-200">
      <div className="px-8 py-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="relative flex-grow w-full sm:w-auto">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for jobs, companies..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white transition-colors duration-200"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm text-gray-900 dark:text-white">
              Filter by Role
            </button>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm text-gray-900 dark:text-white">
              Filter by Location
            </button>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm text-gray-900 dark:text-white">
              Experience Level
            </button>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm text-gray-900 dark:text-white">
              Experience Level
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gradient">Job Openings for You</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommended Jobs Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Recommended Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="glass-card glow-sm p-5 flex flex-col justify-between animate-fade-in">
                  <div>
                    <div className="flex items-center mb-3">
                      <img src={job.logo} alt="Company Logo" className="w-10 h-10 rounded-full object-cover mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{job.company}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{job.location}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">{job.description}</p>
                    <div className="flex items-center text-orange-500 text-sm mb-4">
                      <CheckCircle size={16} className="mr-1" />
                      <span>{job.skills.join(', ')}</span>
                    </div>
                  </div>
                  <button className="mt-auto w-full btn-image-flow" style={{ ['--flow-gradient']: `linear-gradient(135deg, rgba(251,146,60,0.95), rgba(236,72,153,0.95))` }}>
                    <span>Apply Now</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Skills Match */}
            <div className="glass-card glow-sm p-6 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Skills Match</h2>
              {skillsMatch.map((skill) => (
                <div key={skill.skill} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{skill.skill}</span>
                    <span className="text-orange-500 font-medium">{skill.match}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${skill.match}%` }}></div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-6">
                <span className="text-gray-700 dark:text-gray-300">Cloud Computing</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                </label>
              </div>
            </div>

            {/* Saved Jobs */}
            <div className="glass-card glow-sm p-6 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Saved Jobs</h2>
              {savedJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between mb-4 last:mb-0">
                  <div className="flex items-center">
                    <Bookmark size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{job.title}</p>
                      <p className="text-gray-600 dark:text-gray-500 text-sm">{job.company}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm text-white">
                    Explore More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMarketplacePage;
