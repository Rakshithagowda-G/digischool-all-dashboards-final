import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getAssignmentsSummary } from '../../lib/api';
import { Loader2 } from 'lucide-react';

export const AssignmentSummaryCard = () => {
    const { mode } = useTheme();
    const isDark = mode === 'dark';

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                const studentId = searchParams.get('studentId') || 'STU003';
                const data = await getAssignmentsSummary(studentId);
                setSummary(data);
            } catch (err) {
                console.error('Error fetching assignment summary:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    const ValueDisplay = ({ value }) => (
        <div className={`text-sm font-bold rounded-lg px-3 py-2.5 border flex items-center justify-between ${isDark
            ? 'text-[#FFFFFF] bg-[#232730] border-[#232730]'
            : 'text-slate-900 bg-slate-50 border-slate-200'
            }`}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin opacity-50" /> : value}
        </div>
    );

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
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center overflow-hidden shadow-xl ring-4 ring-white/30">
                        <img
                            src="/img/icon1.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-8 pb-8 -mt-4">
                <div className="pt-4">
                    <h2 className={`text-xl font-bold mb-6 text-center ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>Assignment Summary</h2>
                    <div className="space-y-4">
                        <div>
                            <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Total Assignments</label>
                            <ValueDisplay value={summary?.total ?? 0} />
                        </div>
                        <div>
                            <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Pending Assignments</label>
                            <ValueDisplay value={summary?.pending ?? 0} />
                        </div>
                        <div>
                            <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Submitted Assignments</label>
                            <ValueDisplay value={summary?.submitted ?? 0} />
                        </div>
                        <div>
                            <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>Overdue Assignments</label>
                            <ValueDisplay value={summary?.overdue ?? 0} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

