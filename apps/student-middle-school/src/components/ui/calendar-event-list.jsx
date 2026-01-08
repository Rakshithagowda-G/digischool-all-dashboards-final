"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDateRange } from "little-date";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const events = [
  {
    title: "UX Research",
    teacher: "Ms. Samantha William",
    date: "January 5, 2021",
    time: "07.00 - 08.00 AM",
    from: "2025-01-05T07:00:00",
    to: "2025-01-05T08:00:00"
  },
  {
    title: "Back-End Developer",
    teacher: "Ms. Samantha William",
    date: "January 5, 2021",
    time: "07.00 - 08.00 AM",
    from: "2025-01-05T07:00:00",
    to: "2025-01-05T08:00:00"
  },
  {
    title: "Icon Design",
    teacher: "Ms. Samantha William",
    date: "January 5, 2021",
    time: "07.00 - 08.00 AM",
    from: "2025-01-05T07:00:00",
    to: "2025-01-05T08:00:00"
  }
];

const CalendarEventListDemo = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/events");
  };

  return (
    <Card className="w-full max-w-[320px] md:max-w-none xl:max-w-[320px] py-3 md:py-4 mx-auto md:mx-0">
      <CardContent className="px-6">
        <div className="flex justify-center w-full">
          <Calendar mode="single" selected={date} onSelect={setDate} className="w-[280px] bg-transparent p-0 mx-auto" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 border-t px-6 !pt-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-sm font-medium">
            {date?.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </div>
          <button
            onClick={handleViewAll}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            View All →
          </button>
        </div>
        <div className="flex w-full flex-col gap-2.5">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-muted after:bg-primary/70 relative rounded-md p-3 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
            >
              <div className="font-medium">{event.title}</div>
              <div className="text-muted-foreground text-xs mt-1">
                {event.teacher}
              </div>
              <div className="text-muted-foreground text-xs mt-1">
                {event.date} • {event.time}
              </div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CalendarEventListDemo;

