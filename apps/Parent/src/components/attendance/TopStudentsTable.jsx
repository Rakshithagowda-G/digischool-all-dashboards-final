import { BookOpen, Info } from 'lucide-react';

export default function TopStudentsTable({ subjects = [], loading = false }) {
  const safeSubjects = Array.isArray(subjects) ? subjects : [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good': return 'bg-green-100 text-green-700';
      case 'Average': return 'bg-amber-100 text-amber-700';
      case 'Poor': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-card rounded-card shadow-card p-6 min-h-[300px] soft-fade" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.06)" }}>
      <h3 className="text-[20px] font-poppins font-semibold text-text-primary mb-4">
        Subject wise Attendance
      </h3>
      <div className="overflow-x-auto rounded-xl scrollbar-hide">
        {loading ? (
          <div className="flex items-center justify-center p-10">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : safeSubjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 text-slate-500 italic">
            <Info className="w-6 h-6 mb-2" />
            No subject data available
          </div>
        ) : (
          <table className="w-full">
            <thead className="sticky top-0 z-20 bg-slate-100 dark:bg-slate-900 shadow-sm">
              <tr className="border-b border-muted">
                <th className="text-left py-4 px-4 text-sm font-poppins font-semibold text-text-muted uppercase">Course</th>
                <th className="text-center py-4 px-4 text-sm font-poppins font-semibold text-text-muted uppercase">Total Classes</th>
                <th className="text-center py-4 px-4 text-sm font-poppins font-semibold text-text-muted uppercase">Present</th>
                <th className="text-center py-4 px-4 text-sm font-poppins font-semibold text-text-muted uppercase">Absent</th>
                <th className="text-center py-4 px-4 text-sm font-poppins font-semibold text-text-muted uppercase">Attendance %</th>
                <th className="text-left py-4 px-4 text-sm font-poppins font-semibold text-text-muted uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {safeSubjects.map((subject, index) => (
                <tr
                  key={index}
                  className="border-b border-muted hover:bg-p-blue/30 transition-colors bg-transparent dark:bg-slate-950"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-text-muted" />
                      <span className="text-sm font-poppins font-medium text-text-primary">
                        {subject.course || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-poppins text-text-primary">
                      {subject.totalClasses || 0}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-poppins font-medium text-green-600">
                      {subject.present || 0}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-poppins font-medium text-red-600">
                      {subject.absent || 0}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-green"
                          style={{ width: `${subject.attendancePercentage || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-poppins text-text-primary">
                        {Math.round(subject.attendancePercentage || 0)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-poppins font-medium ${getStatusColor(subject.status || 'N/A')}`}>
                      {subject.status || 'N/A'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}



