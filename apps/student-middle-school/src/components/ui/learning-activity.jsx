import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

// Only showing last 6 months of data
const monthData = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const lastMonthData = [72, 44, 68, 32, 84, 60];
const thisMonthData = [58, 72, 48, 58, 92, 76];

export function LearningActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full p-5 flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
            Score Activity
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              Last Month
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
              This Month
            </span>
          </div>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
            aria-label="More options"
          >
            …
          </button>
        </div>
      </div>

      {/* Chart Container - Extra height on mobile for better axis visibility */}
      <div className="w-full h-[360px] min-h-[360px] sm:h-[340px] sm:min-h-[340px]">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: monthData,
              categoryGapRatio: 0.3,
              barGapRatio: 0.1,
              tickLabelInterval: () => true, // Force all labels to show
            },
          ]}
          yAxis={[
            {
              min: 0,
              max: 100,
              tickMinStep: 25,
            },
          ]}
          series={[
            {
              data: lastMonthData,
              label: "Last Month",
              color: "#F59E0B",
            },
            {
              data: thisMonthData,
              label: "This Month",
              color: "#3B82F6",
            },
          ]}
          height={360}
          margin={{ top: 20, right: 15, left: 45, bottom: 60 }}
          slotProps={{
            legend: { hidden: true },
          }}
          sx={{
            "& .MuiChartsAxis-tickLabel": {
              fill: "#94A3B8",
              fontSize: "10px",
              fontWeight: 600,
              "@media (min-width: 640px)": {
                fontSize: "12px",
              },
            },
            "& .MuiChartsAxis-line": {
              display: "none",
            },
            "& .MuiChartsAxis-tick": {
              display: "none",
            },
            "& .MuiChartsGrid-line": {
              stroke: "#E9ECF1",
              strokeDasharray: "3 3",
            },
            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
              transform: "translateY(12px)",
            },
            "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
              transform: "translateX(-8px)",
            },
          }}
        />
      </div>
    </div>
  );
}
