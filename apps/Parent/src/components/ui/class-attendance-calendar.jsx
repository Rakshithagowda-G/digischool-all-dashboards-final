import React, { useMemo } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const ClassAttendanceCalendar = () => {
    // Generate data from Jan 1, 2025 to Dec 2, 2025
    const calendarData = useMemo(() => {
        const data = [];
        const startDate = new Date(2025, 0, 1); // Jan 1, 2025
        const endDate = new Date(2025, 11, 2); // Dec 2, 2025
        const today = new Date();

        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            // Random status generation for demo purposes
            const rand = Math.random();
            let status = "none";

            // Skip weekends for attendance (usually)
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                if (rand > 0.8) status = "absent";
                else if (rand > 0.1) status = "present";
            }

            data.push({
                date: new Date(currentDate),
                status: status,
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }
        return data;
    }, []);

    // Group by month
    const months = useMemo(() => {
        const groups = {};
        calendarData.forEach((item) => {
            const monthKey = item.date.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groups[monthKey]) {
                groups[monthKey] = {
                    name: monthKey,
                    days: []
                };
            }
            groups[monthKey].days.push(item);
        });
        return Object.values(groups);
    }, [calendarData]);

    const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

    return (
        <div className="w-full h-auto min-h-fit bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-visible">
            {/* Header */}
            <div className="p-5 md:p-6 border-b border-gray-100 flex-shrink-0">
                <h3 className="text-base font-semibold text-gray-900">
                    Class Attendance Calendar
                </h3>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
                <div className="flex flex-col gap-8">
                    {months.map((month, idx) => (
                        <div key={idx} className="w-full">
                            <h4 className="text-sm font-medium text-gray-500 mb-4">
                                {month.name}
                            </h4>

                            {/* Weekday Headers */}
                            <div className="grid grid-cols-7 gap-2 mb-2">
                                {weekDays.map((d, i) => (
                                    <div key={i} className="text-center text-xs text-gray-400 font-medium">
                                        {d}
                                    </div>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 auto-rows-fr gap-2">
                                {/* Empty slots for start of month */}
                                {Array.from({ length: (month.days[0].date.getDay() + 6) % 7 }).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}

                                {month.days.map((day, dayIdx) => (
                                    <div key={dayIdx} className="aspect-square flex items-center justify-center">
                                        <div
                                            className={cn(
                                                "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all",
                                                "text-white shadow-sm",
                                                day.status === "present" && "bg-[#171E57]", // Blue
                                                day.status === "absent" && "bg-red-500",
                                                day.status === "none" && "bg-gray-100 text-gray-400 shadow-none"
                                            )}
                                        >
                                            {day.status === "present" && <Check className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />}
                                            {day.status === "absent" && <X className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />}
                                            {day.status === "none" && <span className="text-xs">{day.date.getDate()}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
