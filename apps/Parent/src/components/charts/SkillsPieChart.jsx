import React, { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import useMediaQuery from '@mui/material/useMediaQuery';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export const SkillsPieChart = ({ data }) => {
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
    const pieData = data.map((item, index) => ({
        id: index,
        value: item.value,
        label: item.name,
        color: COLORS[index % COLORS.length]
    }));

    return (
        <div className={`w-full rounded-2xl border p-3 sm:p-4 lg:p-6 min-h-0 overflow-hidden ${isDark
            ? 'bg-gradient-to-b from-[#0B1646] to-[#060C2C] shadow-[0_6px_20px_rgba(5,15,40,.7)] border-white/10'
            : 'bg-white shadow-sm border-[#E5E7EB]'
            }`}>
            <h3 className={`text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 lg:mb-6 break-words whitespace-normal leading-snug ${isDark ? 'text-[#E9ECFF]' : 'text-[#020617]'}`}>
                Academic Strengths
            </h3>

            <div className="w-full min-h-[200px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px] h-[200px] sm:h-[260px] md:h-[280px] lg:h-[320px]">
                <PieChart
                    height={chartHeight}
                    series={[
                        {
                            data: pieData,
                            innerRadius: 0,
                            outerRadius: '75%',
                            paddingAngle: 0,
                            cornerRadius: 0,
                            startAngle: 0,
                            endAngle: 360,
                            cx: '50%',
                            cy: '50%',
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            arcLabel: (item) => `${item.value}%`,
                            arcLabelMinAngle: 20,
                        }
                    ]}
                    sx={{
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
                            fontSize: '10px !important',
                        },
                        '& .MuiPieArc-root': {
                            stroke: isDark ? '#0B1646' : '#fff',
                            strokeWidth: 1,
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
                        legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                            padding: 0
                        }
                    }}
                />
            </div>
        </div>
    );
};
