import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, CircularProgress, Typography } from '@mui/material';
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
  getTopSubjects,
  getTeacherRemarks,
  getWelcomeData,
  getStudentProfile
} from '../lib/api';

function ResultPage() {
  const { darkMode } = useDarkMode();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId') || 'STU002';

  const [overview, setOverview] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [topSubjects, setTopSubjects] = useState([]);
  const [remarks, setRemarks] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [overviewData, subjectsData, topSubjectsData, remarksData, welcomeData, profile] = await Promise.all([
          getResultOverview(studentId),
          getResultSubjects(studentId),
          getTopSubjects(studentId),
          getTeacherRemarks(studentId),
          getWelcomeData(studentId),
          getStudentProfile(studentId)
        ]);

        console.log('Overview:', overviewData);
        console.log('Subjects:', subjectsData);
        console.log('Top Subjects:', topSubjectsData);
        console.log('Remarks:', remarksData);

        setOverview(overviewData || {});

        // Subjects API returns array directly, not wrapped in object
        const subjectsArray = Array.isArray(subjectsData) ? subjectsData : (subjectsData?.subjects || []);
        // Map marksObtained to marks for consistency
        const mappedSubjects = subjectsArray.map(s => ({
          ...s,
          subject: s.subject || s.subjectName,
          marks: s.marksObtained || s.marks || 0
        }));
        setSubjects(mappedSubjects);

        // Top subjects API returns array directly, add rank based on order
        const topSubjectsArray = Array.isArray(topSubjectsData) ? topSubjectsData : (topSubjectsData?.topSubjects || []);
        const mappedTopSubjects = topSubjectsArray.map((s, index) => ({
          ...s,
          subjectName: s.subject || s.subjectName,
          rank: index + 1
        }));
        setTopSubjects(mappedTopSubjects);

        setRemarks(remarksData || {});
        setStudentName(overviewData?.fullName || welcomeData?.fullName || '');
        setProfileData(profile || {});
      } catch (error) {
        console.error("Error fetching results data:", error);
        setError(error.message);
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

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageWithSidebar>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography sx={{ color: 'error.main', mb: 2 }}>Error loading results</Typography>
            <Typography sx={{ color: darkMode ? '#fff' : '#1c204b' }}>{error}</Typography>
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
          <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-xl shadow-lg flex flex-col overflow-hidden relative">
            {/* Static Navbar at top */}
            <DashboardNavbar studentName={studentName} />
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
              <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-4 xl:px-6 py-6 lg:py-4 xl:py-6 space-y-8 lg:space-y-6 xl:space-y-8" style={{ fontFamily: "Poppins, sans-serif" }}>
                {/* Top Section: Profile on left, Top Performers + Subject Marks on right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-4 xl:gap-6 w-full items-start">
                  {/* Column 1: Profile Information */}
                  <div className="w-full">
                    <ResultProfileCard
                      title="Profile Information"
                      avatar={profileData?.profileImage || avatar}
                      info={{
                        "Full Name": studentName || "Student",
                        "Test Name": overview?.examName || "Monthly Assessment",
                        "Teacher": remarks?.teacherName || "Not assigned",
                        "Remarks": remarks?.remarks || "No remarks available"
                      }}
                    />
                  </div>

                  {/* Columns 2 & 3: Top Performers and Subject Marks, with GPA cards below */}
                  <div className="w-full lg:col-span-1 xl:col-span-2 flex flex-col gap-6 lg:gap-4 xl:gap-6">
                    {/* Top row: Top Performers and Subject Marks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4 xl:gap-6 w-full">
                      <div className="w-full">
                        <TopPerformersCard topSubjects={topSubjects} />
                      </div>

                      <div className="w-full">
                        <RoundedPieChart subjects={subjects} />
                      </div>
                    </div>

                    {/* Bottom row: 3 GPA Cards below Top Performers and Subject Marks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-4 xl:gap-6 w-full mt-8 lg:mt-6 xl:mt-8">
                      <div className="w-full lg:max-w-none xl:max-w-[240px] lg:mx-0 xl:mx-auto">
                        <ActivityCard
                          index={0}
                          value={`${overview?.percentage || 0}%`}
                          label="Overall Percentage"
                        />
                      </div>
                      <div className="w-full lg:max-w-none xl:max-w-[240px] lg:mx-0 xl:mx-auto">
                        <ActivityCard
                          index={1}
                          value={overview?.rank || "N/A"}
                          label="Class Rank"
                        />
                      </div>
                      <div className="w-full lg:max-w-none xl:max-w-[240px] lg:mx-0 xl:mx-auto md:col-span-2 xl:col-span-1">
                        <ActivityCard
                          index={2}
                          value={`${overview?.totalMarksObtained || 0}/${overview?.totalMaxMarks || 0}`}
                          label="Total Marks"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Performance Section */}
                <div className="w-full">
                  <CoursePerformance subjects={subjects} />
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
