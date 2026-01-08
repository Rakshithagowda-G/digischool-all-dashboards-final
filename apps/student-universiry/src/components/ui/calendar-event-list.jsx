"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarEventListDemo = () => {
  const [date, setDate] = useState(new Date(2025, 11, 17)); // December 2025
  const { darkMode } = useDarkMode();

  // Custom modifiers for the calendar to match the image
  const modifiers = {
    present: [
      new Date(2025, 11, 1), new Date(2025, 11, 2), new Date(2025, 11, 3), new Date(2025, 11, 4), new Date(2025, 11, 5),
      new Date(2025, 11, 10), new Date(2025, 11, 11), new Date(2025, 11, 12),
      new Date(2025, 11, 15), new Date(2025, 11, 18), new Date(2025, 11, 25)
    ],
    absent: [
      new Date(2025, 11, 8), new Date(2025, 11, 17)
    ]
  };

  const modifiersStyles = {
    present: {
      backgroundColor: "#3b82f6", // blue-500
      color: "white",
      borderRadius: "8px"
    },
    absent: {
      backgroundColor: "#ef4444", // red-500
      color: "white",
      borderRadius: "8px"
    }
  };

  return (
    <div className={`w-full h-full rounded-[20px] p-6 flex flex-col ${darkMode ? 'bg-[#111c44] text-white' : 'bg-white text-slate-900'} shadow-sm`}>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-1">Monthly Attendance Overview</h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>(+100% this month)</p>
      </div>

      <div className="flex justify-center w-full flex-1 items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={new Date(2025, 11)}
          className={`rounded-md border-none p-0 w-full`}
          classNames={{
            month: "space-y-4 w-full",
            caption: "flex justify-center pt-1 relative items-center mb-4",
            caption_label: "text-sm font-bold",
            nav: "space-x-1 flex items-center",
            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex w-full justify-between mb-2",
            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2 justify-between",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 rounded-lg transition-colors",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          components={{
            IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
            IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
          }}
        />
      </div>
    </div>
  );
};

export default CalendarEventListDemo;



