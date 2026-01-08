import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { useTheme } from '../context/ThemeContext';
import { Clock, CheckCircle, Loader2, AlertCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import winnerAnimation from '../assets/lottie/Winner.json';
import {
  getResultOverview,
  getSubjectWiseMarks,
  getPerformanceChart,
  getTopSubjects,
  getTeacherRemarks,
  getStudentProfile
} from '../lib/api';

const ResultsPage = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId') || 'STU003';

  const [overview, setOverview] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [remarks, setRemarks] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        const [overviewData, subjectsData, remarksData, profileData] = await Promise.all([
          getResultOverview(studentId),
          getSubjectWiseMarks(studentId),
          getTeacherRemarks(studentId),
          getStudentProfile(studentId)
        ]);

        setOverview(overviewData);
        setSubjects(subjectsData);
        setRemarks(remarksData);
        setProfile(profileData);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResultsData();
  }, [studentId]);

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
        <div
          className="w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden relative transition-colors duration-200"
          style={{
            backgroundColor: isDark ? '#0F1115' : '#E5E7EB'
          }}
        >
          {/* Static Navbar at top */}
          <DashboardNavbar />
          {/* Scrollable content area */}
          <div
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 relative scrollbar-hide transition-colors duration-200"
            style={{
              backgroundColor: isDark ? '#0F1115' : '#E5E7EB'
            }}
          >
            <div className="w-full min-h-full flex flex-col lg:flex-row-reverse gap-3">
              {/* Profile Card - Right Sidebar on Desktop, Top on Mobile */}
              <div className="w-full lg:w-[30%] flex-shrink-0 order-1 lg:order-2 self-stretch">
                <div className={`rounded-2xl shadow-lg overflow-visible transition-colors duration-200 h-full flex flex-col ${isDark ? 'bg-[#181B21]' : 'bg-white'
                  }`}>
                  {/* Profile Card with Banner */}
                  <div className="relative px-4 pt-4 flex-1 flex flex-col">
                    {/* Top Banner with Cloud Image Background - Rounded Rectangle with Inner Margin */}
                    <div
                      className="relative h-[180px] rounded-2xl overflow-hidden mb-6"
                      style={{
                        backgroundImage: 'url(/img/cloud.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                    </div>

                    {/* Profile Content */}
                    <div className="px-4 pb-6 flex-1 flex flex-col">
                      {/* Avatar - Left Aligned, Overlapping Banner */}
                      <div className="relative -mt-20 mb-4">
                        <div className="w-[100px] h-[100px] rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
                          {loading ? (
                            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                          ) : profile?.profileImage ? (
                            <img
                              src={profile.profileImage}
                              alt="Profile Avatar"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <User className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* User Name - Left Aligned */}
                      <h3 className={`text-xl font-bold text-left mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {loading ? "..." : (overview?.fullName || profile?.name || "Student")}
                      </h3>

                      {/* Bio - Left Aligned */}
                      <p className={`text-sm text-left mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {loading ? "..." : (profile?.course || "Student focused on simplicity & learning")}
                      </p>

                      {/* Stats Row */}
                      <div className="flex border-t border-b border-gray-200 py-4 mb-4">
                        <div className="flex-1 text-center border-r border-gray-200">
                          <div className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {loading ? "0%" : `${overview?.attendancePercentage || 0}%`}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Attendance
                          </div>
                        </div>
                        <div className="flex-1 text-center border-r border-gray-200">
                          <div className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {loading ? "0" : (overview?.rank || 0)}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Rank
                          </div>
                        </div>
                        <div className="flex-1 text-center">
                          <div className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {loading ? "0%" : `${overview?.percentage || 0}%`}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Average
                          </div>
                        </div>
                      </div>

                      {/* Teacher Remarks Section */}
                      <div className={`rounded-lg p-4 mb-4 min-h-[120px] ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-purple-50 border border-purple-100'}`}>
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className={`text-xs font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              Teacher Remarks
                            </div>
                            <p className={`text-sm text-left ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {loading ? "Loading remarks..." : (remarks?.remarks || "No remarks available.")}
                            </p>
                          </div>
                          <div className="w-16 h-16 flex-shrink-0">
                            <Lottie
                              animationData={winnerAnimation}
                              loop={true}
                              className="w-full h-full"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content - Left Side on Desktop, Below Profile on Mobile */}
              <div className="w-full lg:w-[70%] flex-1 space-y-6 order-2 lg:order-1">
                {/* Result Overview Section */}
                <div className="space-y-4">
                  <h2 className={`text-xl sm:text-2xl font-semibold ${isDark ? 'text-[#FFFFFF]' : 'text-gray-800'}`}>
                    Result Overview
                  </h2>

                  {/* Purple Banner Card */}
                  <div className={`rounded-2xl p-6 shadow-lg relative overflow-hidden ${isDark
                    ? 'bg-slate-900'
                    : 'bg-[#A78BFA]'
                    }`}>
                    {/* Banner Image - Aligned to White Card */}
                    <div className="absolute left-[75%] top-[0.8rem] z-10">
                      <img
                        src="/img/res5.png"
                        alt="Banner Illustration"
                        className="w-28 h-28 lg:w-32 lg:h-32 object-cover"
                      />
                    </div>


                    {/* Content Grid */}
                    <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-6">
                      {/* Left Content */}
                      <div className="flex-1 space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white">
                          Welcome, {loading ? "..." : (overview?.fullName || profile?.name || "Student")}
                        </h3>

                        {/* White Card with Progress Bar - Extended */}
                        <div className="rounded-xl p-5 shadow-md bg-white">
                          <div className="flex items-center justify-between gap-4">
                            {/* Left: Task Progress Text and Bar */}
                            <div className="flex-1 space-y-2">
                              <p className="text-sm font-semibold text-gray-800">
                                Total Marks: {loading ? "0/0" : `${overview?.totalMarksObtained || 0}/${overview?.totalMaxMarks || 0}`}
                              </p>

                              {/* Progress Bar */}
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: loading ? '0%' : `${overview?.percentage || 0}%` }}
                                    transition={{ duration: 0.8 }}
                                    className="h-full bg-blue-600 rounded-full"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Right: Score */}
                            <div className="flex items-center gap-1.5 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-medium">{loading ? "0%" : `${overview?.percentage || 0}%`} Score</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject Wise Marks Section */}
                <div className="space-y-4">
                  <h2 className={`text-xl sm:text-2xl font-semibold ${isDark ? 'text-[#FFFFFF]' : 'text-gray-800'}`}>
                    Subject Wise Marks
                  </h2>

                  {/* Single Big Card containing all tasks */}
                  <div
                    className="rounded-2xl p-6 shadow-lg transition-all duration-200 border"
                    style={{
                      backgroundColor: isDark ? '#181B21' : '#FFFFFF',
                      borderColor: isDark ? '#232730' : '#F3F4F6'
                    }}
                  >
                    <div className="space-y-4">
                      {loading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                        </div>
                      ) : subjects.length === 0 ? (
                        <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          No subject data available.
                        </p>
                      ) : subjects.map((subject, index) => {
                        const subjectProgress = (subject.marksObtained / subject.maxMarks) * 100;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-4 transition-all duration-200"
                          >
                            {/* Icon placeholder using original images pattern */}
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                              <img
                                src={`/img/res${(index % 3) + 1}.jpg`}
                                alt={subject.subject}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-base font-medium mb-2 ${isDark ? 'text-[#FFFFFF]' : 'text-gray-800'}`}>
                                {subject.subject}
                              </h3>

                              {/* Progress Bar */}
                              <div className="flex items-center gap-3">
                                <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#232730]' : 'bg-gray-200'}`}>
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${subjectProgress}%` }}
                                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                                    className="h-full bg-green-500 rounded-full"
                                  />
                                </div>
                                <span className={`text-sm font-medium whitespace-nowrap ${isDark ? 'text-[#9CA3AF]' : 'text-gray-600'}`}>
                                  {subject.marksObtained}/{subject.maxMarks}
                                </span>
                                {subject.result === "PASS" && (
                                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default ResultsPage;
