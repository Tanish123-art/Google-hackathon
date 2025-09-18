import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Pencil, Bell, Lock, ChevronDown, ChevronUp, Link as LinkIcon } from 'lucide-react';

const ToggleSwitch = ({ label, initialChecked, onToggle }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked); // Pass the new state to the parent
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      <span className="text-gray-800 text-sm font-medium">{label}</span>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
          isChecked ? 'bg-orange-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
            isChecked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

const LinkedAccountsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [githubUsername, setGithubUsername] = useState('aditi_github');
  const [linkedinUsername, setLinkedinUsername] = useState('aditi-sharma');
  const [leetcodeUsername, setLeetcodeUsername] = useState('aditi_leetcode');

  const handleSaveLinkedAccounts = () => {
    console.log('Saving linked accounts:', { githubUsername, linkedinUsername, leetcodeUsername });
    alert('Linked accounts saved!');
  };

  return (
    <div className="py-3 border-b border-gray-200 last:border-b-0">
      <button
        className="flex items-center justify-between w-full text-gray-800 text-sm font-medium focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <LinkIcon size={16} className="mr-2 text-gray-600" /> Linked Accounts
        </div>
        {isOpen ? <ChevronUp size={16} className="text-gray-600" /> : <ChevronDown size={16} className="text-gray-600" />}
      </button>
      {isOpen && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center bg-gray-100 p-3 rounded-md">
            <span className="text-gray-600 text-sm mr-2 w-20">GitHub:</span>
            <input
              type="text"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className="flex-grow bg-transparent outline-none text-gray-800 font-medium"
            />
          </div>
          <div className="flex items-center bg-gray-100 p-3 rounded-md">
            <span className="text-gray-600 text-sm mr-2 w-20">LinkedIn:</span>
            <input
              type="text"
              value={linkedinUsername}
              onChange={(e) => setLinkedinUsername(e.target.value)}
              className="flex-grow bg-transparent outline-none text-gray-800 font-medium"
            />
          </div>
          <div className="flex items-center bg-gray-100 p-3 rounded-md">
            <span className="text-gray-600 text-sm mr-2 w-20">LeetCode:</span>
            <input
              type="text"
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
              className="flex-grow bg-transparent outline-none text-gray-800 font-medium"
            />
          </div>
          <button
            onClick={handleSaveLinkedAccounts}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-200 mt-4"
          >
            Save Linked Accounts
          </button>
        </div>
      )}
    </div>
  );
};

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'Aditi Sharma',
    email: 'sharma@email.com',
    password: '********',
    location: 'Bengaluru, India',
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
    location: false,
  });

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', profile);
    setIsEditing({
      name: false,
      email: false,
      password: false,
      location: false,
    });
    alert('Profile changes saved!');
  };

  const handleChangePhoto = () => {
    alert('Change photo functionality would be implemented here!');
    console.log('Change Photo button clicked');
  };

  const handleNotificationToggle = (newState) => {
    console.log('Notifications toggled to:', newState);
  };

  const handlePrivacyToggle = (newState) => {
    console.log('Privacy toggled to:', newState);
  };

  return (
    <div className="min-h-screen bg-[#1a2035] font-sans">
      <div className="bg-[#1a2035] overflow-hidden">
        <Navbar />

        <div className="px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Profile Settings</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Profile Info */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-8">
                <img
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Aditi Sharma"
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 mr-6"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
                  <p className="text-gray-600">Software Engineer</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center bg-gray-100 p-3 rounded-md">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="flex-grow bg-transparent outline-none text-gray-800 font-medium"
                    readOnly={!isEditing.name}
                  />
                  <button
                    onClick={() => handleEditToggle('name')}
                    className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
                <div className="flex items-center bg-gray-100 p-3 rounded-md">
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="flex-grow bg-transparent outline-none text-gray-800 font-medium"
                    readOnly={!isEditing.email}
                  />
                  <button
                    onClick={() => handleEditToggle('email')}
                    className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
                <div className="flex items-center bg-gray-100 p-3 rounded-md">
                  <input
                    type="password"
                    value={profile.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="flex-grow bg-transparent outline-none text-gray-800 font-medium"
                    readOnly={!isEditing.password}
                  />
                  <button
                    onClick={() => handleEditToggle('password')}
                    className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
                <div className="flex items-center bg-gray-100 p-3 rounded-md">
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="flex-grow bg-transparent outline-none text-gray-800 font-medium"
                    readOnly={!isEditing.location}
                  />
                  <button
                    onClick={() => handleEditToggle('location')}
                    className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleChangePhoto}
                  className="bg-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors duration-200"
                >
                  Change Photo
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Right Column: Skill Proficiencies & Account Settings */}
            <div className="lg:col-span-1 space-y-6">
              {/* Skill Proficiencies */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Skill Proficiencies</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 text-sm">Data Analysis</span>
                      <span className="text-gray-700 text-sm font-medium">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 text-sm">Project Management</span>
                      <span className="text-gray-700 text-sm font-medium">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
                <div className="space-y-2">
                  <ToggleSwitch
                    label={
                      <div className="flex items-center">
                        <Bell size={16} className="mr-2 text-gray-600" /> Notifications
                      </div>
                    }
                    initialChecked={true}
                    onToggle={handleNotificationToggle}
                  />
                  <ToggleSwitch
                    label={
                      <div className="flex items-center">
                        <Lock size={16} className="mr-2 text-gray-600" /> Privacy
                      </div>
                    }
                    initialChecked={false}
                    onToggle={handlePrivacyToggle}
                  />
                  <LinkedAccountsSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
