import StatChip from './StatChip';
import { BookOpen, CheckCircle, XCircle, CalendarX } from 'lucide-react';

export default function ProfileHeader({ studentInfo, headerData }) {
  const name = studentInfo?.fullName || "Student";
  const id = studentInfo?.studentId || "N/A";
  const email = studentInfo?.email || "N/A";
  const address = studentInfo?.address || "University Campus";
  const number = studentInfo?.phoneNumber || studentInfo?.number || "N/A";
  const avatarUrl = studentInfo?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1678FF&color=fff&size=72`;

  const stats = {
    totalClasses: headerData?.totalClasses || 0,
    attended: headerData?.attended || 0,
    absent: headerData?.absent || 0,
    leaves: headerData?.leaves || 0
  };

  return (
    <div className="bg-[#2B3674] rounded-card p-6 mb-6 min-h-[300px] soft-fade shadow-lg">
      <h2 className="text-[20px] font-poppins font-semibold text-white mb-8 sm:mb-12">
        Student Details
      </h2>
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        {/* Avatar */}
        <div className="relative soft-fade soft-fade-delay-1 self-center md:self-auto">
          <div className="w-[72px] h-[72px] rounded-full bg-[#2B3674] flex items-center justify-center overflow-hidden ring-2 ring-white shadow-card">
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Student Info */}
        <div className="flex-1 soft-fade soft-fade-delay-1 w-full">
          <h1 className="text-[20px] font-poppins font-bold text-white mb-4 text-center md:text-left">
            {name}
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-poppins">
            <div className="flex items-center gap-2">
              <span className="text-gray-300 font-poppins">ID:</span>
              <span className="text-white font-medium font-poppins">{id}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-400"></div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300 font-poppins">Number:</span>
              <span className="text-white font-medium font-poppins">{number}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-400"></div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300 font-poppins">Email:</span>
              <span className="text-white font-medium font-poppins">{email}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-400"></div>
            <div className="flex items-center gap-2 text-center md:text-left">
              <span className="text-gray-300 font-poppins">Address:</span>
              <span className="text-white font-medium font-poppins">{address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Chips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
        <StatChip
          icon={<BookOpen className="w-3 h-3" />}
          value={stats.totalClasses}
          label="Total Classes"
          percentage={100}
          className="soft-fade soft-fade-delay-1 w-full max-w-[280px]"
        />
        <StatChip
          icon={<CheckCircle className="w-3 h-3" />}
          value={stats.attended}
          label="Attended"
          totalClasses={stats.totalClasses}
          className="soft-fade soft-fade-delay-2 w-full max-w-[280px]"
        />
        <StatChip
          icon={<XCircle className="w-3 h-3" />}
          value={stats.absent}
          label="Absent"
          totalClasses={stats.totalClasses}
          className="soft-fade soft-fade-delay-3 w-full max-w-[280px]"
        />
        <StatChip
          icon={<CalendarX className="w-3 h-3" />}
          value={stats.leaves}
          label="Leaves"
          totalClasses={stats.totalClasses}
          className="soft-fade soft-fade-delay-4 w-full max-w-[280px]"
        />
      </div>
    </div>
  );
}

