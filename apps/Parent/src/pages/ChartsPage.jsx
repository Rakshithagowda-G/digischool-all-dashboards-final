import React from 'react';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { PerformanceBarChart } from '../components/charts/PerformanceBarChart';
import { SkillsPieChart } from '../components/charts/SkillsPieChart';
import { GradeProgressLineChart } from '../components/charts/GradeProgressLineChart';

// Sample data - ready to be replaced with API data
const barData = [
    { subject: "Math", student: 88, classAvg: 78 },
    { subject: "Science", student: 95, classAvg: 80 },
    { subject: "English", student: 87, classAvg: 82 },
    { subject: "History", student: 97, classAvg: 78 },
    { subject: "CS", student: 89, classAvg: 72 }
];

const skillsData = [
    { name: "Mathematics", value: 18 },
    { name: "Science", value: 17 },
    { name: "English", value: 16 },
    { name: "History", value: 16 },
    { name: "Computer Science", value: 15 },
    { name: "Arts", value: 17 }
];

const gradeData = [
    { month: "Jan", score: 80 },
    { month: "Feb", score: 83 },
    { month: "Mar", score: 86 },
    { month: "Apr", score: 85 },
    { month: "May", score: 89 },
    { month: "Jun", score: 88 },
    { month: "Jul", score: 90 },
    { month: "Aug", score: 92 },
    { month: "Sep", score: 94 }
];

function ChartsPage() {
    return (
        <PageWithSidebar>
            <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
                <div className="w-full h-full bg-[#F5F7FB] dark:bg-[#040B2C] rounded-xl shadow-lg flex flex-col overflow-hidden relative">
                    {/* Static Navbar at top */}
                    <div className="bg-white dark:bg-gradient-to-r dark:from-[#10194E] dark:to-[#070F35]">
                        <DashboardNavbar />
                    </div>

                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-5 lg:p-6 relative scrollbar-hide font-poppins">
                        <div className="w-full max-w-[1400px] mx-auto">
                            {/* Page Title */}
                            <div className="mb-4 sm:mb-5 lg:mb-6">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#020617] dark:text-white">Performance Analysis</h1>
                                <p className="text-xs sm:text-sm text-[#64748B] dark:text-white/60 mt-1">Track your child's academic progress and skills development</p>
                            </div>

                            {/* Charts Grid */}
                            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                                {/* Row 1: Bar Chart and Pie Chart */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                                    {/* Bar Chart */}
                                    <div className="w-full min-w-0 h-[260px] md:h-[320px] xl:h-[380px]">
                                        <PerformanceBarChart data={barData} />
                                    </div>

                                    {/* Pie Chart */}
                                    <div className="w-full min-w-0 h-[260px] md:h-[320px] xl:h-[380px]">
                                        <SkillsPieChart data={skillsData} />
                                    </div>
                                </div>

                                {/* Row 2: Line Chart (Full Width) */}
                                <div className="grid grid-cols-1">
                                    <div className="w-full min-w-0 h-[260px] md:h-[320px] xl:h-[380px]">
                                        <GradeProgressLineChart data={gradeData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWithSidebar>
    );
}

export default ChartsPage;
