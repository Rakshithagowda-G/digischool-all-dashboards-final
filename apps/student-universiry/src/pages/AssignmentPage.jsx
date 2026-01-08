import React, { useState, useRef, useEffect } from 'react';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { useDarkMode } from '../contexts/DarkModeContext';
import { FileText, Clock, CheckCircle, AlertCircle, Upload, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { getAssignmentSummary, getAssignments, getSubmitTodayAssignments } from '../lib/api';

const AssignmentPage = () => {
  const { darkMode } = useDarkMode();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId') || 'STU001';

  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({ total: 0, pending: 0, submitted: 0, overdue: 0 });
  const [assignments, setAssignments] = useState([]);
  const [submitToday, setSubmitToday] = useState([]);

  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        setLoading(true);
        const [summaryData, listData, todayData] = await Promise.all([
          getAssignmentSummary(studentId),
          getAssignments(studentId),
          getSubmitTodayAssignments(studentId)
        ]);
        setSummary(summaryData);
        setAssignments(listData);
        setSubmitToday(todayData);
        setError(null);
      } catch (err) {
        console.error("Error fetching assignment data:", err);
        setError("Failed to load assignments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchAssignmentData();
    }
  }, [studentId]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && currentAssignmentId) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

      if (allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension)) {
        setSelectedFiles(prev => ({
          ...prev,
          [currentAssignmentId]: file
        }));
        alert(`File "${file.name}" selected successfully! Click Submit again to upload.`);
      } else {
        alert('Please select only PDF or DOC/DOCX files.');
        event.target.value = '';
      }
    }
    setCurrentAssignmentId(null);
  };

  // Handle submit button click
  const handleSubmitClick = (assignmentId) => {
    setCurrentAssignmentId(assignmentId);
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 0);
  };

  const stats = [
    { label: 'Total Assignments', value: summary.total, icon: FileText, color: 'bg-blue-500' },
    { label: 'Pending', value: summary.pending, icon: Clock, color: 'bg-blue-500' },
    { label: 'Submitted', value: summary.submitted, icon: CheckCircle, color: 'bg-blue-500' },
    { label: 'Overdue', value: summary.overdue, icon: AlertCircle, color: 'bg-blue-500' },
  ];

  if (loading) {
    return (
      <PageWithSidebar>
        <div className="flex flex-1 items-center justify-center h-screen bg-slate-100 dark:bg-[#0F172A]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Loading Assignments...</p>
          </div>
        </div>
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
        <div
          className={`w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden relative ${!darkMode ? 'bg-slate-100' : ''}`}
          style={darkMode ? {
            backgroundImage: "url('/img/body-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          } : {}}
        >
          <DashboardNavbar />

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 relative scrollbar-hide">
            <div className="max-w-[1400px] mx-auto">
              {/* Page Header */}
              <div className="mb-6 sm:mb-8">
                <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Assignments</h1>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>Manage and track your academic tasks with style</p>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`${darkMode ? 'bg-[#141E5A]' : 'bg-white'} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>{stat.label}</p>
                        <p className={`text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-2 sm:p-3 rounded-lg sm:rounded-xl`}>
                        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Error State */}
              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5" />
                  <p>{error}</p>
                </div>
              )}

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
                {/* Assignment List Section - 60% (3/5) */}
                <div className={`lg:col-span-3 ${darkMode ? 'bg-[#141E5A]' : 'bg-white'} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                  <h2 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Assignment List</h2>

                  <div className="space-y-3">
                    {assignments.length === 0 ? (
                      <div className="text-center py-10">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className={`text-slate-500 ${darkMode ? 'text-gray-400' : ''}`}>No assignments available</p>
                      </div>
                    ) : (
                      assignments.map((assignment, index) => (
                        <div
                          key={assignment.assignmentId || index}
                          className={`${darkMode ? 'bg-[#1a2557]' : 'bg-gray-50'} rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-md transition-shadow gap-3 sm:gap-0`}
                        >
                          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
                              <span className={`text-sm sm:text-base font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className={`text-sm sm:text-base font-medium ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                                {assignment.title}
                              </span>
                              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {assignment.subject} • Due: {assignment.dueDate}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                            {assignment.status === 'Pending' ? (
                              <>
                                <span className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold ${darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                                  <Clock className="w-3.5 h-3.5" />
                                  Pending
                                </span>
                                <button
                                  onClick={() => handleSubmitClick(assignment.assignmentId)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
                                >
                                  Submit
                                </button>
                              </>
                            ) : (
                              <span className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
                                <CheckCircle className="w-3.5 h-3.5" />
                                Submitted
                              </span>
                            )}
                            <button className={`p-1.5 sm:p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                              <Upload className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Submit Today Section - 40% (2/5) */}
                <div className={`lg:col-span-2 ${darkMode ? 'bg-[#141E5A]' : 'bg-white'} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                  <h2 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Submit Today</h2>

                  <div className="overflow-y-auto scrollbar-hide max-h-[400px] sm:max-h-[500px]">
                    <div className="space-y-4">
                      {submitToday.length === 0 ? (
                        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                          <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>All caught up!</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-slate-400'} mt-1`}>No assignments due today</p>
                        </div>
                      ) : (
                        submitToday.map((assignment, index) => {
                          const colors = [
                            { bg: 'bg-red-50', text: 'text-red-900', badge: 'bg-red-100 text-red-600' },
                            { bg: 'bg-blue-50', text: 'text-blue-900', badge: 'bg-blue-100 text-blue-600' },
                            { bg: 'bg-purple-50', text: 'text-purple-900', badge: 'bg-purple-100 text-purple-600' },
                            { bg: 'bg-green-50', text: 'text-green-900', badge: 'bg-green-100 text-green-600' },
                          ];
                          const color = colors[index % colors.length];

                          return (
                            <div
                              key={assignment.assignmentId || index}
                              className={`${color.bg} rounded-xl sm:rounded-2xl p-4 sm:p-5 relative`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <span className={`${color.badge} px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold`}>
                                    {assignment.subject}
                                  </span>
                                </div>
                              </div>

                              <h3 className={`${color.text} font-bold text-base sm:text-lg mb-2`}>
                                {assignment.subject}
                              </h3>
                              <h4 className={`${color.text} font-semibold text-sm sm:text-base mb-3`}>
                                {assignment.title}
                              </h4>

                              {assignment.description && (
                                <p className={`${color.text} text-xs sm:text-sm mb-4 opacity-80 line-clamp-2 sm:line-clamp-none`}>
                                  {assignment.description}
                                </p>
                              )}

                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                                <div className="flex items-center gap-2">
                                  <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${color.text}`} />
                                  <span className={`text-xs sm:text-sm font-medium ${color.text}`}>
                                    Due: Today
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleSubmitClick(assignment.assignmentId)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                                >
                                  <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                  Submit
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
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

export default AssignmentPage;

