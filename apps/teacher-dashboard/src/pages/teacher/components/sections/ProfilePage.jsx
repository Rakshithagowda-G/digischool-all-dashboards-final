import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Award, Edit2, Save, X } from 'lucide-react';
import { MOCK_USER } from '../../data/mockData';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Dr. Raghav M J",
    email: "raghav@school.edu",
    phone: "+91 94567 89012",
    address: "123 Education Street, Knowledge City, ST 12345",
    joinDate: "August 15, 2025",
    department: "Mathematics & Science",
    qualification: "PhD in Mathematics Education",
    experience: "1 years",
    specialization: "Algebra, Geometry, Physics",
    languages: "English, Spanish, French",
    bio: "Passionate educator dedicated to making mathematics and science accessible and enjoyable for all students. Experienced in developing innovative teaching methods and curriculum design."
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setTempData({ ...tempData, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={MOCK_USER.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-[#2F69FF]"
                onError={(e) => e.target.src = `https://placehold.co/100x100/2F69FF/FFFFFF?text=T`}
              />
              <button className="absolute bottom-0 right-0 p-2 bg-[#2F69FF] text-white rounded-full hover:bg-blue-700">
                <Edit2 size={14} />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.department}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Verified</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 py-2 px-5 bg-[#2F69FF] text-white font-medium rounded-lg shadow-md hover:bg-blue-700"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 py-2 px-5 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700"
                >
                  <Save size={18} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 py-2 px-5 bg-gray-500 text-white font-medium rounded-lg shadow-md hover:bg-gray-600"
                >
                  <X size={18} />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="text-[#2F69FF]" size={20} />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium">{profileData.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={tempData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  {profileData.email}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={tempData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium flex items-center gap-2">
                  <Phone size={16} className="text-gray-500" />
                  {profileData.phone}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Languages</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.languages}
                  onChange={(e) => handleChange('languages', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium">{profileData.languages}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" />
                  {profileData.address}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  value={tempData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800">{profileData.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="text-[#2F69FF]" size={20} />
              Professional Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.department}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Join Date</label>
                <p className="text-gray-800 font-medium flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  {profileData.joinDate}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Experience</label>
                <p className="text-gray-800 font-medium">{profileData.experience}</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="text-[#2F69FF]" size={20} />
              Qualifications
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Highest Qualification</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.qualification}
                    onChange={(e) => handleChange('qualification', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.qualification}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Specialization</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.specialization}
                    onChange={(e) => handleChange('specialization', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.specialization}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teaching Statistics */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Teaching Statistics (Current Year)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-3xl font-bold text-[#2F69FF]">10</p>
            <p className="text-sm text-gray-600 mt-1">Active Classes</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <p className="text-3xl font-bold text-green-600">287</p>
            <p className="text-sm text-gray-600 mt-1">Total Students</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center">
            <p className="text-3xl font-bold text-yellow-600">45</p>
            <p className="text-sm text-gray-600 mt-1">Assignments Given</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <p className="text-3xl font-bold text-purple-600">4.8/5.0</p>
            <p className="text-sm text-gray-600 mt-1">Avg Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
