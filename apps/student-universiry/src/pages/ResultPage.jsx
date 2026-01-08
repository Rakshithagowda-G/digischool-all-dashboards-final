import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { useDarkMode } from '../contexts/DarkModeContext';
import ResultProfileCard from '../components/results/ResultProfileCard';
import TopPerformersCard from '../components/results/TopPerformersCard';
import RoundedPieChart from '../components/results/RoundedPieChart';
import ActivityCard from '../components/results/ActivityCard';
import CoursePerformance from '../components/results/CoursePerformance';
import avatar from '../assets/images/avatar-simmmple.png';
import {
  getResultOverview,
  getResultSubjects,
  getPerformanceChart,
  getTeacherRemarks
} from '@/lib/api';
import { Box, CircularProgress, Typography } from '@mui/material';

function ResultPage() {
  const { darkMode } = useDarkMode();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId') || 'STU001';

  const [overview, setOverview] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [overviewData, subjectsData, performanceData, remarksData] = await Promise.all([
          getResultOverview(studentId),
          getResultSubjects(studentId),
          getPerformanceChart(studentId),
          getTeacherRemarks(studentId)
        ]);
        setOverview(overviewData);
        setSubjects(subjectsData);
        setPerformance(performanceData);
        setRemarks(remarksData);
      } catch (error) {
        console.error("Error fetching results data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId]);

  // Create Material-UI theme that syncs with dark mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#6366f1',
      },
      secondary: {
        main: '#8b5cf6',
      },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  });

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageWithSidebar>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <CircularProgress />
            <Typography sx={{ mt: 2, color: darkMode ? '#fff' : '#1c204b' }}>Loading Results...</Typography>
          </Box>
        </PageWithSidebar>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageWithSidebar>
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-2 xl:p-6">
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
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
              <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-4 xl:px-6 py-6 lg:py-4 xl:py-6 space-y-8 lg:space-y-6 xl:space-y-8" style={{ fontFamily: "Poppins, sans-serif" }}>
                {/* Top Section: Profile on left, Top Performers + Subject Marks on right */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-4 xl:gap-6 w-full items-start">
                  {/* Column 1: Profile Information */}
                  <div className="w-full">
                    <ResultProfileCard
                      title="Profile Information"
                      avatar={avatar}
                      info={{
                        "Full Name": overview?.fullName || "Student",
                        "Exam Name": overview?.examName || "Final Exams 202fs-26",
                        "Teacher": remarks?.teacherName || "Assigned Teacher",
                        "Remarks": remarks?.remarks || "No remarks available"
                      }}
                    />
                  </div>

                  {/* Columns 2 & 3: Top Performers and Subject Marks, with GPA cards below */}
                  <div className="w-full lg:col-span-1 xl:col-span-2 flex flex-col gap-6 lg:gap-4 xl:gap-6">
                    {/* Top row: Top Performers and Subject Marks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4 xl:gap-6 w-full">
                      <div className="w-full">
                        <TopPerformersCard studentId={studentId} />
                      </div>

                      <div className="w-full">
                        <RoundedPieChart data={performance} />
                      </div>
                    </div>

                    {/* Bottom row: 3 GPA Cards below Top Performers and Subject Marks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-4 xl:gap-6 w-full mt-8 lg:mt-6 xl:mt-8">
                      <div className="w-full lg:max-w-none xl:max-w-[240px] lg:mx-0 xl:mx-auto">
                        <ActivityCard
                          index={0}
                          customData={{
                            title: "Attendance",
                            value: `${overview?.attendancePercentage || 0}%`,
                            subtitle: "Latest Attendance Record"
                          }}
                        />
                      </div>
                      <div className="w-full lg:max-w-none xl:max-w-[240px] lg:mx-0 xl:mx-auto">
                        <ActivityCard
                          index={1}
                          customData={{
                            title: "Percentage",
                            value: `${overview?.percentage || 0}%`,
                            subtitle: "Overall Academic Score"
                          }}
                        />
                      </div>
                      <div className="w-full lg:max-w-none xl:max-w-[240px] lg:mx-0 xl:mx-auto md:col-span-2 xl:col-span-1 md:w-1/2 xl:w-full md:mx-auto">
                        <ActivityCard
                          index={2}
                          customData={{
                            title: "Rank",
                            value: `${overview?.rank || 0}`,
                            subtitle: "Current Class Standing"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Performance Section */}
                <div className="w-full">
                  <CoursePerformance studentId={studentId} initialData={subjects} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWithSidebar>
    </ThemeProvider>
  );
}

export default ResultPage;

