// Classes Page component 
import React, { useState, useEffect, useRef } from 'react';
import { Users, CheckCircle, AlertCircle, BookOpen, TrendingUp, Calendar, Award, Clock, FileText, X, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS_FOR_CLASS } from '../../data/mockData';


const ClassesPage = () => {
  const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES[0]);
  const [activeTab, setActiveTab] = useState('students');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set([0]));
  
  const sectionRefs = useRef([]);

  // Bidirectional Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleSections((prev) => new Set([...prev, index]));
              }, 50);
            } else {
              if (index !== 0) {
                setVisibleSections((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(index);
                  return newSet;
                });
              }
            }
          });
        },
        observerOptions
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Mock student detailed data
  const getStudentDetails = (student) => ({
    ...student,
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    parentName: 'John ' + student.name.split(' ')[1],
    parentEmail: 'parent.' + student.email,
    parentPhone: '+1 (555) 987-6543',
    enrollmentDate: 'Sep 1, 2024',
    grade: 'Grade 10',
    rollNumber: 'STU' + student.id.toString().padStart(4, '0'),
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
    attendance: {
      present: 85,
      absent: 5,
      total: 90,
      percentage: 94
    },
    grades: [
      { subject: 'Mathematics', score: 92, grade: 'A' },
      { subject: 'Physics', score: 88, grade: 'B+' },
      { subject: 'Chemistry', score: 95, grade: 'A+' },
      { subject: 'Biology', score: 90, grade: 'A' },
      { subject: 'English', score: 87, grade: 'B+' }
    ],
    recentActivities: [
      { activity: 'Submitted Math Assignment', date: 'Nov 30, 2025' },
      { activity: 'Completed Physics Quiz', date: 'Nov 28, 2025' },
      { activity: 'Attended Chemistry Lab', date: 'Nov 25, 2025' }
    ]
  });

  const handleViewProfile = (student) => {
    setSelectedStudent(getStudentDetails(student));
    setIsProfileModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div 
        ref={(el) => (sectionRefs.current[0] = el)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {[
          { icon: BookOpen, label: 'Total Classes', value: MOCK_CLASSES.length },
          { icon: Users, label: 'Total Students', value: MOCK_CLASSES.reduce((sum, cls) => sum + cls.students, 0) },
          { icon: TrendingUp, label: 'Avg. Attendance', value: '93%' },
          { icon: FileText, label: 'Active Assignments', value: 18 }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx}
              className={`p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-lg text-white hover:scale-105 hover:shadow-2xl transition-all duration-700 ease-out ${
                visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
              style={{ transitionDelay: visibleSections.has(0) ? `${idx * 100}ms` : `${(3 - idx) * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Class Cards Grid */}
      <div 
        ref={(el) => (sectionRefs.current[1] = el)}
        className={`p-6 bg-white rounded-3xl shadow-sm transition-all duration-1000 ease-out ${
          visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <h3 className="text-xl font-semibold mb-5">My Classes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_CLASSES.map((cls, idx) => (
            <div 
              key={cls.id} 
              onClick={() => setSelectedClass(cls)}
              className={`p-5 rounded-2xl shadow-sm cursor-pointer transition-all duration-700 ease-out hover:shadow-xl hover:scale-105 hover:-translate-y-2 ${
                selectedClass?.id === cls.id 
                  ? 'bg-blue-50 border-2 border-blue-500' 
                  : 'bg-gray-50 border-2 border-transparent hover:border-blue-200'
              } ${visibleSections.has(1) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
              style={{ transitionDelay: visibleSections.has(1) ? `${idx * 100}ms` : `${Math.max(0, (MOCK_CLASSES.length - 1 - idx) * 80)}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-800">{cls.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{cls.students} Students</p>
                </div>
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  selectedClass?.id === cls.id ? 'bg-blue-500 rotate-12 scale-110' : 'bg-blue-200'
                }`}>
                  <BookOpen size={20} className={selectedClass?.id === cls.id ? 'text-white' : 'text-blue-600'} />
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-500" />
                  <span className="text-sm text-gray-600">93% Attendance</span>
                </div>
                {cls.pending > 0 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {cls.pending} Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Class Details */}
      {selectedClass && (
        <div 
          ref={(el) => (sectionRefs.current[2] = el)}
          className={`p-6 bg-white rounded-3xl shadow-sm transition-all duration-1000 ease-out ${
            visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{selectedClass.name}</h3>
              <p className="text-gray-500 mt-1">{selectedClass.students} Students enrolled</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-medium hover:bg-blue-200 hover:scale-105 transition-all duration-300">
                Send Announcement
              </button>
              <button className="px-4 py-2 bg-[#2F69FF] text-white rounded-xl font-medium hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                Schedule Meeting
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {[
              { id: 'students', icon: Users, label: 'Students' },
              { id: 'attendance', icon: Calendar, label: 'Attendance' },
              { id: 'performance', icon: Award, label: 'Performance' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium rounded-t-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600 scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} className="inline mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="overflow-x-auto animate-fade-in">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_STUDENTS_FOR_CLASS.map((student, idx) => (
                    <tr 
                      key={student.id} 
                      className="hover:bg-blue-50 transition-all duration-300 animate-fade-in-stagger"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                            <span className="text-blue-600 font-semibold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {student.attendance}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          onClick={() => handleViewProfile(student)}
                          className="text-blue-600 hover:text-blue-800 font-medium hover:scale-110 transition-all duration-300"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              {/* Attendance Summary Cards */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: CheckCircle, label: 'Present Today', value: 28 },
                    { icon: AlertCircle, label: 'Absent Today', value: 2 },
                    { icon: TrendingUp, label: 'Overall Rate', value: '93%' }
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div 
                        key={idx}
                        className="p-5 bg-blue-50 rounded-2xl border border-blue-200 hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in-stagger"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-full bg-blue-100">
                            <Icon className="text-blue-600" size={24} />
                          </div>
                          <div>
                            <p className="text-sm text-blue-600 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Attendance Log */}
                <div className="p-5 bg-gray-50 rounded-2xl">
                  <h4 className="font-semibold text-lg mb-4">Recent Attendance Log</h4>
                  <div className="space-y-3">
                    {['Nov 30, 2025', 'Nov 29, 2025', 'Nov 28, 2025', 'Nov 27, 2025'].map((date, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md hover:scale-102 transition-all duration-300 animate-fade-in-stagger"
                        style={{ animationDelay: `${(idx + 3) * 100}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <Calendar size={18} className="text-gray-400" />
                          <span className="font-medium text-gray-700">{date}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-blue-600 font-medium">
                            <CheckCircle size={16} className="inline mr-1" />
                            {30 - idx} Present
                          </span>
                          <span className="text-sm text-blue-600 font-medium">
                            <AlertCircle size={16} className="inline mr-1" />
                            {idx} Absent
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <div className="p-5 bg-gray-50 rounded-2xl animate-fade-in" style={{ animationDelay: '200ms' }}>
                <h4 className="font-semibold text-lg mb-4">December 2025</h4>
                <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
                  <span className="text-blue-600 font-semibold">Su</span>
                  <span className="font-semibold">Mo</span>
                  <span className="font-semibold">Tu</span>
                  <span className="font-semibold">We</span>
                  <span className="font-semibold">Th</span>
                  <span className="font-semibold">Fr</span>
                  <span className="text-blue-600 font-semibold">Sa</span>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  <span className="text-gray-400 p-2">1</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">2</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">3</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">4</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">5</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">6</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">7</span>
                  
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">8</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">9</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">10</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">11</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">12</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">13</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">14</span>
                  
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">15</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">16</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">17</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">18</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">19</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">20</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">21</span>
                  
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">22</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">23</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">24</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">25</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">26</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">27</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">28</span>
                  
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">29</span>
                  <span className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">30</span>
                  <span className="p-2 bg-blue-500 text-white rounded-lg font-semibold">1</span>
                  <span className="text-gray-400 p-2">2</span>
                  <span className="text-gray-400 p-2">3</span>
                  <span className="text-gray-400 p-2">4</span>
                  <span className="text-gray-400 p-2">5</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Full Attendance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Partial Attendance</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                <h4 className="font-semibold text-lg mb-4 text-blue-800">Top Performers</h4>
                <div className="space-y-3">
                  {MOCK_STUDENTS_FOR_CLASS.slice(0, 5).map((student, idx) => (
                    <div 
                      key={student.id} 
                      className="flex items-center justify-between p-3 bg-white rounded-xl hover:scale-105 hover:shadow-md transition-all duration-300 animate-fade-in-stagger"
                      style={{ animationDelay: `${idx * 80}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-blue-600">#{idx + 1}</div>
                        <div>
                          <p className="font-medium text-gray-800">{student.name}</p>
                          <p className="text-xs text-gray-500">Avg: {95 - idx}%</p>
                        </div>
                      </div>
                      <Award size={20} className="text-blue-500" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                <h4 className="font-semibold text-lg mb-4 text-blue-800">Recent Test Results</h4>
                <div className="space-y-3">
                  {['Physics Quiz', 'Math Assignment', 'Science Test', 'English Essay'].map((test, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 bg-white rounded-xl hover:scale-105 transition-all duration-300 animate-fade-in-stagger"
                      style={{ animationDelay: `${idx * 80}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">{test}</span>
                        <span className="text-sm text-gray-500">Avg: {88 - idx * 2}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${88 - idx * 2}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                <h4 className="font-semibold text-lg mb-4 text-blue-800">Assignment Completion Rate</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['This Week', 'Last Week', 'This Month', 'Overall'].map((period, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 bg-white rounded-xl text-center hover:scale-110 hover:shadow-lg transition-all duration-300 animate-fade-in-stagger"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <p className="text-sm text-gray-600 mb-2">{period}</p>
                      <p className="text-3xl font-bold text-blue-600">{95 - idx * 3}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Student Profile Modal */}
      {isProfileModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl my-8 animate-slide-up-modal">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-3xl relative">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:rotate-90 hover:scale-110"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30 animate-scale-in">
                  <span className="text-3xl font-bold">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                  <p className="text-blue-100">{selectedStudent.rollNumber} • {selectedStudent.grade}</p>
                  <p className="text-sm text-blue-100 mt-1">Enrolled: {selectedStudent.enrollmentDate}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Contact Info */}
                <div className="space-y-4">
                  <div className="p-5 bg-blue-50 rounded-2xl hover:scale-105 transition-all duration-300 animate-fade-in-stagger" style={{ animationDelay: '0ms' }}>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Users size={20} className="text-blue-600" />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail size={18} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-medium text-gray-800">{selectedStudent.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone size={18} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-medium text-gray-800">{selectedStudent.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm font-medium text-gray-800">{selectedStudent.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-green-50 rounded-2xl hover:scale-105 transition-all duration-300 animate-fade-in-stagger" style={{ animationDelay: '100ms' }}>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Users size={20} className="text-blue-600" />
                      Parent/Guardian
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="text-sm font-medium text-gray-800">{selectedStudent.parentName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-800">{selectedStudent.parentEmail}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-800">{selectedStudent.parentPhone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-orange-50 rounded-2xl hover:scale-105 transition-all duration-300 animate-fade-in-stagger" style={{ animationDelay: '200ms' }}>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Calendar size={20} className="text-blue-600" />
                      Attendance
                    </h3>
                    <div className="text-center mb-3">
                      <p className="text-4xl font-bold text-blue-600">{selectedStudent.attendance.percentage}%</p>
                      <p className="text-sm text-gray-600">Overall Attendance</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Present</span>
                        <span className="font-semibold text-blue-600">{selectedStudent.attendance.present} days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Absent</span>
                        <span className="font-semibold text-blue-600">{selectedStudent.attendance.absent} days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total</span>
                        <span className="font-semibold text-gray-800">{selectedStudent.attendance.total} days</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Academic Info */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="p-5 bg-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <GraduationCap size={20} className="text-blue-600" />
                      Academic Performance
                    </h3>
                    <div className="space-y-3">
                      {selectedStudent.grades.map((grade, idx) => (
                        <div 
                          key={idx} 
                          className="p-3 bg-white rounded-xl hover:scale-102 transition-all duration-300 animate-fade-in-stagger"
                          style={{ animationDelay: `${idx * 80}ms` }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">{grade.subject}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-500">{grade.score}%</span>
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                grade.grade.startsWith('A') 
                                  ? 'bg-green-100 text-blue-700' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {grade.grade}
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${grade.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-2xl hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <BookOpen size={20} className="text-blue-600" />
                      Enrolled Subjects
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.subjects.map((subject, idx) => (
                        <span 
                          key={idx} 
                          className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-blue-200 hover:scale-110 hover:bg-blue-100 transition-all duration-300 animate-fade-in-stagger"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Clock size={20} className="text-gray-600" />
                      Recent Activities
                    </h3>
                    <div className="space-y-2">
                      {selectedStudent.recentActivities.map((activity, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 p-3 bg-white rounded-xl hover:scale-102 transition-all duration-300 animate-fade-in-stagger"
                          style={{ animationDelay: `${idx * 80}ms` }}
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{activity.activity}</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
              <button className="flex-1 py-2 px-4 bg-blue-100 text-blue-600 font-medium rounded-xl hover:bg-blue-200 hover:scale-105 transition-all duration-300">
                Send Message
              </button>
              <button className="flex-1 py-2 px-4 bg-[#2F69FF] text-white font-medium rounded-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slide-up-modal {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-stagger {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }

        .animate-slide-up-modal {
          animation: slide-up-modal 0.5s ease-out forwards;
        }

        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.5s ease-out forwards;
          opacity: 0;
        }

        .hover:scale-102:hover {
          transform: scale(1.02);
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default ClassesPage;
