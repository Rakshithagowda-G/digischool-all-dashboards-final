import React, { useState, useEffect } from 'react';
import { Globe, Palette, Shield, Loader2 } from 'lucide-react';
import { DashboardNavbar } from '@/components/ui/dashboard-navbar';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ParentService from '@/services/ParentService';

export function ProfilePage() {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [profileVisibility, setProfileVisibility] = useState(true);
    const [showGrades, setShowGrades] = useState(true);
    const [usageAnalytics, setUsageAnalytics] = useState(true);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await ParentService.getProfile();
                setProfile(data);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center p-6 bg-[#f8fafc] dark:bg-[#0a1128]">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center p-6 bg-[#f8fafc] dark:bg-[#0a1128]">
                <div className="text-red-500 text-lg font-medium">Error: {error}</div>
            </div>
        );
    }

    // Default safe values if profile is null (though API handles it)
    const displayProfile = profile || {
        name: "N/A",
        parentName: "N/A",
        dob: "N/A",
        phoneNumber: "N/A",
        course: "N/A",
        avatarUrl: null
    };

    const avatarSrc = displayProfile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayProfile.name || "Student")}&background=171E57&color=fff`;

    return (
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6 bg-[#f8fafc] dark:bg-[#0a1128]">
            <div className="w-full h-full bg-slate-100 dark:bg-[#0a1128] rounded-xl shadow-lg flex flex-col overflow-hidden">
                {/* Navbar at top */}
                <DashboardNavbar />

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Side - Profile Information Card with Blue Curved Background */}
                        <div className="lg:w-80 flex-shrink-0">
                            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-md overflow-hidden">
                                {/* Blue Curved Background Section */}
                                <div className="relative bg-[#171E57] pt-12 pb-20 px-8">
                                    {/* Curved bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-white dark:bg-slate-800 rounded-t-[3rem]"></div>

                                    {/* Profile Picture */}
                                    <div className="relative flex flex-col items-center">
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center overflow-hidden shadow-xl ring-4 ring-white/30">
                                            <img
                                                src={avatarSrc}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* White Content Section */}
                                <div className="px-8 pb-8 -mt-4">
                                    {/* Personal Information */}
                                    <div className="pt-4">
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">Personal Information</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 block">Name</label>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-700 rounded-lg px-3 py-2.5 border border-slate-200 dark:border-slate-600 truncate">
                                                    {displayProfile.name}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 block">Parent Name</label>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-700 rounded-lg px-3 py-2.5 border border-slate-200 dark:border-slate-600 truncate">
                                                    {displayProfile.parentName}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 block">D.O.B</label>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-700 rounded-lg px-3 py-2.5 border border-slate-200 dark:border-slate-600">
                                                    {displayProfile.dob || "N/A"}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 block">Ph No</label>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-700 rounded-lg px-3 py-2.5 border border-slate-200 dark:border-slate-600">
                                                    {displayProfile.phoneNumber}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 block">Courses</label>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-700 rounded-lg px-3 py-2.5 border border-slate-200 dark:border-slate-600 truncate">
                                                    {displayProfile.course}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Other Content */}
                        <div className="flex-1 space-y-6">
                            {/* Language & Region */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Language & Region</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-700 dark:text-slate-300">Language</span>
                                    <span className="text-slate-500 dark:text-slate-400">English (US)</span>
                                </div>
                            </div>

                            {/* Appearance */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                        <Palette className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Appearance</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-slate-900 dark:text-white font-medium">Dark Mode</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">Toggle between light and dark theme</div>
                                    </div>
                                    <button
                                        onClick={toggleDarkMode}
                                        className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${darkMode ? 'bg-blue-600' : 'bg-slate-300'
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${darkMode ? 'transform translate-x-7' : ''
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Privacy */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Privacy</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Control your privacy settings</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Profile Visibility */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-slate-900 dark:text-white font-medium">Profile Visibility</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">Make your profile visible to other students</div>
                                        </div>
                                        <button
                                            onClick={() => setProfileVisibility(!profileVisibility)}
                                            className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${profileVisibility ? 'bg-blue-600' : 'bg-slate-300'
                                                }`}
                                        >
                                            <div
                                                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${profileVisibility ? 'transform translate-x-7' : ''
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    {/* Show Grades */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-slate-900 dark:text-white font-medium">Show Grades</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">Allow instructors to view your grades</div>
                                        </div>
                                        <button
                                            onClick={() => setShowGrades(!showGrades)}
                                            className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${showGrades ? 'bg-blue-600' : 'bg-slate-300'
                                                }`}
                                        >
                                            <div
                                                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${showGrades ? 'transform translate-x-7' : ''
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    {/* Usage Analytics */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-slate-900 dark:text-white font-medium">Usage Analytics</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">Help improve the platform by sharing usage data</div>
                                        </div>
                                        <button
                                            onClick={() => setUsageAnalytics(!usageAnalytics)}
                                            className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${usageAnalytics ? 'bg-blue-600' : 'bg-slate-300'
                                                }`}
                                        >
                                            <div
                                                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${usageAnalytics ? 'transform translate-x-7' : ''
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
