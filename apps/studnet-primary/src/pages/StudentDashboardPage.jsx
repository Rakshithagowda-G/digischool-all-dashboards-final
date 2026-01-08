import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { Notifications } from '../components/ui/Notifications';
import { useTheme } from '../context/ThemeContext';
import { getAssignmentsList, getDownloadUrl } from '../lib/api';
import {
  Download,
  Upload,
  Loader2,
  AlertCircle,
  ClipboardList
} from 'lucide-react';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Anim1 from '@/assets/lottie/BOOK WALKING.json';
import Anim2 from '@/assets/lottie/Funny brain.json';
import Anim3 from '@/assets/lottie/maths.json';
import Anim4 from '@/assets/lottie/Run cycle recreated in Lottie Creator.json';
import Anim5 from '@/assets/lottie/snail dance.json';
import { AssignmentSummaryCard } from '../components/ui/assignment-summary-card';

const StudentDashboardPage = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const fileInputRef = useRef(null);

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lottie animations array - rotates across all cards
  const animations = [Anim1, Anim2, Anim3, Anim4, Anim5];

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(window.location.search);
        const studentId = searchParams.get('studentId') || 'STU003';
        const data = await getAssignmentsList(studentId);
        setAssignments(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching assignments:', err);
        setError('Failed to load assignments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleDownload = async (assignmentId) => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const studentId = searchParams.get('studentId') || 'STU003';
      const data = await getDownloadUrl(assignmentId, studentId);
      if (data.fileUrl) {
        window.open(data.fileUrl, '_blank');
      }
    } catch (err) {
      console.error('Error during download:', err);
    }
  };

  const handleSubmitClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };

  const recentResources = [
    "Exploring Qatar's Seasons: T...",
    "Seasonal Changes in Qatar: A...",
    "Cultural Festivals and Traditio..."
  ];

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
        <div className={`
          w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden relative transition-colors duration-200
          ${isDark ? 'bg-[#0F1115]' : 'bg-[#E5E7EB]'}
        `}>
          <DashboardNavbar />

          <div className={`
            flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 relative scrollbar-hide transition-colors duration-200
            ${isDark ? 'bg-[#0F1115]' : 'bg-[#E5E7EB]'}
          `}>
            <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 md:gap-6 max-w-[1600px] mx-auto">

              {/* Left Column */}
              <div className="md:col-span-4 lg:col-span-4 space-y-4 md:space-y-6">
                <Notifications />

                {/* Recent Resources Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className={`
                    rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200
                    ${isDark ? 'bg-[#181B21]' : 'bg-white'}
                  `}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-[#FFFFFF]' : 'text-gray-800'}`}>
                      Recent Resources
                    </h3>
                    <Link to="/elibrary" className={`text-sm font-medium transition-colors ${isDark ? 'text-[#06B6D4] hover:text-[#06B6D4]/80' : 'text-purple-600 hover:text-purple-700'}`}>
                      See All
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {recentResources.map((resource, idx) => (
                      <div
                        key={idx}
                        className={`p-2 text-sm rounded-lg transition-colors cursor-pointer ${isDark ? 'text-[#9CA3AF] hover:text-[#FFFFFF] hover:bg-[#232730]' : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'}`}
                      >
                        {resource}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Center Column - Assignments */}
              <div className="md:col-span-5 lg:col-span-5 space-y-4 md:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className={`rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}
                >
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-[#FFFFFF]' : 'text-gray-800'}`}>
                    Assignments
                  </h3>

                  <div className="max-h-[600px] overflow-y-auto overflow-x-hidden pr-2 scroll-smooth scrollbar-thin">
                    <div className="space-y-4">
                      {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Loader2 className={`w-10 h-10 animate-spin mb-4 ${isDark ? 'text-[#06B6D4]' : 'text-purple-600'}`} />
                          <p className={isDark ? 'text-[#9CA3AF]' : 'text-gray-500'}>Loading assignments...</p>
                        </div>
                      ) : error ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
                          <p className={isDark ? 'text-[#FFFFFF]' : 'text-gray-800'}>{error}</p>
                          <button onClick={() => window.location.reload()} className="mt-4 text-sm text-purple-600 font-medium hover:underline">Try Again</button>
                        </div>
                      ) : assignments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                          <ClipboardList className={`w-12 h-12 mb-4 ${isDark ? 'text-[#9CA3AF]' : 'text-gray-400'}`} />
                          <p className={isDark ? 'text-[#9CA3AF]' : 'text-gray-500'}>No pending assignments found.</p>
                        </div>
                      ) : (
                        assignments.map((assignment, index) => {
                          const animToShow = animations[index % animations.length];
                          const formattedDate = new Date(assignment.dueDate).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric'
                          });
                          return (
                            <motion.div
                              key={assignment.assignmentId || index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`rounded-2xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer flex-shrink-0 ${isDark ? 'bg-[#181B21] border border-[#232730]' : 'bg-white border border-gray-200'}`}
                            >
                              <div className="flex gap-5">
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden ${isDark ? 'bg-[#232730]' : 'bg-[#E8FBEA]'}`}>
                                  <Lottie animationData={animToShow} loop autoplay style={{ width: '80px', height: '80px' }} />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                  <div>
                                    <div className="flex justify-between items-start mb-1">
                                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-[#06B6D4]' : 'text-purple-600'}`}>
                                        {assignment.subject}
                                      </span>
                                      <span className={`text-[10px] ${isDark ? 'text-[#6B7280]' : 'text-gray-400'}`}>
                                        Due: {formattedDate}
                                      </span>
                                    </div>
                                    <h4 className={`text-base font-bold mb-2 line-clamp-2 leading-tight ${isDark ? 'text-[#FFFFFF]' : 'text-gray-800'}`}>
                                      {assignment.title}
                                    </h4>
                                    <p className={`text-sm mb-4 line-clamp-2 leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-gray-600'}`}>
                                      Status: <span className={assignment.status === 'Submitted' ? 'text-green-500' : 'text-orange-500'}>{assignment.status}</span>
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-end gap-2 mt-auto">
                                    <button
                                      onClick={() => handleDownload(assignment.assignmentId)}
                                      className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium ${isDark ? 'hover:bg-[#232730] text-[#9CA3AF] hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                      <span className="hidden sm:inline">Download</span>
                                    </button>
                                    <button onClick={handleSubmitClick} className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium ${isDark ? 'bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
                                      <Upload className="w-3.5 h-3.5" />
                                      <span>Submit</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="md:col-span-3 lg:col-span-3 space-y-4 md:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <AssignmentSummaryCard />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
      />
    </PageWithSidebar>
  );
};

export default StudentDashboardPage;

