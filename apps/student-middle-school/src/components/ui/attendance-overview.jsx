import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AttendanceOverview = ({ attendance }) => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    if (!attendance) {
        return (
            <div className="w-full max-w-[320px] md:max-w-none xl:max-w-[320px] bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center justify-center min-h-[300px] mx-auto md:mx-0">
                <p className="text-[#92A1AD] text-sm font-medium">No data available</p>
            </div>
        );
    }

    const { monthName = "January", year = 2026, overallPercentage = 0, days = [] } = attendance;

    return (
        <div className="w-full max-w-[320px] md:max-w-none xl:max-w-[320px] bg-white rounded-2xl shadow-sm p-5 flex flex-col mx-auto md:mx-0">
            <div className="mb-4">
                <h3 className="text-[#1E266D] font-bold text-lg">Monthly Attendance Overview</h3>
                <p className="text-[#92A1AD] text-sm">{overallPercentage}% Attendance</p>
            </div>

            <div className="flex items-center justify-between mb-4 px-2">
                <button className="text-[#92A1AD] hover:text-[#1E266D] transition-colors cursor-not-allowed opacity-50">
                    <ChevronLeft size={20} />
                </button>
                <span className="text-[#1E266D] font-bold text-sm">{monthName} {year}</span>
                <button className="text-[#92A1AD] hover:text-[#1E266D] transition-colors cursor-not-allowed opacity-50">
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {daysOfWeek.map((day) => (
                    <div key={day} className="text-[#92A1AD] text-[10px] font-bold uppercase tracking-wider py-1">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days.map((item, index) => (
                    <div
                        key={index}
                        className={`
              aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all
              ${!item.day ? "bg-transparent" : "bg-[#F8FAFC]"}
              ${item.status === "Present" ? "bg-[#22C55E] text-white shadow-md shadow-green-100" : ""}
              ${item.status === "Absent" ? "bg-red-500 text-white shadow-md shadow-red-100" : ""}
              ${item.status === "Leave" ? "bg-orange-500 text-white shadow-md shadow-orange-100" : ""}
              ${item.day && !item.status ? "text-[#1E266D] hover:bg-slate-100 cursor-pointer" : "text-white"}
              ${item.day && !item.status ? "text-[#1E266D]" : ""}
            `}
                    >
                        {item.day || ""}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AttendanceOverview;
