import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Globe, Palette, Shield } from 'lucide-react';
import { DashboardNavbar } from './dashboard-navbar';
import { PersonalInfoCard } from './personal-info-card';
import { useTheme } from '../../context/ThemeContext';
import { getStudentProfile } from '../../lib/api';

export function ProfilePage() {
    const { mode, toggleTheme } = useTheme();
    const isDark = mode === 'dark';
    const [searchParams] = useSearchParams();
    // Temporary development fallback to Primary Student-3 (STU003)
    const studentId = searchParams.get('studentId') || 'STU003';

    const [profileVisibility, setProfileVisibility] = useState(true);
    const [showGrades, setShowGrades] = useState(true);
    const [usageAnalytics, setUsageAnalytics] = useState(true);

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getStudentProfile(studentId);
                setProfileData(data);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile details");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [studentId]);

    return (
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
            <div className={`
                w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden transition-colors duration-200
                ${isDark ? 'bg-[#0F1115]' : 'bg-slate-100'}
            `}>
                {/* Navbar at top */}
                <DashboardNavbar />

                {/* Scrollable content area */}
                <div className={`
                    flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 transition-colors duration-200
                    ${isDark ? 'bg-[#0F1115]' : ''}
                `}>
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Side - Profile Information Card with Blue Curved Background */}
                        <div className="lg:w-80 flex-shrink-0">
                            <PersonalInfoCard
                                data={profileData}
                                loading={loading}
                                error={error}
                            />
                        </div>

                        {/* Right Side - Other Content */}
                        <div className="flex-1 space-y-6">
                            {/* Language & Region */}
                            <div className={`rounded-2xl shadow-md p-6 ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-[#232730]' : 'bg-slate-100'
                                        }`}>
                                        <Globe className={`w-5 h-5 ${isDark ? 'text-[#9CA3AF]' : 'text-slate-600'}`} />
                                    </div>
                                    <h3 className={`text-lg font-semibold ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>Language & Region</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={isDark ? 'text-[#9CA3AF]' : 'text-slate-700'}>Language</span>
                                    <span className={isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}>English (US)</span>
                                </div>
                            </div>

                            {/* Appearance */}
                            <div className={`rounded-2xl shadow-md p-6 ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-[#232730]' : 'bg-slate-100'
                                        }`}>
                                        <Palette className={`w-5 h-5 ${isDark ? 'text-[#9CA3AF]' : 'text-slate-600'}`} />
                                    </div>
                                    <h3 className={`text-lg font-semibold ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>Appearance</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className={`font-medium ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>Dark Mode</div>
                                        <div className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Toggle between light and dark theme</div>
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${isDark ? 'bg-blue-600' : 'bg-slate-300'
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${isDark ? 'transform translate-x-7' : ''
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Privacy */}
                            <div className={`rounded-2xl shadow-md p-6 ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-[#232730]' : 'bg-slate-100'
                                        }`}>
                                        <Shield className={`w-5 h-5 ${isDark ? 'text-[#9CA3AF]' : 'text-slate-600'}`} />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-semibold ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>Privacy</h3>
                                        <p className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Control your privacy settings</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Profile Visibility */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className={`font-medium ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>Profile Visibility</div>
                                            <div className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Make your profile visible to other students</div>
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
                                            <div className={`font-medium ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>Show Grades</div>
                                            <div className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Allow instructors to view your grades</div>
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
                                            <div className={`font-medium ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>Usage Analytics</div>
                                            <div className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Help improve the platform by sharing usage data</div>
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
