"use client";

import { useState } from "react";
import { formatDateRange } from "little-date";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const events = [
  {
    title: "Team Sync Meeting",
    from: "2025-06-12T09:00:00",
    to: "2025-06-12T10:00:00"
  },
  {
    title: "Design Review",
    from: "2025-06-12T11:30:00",
    to: "2025-06-12T12:30:00"
  },
  {
    title: "Client Presentation",
    from: "2025-06-12T14:00:00",
    to: "2025-06-12T15:00:00"
  }
];

const CalendarEventListDemo = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Card className="w-full max-w-[320px] md:max-w-full lg:max-w-[320px] py-3 md:py-4 mx-auto">
      <CardContent className="px-6">
        <div className="flex justify-center w-full">
          <Calendar mode="single" selected={date} onSelect={setDate} className="w-[280px] bg-transparent p-0 mx-auto" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 border-t px-6 !pt-4">
        <div className="flex w-full items-center">
          <div className="text-sm font-medium">
            {date?.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2.5">
          {events.map(event => (
            <div
              key={event.title}
              className="bg-muted after:bg-primary/70 relative rounded-md p-3 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
            >
              <div className="font-medium">{event.title}</div>
              <div className="text-muted-foreground text-xs">
                {formatDateRange(new Date(event.from), new Date(event.to))}
              </div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CalendarEventListDemo;

