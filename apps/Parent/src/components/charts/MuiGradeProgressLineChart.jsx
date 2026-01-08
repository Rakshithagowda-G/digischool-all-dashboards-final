import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';
import useMediaQuery from '@mui/material/useMediaQuery';

export const MuiGradeProgressLineChart = ({ data }) => {
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

    // Calculate improvement percentage
    const firstScore = safeData[0]?.score || 0;
    const lastScore = safeData.length > 0 ? safeData[safeData.length - 1]?.score || 0 : 0;
    const improvement = firstScore > 0 ? ((lastScore - firstScore) / firstScore * 100).toFixed(0) : 0;

    // Responsive configurations
    const getResponsiveConfig = () => {
        if (isXSmall) {
            return {
                fontSize: 10,
                tickRotation: -15,
                strokeWidth: 2.5,
                dotSize: 4,
                yAxisWidth: 35,
                margin: { top: 10, right: 10, bottom: 5, left: 0 }
            };
        } else if (isSmall) {
            return {
                fontSize: 10,
                tickRotation: 0,
                strokeWidth: 2.5,
                dotSize: 5,
                yAxisWidth: 38,
                margin: { top: 10, right: 15, bottom: 5, left: 0 }
            };
        } else if (isMedium) {
            return {
                fontSize: 11,
                tickRotation: 0,
                strokeWidth: 3,
                dotSize: 5,
                yAxisWidth: 40,
                margin: { top: 10, right: 20, bottom: 5, left: 0 }
            };
        } else {
            return {
                fontSize: 12,
                tickRotation: 0,
                strokeWidth: 3,
                dotSize: 6,
                yAxisWidth: 45,
                margin: { top: 15, right: 25, bottom: 10, left: 0 }
            };
        }
    };

    const config = getResponsiveConfig();

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={`rounded-lg px-3 py-2 shadow-lg border ${isDark
                    ? 'bg-[#0B1646] border-white/10'
                    : 'bg-white border-gray-200'
                    }`}>
                    <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {payload[0].payload.month}
                    </p>
                    <p className={`text-sm font-bold ${isDark ? 'text-[#38BDF8]' : 'text-[#2563EB]'}`}>
                        Score: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={`w-full rounded-2xl border p-3 sm:p-4 lg:p-6 ${isDark
            ? 'bg-gradient-to-b from-[#0B1646] to-[#060C2C] shadow-[0_6px_20px_rgba(5,15,40,.7)] border-white/10'
            : 'bg-white shadow-sm border-[#E5E7EB]'
            }`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className={`text-sm sm:text-base lg:text-lg font-bold break-words whitespace-normal leading-snug ${isDark ? 'text-[#E9ECFF]' : 'text-[#020617]'}`}>
                    Grade Progress
                </h3>
            </div>

            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-1.5 border ${isDark
                    ? 'bg-[#27B6FF]/10 text-[#27B6FF] border-[#27B6FF]/20'
                    : 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20'
                    }`}>
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    {improvement}% improvement this semester
                </div>
            </div>

            {/* Aspect-ratio based responsive container */}
            <div className="w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[5/2] flex items-center justify-center">
                {safeData.length === 0 ? (
                    <div className={`text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        No grade progress data available
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={safeData}
                            margin={config.margin}
                        >
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={isDark ? '#38BDF8' : '#2563EB'}
                                        stopOpacity={isDark ? 0.3 : 0.15}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={isDark ? '#38BDF8' : '#2563EB'}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'}
                                vertical={false}
                            />

                            <XAxis
                                dataKey="month"
                                interval={0}
                                angle={config.tickRotation}
                                textAnchor={config.tickRotation !== 0 ? 'end' : 'middle'}
                                tick={{
                                    fill: isDark ? '#e2e8f0' : '#334155',
                                    fontSize: config.fontSize,
                                    fontWeight: 500
                                }}
                                axisLine={false}
                                tickLine={false}
                                dy={5}
                            />

                            <YAxis
                                domain={[75, 100]}
                                width={config.yAxisWidth}
                                tick={{
                                    fill: isDark ? '#e2e8f0' : '#334155',
                                    fontSize: config.fontSize,
                                    fontWeight: 500
                                }}
                                axisLine={false}
                                tickLine={false}
                                dx={-5}
                            />

                            <Tooltip content={<CustomTooltip />} cursor={false} />

                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke={isDark ? '#38BDF8' : '#2563EB'}
                                strokeWidth={config.strokeWidth}
                                fill="url(#colorScore)"
                                fillOpacity={1}
                                dot={{
                                    fill: isDark ? '#38BDF8' : '#2563EB',
                                    strokeWidth: 2,
                                    r: config.dotSize,
                                    stroke: isDark ? '#0B1646' : '#fff'
                                }}
                                activeDot={{
                                    r: config.dotSize + 2,
                                    fill: isDark ? '#38BDF8' : '#2563EB',
                                    stroke: isDark ? '#fff' : '#2563EB',
                                    strokeWidth: 2
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};
