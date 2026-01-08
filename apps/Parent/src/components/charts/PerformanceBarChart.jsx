import React, { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import useMediaQuery from '@mui/material/useMediaQuery';

export const PerformanceBarChart = ({ data }) => {
    const [isDark, setIsDark] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:640px)');
    const chartHeight = isSmallScreen ? 260 : 300;

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    // Transform data for MUI X Charts
    const xLabels = data.map(d => d.subject);
    const studentData = data.map(d => d.student);
    const classAvgData = data.map(d => d.classAvg);

    return (
        <div className={`w-full rounded-2xl border p-3 sm:p-4 lg:p-6 min-h-0 overflow-hidden ${isDark
            ? 'bg-gradient-to-b from-[#0B1646] to-[#060C2C] shadow-[0_6px_20px_rgba(5,15,40,.7)] border-white/10'
            : 'bg-white shadow-sm border-[#E5E7EB]'
            }`}>
            <h3 className={`text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 break-words whitespace-normal leading-snug ${isDark ? 'text-[#E9ECFF]' : 'text-[#020617]'}`}>
                Performance vs Class Average
            </h3>

            <div className="w-full min-h-[200px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px] h-[200px] sm:h-[260px] md:h-[280px] lg:h-[320px]">
                <BarChart
                    height={chartHeight}
                    xAxis={[{
                        scaleType: 'band',
                        data: xLabels,
                        tickLabelStyle: {
                            fill: isDark ? '#e2e8f0' : '#334155',
                            fontSize: 10
                        }
                    }]}
                    yAxis={[{
                        min: 0,
                        max: 100,
                        tickLabelStyle: {
                            fill: isDark ? '#e2e8f0' : '#334155',
                            fontSize: 10
                        }
                    }]}
                    series={[
                        {
                            data: studentData,
                            label: 'Your Child',
                            color: isDark ? '#38BDF8' : '#2563EB',
                            id: 'student'
                        },
                        {
                            data: classAvgData,
                            label: 'Class Average',
                            color: isDark ? '#94A3B8' : '#CBD5E1',
                            id: 'classAvg'
                        }
                    ]}
                    margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
                    sx={{
                        '& .MuiChartsAxis-line': {
                            stroke: 'transparent'
                        },
                        '& .MuiChartsAxis-tick': {
                            stroke: 'transparent'
                        },
                        '& .MuiChartsGrid-line': {
                            stroke: isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB',
                            strokeDasharray: '3 3'
                        },
                        '& .MuiChartsTooltip-root': {
                            backgroundColor: isDark ? '#0B1646' : '#fff',
                            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e7eb',
                            borderRadius: '8px',
                        },
                        '& .MuiChartsTooltip-label': {
                            color: isDark ? '#fff' : '#000',
                            fontWeight: 600
                        },
                        '& .MuiChartsTooltip-value': {
                            color: isDark ? '#fff' : '#000',
                        },
                        '& .MuiChartsLegend-root': {
                            display: 'flex',
                            justifyContent: 'center',
                        },
                        '& .MuiChartsLegend-series': {
                            gap: '10px'
                        },
                        '& .MuiChartsLegend-mark': {
                            width: '8px !important',
                            height: '8px !important'
                        },
                        '& .MuiChartsLegend-series text': {
                            fill: isDark ? '#C7D2FF !important' : '#334155 !important',
                            fontSize: '11px !important',
                        }
                    }}
                    slotProps={{
                        legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                            padding: 0
                        }
                    }}
                    barLabel="value"
                />
            </div>
        </div>
    );
};
