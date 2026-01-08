import React from 'react';
import { BookOpen, Loader2, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function TopStudentsTable({ data, loading, error }) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <div className={`bg-card rounded-card shadow-card p-4 sm:p-6 hover:transform hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-200 soft-fade soft-fade-delay-3 ${isDark ? 'bg-[#181B21]' : ''}`} style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.06)" }}>
      <h3 className="text-lg sm:text-[20px] font-poppins font-semibold text-text-primary mb-4">
        Subject wise Attendance
      </h3>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-p-blue opacity-50" />
        </div>
      ) : error || !data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Info size={40} className="mb-4 opacity-20" />
          <p className="font-poppins italic">No attendance data available</p>
        </div>
      ) : (
        <div
          className="overflow-y-auto overflow-x-auto hide-scrollbar"
          style={{
            maxHeight: '500px'
          }}
        >
          <table className="w-full">
            <thead className={`sticky top-0 bg-card z-10 ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
              <tr className={`border-b ${isDark ? 'border-[#232730]' : 'border-muted'}`}>
                <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-poppins font-semibold text-text-muted uppercase">Course</th>
                <th className="text-center py-3 px-2 sm:px-4 text-xs sm:text-sm font-poppins font-semibold text-text-muted uppercase">Total Classes</th>
                <th className="text-center py-3 px-2 sm:px-4 text-xs sm:text-sm font-poppins font-semibold text-text-muted uppercase">Present</th>
                <th className="text-center py-3 px-2 sm:px-4 text-xs sm:text-sm font-poppins font-semibold text-text-muted uppercase">Absent</th>
                <th className="text-center py-3 px-2 sm:px-4 text-xs sm:text-sm font-poppins font-semibold text-text-muted uppercase">Attendance %</th>
                <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-poppins font-semibold text-text-muted uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((course, index) => (
                <tr
                  key={course.subject || index}
                  className={`border-b transition-colors soft-fade-row ${isDark
                    ? 'border-[#232730] hover:bg-[#232730]'
                    : 'border-muted hover:bg-p-blue/30'
                    }`}
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <td className="py-3 px-2 sm:px-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-text-muted" />
                      <span className="text-xs sm:text-sm font-poppins font-medium text-text-primary">
                        {course.subject}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-center">
                    <span className="text-xs sm:text-sm font-poppins text-text-primary">
                      {course.totalClasses}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-center">
                    <span className="text-xs sm:text-sm font-poppins font-medium text-green-600">
                      {course.present}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-center">
                    <span className="text-xs sm:text-sm font-poppins font-medium text-red-600">
                      {course.absent}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-green"
                          style={{ width: `${course.attendancePercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-poppins text-text-primary">
                        {course.attendancePercentage}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-poppins font-medium ${course.status === 'Good'
                        ? (isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700')
                        : course.status === 'Average'
                          ? (isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700')
                          : (isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700')
                      }`}>
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}




