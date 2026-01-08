import React from 'react';
import StatChip from './StatChip';
import { BookOpen, CheckCircle, XCircle, CalendarX, Loader2, User } from 'lucide-react';

export default function ProfileHeader({ headers, welcome, studentId, loading, error }) {
  if (loading) {
    return (
      <div className="bg-p-blue rounded-card p-6 mb-6 min-h-[300px] flex items-center justify-center soft-fade">
        <Loader2 className="w-8 h-8 animate-spin text-white opacity-50" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-card p-6 mb-6 min-h-[300px] flex flex-col items-center justify-center soft-fade text-red-500">
        <XCircle className="w-8 h-8 mb-2" />
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  const studentName = welcome?.fullName || "Student Name";

  return (
    <div className="bg-p-blue rounded-card p-4 sm:p-6 mb-6 min-h-[300px] lg:min-h-[200px] xl:min-h-[300px] soft-fade" style={{ boxShadow: "none" }}>
      <h2 className="text-lg sm:text-[20px] font-poppins font-semibold text-text-primary" style={{ marginBottom: '50px' }}>
        Student Details
      </h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8 text-center sm:text-left">
        {/* Avatar */}
        <div className="relative soft-fade soft-fade-delay-1">
          <div className="w-[72px] h-[72px] rounded-full bg-white dark:bg-[#232730] flex items-center justify-center overflow-hidden ring-2 ring-white dark:ring-[#232730] shadow-card">
            <User size={40} className="text-p-blue opacity-50" />
          </div>
        </div>

        {/* Student Info */}
        <div className="flex-1 soft-fade soft-fade-delay-1 w-full">
          <h1 className="text-lg sm:text-[20px] font-poppins font-bold text-text-primary mb-4">
            {studentName}
          </h1>
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-sm font-poppins">
            <div className="flex items-center gap-2">
              <span className="text-text-muted font-poppins">ID:</span>
              <span className="text-text-primary font-medium font-poppins">{studentId}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-text-muted font-poppins">Level:</span>
              <span className="text-text-primary font-medium font-poppins capitalize">{welcome?.educationLevel || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Chips */}
      <div className="grid grid-cols-1 md:!grid md:!grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 md:!gap-3 lg:gap-3 xl:gap-6">
        <StatChip
          icon={<BookOpen className="w-3 h-3" />}
          value={headers?.totalClasses ?? 0}
          label="Total Classes"
          percentage={100}
          className="soft-fade soft-fade-delay-1"
        />
        <StatChip
          icon={<CheckCircle className="w-3 h-3" />}
          value={headers?.attended ?? 0}
          label="Attended"
          totalClasses={headers?.totalClasses}
          className="soft-fade soft-fade-delay-2"
        />
        <StatChip
          icon={<XCircle className="w-3 h-3" />}
          value={headers?.absent ?? 0}
          label="Absent"
          totalClasses={headers?.totalClasses}
          className="soft-fade soft-fade-delay-3"
        />
        <StatChip
          icon={<CalendarX className="w-3 h-3" />}
          value={headers?.leaves ?? 0}
          label="Leaves"
          totalClasses={headers?.totalClasses}
          className="soft-fade soft-fade-delay-4"
        />
      </div>
    </div>
  );
}

