import React from "react";
import { Calendar, FileText, Trophy, ClipboardList } from "lucide-react";

export const StatsCardsSection = ({ summary }) => {
  const attendanceRate = summary?.attendancePercentage !== undefined ? `${summary.attendancePercentage}%` : "0%";
  const assignmentsDone = summary?.assignmentsCompleted || 0;
  const avgGrade = summary?.averageGrade || "N/A";
  const pending = summary?.pendingTasks || 0;

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-full">
        {/* Attendance Rate Card */}
        <div className="relative rounded-xl bg-[#60A5FA] p-5 w-full h-[150px] md:h-[160px] overflow-hidden">
          {/* Watermark icon - bigger, half showing */}
          <Calendar className="absolute -right-8 -bottom-8 w-32 h-32 md:w-40 md:h-40 text-white opacity-20" strokeWidth={1.5} />

          {/* Content - vertically centered */}
          <div className="relative z-10 h-full flex flex-col justify-center">
            {/* Icon container */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
              <Calendar className="w-7 h-7 text-[#60A5FA]" strokeWidth={2.5} />
            </div>

            {/* Number */}
            <div className="text-white text-3xl md:text-4xl font-bold leading-none mb-2">
              {attendanceRate}
            </div>

            {/* Label */}
            <div className="text-white text-sm md:text-base opacity-90 leading-tight">
              Attendance Rate
            </div>
          </div>
        </div>

        {/* Assignments Completed Card */}
        <div className="relative rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 p-5 w-full h-[150px] md:h-[160px] overflow-hidden">
          {/* Watermark icon - bigger, half showing */}
          <FileText className="absolute -right-8 -bottom-8 w-32 h-32 md:w-40 md:h-40 text-white opacity-20" strokeWidth={1.5} />

          {/* Content - vertically centered */}
          <div className="relative z-10 h-full flex flex-col justify-center">
            {/* Icon container */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
              <FileText className="w-7 h-7 text-indigo-500" strokeWidth={2.5} />
            </div>

            {/* Number */}
            <div className="text-white text-3xl md:text-4xl font-bold leading-none mb-2">
              {assignmentsDone}
            </div>

            {/* Label */}
            <div className="text-white text-sm md:text-base opacity-90 leading-tight">
              Assignments Completed
            </div>
          </div>
        </div>

        {/* Average Grade Card */}
        <div className="relative rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 p-5 w-full h-[150px] md:h-[160px] overflow-hidden">
          {/* Watermark icon - bigger, half showing */}
          <Trophy className="absolute -right-8 -bottom-8 w-32 h-32 md:w-40 md:h-40 text-white opacity-20" strokeWidth={1.5} />

          {/* Content - vertically centered */}
          <div className="relative z-10 h-full flex flex-col justify-center">
            {/* Icon container */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
              <Trophy className="w-7 h-7 text-cyan-500" strokeWidth={2.5} />
            </div>

            {/* Number */}
            <div className="text-white text-3xl md:text-4xl font-bold leading-none mb-2">
              {avgGrade}
            </div>

            {/* Label */}
            <div className="text-white text-sm md:text-base opacity-90 leading-tight">
              Average Grade
            </div>
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className="relative rounded-xl bg-[#8B5CF6] p-5 w-full h-[150px] md:h-[160px] overflow-hidden">
          {/* Watermark icon - bigger, half showing */}
          <ClipboardList className="absolute -right-8 -bottom-8 w-32 h-32 md:w-40 md:h-40 text-white opacity-20" strokeWidth={1.5} />

          {/* Content - vertically centered */}
          <div className="relative z-10 h-full flex flex-col justify-center">
            {/* Icon container */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
              <ClipboardList className="w-7 h-7 text-[#8B5CF6]" strokeWidth={2.5} />
            </div>

            {/* Number */}
            <div className="text-white text-3xl md:text-4xl font-bold leading-none mb-2">
              {pending}
            </div>

            {/* Label */}
            <div className="text-white text-sm md:text-base opacity-90 leading-tight">
              Pending Tasks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};










