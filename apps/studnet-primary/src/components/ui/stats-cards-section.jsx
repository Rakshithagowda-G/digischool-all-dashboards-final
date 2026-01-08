import React from "react";
import { BookOpen, FileText, Calendar, Trophy } from "lucide-react";

export const StatsCardsSection = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Active Subjects Card */}
        <div className="relative rounded-xl bg-[#60A5FA] p-5 flex-1 min-w-[180px] h-[150px] md:h-[160px] overflow-hidden">
          {/* Watermark icon - bigger, half showing */}
          <BookOpen className="absolute -right-8 -bottom-8 w-32 h-32 md:w-40 md:h-40 text-white opacity-20" strokeWidth={1.5} />

          {/* Content - vertically centered */}
          <div className="relative z-10 h-full flex flex-col justify-center">
            {/* Icon container */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
              <BookOpen className="w-7 h-7 text-[#60A5FA]" strokeWidth={2.5} />
            </div>

            {/* Number */}
            <div className="text-white text-3xl md:text-4xl font-bold leading-none mb-2">
              6
            </div>

            {/* Label */}
            <div className="text-white text-sm md:text-base opacity-90 leading-tight">
              Active Subjects
            </div>
          </div>
        </div>

        {/* Pending Assignments Card */}
        <div className="relative rounded-xl bg-[#F6C652] p-5 flex-1 min-w-[180px] h-[150px] md:h-[160px] overflow-hidden">
          {/* Watermark icon - bigger, half showing */}
          <FileText className="absolute -right-8 -bottom-8 w-32 h-32 md:w-40 md:h-40 text-white opacity-20" strokeWidth={1.5} />

          {/* Content - vertically centered */}
          <div className="relative z-10 h-full flex flex-col justify-center">
            {/* Icon container */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
              <FileText className="w-7 h-7 text-[#F6C652]" strokeWidth={2.5} />
            </div>

            {/* Number */}
            <div className="text-white text-3xl md:text-4xl font-bold leading-none mb-2">
              3
            </div>

            {/* Label */}
            <div className="text-white text-sm md:text-base opacity-90 leading-tight">
              Pending Assignments
            </div>
          </div>
        </div>

        {/* Attendance Card */}
        <div className="relative rounded-xl bg-[#2A3648] p-5 flex-1 min-w-[180px] h-[150px] md:h-[160px] overflow-hidden">
          {/* Watermark icon - bigger, half showing */}
          <Calendar className="absolute -right-8 -bottom-8 w-32 h-32 md:w-40 md:h-40 text-white opacity-20" strokeWidth={1.5} />

          {/* Content - vertically centered */}
          <div className="relative z-10 h-full flex flex-col justify-center">
            {/* Icon container */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
              <Calendar className="w-7 h-7 text-[#2A3648]" strokeWidth={2.5} />
            </div>

            {/* Number */}
            <div className="text-white text-3xl md:text-4xl font-bold leading-none mb-2">
              95%
            </div>

            {/* Label */}
            <div className="text-white text-sm md:text-base opacity-90 leading-tight">
              Attendance
            </div>
          </div>
        </div>

        {/* Overall Grade Card */}
        <div className="relative rounded-xl bg-[#8B5CF6] p-5 flex-1 min-w-[180px] h-[150px] md:h-[160px] overflow-hidden">
          {/* Watermark icon - bigger, half showing */}
          <Trophy className="absolute -right-8 -bottom-8 w-32 h-32 md:w-40 md:h-40 text-white opacity-20" strokeWidth={1.5} />

          {/* Content - vertically centered */}
          <div className="relative z-10 h-full flex flex-col justify-center">
            {/* Icon container */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
              <Trophy className="w-7 h-7 text-[#8B5CF6]" strokeWidth={2.5} />
            </div>

            {/* Number */}
            <div className="text-white text-3xl md:text-4xl font-bold leading-none mb-2">
              A
            </div>

            {/* Label */}
            <div className="text-white text-sm md:text-base opacity-90 leading-tight">
              Overall Grade
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};










