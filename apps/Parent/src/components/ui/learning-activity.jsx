import React, { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import useMediaQuery from '@mui/material/useMediaQuery';

const data = [
  { name: "Jan", lastMonth: 96, thisMonth: 72 },
  { name: "Feb", lastMonth: 58, thisMonth: 82 },
  { name: "Mar", lastMonth: 42, thisMonth: 36 },
  { name: "Apr", lastMonth: 64, thisMonth: 54 },
  { name: "May", lastMonth: 38, thisMonth: 68 },
  { name: "Jun", lastMonth: 78, thisMonth: 96 },
  { name: "Jul", lastMonth: 72, thisMonth: 58 },
  { name: "Aug", lastMonth: 44, thisMonth: 72 },
  { name: "Sep", lastMonth: 68, thisMonth: 48 },
  { name: "Oct", lastMonth: 32, thisMonth: 58 },
  { name: "Nov", lastMonth: 84, thisMonth: 92 },
  { name: "Dec", lastMonth: 60, thisMonth: 76 },
];

export function LearningActivity() {
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
  const xLabels = data.map(d => d.name);
  const lastMonthData = data.map(d => d.lastMonth);
  const thisMonthData = data.map(d => d.thisMonth);

  return (
    <div className={`rounded-2xl shadow-md w-full max-w-full md:max-w-none p-5 min-h-0 overflow-hidden ${isDark ? 'bg-[#0A1333] border border-white/10' : 'bg-white'
      }`}>
      <div className="mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h3 className={`text-lg sm:text-xl font-semibold break-words whitespace-normal leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Score Activity
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className={`flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              Last Month
            </span>
            <span className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${isDark ? 'bg-[#38BDF8]' : 'bg-[#3B82F6]'}`} />
              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>This Month</span>
            </span>
          </div>
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${isDark
              ? 'border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300'
              : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
            aria-label="More options"
          >
            …
          </button>
        </div>
      </div>

      {/* MUI X Charts Responsive Container */}
      <div className="w-full min-h-[240px] h-[240px] sm:h-[280px] md:h-[320px]">
        <BarChart
          height={chartHeight}
          xAxis={[{
            scaleType: 'band',
            data: xLabels,
            tickLabelStyle: {
              fill: isDark ? '#e2e8f0' : '#94A3B8',
              fontSize: 12,
              fontWeight: 600
            }
          }]}
          yAxis={[{
            min: 0,
            max: 100,
            tickNumber: 5,
            tickLabelStyle: {
              fill: isDark ? '#e2e8f0' : '#94A3B8',
              fontSize: 12,
              fontWeight: 600
            }
          }]}
          series={[
            {
              data: lastMonthData,
              label: 'Last Month',
              color: '#F59E0B',
              id: 'lastMonth'
            },
            {
              data: thisMonthData,
              label: 'This Month',
              color: isDark ? '#38BDF8' : '#3B82F6',
              id: 'thisMonth'
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
              stroke: isDark ? 'rgba(255,255,255,0.08)' : '#E9ECF1',
              strokeDasharray: '3 3'
            },
            '& .MuiChartsTooltip-root': {
              backgroundColor: isDark ? '#0B1646' : '#1e293b',
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #334155',
              borderRadius: '8px',
            },
            '& .MuiChartsTooltip-label': {
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            '& .MuiChartsTooltip-value': {
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600
            }
          }}
          slotProps={{
            legend: { hidden: true }
          }}
          barLabel="value"
        />
      </div>
    </div>
  );
}
