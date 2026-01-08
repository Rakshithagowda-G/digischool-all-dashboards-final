import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProfileHeader from '../components/attendance/ProfileHeader';
import AttendanceRate from '../components/attendance/AttendanceRate';
import VerticalMetric from '../components/attendance/VerticalMetric';
import TopStudentsTable from '../components/attendance/TopStudentsTable';
import { CheckCircle, XCircle, Calendar } from 'lucide-react';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import {
  getAttendanceHeader,
  getAttendanceMonthlyRate,
  getAttendanceSummary,
  getSubjectWiseAttendance,
  getWelcomeData,
  getStudentProfile
} from '../lib/api';

function StudentDetailsPage() {
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId') || 'STU002';

  const [headerData, setHeaderData] = useState(null);
  const [monthlyRate, setMonthlyRate] = useState(null);
  const [summary, setSummary] = useState(null);
  const [subjectWise, setSubjectWise] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [header, monthly, summaryData, subjects, welcomeData, profile] = await Promise.all([
          getAttendanceHeader(studentId),
          getAttendanceMonthlyRate(studentId),
          getAttendanceSummary(studentId),
          getSubjectWiseAttendance(studentId),
          getWelcomeData(studentId),
          getStudentProfile(studentId)
        ]);

        console.log('Header:', header);
        console.log('Monthly Rate:', monthly);
        console.log('Summary:', summaryData);
        console.log('Subject-wise:', subjects);

        setHeaderData(header || {});
        setMonthlyRate(monthly || {});
        setSummary(summaryData || {});
        setSubjectWise(Array.isArray(subjects) ? subjects : []);
        setStudentName(welcomeData?.fullName || '');
        setStudentInfo(profile || {});
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [studentId]);

  if (loading) {
    return (
      <PageWithSidebar>
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
          <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading attendance data...</p>
            </div>
          </div>
        </div>
      </PageWithSidebar>
    );
  }

  if (error) {
    return (
      <PageWithSidebar>
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
          <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex items-center justify-center">
            <div className="text-center text-red-600">
              <p className="font-semibold mb-2">Error loading attendance data</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6 @[media(min-width:1024px)_and_(max-width:1366px)]:p-4">
        <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex flex-col overflow-hidden relative">
          {/* Static Navbar at top */}
          <DashboardNavbar studentName={studentName} />
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 relative scrollbar-hide font-poppins attendance-section @[media(min-width:1024px)_and_(max-width:1366px)]:p-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-[1280px] mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {/* Profile Header */}
              <ProfileHeader
                headerData={headerData}
                studentInfo={studentInfo}
              />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-12 @[media(min-width:1024px)_and_(max-width:1366px)]:grid-cols-1 gap-4 sm:gap-6">
                {/* Left Column - Attendance Rate - Full width on mobile, 4 columns on xl */}
                <div className="xl:col-span-4 @[media(min-width:1024px)_and_(max-width:1366px)]:col-span-1 space-y-4 sm:space-y-6">
                  <AttendanceRate monthlyRate={monthlyRate} />
                </div>

                <div className="xl:col-span-8 @[media(min-width:1024px)_and_(max-width:1366px)]:col-span-1">
                  <div className="bg-card rounded-card shadow-card p-4 mb-4 sm:mb-6 overflow-hidden min-h-[300px] sm:min-h-[420px] soft-fade soft-fade-delay-2" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.06)" }}>
                    <h3 className="text-lg sm:text-[20px] font-poppins font-semibold text-[#0F172A] mb-4">Summary</h3>
                    <div className="flex flex-col xl:flex-row flex-wrap gap-4 sm:gap-6 justify-center items-center">
                      <VerticalMetric
                        value={summary?.present || 0}
                        label="Total Present"
                        icon={<CheckCircle className="w-4 h-4 text-white" />}
                        bgColor="bg-p-blue"
                        fillColor="bg-blue"
                        iconBgColor="bg-blue"
                        className="soft-fade soft-fade-delay-1"
                      />
                      <VerticalMetric
                        value={summary?.absent || 0}
                        label="Total Absent"
                        icon={<XCircle className="w-4 h-4 text-white" />}
                        bgColor="bg-p-pink"
                        fillColor="bg-red"
                        iconBgColor="bg-red"
                        className="soft-fade soft-fade-delay-2"
                      />
                      <VerticalMetric
                        value={summary?.leaves || 0}
                        label="Total Leaves"
                        icon={<Calendar className="w-4 h-4 text-white" />}
                        bgColor="bg-p-orange"
                        fillColor="bg-orange"
                        iconBgColor="bg-orange"
                        className="soft-fade soft-fade-delay-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Students Table */}
              <div className="mt-3">
                <TopStudentsTable subjectWiseData={subjectWise} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default StudentDetailsPage;
