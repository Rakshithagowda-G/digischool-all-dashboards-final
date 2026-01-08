import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/attendance/ProfileHeader';
import AttendanceRate from '../components/attendance/AttendanceRate';
import VerticalMetric from '../components/attendance/VerticalMetric';
import TopStudentsTable from '../components/attendance/TopStudentsTable';
import { CheckCircle, XCircle, Calendar, Loader2 } from 'lucide-react';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { useTheme } from '../context/ThemeContext';
import {
  getAttendanceHeader,
  getAttendanceSummary,
  getAttendanceMonthlyRate,
  getAttendanceSubjectWise,
  getWelcomeData
} from '../lib/api';

function StudentDetailsPage() {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const [welcomeData, setWelcomeData] = useState(null);
  const [headerStats, setHeaderStats] = useState(null);
  const [summary, setSummary] = useState(null);
  const [monthlyRates, setMonthlyRates] = useState(null);
  const [subjectWise, setSubjectWise] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const searchParams = new URLSearchParams(window.location.search);
      const studentId = searchParams.get('studentId') || 'STU003';

      try {
        const [welcome, header, sum, monthly, subject] = await Promise.all([
          getWelcomeData(studentId),
          getAttendanceHeader(studentId),
          getAttendanceSummary(studentId),
          getAttendanceMonthlyRate(studentId),
          getAttendanceSubjectWise(studentId)
        ]);

        setWelcomeData(welcome);
        setHeaderStats(header);
        setSummary(sum);
        setMonthlyRates(monthly);
        setSubjectWise(subject);
      } catch (err) {
        console.error('Error fetching attendance data:', err);
        setError('Failed to load attendance details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
        <div className={`
          w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden relative transition-colors duration-200
          ${isDark ? 'bg-[#0F1115]' : 'bg-slate-100'}
        `}>
          <DashboardNavbar />
          <div className={`
            flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 relative scrollbar-hide font-poppins attendance-section transition-colors duration-200
            ${isDark ? 'bg-[#0F1115]' : ''}
          `} style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="w-full md:max-w-full lg:max-w-[1280px] mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <style>{`
                .summary-scroll {
                  display: contents;
                }
                @media (min-width: 1024px) and (max-height: 600px) {
                  .nest-hub-wrapper {
                    display: flex !important;
                    flex-direction: row !important;
                  }
                  .nest-hub-wrapper > div {
                    flex: 1 1 0px !important;
                    min-width: 0 !important;
                  }
                  .summary-bars {
                    display: flex !important;
                    flex-direction: row !important;
                    align-items: stretch !important;
                    gap: 12px !important;
                    flex-wrap: nowrap !important;
                    justify-content: flex-start !important;
                    overflow: hidden !important;
                    padding-bottom: 0 !important;
                  }
                  .main-bar {
                    flex: 0 0 180px !important;
                    width: 180px !important;
                    max-width: 180px !important;
                  }
                  .summary-scroll {
                    display: flex !important;
                    gap: 12px !important;
                    overflow-x: auto !important;
                    white-space: nowrap !important;
                    flex: 1 !important;
                    scrollbar-width: none !important;
                  }
                  .summary-scroll::-webkit-scrollbar {
                    display: none !important;
                  }
                  .summary-bar {
                    flex: 0 0 180px !important;
                    width: 180px !important;
                    max-width: 180px !important;
                  }
                }
                @media (min-width: 520px) and (max-width: 580px) {
                  .summary-bars-wrapper {
                    display: flex !important;
                    flex-direction: row !important;
                    flex-wrap: nowrap !important;
                    overflow-x: auto !important;
                    gap: 12px !important;
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                    padding-bottom: 0 !important;
                    align-items: flex-start !important;
                    justify-content: flex-start !important;
                  }
                  .summary-bars-wrapper::-webkit-scrollbar {
                    display: none !important;
                  }
                  .summary-bars-wrapper > * {
                     flex-shrink: 0 !important;
                  }
                }
              `}</style>

              <ProfileHeader
                headers={headerStats}
                welcome={welcomeData}
                studentId={new URLSearchParams(window.location.search).get('studentId') || 'STU003'}
                loading={loading}
                error={error}
              />

              <div className="nest-hub-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 lg:items-stretch">
                <div className="md:col-span-1 lg:col-span-1 xl:col-span-4 space-y-4 sm:space-y-6">
                  <AttendanceRate
                    overview={headerStats?.attendancePercentage}
                    monthlyData={monthlyRates}
                    loading={loading}
                    error={error}
                  />
                </div>

                <div className="md:col-span-1 lg:col-span-1 xl:col-span-8">
                  <div className={`bg-card rounded-card shadow-card p-4 mb-4 sm:mb-6 overflow-hidden min-h-[300px] sm:min-h-[420px] md:min-h-[250px] lg:min-h-[300px] xl:min-h-[420px] soft-fade soft-fade-delay-2 ${isDark ? 'bg-[#181B21]' : ''}`} style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.06)" }}>
                    <h3 className={`text-lg sm:text-[20px] font-poppins font-semibold mb-4 ${isDark ? 'text-[#FFFFFF]' : 'text-[#0F172A]'}`}>Summary</h3>

                    {loading ? (
                      <div className="flex items-center justify-center h-[200px]">
                        <Loader2 className="w-8 h-8 animate-spin text-p-blue opacity-50" />
                      </div>
                    ) : (
                      <div
                        className="summary-bars summary-bars-wrapper flex flex-col md:flex-row lg:flex-col xl:flex-row md:overflow-x-auto lg:overflow-x-visible md:flex-nowrap lg:flex-wrap flex-wrap gap-4 sm:gap-6 justify-center items-center md:justify-start lg:justify-center md:items-start lg:items-center md:pb-2 lg:pb-0"
                        style={{
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none'
                        }}
                      >
                        <style>{`
                        .flex.md\\:overflow-x-auto::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                        <VerticalMetric
                          value={summary?.present ?? 0}
                          maxValue={headerStats?.totalClasses || 20}
                          label="Total Present"
                          icon={<CheckCircle className="w-4 h-4 text-white" />}
                          bgColor="bg-p-blue"
                          fillColor="bg-blue"
                          iconBgColor="bg-blue"
                          className="soft-fade soft-fade-delay-1 summary-bar main-bar"
                        />
                        <div className="summary-scroll">
                          <VerticalMetric
                            value={summary?.absent ?? 0}
                            maxValue={headerStats?.totalClasses || 20}
                            label="Total Absent"
                            icon={<XCircle className="w-4 h-4 text-white" />}
                            bgColor="bg-p-pink"
                            fillColor="bg-red"
                            iconBgColor="bg-red"
                            className="soft-fade soft-fade-delay-2 summary-bar"
                          />
                          <VerticalMetric
                            value={summary?.leaves ?? 0}
                            maxValue={headerStats?.totalClasses || 20}
                            label="Total Leaves"
                            icon={<Calendar className="w-4 h-4 text-white" />}
                            bgColor="bg-p-orange"
                            fillColor="bg-orange"
                            iconBgColor="bg-orange"
                            className="soft-fade soft-fade-delay-3 summary-bar"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <TopStudentsTable
                  data={subjectWise}
                  loading={loading}
                  error={error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default StudentDetailsPage;


