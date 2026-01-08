import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const hovered = payload[0];
    return (
      <div className="rounded-xl bg-slate-900 px-3 py-2 shadow-xl">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
          {label}
        </p>
        <p className="text-base font-semibold text-white">
          {hovered.value.toLocaleString("en-US", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}
        </p>
      </div>
    );
  }
  return null;
};

export function LearningActivity() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md w-full">
      <div className="mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
            Score Activity
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-slate-500">
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
      <div className="w-full" style={{ height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap={18}
            barGap={4}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              stroke="#E9ECF1"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 600 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              width={36}
            />
            <Tooltip
              cursor={{ fill: "rgba(148, 163, 184, 0.12)" }}
              content={<CustomTooltip />}
            />
            <Bar
              dataKey="lastMonth"
              radius={[6, 6, 0, 0]}
              fill="#F59E0B"
              maxBarSize={16}
            />
            <Bar
              dataKey="thisMonth"
              radius={[6, 6, 0, 0]}
              fill="#3B82F6"
              maxBarSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
