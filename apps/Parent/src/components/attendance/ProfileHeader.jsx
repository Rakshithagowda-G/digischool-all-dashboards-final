import StatChip from './StatChip';
import { BookOpen, CheckCircle, XCircle, CalendarX } from 'lucide-react';

export default function ProfileHeader({ student, summary }) {
  const name = student?.name || "N/A";
  const studentId = student?.studentId || "N/A";
  const mobile = student?.mobile || "N/A";
  const email = student?.email || "N/A";
  const address = student?.address || "N/A";

  const totalClasses = summary?.totalClasses || 0;
  const totalPresent = summary?.attended || 0;
  const totalAbsent = summary?.absent || 0;
  const totalLeaves = summary?.leave || 0;

  return (
    <div className="bg-p-blue rounded-card p-6 mb-6 min-h-[300px] soft-fade" style={{ boxShadow: "none" }}>
      <h2 className="text-[20px] font-poppins font-semibold text-text-primary" style={{ marginBottom: '50px' }}>
        Student Details
      </h2>
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        {/* Avatar */}
        <div className="relative soft-fade soft-fade-delay-1 self-center md:self-auto">
          <div className="w-[72px] h-[72px] rounded-full bg-p-blue flex items-center justify-center overflow-hidden ring-2 ring-white shadow-card">
            <img
              src={student?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1678FF&color=fff&size=72`}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Student Info */}
        <div className="flex-1 soft-fade soft-fade-delay-1 w-full">
          <h1 className="text-[20px] font-poppins font-bold text-text-primary mb-4 text-center md:text-left">
            {name}
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-poppins">
            <div className="flex items-center gap-2">
              <span className="text-text-muted font-poppins">ID:</span>
              <span className="text-text-primary font-medium font-poppins">{studentId}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-muted"></div>
            <div className="flex items-center gap-2">
              <span className="text-text-muted font-poppins">Number:</span>
              <span className="text-text-primary font-medium font-poppins">{mobile}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-muted"></div>
            <div className="flex items-center gap-2">
              <span className="text-text-muted font-poppins">Email:</span>
              <span className="text-text-primary font-medium font-poppins">{email}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-muted"></div>
            <div className="flex items-center gap-2">
              <span className="text-text-muted font-poppins">Address:</span>
              <span className="text-text-primary font-medium font-poppins">{address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatChip
          icon={<BookOpen className="w-3 h-3" />}
          value={totalClasses}
          label="Total Classes"
          percentage={100}
          className="soft-fade soft-fade-delay-1"
        />
        <StatChip
          icon={<CheckCircle className="w-3 h-3" />}
          value={totalPresent}
          label="Attended"
          totalClasses={totalClasses}
          className="soft-fade soft-fade-delay-2"
        />
        <StatChip
          icon={<XCircle className="w-3 h-3" />}
          value={totalAbsent}
          label="Absent"
          totalClasses={totalClasses}
          className="soft-fade soft-fade-delay-3"
        />
        <StatChip
          icon={<CalendarX className="w-3 h-3" />}
          value={totalLeaves}
          label="Leaves"
          totalClasses={totalClasses}
          className="soft-fade soft-fade-delay-4"
        />
      </div>
    </div>
  );
}

