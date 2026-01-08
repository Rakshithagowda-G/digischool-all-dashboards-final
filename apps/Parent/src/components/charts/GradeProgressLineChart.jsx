import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { LineChart } from '@mui/x-charts/LineChart';
import useMediaQuery from '@mui/material/useMediaQuery';

export const GradeProgressLineChart = ({ data }) => {
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

    // Calculate improvement percentage
    const firstScore = data[0]?.score || 0;
    const lastScore = data[data.length - 1]?.score || 0;
    const improvement = ((lastScore - firstScore) / firstScore * 100).toFixed(0);

    // Transform data for MUI X Charts
    const xLabels = data.map(d => d.month);
    const scores = data.map(d => d.score);

    return (
        <div className={`w-full rounded-2xl border p-3 sm:p-4 lg:p-6 min-h-0 overflow-hidden ${isDark
            ? 'bg-gradient-to-b from-[#0B1646] to-[#060C2C] shadow-[0_6px_20px_rgba(5,15,40,.7)] border-white/10'
            : 'bg-white shadow-sm border-[#E5E7EB]'
            }`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className={`text-sm sm:text-base lg:text-lg font-bold break-words whitespace-normal leading-snug ${isDark ? 'text-[#E9ECFF]' : 'text-[#020617]'}`}>Grade Progress</h3>
            </div>

            <div className="flex items-center gap-2 mb-3 sm:mb-4 lg:mb-6">
                <div className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-1.5 border ${isDark
                    ? 'bg-[#27B6FF]/10 text-[#27B6FF] border-[#27B6FF]/20'
                    : 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20'
                    }`}>
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    {improvement}% improvement this semester
                </div>
            </div>

            <div className="w-full min-h-[260px] h-[260px] sm:h-[300px]">
                <div className="pl-2 sm:pl-3 h-full">
                    <LineChart
                        height={chartHeight}
                        xAxis={[{
                            scaleType: 'point',
                            data: xLabels,
                            tickLabelStyle: {
                                fill: isDark ? '#e2e8f0' : '#64748B',
                                fontSize: 11
                            }
                        }]}
                        yAxis={[{
                            min: 75,
                            max: 100,
                            tickLabelStyle: {
                                fill: isDark ? '#e2e8f0' : '#64748B',
                                fontSize: 11
                            }
                        }]}
                        series={[
                            {
                                data: scores,
                                label: 'Score',
                                color: isDark ? '#38BDF8' : '#2563EB',
                                area: true,
                                showMark: true,
                                curve: 'monotoneX',
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
                            '& .MuiAreaElement-root': {
                                fillOpacity: 0.15
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
                            }
                        }}
                        slotProps={{
                            legend: { hidden: true }
                        }}
                        grid={{ horizontal: true }}
                    />
                </div>
            </div>
        </div>
    );
};
