import React, { useState, useEffect } from 'react';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { MuiPerformanceBarChart } from '../components/charts/MuiPerformanceBarChart';
import { MuiSkillsPieChart } from '../components/charts/MuiSkillsPieChart';
import { MuiGradeProgressLineChart } from '../components/charts/MuiGradeProgressLineChart';
import ParentService, { DEFAULT_STUDENT_ID } from '../services/ParentService';
import { Loader2 } from 'lucide-react';

function PerformancePage() {
    const [loading, setLoading] = useState(true);
    const [barData, setBarData] = useState([]);
    const [skillsData, setSkillsData] = useState([]);
    const [gradeData, setGradeData] = useState([]);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const studentId = urlParams.get('studentId') || DEFAULT_STUDENT_ID;

            console.log(`[PerformancePage] Fetching data for studentId: ${studentId}`);

            try {
                setLoading(true);
                const [comparison, strengths, progress] = await Promise.all([
                    ParentService.getPerformanceComparison(studentId),
                    ParentService.getAcademicStrengths(studentId),
                    ParentService.getGradeProgress(studentId)
                ]);

                setBarData(Array.isArray(comparison.comparison) ? comparison.comparison : []);
                setSkillsData((Array.isArray(strengths.subjects) ? strengths.subjects : []).map(s => ({
                    name: s.subject || "Unknown",
                    value: s.percentage || 0
                })));
                setGradeData(Array.isArray(progress.monthlyScores) ? progress.monthlyScores : []);
            } catch (err) {
                console.error("Error fetching performance data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPerformanceData();
    }, []);

    if (loading) {
        return (
            <PageWithSidebar>
                <div className="flex flex-1 items-center justify-center min-h-[500px]">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                </div>
            </PageWithSidebar>
        );
    }

    return (
        <PageWithSidebar>
            <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
                <div className="w-full h-full bg-[#F5F7FB] dark:bg-[#040B2C] rounded-xl shadow-lg flex flex-col overflow-hidden relative">
                    <div className="bg-white dark:bg-gradient-to-r dark:from-[#10194E] dark:to-[#070F35]">
                        <DashboardNavbar />
                    </div>

                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-5 lg:p-6 relative scrollbar-hide font-poppins">
                        <div className="max-w-[1400px] mx-auto">
                            <div className="mb-4 sm:mb-5 lg:mb-6">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#020617] dark:text-white">Performance Analysis</h1>
                                <p className="text-xs sm:text-sm text-[#64748B] dark:text-white/60 mt-1">Track your child's academic progress and skills development</p>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <MuiPerformanceBarChart data={barData} />
                                <MuiSkillsPieChart data={skillsData} />
                                <div className="xl:col-span-2">
                                    <MuiGradeProgressLineChart data={gradeData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWithSidebar>
    );
}

export default PerformancePage;
