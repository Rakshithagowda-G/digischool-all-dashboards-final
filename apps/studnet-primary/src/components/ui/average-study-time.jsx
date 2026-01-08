import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList, CartesianGrid } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export const AverageStudyTime = () => {
    const { mode } = useTheme();
    const isDark = mode === 'dark';
    const isHomePage = window.location.pathname === '/';
    const data = [
        { day: 'Sun', time: 30 },
        { day: 'Mon', time: 20 },
        { day: 'Tue', time: 35 },
        { day: 'Wed', time: 50 },
        { day: 'Thu', time: 0 },
        { day: 'Fri', time: 0 },
        { day: 'Sat', time: 0 }
    ];

    // Find the index of the maximum value to highlight it
    const maxVal = Math.max(...data.map(d => d.time));
    const maxIndex = data.findIndex(d => d.time === maxVal);

    // Custom label renderer for the pill and avatar
    const renderCustomLabel = (props) => {
        const { x, y, width, value, index } = props;

        if (index !== maxIndex) return null;

        return (
            <g>
                <foreignObject x={x - 45} y={y - 50} width={width + 80} height={50}>
                    <div className="flex items-center justify-center h-full w-full">
                        <div className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-full shadow-md
                            ${isDark && isHomePage ? 'bg-[#06B6D4]' : 'bg-[#A78BFA]'}
                        `}>
                            <span className="text-white text-xs font-bold whitespace-nowrap">
                                {value}min
                            </span>
                            <img
                                src="/img/icons8-avatar-50.png"
                                alt="avatar"
                                className="w-8 h-8 rounded-full border-2 border-white"
                            />
                        </div>
                    </div>
                </foreignObject>
            </g>
        );
    };

    return (
        <div className={`
            w-full rounded-2xl p-4 sm:p-6 shadow-sm transition-colors duration-200
            ${isDark && isHomePage ? 'bg-[#181B21]' : 'bg-white'}
        `}>
            <div className="flex justify-between items-center mb-8">
                <h2 className={`
                    text-xl font-bold
                    ${isDark && isHomePage ? 'text-[#FFFFFF]' : 'text-gray-900'}
                `}>
                    Average Study Time
                </h2>
            </div>

            <div className="h-[280px] md:h-[200px] lg:h-[260px] xl:h-[280px] w-full min-h-[1px] min-w-[1px]" style={{ overflow: 'visible' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={16} margin={{ top: 50, right: 20, left: 10, bottom: window.innerWidth >= 820 && window.innerWidth <= 1024 ? 28 : 0 }}>
                        <defs>
                            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={isDark && isHomePage ? "#2D3342" : "#7B61FF"} />
                                <stop offset="100%" stopColor={isDark && isHomePage ? "#232730" : "#4C44E0"} />
                            </linearGradient>
                            <linearGradient id="highlightGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={isDark && isHomePage ? "#06B6D4" : "#4AE2FF"} />
                                <stop offset="100%" stopColor={isDark && isHomePage ? "#0891B2" : "#2EC8FF"} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={isDark && isHomePage ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}
                        />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark && isHomePage ? '#CBD5E1' : '#334155', fontSize: window.innerWidth >= 820 && window.innerWidth <= 1024 ? 11 : 14 }}
                            dy={10}
                            tickMargin={window.innerWidth >= 820 && window.innerWidth <= 1024 ? 8 : 0}
                            interval={0}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark && isHomePage ? '#E5E7EB' : '#334155', fontSize: 12 }}
                            tickFormatter={(value) => `${value}min`}
                            width={50}
                        />
                        <Bar
                            dataKey="time"
                            radius={[12, 12, 12, 12]}
                            animationDuration={1500}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === maxIndex ? 'url(#highlightGradient)' : 'url(#purpleGradient)'}
                                />
                            ))}
                            <LabelList dataKey="time" content={renderCustomLabel} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
