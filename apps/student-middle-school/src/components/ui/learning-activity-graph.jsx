import React from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { name: "Mon", lastWeek: 45, thisWeek: 35 },
  { name: "Tue", lastWeek: 58, thisWeek: 48 },
  { name: "Wed", lastWeek: 78, thisWeek: 35 },
  { name: "Thu", lastWeek: 65, thisWeek: 42 },
  { name: "Fri", lastWeek: 45, thisWeek: 88 },
  { name: "Sat", lastWeek: 35, thisWeek: 45 },
  { name: "Sun", lastWeek: 32, thisWeek: 92 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-slate-800 px-4 py-3 shadow-xl border border-slate-700">
        <p className="text-xs font-semibold text-slate-400 mb-2">
          {label}
        </p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-white">
                {entry.value.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400">
                {entry.name === "lastWeek" ? "Last Week" : "This Week"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function LearningActivityGraph() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-4 md:px-5 pb-4 md:pb-5 pt-4 md:pt-5 shadow-sm w-full">
      <div className="mb-4 md:mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-slate-900">
            Learning Activity
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 text-sm font-medium">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
              <span className="text-slate-600">Last Week</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
              <span className="text-slate-600">This Week</span>
            </span>
          </div>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
            aria-label="More options"
          >
            ⋯
          </button>
        </div>
      </div>
      <div className="h-[250px] md:h-[300px] w-full overflow-x-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorLastWeek" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#E2E8F0"
              strokeDasharray="3 3"
              vertical={true}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 13, fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 13, fontWeight: 600 }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              width={45}
            />
            <Tooltip
              cursor={{ stroke: "#CBD5E1", strokeWidth: 1, strokeDasharray: "5 5" }}
              content={<CustomTooltip />}
            />
            <Area
              type="monotone"
              dataKey="lastWeek"
              stroke="#F59E0B"
              strokeWidth={3}
              fill="url(#colorLastWeek)"
              dot={{
                fill: "#F59E0B",
                strokeWidth: 2,
                r: 5,
                stroke: "#fff"
              }}
              activeDot={{
                r: 7,
                fill: "#F59E0B",
                stroke: "#fff",
                strokeWidth: 2
              }}
            />
            <Area
              type="monotone"
              dataKey="thisWeek"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#colorThisWeek)"
              dot={{
                fill: "#3B82F6",
                strokeWidth: 2,
                r: 5,
                stroke: "#fff"
              }}
              activeDot={{
                r: 7,
                fill: "#3B82F6",
                stroke: "#fff",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
