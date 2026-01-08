import React, { useState, useEffect } from "react";
import { Calendar, FileCheck, Trophy, ClipboardList, Loader2 } from "lucide-react";
import ParentService, { DEFAULT_STUDENT_ID } from "@/services/ParentService";
export const ParentStatsCards = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const studentId = urlParams.get('studentId') || DEFAULT_STUDENT_ID;

            try {
                const data = await ParentService.getHomeSummary(studentId);
                setStats(data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const displayStats = stats || {
        attendancePercentage: 0,
        assignmentsCompleted: 0,
        averageGrade: "N/A",
        pendingTasks: 0
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-full">
                {/* Attendance Rate Card */}
                <div className="relative rounded-xl bg-white dark:bg-[#0A1333] shadow-sm border border-gray-100 dark:border-white/10 p-3 w-full h-[80px] overflow-hidden">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                            Attendance Rate
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold leading-none">
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : `${Math.round(displayStats.attendancePercentage)}%`}
                            </div>
                            <div className="w-10 h-10 bg-[#171E57] rounded-lg flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-5 h-5 text-white" strokeWidth={2} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assignments Completed Card */}
                <div className="relative rounded-xl bg-white dark:bg-[#0A1333] shadow-sm border border-gray-100 dark:border-white/10 p-3 w-full h-[80px] overflow-hidden">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                            Assignments Completed
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold leading-none">
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : displayStats.assignmentsCompleted}
                            </div>
                            <div className="w-10 h-10 bg-[#171E57] rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileCheck className="w-5 h-5 text-white" strokeWidth={2} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Average Grade Card */}
                <div className="relative rounded-xl bg-white dark:bg-[#0A1333] shadow-sm border border-gray-100 dark:border-white/10 p-3 w-full h-[80px] overflow-hidden">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                            Average Grade
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold leading-none">
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : displayStats.averageGrade}
                            </div>
                            <div className="w-10 h-10 bg-[#171E57] rounded-lg flex items-center justify-center flex-shrink-0">
                                <Trophy className="w-5 h-5 text-white" strokeWidth={2} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Tasks Card */}
                <div className="relative rounded-xl bg-white dark:bg-[#0A1333] shadow-sm border border-gray-100 dark:border-white/10 p-3 w-full h-[80px] overflow-hidden">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                            Pending Tasks
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold leading-none">
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : displayStats.pendingTasks}
                            </div>
                            <div className="w-10 h-10 bg-[#171E57] rounded-lg flex items-center justify-center flex-shrink-0">
                                <ClipboardList className="w-5 h-5 text-white" strokeWidth={2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
