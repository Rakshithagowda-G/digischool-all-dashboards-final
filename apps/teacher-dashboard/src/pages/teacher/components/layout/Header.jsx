// Header component 
import React, { useState } from 'react';
import { Menu, Bell, Settings, X, User, Lock, Palette, Globe, LogOut, Mail, Phone, MapPin, Calendar, Edit2, Check } from 'lucide-react';
import { MOCK_USER } from '../../data/mockData';

const Header = ({ toggleSidebar, currentPage }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Assignment Submitted', message: 'John Doe submitted Physics Assignment', time: '5 mins ago', read: false, type: 'assignment' },
    { id: 2, title: 'Class Scheduled', message: 'Math class scheduled for tomorrow at 10:00 AM', time: '1 hour ago', read: false, type: 'schedule' },
    { id: 3, title: 'Exam Results Published', message: 'Chemistry exam results are now available', time: '2 hours ago', read: true, type: 'result' },
    { id: 4, title: 'New Announcement', message: 'School will remain closed on Friday', time: '1 day ago', read: true, type: 'announcement' },
    { id: 5, title: 'Student Absent', message: 'Sarah Smith is absent today', time: '2 days ago', read: true, type: 'attendance' }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    darkMode: false,
    language: 'English',
    timezone: 'IST (UTC+5:30)'
  });

  const [profileData, setProfileData] = useState({
    name: MOCK_USER.name || 'Sarah Johnson',
    email: MOCK_USER.email || 'sarah.johnson@school.com',
    phone: '+91 98765 43210',
    address: '123 Education Street, Mumbai, Maharashtra 400001',
    joinDate: 'September 1, 2020',
    employeeId: 'TCH12345',
    department: 'Science Department',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    qualification: 'M.Sc in Physics, B.Ed',
    experience: '8 years'
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
  const icons = {
    assignment: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M7 3h10v2H7V3zm0 4h10v2H7V7zm0 4h10v2H7v-2zM5 3h2v18H5V3zm12 0h2v18h-2V3z" 
          stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    schedule: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M8 2v4M16 2v4M3 9h18M5 12h14v10H5V12z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    result: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 20h14M7 16v-6M12 16v-10M17 16v-3" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    announcement: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 10v4l9 3V7L3 10zM21 9v6M16 10v4" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    attendance: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 20c0-4 4-7 8-7s8 3 8 7" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  };

  return icons[type] || (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3a7 7 0 0 1 7 7c0 3-2 5-2 7H7c0-2-2-4-2-7a7 7 0 0 1 7-7zm0 13v2m0-8v4" 
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};


  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white shadow-sm md:p-5">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-gray-600" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">{currentPage}</h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Notifications Button */}
          <button 
            onClick={() => setIsNotificationOpen(true)}
            className="relative text-gray-500 hover:text-gray-800"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Settings Button */}
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="text-gray-500 hover:text-gray-800"
          >
            <Settings size={22} />
          </button>

          {/* Profile Button */}
          <div 
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-xl p-2 transition-colors"
            onClick={() => setIsProfileOpen(true)}
          >
            <img
              src={MOCK_USER.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-[#2F69FF]"
              onError={(e) => e.target.src = `https://placehold.co/100x100/2F69FF/FFFFFF?text=T`}
            />
            <div className="hidden md:block">
              <span className="block text-sm font-medium text-gray-800">{MOCK_USER.name}</span>
              <span className="block text-xs text-gray-500">View Profile</span>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Modal */}
      {isNotificationOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md mt-20 mr-4 max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-3xl">
              <div>
                <h3 className="text-lg font-semibold">Notifications</h3>
                <p className="text-sm text-blue-100">{unreadCount} unread</p>
              </div>
              <button
                onClick={() => setIsNotificationOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <div className="p-3 border-b border-gray-200 bg-blue-50">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mark all as read
                </button>
              </div>
            )}

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <Bell size={48} className="mb-3" />
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notif.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{getNotificationIcon(notif.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className={`text-sm font-semibold ${!notif.read ? 'text-blue-600' : 'text-gray-800'}`}>
                              {notif.title}
                            </h4>
                            <button
                              onClick={() => clearNotification(notif.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{notif.time}</span>
                            {!notif.read && (
                              <button
                                onClick={() => markAsRead(notif.id)}
                                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings size={24} />
                <div>
                  <h3 className="text-xl font-semibold">Settings</h3>
                  <p className="text-sm text-blue-100">Manage your preferences</p>
                </div>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Notifications Settings */}
                <div className="p-5 bg-blue-50 rounded-2xl">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Bell size={20} className="text-blue-600" />
                    Notification Preferences
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <button
                        onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.emailNotifications ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive push notifications</p>
                      </div>
                      <button
                        onClick={() => setSettings({...settings, pushNotifications: !settings.pushNotifications})}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.pushNotifications ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Weekly Reports</p>
                        <p className="text-sm text-gray-600">Receive weekly performance reports</p>
                      </div>
                      <button
                        onClick={() => setSettings({...settings, weeklyReports: !settings.weeklyReports})}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.weeklyReports ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          settings.weeklyReports ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Appearance Settings */}
                <div className="p-5 bg-blue-50 rounded-2xl">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Palette size={20} className="text-blue-600" />
                    Appearance
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Dark Mode</p>
                        <p className="text-sm text-gray-600">Use dark theme</p>
                      </div>
                      <button
                        onClick={() => setSettings({...settings, darkMode: !settings.darkMode})}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.darkMode ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Regional Settings */}
                <div className="p-5 bg-blue-50 rounded-2xl">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Globe size={20} className="text-blue-600" />
                    Regional Settings
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={settings.language}
                        onChange={(e) => setSettings({...settings, language: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option>IST (UTC+5:30)</option>
                        <option>EST (UTC-5)</option>
                        <option>PST (UTC-8)</option>
                        <option>GMT (UTC+0)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="p-5 bg-blue-50 rounded-2xl">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Lock size={20} className="text-blue-600" />
                    Security
                  </h4>
                  <div className="space-y-3">
                    <button className="w-full py-2 px-4 bg-blue-100 text-blue-700 font-medium rounded-xl hover:bg-blue-200">
                      Change Password
                    </button>
                    <button className="w-full py-2 px-4 bg-blue-100 text-blue-700 font-medium rounded-xl hover:bg-blue-200">
                      Two-Factor Authentication
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200"
              >
                Close
              </button>
              <button className="flex-1 py-2 px-4 bg-[#2F69FF] text-white font-medium rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2">
                <Check size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl my-8 ">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-3xl relative ">
              <button
                onClick={() => setIsProfileOpen(false)}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-4">
                <img
                  src={MOCK_USER.avatar}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border-4 border-white/30"
                  onError={(e) => e.target.src = `https://placehold.co/100x100/2F69FF/FFFFFF?text=T`}
                />
                <div>
                  <h2 className="text-2xl font-bold">{profileData.name}</h2>
                  <p className="text-blue-100">{profileData.employeeId} • {profileData.department}</p>
                  <p className="text-sm text-blue-100 mt-1">Joined: {profileData.joinDate}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="p-5 bg-blue-50 rounded-2xl">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <User size={20} className="text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-800">{profileData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-800">{profileData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="text-sm font-medium text-gray-800">{profileData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="p-5 bg-blue-50 rounded-2xl">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-blue-600" />
                    Professional Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="text-sm font-medium text-gray-800">{profileData.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Qualification</p>
                      <p className="text-sm font-medium text-gray-800">{profileData.qualification}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Experience</p>
                      <p className="text-sm font-medium text-gray-800">{profileData.experience}</p>
                    </div>
                  </div>
                </div>

                {/* Teaching Subjects */}
                <div className="md:col-span-2 p-5 bg-blue-50 rounded-2xl">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Bell size={20} className="text-blue-600" />
                    Teaching Subjects
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.subjects.map((subject, idx) => (
                      <span key={idx} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-purple-200">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setIsProfileOpen(false)}
                className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200"
              >
                Close
              </button>
              <button className="flex-1 py-2 px-4 bg-blue-100 text-blue-600 font-medium rounded-xl hover:bg-blue-200 flex items-center justify-center gap-2">
                <Edit2 size={18} />
                Edit Profile
              </button>
              <button className="flex-1 py-2 px-4 bg-blue-500 text-white font-medium rounded-xl hover:bg-red-600 flex items-center justify-center gap-2">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
