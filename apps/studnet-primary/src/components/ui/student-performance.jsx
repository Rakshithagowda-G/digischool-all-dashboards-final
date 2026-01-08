import React, { useState, useEffect } from 'react';
import { Badge } from './badge';
import { TrendingDown, Loader2, AlertCircle, PieChart as PieChartIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { CustomPieChart } from './custom-pie-chart';
import { getPerformance } from '../../lib/api';

export const StudentPerformance = () => {
    const { mode } = useTheme();
    const isDark = mode === 'dark';
    const isHomePage = window.location.pathname === '/';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Chart colors - mapping or default
    const colorPalette = [
        '#60D5F2', // Cyan
        '#A78BFA', // Purple
        '#F59E0B', // Amber
        '#10B981', // Emerald
        '#EF4444', // Red
        '#6366F1', // Indigo
        '#EC4899', // Pink
    ];

    const getSubjectColor = (subject, index) => {
        const lowerSubject = subject.toLowerCase();
        if (lowerSubject.includes('math')) return '#60D5F2';
        if (lowerSubject.includes('science')) return '#A78BFA';
        if (lowerSubject.includes('english')) return '#F59E0B';
        if (lowerSubject.includes('social')) return '#10B981';
        if (lowerSubject.includes('hindi')) return '#EF4444';
        return colorPalette[index % colorPalette.length];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Get studentId from URL query params or fallback to STU003 as specified
                const searchParams = new URLSearchParams(window.location.search);
                const studentId = searchParams.get('studentId') || 'STU003';

                const response = await getPerformance(studentId);

                if (response && Array.isArray(response.subjects)) {
                    const mappedData = response.subjects.map((item, index) => {
                        // Safe check for subject name
                        const subjectName = item.subject || item.subjectName || 'Unknown';
                        return {
                            category: subjectName,
                            marks: typeof item.percentage === 'number' ? item.percentage : 0,
                            color: getSubjectColor(subjectName, index)
                        };
                    });
                    setData(mappedData);
                } else {
                    setData([]);
                }
                setError(null);
            } catch (err) {
                const searchParams = new URLSearchParams(window.location.search);
                const studentId = searchParams.get('studentId') || 'STU003';
                const attemptedUrl = `http://localhost:3002/api/student/home/performance?studentId=${studentId}`;
                console.error(`Error fetching performance data from ${attemptedUrl}:`, err);
                setError('Failed to load performance data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Prepare chart specific data and colors
    const chartData = data || [];
    const chartColors = chartData.reduce((acc, item) => {
        acc[item.category] = item.color;
        return acc;
    }, {});

    // Sort the data by marks in ascending order (smallest to largest) - makes graph look better
    const sortedChartData = [...chartData].sort((a, b) => a.marks - b.marks);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                    <Loader2 className={`h-8 w-8 animate-spin ${isDark && isHomePage ? 'text-[#06B6D4]' : 'text-purple-600'}`} />
                    <p className={`text-sm ${isDark && isHomePage ? 'text-[#9CA3AF]' : 'text-gray-500'}`}>Loading performance...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex-1 flex flex-col items-center justify-center space-y-3 p-4 text-center">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    <p className={`text-sm ${isDark && isHomePage ? 'text-[#9CA3AF]' : 'text-gray-500'}`}>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className={`text-xs font-medium underline ${isDark && isHomePage ? 'text-[#06B6D4]' : 'text-purple-600'}`}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        if (chartData.length === 0) {
            return (
                <div className="flex-1 flex flex-col items-center justify-center space-y-3 p-4 text-center">
                    <PieChartIcon className={`h-8 w-8 ${isDark && isHomePage ? 'text-[#232730]' : 'text-gray-200'}`} />
                    <p className={`text-sm ${isDark && isHomePage ? 'text-[#9CA3AF]' : 'text-gray-500'}`}>No performance data available</p>
                </div>
            );
        }

        return (
            <div
                className="flex-1 flex items-center justify-center md:h-[200px] lg:h-auto"
                style={{
                    width: '100%',
                    maxWidth: window.innerWidth < 1024 ? '100%' : undefined,
                    height: window.innerWidth < 1024 ? 'clamp(170px, 28vw, 230px)' : 'auto',
                    minHeight: window.innerWidth < 1024 ? '170px' : undefined
                }}
            >
                <div className="performance-chart-wrapper w-full h-full md:w-[200px] md:h-[200px] lg:w-full lg:h-full flex items-center justify-center">
                    <div className="relative w-full min-h-[200px] md:min-h-[260px]">
                        <CustomPieChart data={sortedChartData} colors={chartColors} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`
            w-full h-full rounded-2xl p-3 sm:p-4 md:p-3 lg:p-4 shadow-sm flex flex-col transition-colors duration-200 overflow-hidden
            ${isDark && isHomePage ? 'bg-[#181B21]' : 'bg-white'}
        `}>
            <div className="flex items-center justify-center pb-2">
                <h2 className={`
                    text-xl font-bold flex items-center
                    ${isDark && isHomePage ? 'text-[#FFFFFF]' : 'text-gray-900'}
                `}>
                    Your Performance
                    {!loading && !error && chartData.length > 0 && (
                        <Badge
                            variant="outline"
                            className={`
                                border-none ml-2
                                ${isDark && isHomePage
                                    ? 'text-[#06B6D4] bg-[#06B6D4]/10'
                                    : 'text-red-500 bg-red-500/10'
                                }
                            `}
                        >
                            <TrendingDown className="h-4 w-4" />
                            <span>5.2%</span>
                        </Badge>
                    )}
                </h2>
            </div>

            <style>{`
                /* Mobile pie chart fix only */
                @media (max-width: 480px) {
                    .performance-chart-wrapper {
                        max-width: 220px;
                        max-height: 220px;
                        margin: 0 auto;
                    }

                    .performance-chart-wrapper svg {
                        max-width: 220px !important;
                        max-height: 220px !important;
                    }
                }
            `}</style>

            {renderContent()}
        </div>
    );
};

