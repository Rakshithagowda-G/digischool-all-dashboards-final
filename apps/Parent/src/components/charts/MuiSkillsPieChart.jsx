import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import useMediaQuery from '@mui/material/useMediaQuery';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export const MuiSkillsPieChart = ({ data }) => {
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

    // Transform data for Recharts
    const pieData = safeData.map((item, index) => ({
        name: item.name || "Unknown",
        value: item.value || 0,
        color: COLORS[index % COLORS.length]
    }));

    // Responsive configurations - LARGER sizes
    const getResponsiveConfig = () => {
        if (isXSmall) {
            return {
                outerRadius: '45%',
                innerRadius: '0%',
                labelFontSize: 11,
                legendFontSize: 'text-xs',
                legendIconSize: 10,
                legendSpacing: 'gap-2'
            };
        } else if (isSmall) {
            return {
                outerRadius: '50%',
                innerRadius: '0%',
                labelFontSize: 12,
                legendFontSize: 'text-sm',
                legendIconSize: 12,
                legendSpacing: 'gap-2.5'
            };
        } else if (isMedium) {
            return {
                outerRadius: '55%',
                innerRadius: '0%',
                labelFontSize: 13,
                legendFontSize: 'text-base',
                legendIconSize: 14,
                legendSpacing: 'gap-3'
            };
        } else {
            return {
                outerRadius: '60%',
                innerRadius: '0%',
                labelFontSize: 14,
                legendFontSize: 'text-base',
                legendIconSize: 16,
                legendSpacing: 'gap-3'
            };
        }
    };

    const config = getResponsiveConfig();

    // Custom label renderer
    const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        if (percent < 0.05) return null; // Hide labels for very small slices

        return (
            <text
                x={x}
                y={y}
                fill={isDark ? '#fff' : '#020617'}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={config.labelFontSize}
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Custom legend renderer
    const renderLegend = (props) => {
        const { payload } = props;

        return (
            <div className={`flex flex-wrap justify-center items-center ${config.legendSpacing} px-2 sm:px-4`}>
                {payload.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center gap-1.5 sm:gap-2">
                        <div
                            className="rounded-full"
                            style={{
                                width: config.legendIconSize,
                                height: config.legendIconSize,
                                backgroundColor: entry.color
                            }}
                        />
                        <span className={`${config.legendFontSize} font-medium ${isDark ? 'text-[#C7D2FF]' : 'text-[#334155]'}`}>
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={`rounded-lg px-3 py-2 shadow-lg border ${isDark
                    ? 'bg-[#0B1646] border-white/10'
                    : 'bg-white border-gray-200'
                    }`}>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {payload[0].name}
                    </p>
                    <p className={`text-base font-bold ${isDark ? 'text-[#38BDF8]' : 'text-[#2563EB]'}`}>
                        {payload[0].value}%
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
            <h3 className={`text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 break-words whitespace-normal leading-snug ${isDark ? 'text-[#E9ECFF]' : 'text-[#020617]'}`}>
                Academic Strengths
            </h3>

            {/* Aspect-ratio based responsive container */}
            <div className="w-full aspect-square sm:aspect-[4/3] lg:aspect-[3/2] flex items-center justify-center">
                {safeData.length === 0 ? (
                    <div className={`text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        No academic strengths data available
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="45%"
                                labelLine={false}
                                label={renderCustomLabel}
                                outerRadius={config.outerRadius}
                                innerRadius={config.innerRadius}
                                fill="#8884d8"
                                dataKey="value"
                                stroke={isDark ? '#0B1646' : '#fff'}
                                strokeWidth={2}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                content={renderLegend}
                                verticalAlign="bottom"
                                align="center"
                                wrapperStyle={{ paddingTop: '20px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};
