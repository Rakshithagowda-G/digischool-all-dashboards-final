import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Loader2, AlertCircle, User } from 'lucide-react';

export const PersonalInfoCard = ({ data, loading, error }) => {
    const { mode } = useTheme();
    const isDark = mode === 'dark';

    if (loading) {
        return (
            <div className={`rounded-3xl shadow-md overflow-hidden min-h-[500px] flex items-center justify-center ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
                <Loader2 className="w-10 h-10 animate-spin text-purple-500 opacity-50" />
            </div>
        );
    }

    if (error) {
        return (
            <div className={`rounded-3xl shadow-md overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-6 text-center ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
                <AlertCircle className="w-12 h-12 text-red-500 mb-4 opacity-50" />
                <p className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-slate-600'}`}>{error}</p>
            </div>
        );
    }

    const { name, fullName, email, dob, phone, course, profileImage } = data || {};
    const displayFullName = fullName || name || "Not set";

    return (
        <div className={`rounded-3xl shadow-md overflow-hidden ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
            {/* Blue Curved Background Section */}
            <div className={`relative pt-12 pb-20 px-8 ${isDark
                ? 'bg-gradient-to-br from-[#B794F6] to-[#6366F1]'
                : 'bg-gradient-to-br from-[#E9D5FF] to-[#C084FC]'
                }`}>
                {/* Curved bottom */}
                <div className={`absolute bottom-0 left-0 right-0 h-8 rounded-t-[3rem] ${isDark ? 'bg-[#181B21]' : 'bg-white'
                    }`}></div>

                {/* Profile Picture */}
                <div className="relative flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-white dark:bg-[#232730] flex items-center justify-center overflow-hidden shadow-xl ring-4 ring-white/30">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={64} className={isDark ? 'text-[#9CA3AF]' : 'text-purple-300'} />
                        )}
                    </div>
                </div>
            </div>

            {/* White Content Section */}
            <div className="px-8 pb-8 -mt-4">
                {/* Personal Information */}
                <div className="pt-4">
                    <h2 className={`text-xl font-bold mb-6 text-center ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>Personal Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className={`text-xs font-medium uppercase tracking-wide mb-1 block ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Full Name</label>
                            <div className={`text-sm font-medium rounded-lg px-3 py-2.5 border ${isDark
                                ? 'text-[#FFFFFF] bg-[#232730] border-[#232730]'
                                : 'text-slate-900 bg-slate-50 border-slate-200'
                                }`}>
                                {displayFullName}
                            </div>
                        </div>
                        <div>
                            <label className={`text-xs font-medium uppercase tracking-wide mb-1 block ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Email Address</label>
                            <div className={`text-sm font-medium rounded-lg px-3 py-2.5 border ${isDark
                                ? 'text-[#FFFFFF] bg-[#232730] border-[#232730]'
                                : 'text-slate-900 bg-slate-50 border-slate-200'
                                }`}>
                                {email || "Not set"}
                            </div>
                        </div>
                        <div>
                            <label className={`text-xs font-medium uppercase tracking-wide mb-1 block ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Date of Birth</label>
                            <div className={`text-sm font-medium rounded-lg px-3 py-2.5 border ${isDark
                                ? 'text-[#FFFFFF] bg-[#232730] border-[#232730]'
                                : 'text-slate-900 bg-slate-50 border-slate-200'
                                }`}>
                                {dob || "Not set"}
                            </div>
                        </div>
                        <div>
                            <label className={`text-xs font-medium uppercase tracking-wide mb-1 block ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Phone Number</label>
                            <div className={`text-sm font-medium rounded-lg px-3 py-2.5 border ${isDark
                                ? 'text-[#FFFFFF] bg-[#232730] border-[#232730]'
                                : 'text-slate-900 bg-slate-50 border-slate-200'
                                }`}>
                                {phone || "Not set"}
                            </div>
                        </div>
                        <div>
                            <label className={`text-xs font-medium uppercase tracking-wide mb-1 block ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Current Course</label>
                            <div className={`text-sm font-medium rounded-lg px-3 py-2.5 border ${isDark
                                ? 'text-[#FFFFFF] bg-[#232730] border-[#232730]'
                                : 'text-slate-900 bg-slate-50 border-slate-200'
                                }`}>
                                {course || "Not set"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


