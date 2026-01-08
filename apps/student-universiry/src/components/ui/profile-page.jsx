import React, { useState, useEffect } from 'react';
import { Globe, Palette, Shield, Loader2, AlertCircle } from 'lucide-react';
import { DashboardNavbar } from '@/components/ui/dashboard-navbar';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { useSearchParams } from 'react-router-dom';
import { getStudentProfile } from '@/lib/api';

export function ProfilePage() {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [searchParams] = useSearchParams();
    const studentId = searchParams.get('studentId') || 'STU001';

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [profileVisibility, setProfileVisibility] = useState(true);
    const [showGrades, setShowGrades] = useState(true);
    const [usageAnalytics, setUsageAnalytics] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await getStudentProfile(studentId);
                setProfile(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile information.");
            } finally {
                setLoading(false);
            }
        };

        if (studentId) {
            fetchProfile();
        }
    }, [studentId]);

    if (loading) {
        return (
            <div className="flex flex-1 items-center justify-center h-screen bg-slate-100 dark:bg-[#0F172A]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                    <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Loading Profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-1 items-center justify-center h-screen bg-slate-100 dark:bg-[#0F172A]">
                <div className="flex flex-col items-center gap-4 text-center p-6 bg-white dark:bg-[#111c44] rounded-xl shadow-lg border border-red-100 dark:border-red-900/30">
                    <AlertCircle className="w-16 h-16 text-red-500" />
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Error</h2>
                    <p className="text-slate-600 dark:text-slate-400">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const personalInfo = [
        { label: "Name", value: profile?.name || "Not set" },
        { label: "Email", value: profile?.email || "Not set" },
        { label: "D.O.B", value: profile?.dob || "Not set" },
        { label: "Ph No", value: profile?.phone || "Not set" },
        { label: "Current Course", value: profile?.course || "Not set" }
    ];

    return (
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
            <div
                className={`w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden ${darkMode ? 'bg-cover bg-center bg-no-repeat' : 'bg-slate-100'}`}
                style={darkMode ? { backgroundImage: "url(/img/body-background.png)" } : {}}
            >
                <DashboardNavbar />

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 pb-2">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Side - Profile Information Card */}
                        <div className="lg:w-80 flex-shrink-0">
                            <div className={`rounded-3xl shadow-md overflow-hidden ${darkMode ? 'bg-[#111c44]' : 'bg-white'}`}>
                                <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 pt-12 pb-20 px-8">
                                    <div className={`absolute bottom-0 left-0 right-0 h-8 rounded-t-[3rem] ${darkMode ? 'bg-[#111c44]' : 'bg-white'}`}></div>

                                    <div className="relative flex flex-col items-center">
                                        <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center overflow-hidden shadow-xl ring-4 ${darkMode ? 'ring-[#111c44]/30' : 'ring-white/30'}`}>
                                            <img
                                                src={profile?.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="px-8 pb-8 -mt-4">
                                    <div className="pt-4">
                                        <h2 className={`text-xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-slate-900'}`}>Personal Information</h2>
                                        <div className="space-y-4">
                                            {personalInfo.map((item, index) => (
                                                <div key={index}>
                                                    <label className={`text-xs font-medium uppercase tracking-wide mb-1 block ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                                                        {item.label}
                                                    </label>
                                                    <div className={`text-sm font-medium rounded-lg px-3 py-2.5 border ${darkMode ? 'bg-[#1b254b] border-[#2b3674] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
                                                        {item.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Other Content */}
                        <div className="flex-1 space-y-6">
                            <div className={`rounded-2xl shadow-md p-6 ${darkMode ? 'bg-[#111c44]' : 'bg-white'}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#1b254b]' : 'bg-slate-100'}`}>
                                        <Globe className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-slate-600'}`} />
                                    </div>
                                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Language & Region</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={darkMode ? 'text-gray-300' : 'text-slate-700'}>Language</span>
                                    <span className={darkMode ? 'text-gray-400' : 'text-slate-500'}>English (US)</span>
                                </div>
                            </div>

                            <div className={`rounded-2xl shadow-md p-6 ${darkMode ? 'bg-[#111c44]' : 'bg-white'}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#1b254b]' : 'bg-slate-100'}`}>
                                        <Palette className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-slate-600'}`} />
                                    </div>
                                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Appearance</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Dark Mode</div>
                                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Toggle between light and dark theme</div>
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

                            <div className={`rounded-2xl shadow-md p-6 ${darkMode ? 'bg-[#111c44]' : 'bg-white'}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#1b254b]' : 'bg-slate-100'}`}>
                                        <Shield className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-slate-600'}`} />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Privacy</h3>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Control your privacy settings</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Profile Visibility</div>
                                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Make your profile visible to other students</div>
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

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Show Grades</div>
                                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Allow instructors to view your grades</div>
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

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Usage Analytics</div>
                                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Help improve the platform by sharing usage data</div>
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
