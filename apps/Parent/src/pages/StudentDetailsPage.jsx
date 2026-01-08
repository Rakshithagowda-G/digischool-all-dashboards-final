import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/attendance/ProfileHeader';
import AttendanceRate from '../components/attendance/AttendanceRate';
import VerticalMetric from '../components/attendance/VerticalMetric';
import TopStudentsTable from '../components/attendance/TopStudentsTable';
import { CheckCircle, XCircle, Calendar, Loader2 } from 'lucide-react';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import ParentService, { DEFAULT_STUDENT_ID } from '../services/ParentService';

function StudentDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [headerData, setHeaderData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [yearlyRateData, setYearlyRateData] = useState(null);
  const [subjectsData, setSubjectsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const studentId = urlParams.get('studentId') || DEFAULT_STUDENT_ID;

      console.log(`[StudentDetailsPage] Initializing attendance data fetch for studentId: ${studentId}`);

      try {
        setLoading(true);
        const [header, summary, rate, subjectsRes] = await Promise.all([
          ParentService.getAttendanceHeader(studentId),
          ParentService.getAttendanceSummary(studentId),
          ParentService.getYearlyAttendanceRate(studentId),
          ParentService.getSubjectWiseAttendance(studentId)
        ]);

        console.log('[StudentDetailsPage] Header Data:', header);
        console.log('[StudentDetailsPage] Summary Data:', summary);
        console.log('[StudentDetailsPage] Yearly Rate Data:', rate);
        console.log('[StudentDetailsPage] Subjects Data:', subjectsRes);

        setHeaderData(header);
        setSummaryData(summary);
        setYearlyRateData(rate);
        setSubjectsData(Array.isArray(subjectsRes?.subjects) ? subjectsRes.subjects : []);
      } catch (err) {
        console.error("Error fetching student details page data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <PageWithSidebar>
        <div className="flex flex-1 items-center justify-center min-h-[500px]">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      </PageWithSidebar>
    );
  }

  const student = headerData?.student || {};
  const headerSummary = headerData?.summary || {};
  const monthlySummary = summaryData || {};

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
        <div className="w-full h-full bg-slate-100 dark:bg-[#0a1128] rounded-xl shadow-lg flex flex-col overflow-hidden relative">
          <DashboardNavbar />
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 relative scrollbar-hide font-poppins attendance-section" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-[1280px] mx-auto">
              {/* Profile Header */}
              <ProfileHeader student={student} summary={headerSummary} />

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
                {/* Attendance Rate */}
                <div className="xl:col-span-4 space-y-4 sm:space-y-6">
                  <AttendanceRate data={yearlyRateData} />
                </div>

                {/* Summary Metrics */}
                <div className="xl:col-span-8">
                  <div className="bg-card rounded-card shadow-card p-4 mb-4 sm:mb-6 overflow-hidden min-h-[300px] sm:min-h-[420px]" style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.06)" }}>
                    <h3 className="text-lg sm:text-[20px] font-poppins font-semibold text-[#0F172A] mb-4">Summary</h3>
                    <div className="flex flex-col xl:flex-row flex-wrap gap-4 sm:gap-6 justify-center items-center">
                      <VerticalMetric
                        value={monthlySummary.totalPresent || 0}
                        label="Total Present"
                        icon={<CheckCircle className="w-4 h-4 text-white" />}
                        bgColor="bg-p-blue"
                        fillColor="bg-blue"
                        iconBgColor="bg-blue"
                      />
                      <VerticalMetric
                        value={monthlySummary.totalAbsent || 0}
                        label="Total Absent"
                        icon={<XCircle className="w-4 h-4 text-white" />}
                        bgColor="bg-p-pink"
                        fillColor="bg-red"
                        iconBgColor="bg-red"
                      />
                      <VerticalMetric
                        value={monthlySummary.totalLeaves || 0}
                        label="Total Leaves"
                        icon={<Calendar className="w-4 h-4 text-white" />}
                        bgColor="bg-p-orange"
                        fillColor="bg-orange"
                        iconBgColor="bg-orange"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Wise Attendance */}
              <div className="mt-3">
                <TopStudentsTable subjects={subjectsData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default StudentDetailsPage;

