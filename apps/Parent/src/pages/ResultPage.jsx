import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { useDarkMode } from '../contexts/DarkModeContext';
import ResultProfileCard from '../components/results/ResultProfileCard';
import TopPerformersCard from '../components/results/TopPerformersCard';
import RoundedPieChart from '../components/results/RoundedPieChart';
import CoursePerformance from '../components/results/CoursePerformance';
import ParentService, { DEFAULT_STUDENT_ID } from '../services/ParentService';
import { Loader2 } from 'lucide-react';

function ResultPage() {
  const { darkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [topSubjects, setTopSubjects] = useState([]);
  const [subjectMarks, setSubjectMarks] = useState([]);
  const [monthlyTests, setMonthlyTests] = useState([]);

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

  useEffect(() => {
    const fetchAllData = async () => {
      // Get studentId from URL or fallback to default
      const urlParams = new URLSearchParams(window.location.search);
      const studentId = urlParams.get('studentId') || DEFAULT_STUDENT_ID;

      console.log(`[ResultPage] Initializing results data fetch for studentId: ${studentId}`);

      try {
        setLoading(true);
        const [profile, top, marksRes, tests] = await Promise.all([
          ParentService.getResultsProfile(studentId),
          ParentService.getTopSubjects(studentId),
          ParentService.getSubjectMarks(studentId),
          ParentService.getMonthlyTests(studentId)
        ]);

        console.log('[ResultPage] Profile Data:', profile);
        console.log('[ResultPage] Top Subjects:', top);
        console.log('[ResultPage] Subject Marks:', marksRes);
        console.log('[ResultPage] Monthly Tests:', tests);

        // Map Backend profile to Frontend expectation
        setProfileData({
          name: profile?.fullName || "N/A",
          mobile: profile?.phone || "N/A",
          email: profile?.email || "N/A",
          address: profile?.location || "N/A",
          avatarUrl: profile?.avatarUrl
        });

        // Map Backend top subjects to Frontend expectation (percentage -> score)
        const mappedTop = (Array.isArray(top) ? top : []).map(item => ({
          subject: item.subject,
          score: item.percentage
        }));
        setTopSubjects(mappedTop);

        // Map Backend marks to Frontend expectation (res.subjects)
        setSubjectMarks(Array.isArray(marksRes?.subjects) ? marksRes.subjects : []);

        // Map Backend monthly tests to Frontend expectation
        const mappedTests = (Array.isArray(tests) ? tests : []).map((test, index) => ({
          id: `test-${index}`,
          title: test.testName || `Test ${index + 1}`,
          rank: test.rank,
          testData: (Array.isArray(test.subjects) ? test.subjects : []).map(s => ({
            subject: s.subject,
            maxMarks: s.maxMarks,
            minMarks: s.minMarks,
            result: s.obtainedMarks, // Frontend expects obtained marks in 'result'
            status: s.result // Frontend expects Pass/Fail in 'status'
          }))
        }));
        setMonthlyTests(mappedTests);

      } catch (err) {
        console.error("Error fetching results page data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageWithSidebar>
          <div className="flex flex-1 items-center justify-center min-h-[500px]">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
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
            <DashboardNavbar />
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
              <div className="w-full mx-auto px-4 py-6 space-y-6 xl:max-w-[1600px] xl:px-6 xl:py-6 xl:space-y-8" style={{ fontFamily: "Poppins, sans-serif" }}>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full items-start justify-items-stretch">
                  <div className="w-full h-fit self-start min-w-0">
                    <ResultProfileCard
                      title="Profile Information"
                      avatar={profileData?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData?.name || "Student")}&background=6366f1&color=fff`}
                      info={{
                        "Full Name": profileData?.name || "N/A",
                        Mobile: profileData?.mobile || "N/A",
                        Email: profileData?.email || "N/A",
                        Address: profileData?.address || "N/A",
                      }}
                    />
                  </div>

                  <div className="w-full xl:col-span-2 flex flex-col gap-6 h-fit self-start min-w-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 w-full items-start">
                      <div className="w-full min-w-0">
                        <TopPerformersCard subjects={topSubjects} />
                      </div>

                      <div className="w-full min-w-0">
                        <RoundedPieChart marks={subjectMarks} />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="w-full min-w-0">
                  <CoursePerformance tests={monthlyTests} />
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

