import React, { useState, useEffect } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import useMediaQuery from '@mui/material/useMediaQuery';

const data = [
  { name: "Mon", lastWeek: 45, thisWeek: 35 },
  { name: "Tue", lastWeek: 58, thisWeek: 48 },
  { name: "Wed", lastWeek: 78, thisWeek: 35 },
  { name: "Thu", lastWeek: 65, thisWeek: 42 },
  { name: "Fri", lastWeek: 45, thisWeek: 88 },
  { name: "Sat", lastWeek: 35, thisWeek: 45 },
  { name: "Sun", lastWeek: 32, thisWeek: 92 },
];

export function LearningActivityGraph() {
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
  const lastWeekData = data.map(d => d.lastWeek);
  const thisWeekData = data.map(d => d.thisWeek);

  return (
    <div className={`rounded-3xl border w-full px-4 md:px-5 pb-4 md:pb-5 pt-4 md:pt-5 shadow-sm min-h-0 overflow-hidden ${isDark ? 'bg-[#0A1333] border-white/10' : 'bg-white border-slate-200'
      }`}>
      <div className="mb-4 md:mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h3 className={`text-lg md:text-xl font-semibold break-words whitespace-normal leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Learning Activity
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 text-sm font-medium">
            <span className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${isDark ? 'bg-[#F59E0B]' : 'bg-[#F59E0B]'}`} />
              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Last Week</span>
            </span>
            <span className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${isDark ? 'bg-[#38BDF8]' : 'bg-[#3B82F6]'}`} />
              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>This Week</span>
            </span>
          </div>
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${isDark
              ? 'border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300'
              : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
            aria-label="More options"
          >
            ⋯
          </button>
        </div>
      </div>

      {/* MUI X Charts Responsive Container */}
      <div className="w-full min-h-[240px] h-[240px] sm:h-[280px] md:h-[320px]">
        <LineChart
          height={chartHeight}
          xAxis={[{
            scaleType: 'point',
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
            tickNumber: 6,
            tickLabelStyle: {
              fill: isDark ? '#e2e8f0' : '#94A3B8',
              fontSize: 12,
              fontWeight: 600
            }
          }]}
          series={[
            {
              data: lastWeekData,
              label: 'Last Week',
              color: '#F59E0B',
              area: true,
              showMark: true,
              curve: 'monotoneX',
            },
            {
              data: thisWeekData,
              label: 'This Week',
              color: isDark ? '#38BDF8' : '#3B82F6',
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
              stroke: isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0',
              strokeDasharray: '3 3'
            },
            '& .MuiAreaElement-root': {
              fillOpacity: 0.15
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
          grid={{ horizontal: true }}
        />
      </div>
    </div>
  );
}
