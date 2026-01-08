import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import useMediaQuery from '@mui/material/useMediaQuery';

export const MuiPerformanceBarChart = ({ data }) => {
    const [isDark, setIsDark] = useState(false);

    // Responsive breakpoints
    const isXSmall = useMediaQuery('(max-width:480px)');
    const isSmall = useMediaQuery('(max-width:640px)');
    const isMedium = useMediaQuery('(max-width:768px)');

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    const safeData = Array.isArray(data) ? data : [];

    // Transform data for MUI X Charts
    const subjects = safeData.map(item => item.subject || "Unknown");
    const classAvgData = safeData.map(item => item.classAvg || 0);
    const studentData = safeData.map(item => item.student || 0);

    // Responsive configurations - compact heights
    const getResponsiveConfig = () => {
        if (isXSmall) {
            return {
                height: 280,
                margin: { top: 10, right: 5, bottom: 45, left: 40 },
                fontSize: 9,
                legendFontSize: 9,
                tickRotation: -15,
                legendDirection: 'column',
                legendPosition: { vertical: 'bottom', horizontal: 'left' },
                legendPadding: { top: 10 }
            };
        } else if (isSmall) {
            return {
                height: 280,
                margin: { top: 10, right: 10, bottom: 40, left: 42 },
                fontSize: 10,
                legendFontSize: 10,
                tickRotation: 0,
                legendDirection: 'row',
                legendPosition: { vertical: 'top', horizontal: 'right' },
                legendPadding: 0
            };
        } else if (isMedium) {
            return {
                height: 300,
                margin: { top: 10, right: 15, bottom: 35, left: 50 },
                fontSize: 11,
                legendFontSize: 11,
                tickRotation: 0,
                legendDirection: 'row',
                legendPosition: { vertical: 'top', horizontal: 'right' },
                legendPadding: 0
            };
        } else {
            return {
                height: 340,
                margin: { top: 10, right: 20, bottom: 35, left: 55 },
                fontSize: 12,
                legendFontSize: 11,
                tickRotation: 0,
                legendDirection: 'row',
                legendPosition: { vertical: 'top', horizontal: 'right' },
                legendPadding: 0
            };
        }
    };

    const config = getResponsiveConfig();

    return (
        <div className={`w-full rounded-2xl border p-3 sm:p-4 lg:p-6 ${isDark
            ? 'bg-gradient-to-b from-[#0B1646] to-[#060C2C] shadow-[0_6px_20px_rgba(5,15,40,.7)] border-white/10'
            : 'bg-white shadow-sm border-[#E5E7EB]'
            }`}>
            <h3 className={`text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 break-words whitespace-normal leading-snug ${isDark ? 'text-[#E9ECFF]' : 'text-[#020617]'}`}>
                Performance vs Class Average
            </h3>

            <div className="w-full flex items-center justify-center min-h-[200px]">
                {safeData.length === 0 ? (
                    <div className={`text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        No performance data available
                    </div>
                ) : (
                    <BarChart
                        xAxis={[{
                            scaleType: 'band',
                            data: subjects,
                            categoryGapRatio: isXSmall ? 0.4 : 0.3,
                            barGapRatio: isXSmall ? 0.3 : 0.2,
                            tickLabelStyle: {
                                angle: config.tickRotation,
                                textAnchor: config.tickRotation !== 0 ? 'end' : 'middle',
                                fill: isDark ? '#e2e8f0' : '#334155',
                                fontSize: config.fontSize,
                                fontWeight: 500
                            }
                        }]}
                        yAxis={[{
                            tickLabelStyle: {
                                fill: isDark ? '#e2e8f0' : '#334155',
                                fontSize: config.fontSize,
                                fontWeight: 500
                            }
                        }]}
                        series={[
                            {
                                data: classAvgData,
                                label: 'Class Average',
                                color: isDark ? '#94A3B8' : '#CBD5E1'
                            },
                            {
                                data: studentData,
                                label: 'Your Child',
                                color: isDark ? '#38BDF8' : '#2563EB'
                            }
                        ]}
                        height={config.height}
                        margin={config.margin}
                        sx={{
                            width: '100%',
                            maxWidth: '100%',
                            '& .MuiChartsAxis-tickLabel': {
                                fill: isDark ? '#e2e8f0' : '#334155',
                            },
                            '& .MuiChartsAxis-line': {
                                stroke: 'transparent'
                            },
                            '& .MuiChartsAxis-tick': {
                                stroke: 'transparent'
                            },
                            '& .MuiChartsLegend-root': {
                                transform: isXSmall ? 'translateY(-10px)' : 'none'
                            },
                            '& .MuiChartsLegend-label': {
                                fill: isDark ? '#C7D2FF' : '#334155',
                                fontSize: `${config.legendFontSize}px !important`,
                                fontWeight: 500
                            },
                            '& .MuiChartsLegend-mark': {
                                width: `${isXSmall ? 8 : 10}px !important`,
                                height: `${isXSmall ? 8 : 10}px !important`
                            },
                            '& .MuiChartsLegend-series': {
                                gap: isXSmall ? '8px' : '12px'
                            },
                            '& .MuiChartsGrid-line': {
                                stroke: isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB',
                                strokeDasharray: '3 3'
                            },
                            '& .MuiBarElement-root': {
                                strokeWidth: 0
                            }
                        }}
                        slotProps={{
                            legend: {
                                direction: config.legendDirection,
                                position: config.legendPosition,
                                padding: config.legendPadding,
                                itemMarkWidth: isXSmall ? 8 : 10,
                                itemMarkHeight: isXSmall ? 8 : 10,
                                itemGap: isXSmall ? 8 : 12,
                                labelStyle: {
                                    fontSize: config.legendFontSize,
                                    fill: isDark ? '#C7D2FF' : '#334155'
                                }
                            }
                        }}
                        grid={{ horizontal: true }}
                    />
                )}
            </div>
        </div>
    );
};
