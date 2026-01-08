import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { useDarkMode } from '../contexts/DarkModeContext';
import { FileText, Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { getAssignmentSummary, getAssignments, getSubmitTodayAssignments, getWelcomeData } from '../lib/api';

const AssignmentPage = () => {
  const { darkMode } = useDarkMode();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId') || 'STU002';

  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);

  const [summary, setSummary] = useState({ total: 0, pending: 0, submitted: 0, overdue: 0 });
  const [assignments, setAssignments] = useState([]);
  const [submitTodayList, setSubmitTodayList] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError(null);

        const [summaryData, assignmentsData, submitTodayData, welcomeData] = await Promise.all([
          getAssignmentSummary(studentId),
          getAssignments(studentId),
          getSubmitTodayAssignments(studentId),
          getWelcomeData(studentId)
        ]);

        console.log('Summary:', summaryData);
        console.log('Assignments:', assignmentsData);
        console.log('Submit Today:', submitTodayData);

        setSummary(summaryData || { total: 0, pending: 0, submitted: 0, overdue: 0 });
        setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
        setSubmitTodayList(Array.isArray(submitTodayData) ? submitTodayData : []);
        setStudentName(welcomeData?.fullName || '');
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
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

  // Format due date
  const formatDueDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Reset time parts for comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) return 'Today';
    if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';

    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0 && diffDays <= 7) return `${diffDays} days`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get color scheme for submit today cards
  const getColorScheme = (index) => {
    const schemes = [
      { bgColor: 'bg-red-50', textColor: 'text-red-900', badgeColor: 'bg-red-100 text-red-600' },
      { bgColor: 'bg-blue-50', textColor: 'text-blue-900', badgeColor: 'bg-blue-100 text-blue-600' },
      { bgColor: 'bg-purple-50', textColor: 'text-purple-900', badgeColor: 'bg-purple-100 text-purple-600' },
      { bgColor: 'bg-green-50', textColor: 'text-green-900', badgeColor: 'bg-green-100 text-green-600' },
      { bgColor: 'bg-orange-50', textColor: 'text-orange-900', badgeColor: 'bg-orange-100 text-orange-600' },
    ];
    return schemes[index % schemes.length];
  };

  const stats = [
    { label: 'Total Assignments', value: summary.total.toString(), icon: FileText, color: 'bg-blue-500' },
    { label: 'Pending', value: summary.pending.toString(), icon: Clock, color: 'bg-blue-500' },
    { label: 'Submitted', value: summary.submitted.toString(), icon: CheckCircle, color: 'bg-blue-500' },
    { label: 'Overdue', value: summary.overdue.toString(), icon: AlertCircle, color: 'bg-blue-500' },
  ];

  if (loading) {
    return (
      <PageWithSidebar>
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
          <div className={`w-full h-full rounded-xl shadow-lg flex items-center justify-center ${!darkMode ? 'bg-slate-100' : 'bg-slate-900'}`}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Loading assignments...</p>
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
          <div className={`w-full h-full rounded-xl shadow-lg flex items-center justify-center ${!darkMode ? 'bg-slate-100' : 'bg-slate-900'}`}>
            <div className="text-center text-red-600">
              <p className="font-semibold mb-2">Error loading assignments</p>
              <p className="text-sm">{error}</p>
            </div>
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
          {/* Navbar */}
          <DashboardNavbar studentName={studentName} />

          {/* Scrollable content area */}
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

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
                {/* Assignment List Section - 60% (3/5) */}
                <div className={`lg:col-span-3 ${darkMode ? 'bg-[#141E5A]' : 'bg-white'} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                  <h2 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Assignment List</h2>

                  {assignments.length > 0 ? (
                    <div className="space-y-3">
                      {assignments.map((assignment, index) => (
                        <div
                          key={assignment.assignmentId}
                          className={`${darkMode ? 'bg-[#1a2557]' : 'bg-gray-50'} rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-md transition-shadow gap-3 sm:gap-0`}
                        >
                          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
                              <span className={`text-sm sm:text-base font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className={`text-sm sm:text-base font-medium ${darkMode ? 'text-white' : 'text-gray-900'} block truncate`}>
                                {assignment.title}
                              </span>
                              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {assignment.subject}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                            {assignment.status === 'Pending' || assignment.status === 'Overdue' ? (
                              <>
                                <span className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold ${assignment.status === 'Overdue'
                                  ? (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600')
                                  : (darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600')
                                  }`}>
                                  <Clock className="w-3.5 h-3.5" />
                                  {assignment.status}
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
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No assignments to display</p>
                    </div>
                  )}
                </div>

                {/* Submit Today Section - 40% (2/5) */}
                <div className={`lg:col-span-2 ${darkMode ? 'bg-[#141E5A]' : 'bg-white'} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                  <h2 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Submit Today</h2>

                  <div className="overflow-y-auto scrollbar-hide max-h-[400px] sm:max-h-[500px]">
                    {submitTodayList.length > 0 ? (
                      <div className="space-y-4">
                        {submitTodayList.map((assignment, index) => {
                          const colors = getColorScheme(index);
                          return (
                            <div
                              key={assignment.assignmentId}
                              className={`${colors.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-5 relative`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <span className={`${colors.badgeColor} px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold`}>
                                    {assignment.subject}
                                  </span>
                                </div>
                              </div>

                              <h3 className={`${colors.textColor} font-bold text-base sm:text-lg mb-2`}>
                                {assignment.subject}
                              </h3>
                              <h4 className={`${colors.textColor} font-semibold text-sm sm:text-base mb-3`}>
                                {assignment.title}
                              </h4>

                              {assignment.description && (
                                <p className={`${colors.textColor} text-xs sm:text-sm mb-4 opacity-80 line-clamp-2 sm:line-clamp-none`}>
                                  {assignment.description}
                                </p>
                              )}

                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                                <div className="flex items-center gap-2">
                                  <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${colors.textColor}`} />
                                  <span className={`text-xs sm:text-sm font-medium ${colors.textColor}`}>
                                    Due: {formatDueDate(assignment.dueDate)}
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
                        })}
                      </div>
                    ) : (
                      <div className={`border-2 border-dashed ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-xl p-8 sm:p-12 text-center`}>
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                          </div>
                        </div>
                        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          All caught up!
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          No assignments due today
                        </p>
                      </div>
                    )}
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

