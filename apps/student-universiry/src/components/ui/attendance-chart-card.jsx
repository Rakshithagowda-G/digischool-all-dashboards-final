import React, { useState, useEffect } from "react";
import { MoreHorizontal, Loader2, AlertCircle } from "lucide-react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { getAttendanceOverview } from "@/lib/api";

export const AttendanceChartCard = () => {
    const { darkMode } = useDarkMode();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const searchParams = new URLSearchParams(window.location.search);
                const studentId = searchParams.get('studentId') || 'STU001';
                const response = await getAttendanceOverview(studentId);
                setData(response);
            } catch (error) {
                console.error("Error fetching attendance overview:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const presentCount = data?.days?.filter(d => d.status === 'Present').length || 0;
    const absentCount = data?.days?.filter(d => d.status === 'Absent').length || 0;
    const percentage = data?.attendancePercentage || 0;

    return (
        <div
            className={`w-full h-full rounded-[20px] p-6 flex flex-col justify-between ${darkMode ? 'bg-[#111c44] text-white' : 'bg-white text-slate-900'} shadow-sm`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Attendance</h3>
            </div>

            {/* Content */}
            <div className="flex items-center justify-between flex-1">
                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                    </div>
                ) : (
                    <>
                        {/* Left Side Stats */}
                        <div className="flex flex-col gap-8">
                            <div>
                                <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Present</p>
                                <h4 className="text-2xl font-bold">{presentCount}</h4>
                            </div>
                            <div>
                                <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Absent</p>
                                <h4 className="text-2xl font-bold">{absentCount}</h4>
                            </div>
                        </div>

                        {/* Right Side Chart */}
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            {/* SVG Gauge */}
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                {/* Background Circle */}
                                <circle cx="50" cy="50" r="40" fill="none" stroke={darkMode ? "#1b254b" : "#f1f5f9"} strokeWidth="8" />

                                {/* Progress Circle */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#3B82F6"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(percentage / 100) * 251} 251`}
                                    className="transform origin-center rotate-[135deg]"
                                />
                            </svg>

                            {/* Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <p className={`text-[10px] font-bold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Rate</p>
                                <p className="text-2xl font-bold leading-none my-0.5">{percentage}%</p>
                                <p className={`text-[10px] font-bold ${darkMode ? 'text-gray-400' : 'text-gray-900'}`}>{data?.month || 'Current'}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
