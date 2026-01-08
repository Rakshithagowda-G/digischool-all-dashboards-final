import React, { useState, useEffect } from "react";
import { Calendar, FileText, Trophy, ClipboardList, Loader2, AlertCircle } from "lucide-react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { getHomeSummary } from "@/lib/api";

export const StatsCardsSection = () => {
  const { darkMode } = useDarkMode();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(window.location.search);
        const studentId = searchParams.get('studentId') || 'STU001';
        const response = await getHomeSummary(studentId);
        setData(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching summary data:", err);
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      label: "Attendance Rate",
      value: loading ? "..." : `${data?.attendancePercentage || 0}%`,
      icon: Calendar,
      iconBg: "bg-indigo-900",
      iconColor: "text-white",
    },
    {
      label: "Assignments Completed",
      value: loading ? "..." : (data?.assignmentsCompleted || 0).toString(),
      icon: FileText,
      iconBg: "bg-indigo-900",
      iconColor: "text-white",
    },
    {
      label: "Average Grade",
      value: loading ? "..." : (data?.averageGrade || "N/A"),
      icon: Trophy,
      iconBg: "bg-indigo-900",
      iconColor: "text-white",
    },
    {
      label: "Pending Tasks",
      value: loading ? "..." : (data?.pendingTasks || 0).toString(),
      icon: ClipboardList,
      iconBg: "bg-indigo-900",
      iconColor: "text-white",
    },
  ];

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-[20px] p-6 flex items-center justify-between shadow-sm ${darkMode ? 'bg-[#111c44] text-white' : 'bg-white text-slate-900'}`}
          >
            <div>
              <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </p>
              <h3 className="text-3xl font-bold">
                {stat.value}
              </h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
              {loading ? (
                <Loader2 className={`w-6 h-6 animate-spin ${stat.iconColor}`} />
              ) : (
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};










