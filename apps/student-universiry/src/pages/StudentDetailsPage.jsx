import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProfileHeader from '../components/attendance/ProfileHeader';
import AttendanceRate from '../components/attendance/AttendanceRate';
import VerticalMetric from '../components/attendance/VerticalMetric';
import TopStudentsTable from '../components/attendance/TopStudentsTable';
import { CheckCircle, XCircle, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { useDarkMode } from '../contexts/DarkModeContext';
import {
  getAttendanceHeader,
  getAttendanceMonthlyRate,
  getAttendanceSummary,
  getSubjectWiseAttendance,
  getWelcomeData
} from '../lib/api';

function StudentDetailsPage() {
  const { darkMode } = useDarkMode();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId') || 'STU001';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [subjectsData, setSubjectsData] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const [header, monthly, summary, subjects, welcome] = await Promise.all([
          getAttendanceHeader(studentId),
          getAttendanceMonthlyRate(studentId),
          getAttendanceSummary(studentId),
          getSubjectWiseAttendance(studentId),
          getWelcomeData(studentId)
        ]);

        setHeaderData(header);
        setMonthlyData(monthly);
        setSummaryData(summary);
        setSubjectsData(subjects);
        setStudentInfo(welcome);
        setError(null);
      } catch (err) {
        console.error("Error fetching attendance data:", err);
        setError("Failed to load attendance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [studentId]);

  if (loading) {
    return (
      <PageWithSidebar>
        <div className="flex flex-1 items-center justify-center h-screen bg-slate-100 dark:bg-[#0F172A]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Loading Attendance Details...</p>
          </div>
        </div>
      </PageWithSidebar>
    );
  }

  if (error) {
    return (
      <PageWithSidebar>
        <div className="flex flex-1 items-center justify-center h-screen bg-slate-100 dark:bg-[#0F172A]">
          <div className="flex flex-col items-center gap-4 text-center p-6 bg-white dark:bg-[#1A1F37] rounded-xl shadow-lg border border-red-100 dark:border-red-900/30">
            <AlertCircle className="w-16 h-16 text-red-500" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Error</h2>
            <p className="text-slate-600 dark:text-slate-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6 @[media(min-width:1024px)_and_(max-width:1366px)]:p-4">
        <div
          className={`w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden relative ${!darkMode ? 'bg-slate-100' : ''}`}
          style={darkMode ? {
            backgroundImage: "url('/img/body-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          } : {}}
        >
          {/* Static Navbar at top */}
          <DashboardNavbar />
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 relative scrollbar-hide font-poppins attendance-section @[media(min-width:1024px)_and_(max-width:1366px)]:p-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-[1280px] mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {/* Profile Header */}
              <ProfileHeader
                studentInfo={studentInfo}
                headerData={headerData}
              />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-12 @[media(min-width:1024px)_and_(max-width:1366px)]:grid-cols-1 gap-4 sm:gap-6">
                {/* Left Column - Attendance Rate - Full width on mobile, 4 columns on xl */}
                <div className="xl:col-span-4 @[media(min-width:1024px)_and_(max-width:1366px)]:col-span-1 space-y-4 sm:space-y-6">
                  <AttendanceRate
                    rate={headerData?.attendancePercentage}
                    monthlyData={monthlyData?.monthlyRates}
                  />
                </div>

                <div className="xl:col-span-8 @[media(min-width:1024px)_and_(max-width:1366px)]:col-span-1">
                  <div className="bg-card dark:!bg-[#141E5A] rounded-card shadow-card p-4 mb-4 sm:mb-6 overflow-hidden min-h-[300px] sm:min-h-[420px] soft-fade soft-fade-delay-2" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.06)" }}>
                    <h3 className="text-lg sm:text-[20px] font-poppins font-semibold text-[#0F172A] dark:text-white mb-4">Summary</h3>
                    {summaryData ? (
                      <div className="flex flex-col xl:flex-row flex-wrap gap-4 sm:gap-6 justify-center items-center">
                        <VerticalMetric
                          value={summaryData.present}
                          label="Total Present"
                          icon={<CheckCircle className="w-4 h-4 text-white" />}
                          bgColor="bg-blue-50"
                          fillColor="bg-blue-400"
                          iconBgColor="bg-blue-400"
                          textColor="text-blue-900"
                          labelColor="text-blue-700"
                          className="soft-fade soft-fade-delay-1"
                          max={headerData?.totalClasses}
                        />
                        <VerticalMetric
                          value={summaryData.absent}
                          label="Total Absent"
                          icon={<XCircle className="w-4 h-4 text-white" />}
                          bgColor="bg-p-pink"
                          fillColor="bg-red"
                          iconBgColor="bg-red"
                          className="soft-fade soft-fade-delay-2"
                          max={headerData?.totalClasses}
                        />
                        <VerticalMetric
                          value={summaryData.leaves}
                          label="Total Leaves"
                          icon={<Calendar className="w-4 h-4 text-white" />}
                          bgColor="bg-p-orange"
                          fillColor="bg-orange"
                          iconBgColor="bg-orange"
                          className="soft-fade soft-fade-delay-3"
                          max={headerData?.totalClasses}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-[200px]">
                        <p className="text-slate-500 dark:text-slate-400">No attendance summary available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Top Students Table (Subject wise Attendance) */}
              <div className="mt-3">
                <TopStudentsTable data={subjectsData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default StudentDetailsPage;

