import React, { useState } from 'react';

export const CustomPieChart = ({ data, colors }) => {
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: null });

    // Calculate total for percentages
    const total = data.reduce((sum, item) => sum + item.marks, 0);

    // Calculate pie slices
    let currentAngle = -90; // Start from top
    const slices = data.map((item, index) => {
        const percentage = (item.marks / total) * 100;
        const angle = (percentage / 100) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;

        // Calculate arc path
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = 50 + 40 * Math.cos(startRad);
        const y1 = 50 + 40 * Math.sin(startRad);
        const x2 = 50 + 40 * Math.cos(endRad);
        const y2 = 50 + 40 * Math.sin(endRad);

        const largeArc = angle > 180 ? 1 : 0;

        const pathData = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 40 40 0 ${largeArc} 1 ${x2} ${y2}`,
            `Z`
        ].join(' ');

        // Calculate label position (middle of the arc)
        const midAngle = (startAngle + endAngle) / 2;
        const midRad = (midAngle * Math.PI) / 180;
        const labelRadius = 30; // Position labels closer to center
        const labelX = 50 + labelRadius * Math.cos(midRad);
        const labelY = 50 + labelRadius * Math.sin(midRad);

        currentAngle = endAngle;

        return {
            path: pathData,
            color: colors[item.category],
            label: item.marks,
            labelX,
            labelY,
            category: item.category,
            percentage: percentage.toFixed(1),
            value: item.marks
        };
    });

    const handleMouseMove = (e, slice) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            content: {
                name: slice.category.charAt(0).toUpperCase() + slice.category.slice(1),
                value: slice.value,
                percentage: slice.percentage
            }
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, content: null });
    };

    return (
        <>
            <div className="w-full h-full flex items-center justify-center">
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full max-w-[280px] max-h-[280px]"
                    style={{ overflow: 'visible' }}
                >
                    {/* Pie slices */}
                    {slices.map((slice, index) => (
                        <g key={index}>
                            <path
                                d={slice.path}
                                fill={slice.color}
                                stroke="white"
                                strokeWidth="0.5"
                                className="transition-opacity hover:opacity-80 cursor-pointer"
                                onMouseMove={(e) => handleMouseMove(e, slice)}
                                onMouseLeave={handleMouseLeave}
                            />
                            {/* Label */}
                            <text
                                x={slice.labelX}
                                y={slice.labelY}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-white font-medium pointer-events-none"
                                style={{ fontSize: '5px' }}
                            >
                                {slice.label}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>

            {/* Tooltip */}
            {tooltip.visible && tooltip.content && (
                <div
                    className="fixed pointer-events-none z-[9999] animate-in fade-in duration-200"
                    style={{
                        left: `${tooltip.x + 10}px`,
                        top: `${tooltip.y - 40}px`,
                    }}
                >
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap">
                        <div className="font-semibold">{tooltip.content.name}</div>
                        <div className="text-xs opacity-90">
                            {tooltip.content.value} marks ({tooltip.content.percentage}%)
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
