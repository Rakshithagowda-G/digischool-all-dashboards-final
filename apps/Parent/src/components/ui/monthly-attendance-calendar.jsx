import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    addMonths,
    subMonths,
    isSameDay,
    parseISO,
} from "date-fns";
import ParentService, { DEFAULT_STUDENT_ID } from "@/services/ParentService";
import { useMemo } from "react";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const monthNameToIndex = (name) => {
    if (!name) return -1;
    return monthNames.indexOf(name);
};

const getStatusClasses = (status) => {
    if (!status) return { bg: "bg-[#F8F9FC] dark:bg-white/5", text: "text-[#0F172A] dark:text-white font-bold" };

    const s = status.toUpperCase();
    switch (s) {
        case 'PRESENT':
            return { bg: "bg-[#22c55e]", text: "text-white font-bold" };
        case 'ABSENT':
            return { bg: "bg-[#ef4444]", text: "text-white font-bold" };
        case 'LEAVE':
            return { bg: "bg-[#f59e0b]", text: "text-white font-bold" };
        default:
            return { bg: "bg-[#F8F9FC] dark:bg-white/5", text: "text-[#0F172A] dark:text-white font-bold" };
    }
};

export const MonthlyAttendanceCalendar = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(null);
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [anchorDate, setAnchorDate] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const studentId = urlParams.get('studentId') || DEFAULT_STUDENT_ID;

            // If we don't have a currentDate yet, fetch once to find the latest "anchor" month
            let queryMonth = null;
            let queryYear = null;

            if (currentDate) {
                queryMonth = monthNames[currentDate.getMonth()];
                queryYear = currentDate.getFullYear();
            }

            try {
                setLoading(true);
                const data = await ParentService.getAttendanceOverview(studentId, queryMonth, queryYear);
                setAttendanceData(data);

                // If this is the initial load (currentDate is null), use backend's month as anchor
                if (!currentDate && data && data.month !== "N/A") {
                    const backendMonthIdx = monthNameToIndex(data.month);
                    if (backendMonthIdx !== -1) {
                        const backendDate = new Date(data.year, backendMonthIdx, 1);
                        setCurrentDate(backendDate);
                        setAnchorDate(backendDate);
                    } else {
                        // Fallback to today if month is invalid
                        const fallback = startOfMonth(today);
                        setCurrentDate(fallback);
                        setAnchorDate(fallback);
                    }
                } else if (!currentDate) {
                    // Fallback to today if no data at all
                    const fallback = startOfMonth(today);
                    setCurrentDate(fallback);
                    setAnchorDate(fallback);
                }
            } catch (err) {
                console.error("Error fetching attendance overview:", err);
                if (!currentDate) setCurrentDate(startOfMonth(today));
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, [currentDate]);

    // Create a lookup map for attendance statuses: { "2026-01-01": "PRESENT" }
    const attendanceMap = useMemo(() => {
        if (!attendanceData || !Array.isArray(attendanceData.days)) return {};

        return attendanceData.days.reduce((acc, day) => {
            if (day.date) {
                // Normalize date to YYYY-MM-DD to avoid timezone issues
                const dateObj = typeof day.date === 'string' ? parseISO(day.date) : new Date(day.date);
                const dateKey = format(dateObj, "yyyy-MM-dd");
                acc[dateKey] = day.status ? day.status.toUpperCase() : null;
            }
            return acc;
        }, {});
    }, [attendanceData]);

    const getStatus = (date) => {
        const dateKey = format(date, "yyyy-MM-dd");
        return attendanceMap[dateKey] || null;
    };

    // Navigation logic: Limit to anchor month and previous month
    const isCurrentMonthView = currentDate && anchorDate && isSameMonth(currentDate, anchorDate);
    const isPreviousMonthView = currentDate && anchorDate && isSameMonth(currentDate, subMonths(anchorDate, 1));

    const nextMonth = () => {
        if (!isCurrentMonthView) {
            setCurrentDate(addMonths(currentDate, 1));
        }
    };

    const prevMonth = () => {
        if (!isPreviousMonthView) {
            setCurrentDate(subMonths(currentDate, 1));
        }
    };

    if (!currentDate) return null; // Wait for initial anchor

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
    const weeks = Math.ceil(calendarDays.length / 7);
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Check if the current attendanceData matches the month we are viewing
    const hasDataForCurrentView = attendanceData &&
        attendanceData.month === monthNames[currentDate.getMonth()] &&
        attendanceData.year === currentDate.getFullYear();

    return (
        <div className="w-full h-[420px] bg-white dark:bg-[#0A1333] rounded-xl shadow-sm border border-gray-100 dark:border-white/10 p-6 flex flex-col overflow-hidden font-poppins relative">
            {/* Header */}
            <div className="mb-3 shrink-0">
                <h2 className="text-lg font-bold text-[#171E57] dark:text-white">
                    Monthly Attendance Overview
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 font-medium">
                    {loading ? "..." : hasDataForCurrentView
                        ? `${Math.round(attendanceData.attendancePercentage)}% Attendance`
                        : "No data available"}
                </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mb-3 shrink-0 px-2">
                <button
                    onClick={prevMonth}
                    disabled={isPreviousMonthView}
                    className={`p-1 rounded-full transition-colors ${isPreviousMonthView
                        ? "text-gray-200 dark:text-gray-700 cursor-not-allowed opacity-0 pointer-events-none"
                        : "text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                        }`}
                >
                    <ChevronLeft className="w-4 h-4" strokeWidth={3} />
                </button>

                <h3 className="text-base font-bold text-[#0F172A] dark:text-white">
                    {format(currentDate, "MMMM yyyy")}
                </h3>

                <button
                    onClick={nextMonth}
                    disabled={isCurrentMonthView}
                    className={`p-1 rounded-full transition-colors ${isCurrentMonthView
                        ? "text-gray-200 dark:text-gray-700 cursor-not-allowed opacity-0 pointer-events-none"
                        : "text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                        }`}
                >
                    <ChevronRight className="w-4 h-4" strokeWidth={3} />
                </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-2 shrink-0 px-2">
                {daysOfWeek.map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs font-bold text-gray-400 dark:text-gray-500"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 relative min-h-0">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-[#0A1333]/50 z-20">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : null}

                {/* No Data Overlay */}
                {!loading && !hasDataForCurrentView && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/20 dark:bg-[#0A1333]/20 z-10 backdrop-blur-[1px]">
                        <span className="text-sm font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-[#0A1333] px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-white/10">
                            No attendance data for this month
                        </span>
                    </div>
                )}

                <div
                    className="grid grid-cols-7 gap-2 h-full px-2"
                    style={{ gridTemplateRows: `repeat(${weeks}, minmax(0, 1fr))` }}
                >
                    {calendarDays.map((day) => {
                        const isDayInCurrentMonth = isSameMonth(day, monthStart);
                        const status = getStatus(day);
                        const { bg: bgClass, text: textClass } = getStatusClasses(isDayInCurrentMonth ? status : null);

                        const finalBgClass = isDayInCurrentMonth ? bgClass : "bg-transparent";
                        const finalTextClass = isDayInCurrentMonth ? textClass : "text-gray-300 dark:text-gray-700";

                        return (
                            <div
                                key={day.toISOString()}
                                className={`
                                    ${finalBgClass} ${finalTextClass}
                                    rounded-lg flex items-center justify-center text-xs
                                    transition-colors relative h-full w-full
                                `}
                            >
                                {isDayInCurrentMonth ? format(day, "d") : ""}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
