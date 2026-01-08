import { BookOpen, AlertCircle } from 'lucide-react';

export default function TopStudentsTable({ data = [] }) {
  if (data.length === 0) {
    return (
      <div className="bg-card dark:!bg-[#141E5A] rounded-card shadow-card p-6 h-[300px] flex flex-col items-center justify-center gap-4 transition-all duration-200" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.06)" }}>
        <AlertCircle className="w-12 h-12 text-slate-400" />
        <p className="text-slate-500 dark:text-slate-400 font-poppins">No attendance data available</p>
      </div>
    );
  }

  return (
    <div className="bg-card dark:!bg-[#141E5A] rounded-card shadow-card p-6 hover:transform hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-200 soft-fade soft-fade-delay-3" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.06)" }}>
      <h3 className="text-[20px] font-poppins font-semibold text-text-primary dark:text-white mb-4">
        Subject wise Attendance
      </h3>
      <div
        className="overflow-y-auto overflow-x-auto hide-scrollbar"
        style={{
          maxHeight: '500px'
        }}
      >
        <table className="w-full">
          <thead className="sticky top-0 bg-card dark:!bg-[#141E5A] z-10">
            <tr className="border-b border-muted">
              <th className="text-left py-3 px-4 text-sm font-poppins font-semibold text-text-muted dark:text-slate-400 uppercase">Course</th>
              <th className="text-center py-3 px-4 text-sm font-poppins font-semibold text-text-muted dark:text-slate-400 uppercase">Total Classes</th>
              <th className="text-center py-3 px-4 text-sm font-poppins font-semibold text-text-muted dark:text-slate-400 uppercase">Present</th>
              <th className="text-center py-3 px-4 text-sm font-poppins font-semibold text-text-muted dark:text-slate-400 uppercase">Absent</th>
              <th className="text-center py-3 px-4 text-sm font-poppins font-semibold text-text-muted dark:text-slate-400 uppercase">Attendance %</th>
              <th className="text-left py-3 px-4 text-sm font-poppins font-semibold text-text-muted dark:text-slate-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course, index) => (
              <tr
                key={course.subject || index}
                className="border-b border-muted hover:bg-p-blue/30 transition-colors soft-fade-row"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-text-muted" />
                    <span className="text-sm font-poppins font-medium text-text-primary dark:text-slate-200">
                      {course.subject}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm font-poppins text-text-primary dark:text-slate-300">
                    {course.totalClasses}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm font-poppins font-medium text-green-600 dark:text-green-400">
                    {course.present}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm font-poppins font-medium text-red-600 dark:text-red-400">
                    {course.absent}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-16 h-1.5 bg-muted dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-green"
                        style={{ width: `${course.attendancePercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-poppins text-text-primary dark:text-slate-300">
                      {course.attendancePercentage}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-poppins font-medium ${course.status === 'Good' ? 'bg-green-100 text-green-700' :
                      course.status === 'Average' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {course.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



