// Exams Page component 
import React, { useState, useEffect, useRef } from 'react';
import { FileEdit, Edit, ClipboardList, Users } from 'lucide-react';
import { MOCK_EXAMS } from '../../data/mockData';


const ExamsPage = () => {
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [pastExams, setPastExams] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set([0]));
  const [formData, setFormData] = useState({
    title: '',
    className: '',
    startDate: '',
    startTime: ''
  });

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

  // Load exams on mount
  useEffect(() => {
    try {
      const savedUpcoming = localStorage.getItem('upcomingExams');
      const savedPast = localStorage.getItem('pastExams');

      setUpcomingExams(
        savedUpcoming
          ? JSON.parse(savedUpcoming)
          : MOCK_EXAMS.filter(e => e.type === 'upcoming')
      );

      setPastExams(
        savedPast
          ? JSON.parse(savedPast)
          : MOCK_EXAMS.filter(e => e.type === 'past')
      );

    } catch (error) {
      console.error('Error loading exams:', error);
      setUpcomingExams(MOCK_EXAMS.filter(e => e.type === 'upcoming'));
      setPastExams(MOCK_EXAMS.filter(e => e.type === 'past'));
    }
  }, []);

  // Save upcoming exams
  useEffect(() => {
    if (upcomingExams.length > 0) {
      localStorage.setItem('upcomingExams', JSON.stringify(upcomingExams));
    }
  }, [upcomingExams]);

  // Save past exams
  useEffect(() => {
    if (pastExams.length > 0) {
      localStorage.setItem('pastExams', JSON.stringify(pastExams));
    }
  }, [pastExams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.className || !formData.startDate || !formData.startTime) {
      alert('Please fill all fields');
      return;
    }

    const newExam = {
      id: Date.now(),
      title: formData.title,
      className: formData.className,
      date: `${formData.startDate} at ${formData.startTime}`,
      type: 'upcoming'
    };

    setUpcomingExams([...upcomingExams, newExam]);

    setFormData({
      title: '',
      className: '',
      startDate: '',
      startTime: ''
    });

    alert('Exam scheduled successfully!');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveExamForReport = (exam) => {
    localStorage.setItem('selectedExam', JSON.stringify(exam));
  };

  const totalExams = upcomingExams.length + pastExams.length;
  const totalStudents = 150;

  return (
    <div className="space-y-6">

      {/* Statistics */}
      <div 
        ref={(el) => (sectionRefs.current[0] = el)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { 
            icon: ClipboardList, 
            label: 'Total Exams', 
            value: totalExams, 
            subtitle: `${upcomingExams.length} Upcoming • ${pastExams.length} Past`
          },
          { 
            icon: Users, 
            label: 'Total Students', 
            value: totalStudents, 
            subtitle: 'Across all classes'
          }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx}
              className={`p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl shadow-lg text-white hover:scale-105 hover:shadow-2xl transition-all duration-700 ease-out ${
                visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
              style={{ transitionDelay: visibleSections.has(0) ? `${idx * 100}ms` : `${(1 - idx) * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-4xl font-bold">{stat.value}</p>
                  <p className="text-blue-100 text-sm mt-2">{stat.subtitle}</p>
                </div>
                <div className="p-4 bg-white/20 rounded-2xl transition-all duration-300 hover:bg-white/30 hover:scale-110">
                  <Icon size={40} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Section */}
      <div 
        ref={(el) => (sectionRefs.current[1] = el)}
        className={`flex flex-col md:flex-row gap-6 transition-all duration-1000 ease-out ${
          visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >

        {/* Schedule New Exam */}
        <div className="flex-1 p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold mb-4">Schedule New Exam</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0ms' }}>
              <label className="block text-sm font-medium">Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Mid-Term Physics"
                required
              />
            </div>

            <div className="animate-fade-in-stagger" style={{ animationDelay: '100ms' }}>
              <label className="block text-sm font-medium">Class/Subject</label>
              <select 
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              >
                <option value="">Select Class</option>
                <option value="Class 9 Physics">Class 9 Physics</option>
                <option value="Class 7 Biology">Class 7 Biology</option>
                <option value="Class 10 Mathematics">Class 10 Mathematics</option>
                <option value="Class 8 Chemistry">Class 8 Chemistry</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-stagger" style={{ animationDelay: '200ms' }}>
              <div>
                <label className="block text-sm font-medium">Start Date</label>
                <input 
                  type="date" 
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Start Time</label>
                <input 
                  type="time" 
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="py-2 px-6 bg-[#2F69FF] text-white rounded-3xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 animate-fade-in-stagger"
              style={{ animationDelay: '300ms' }}
            >
              Schedule Exam
            </button>
          </form>
        </div>

        {/* Upcoming Exams */}
        <div className="flex-1 p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold mb-4">Upcoming Exams</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {upcomingExams.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400 animate-fade-in">
                <ClipboardList size={48} className="mb-3 animate-bounce-slow" />
                <p className="text-sm">No upcoming exams</p>
              </div>
            ) : (
              upcomingExams.map((exam, idx) => (
                <div 
                  key={exam.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md hover:scale-102 transition-all duration-300 animate-fade-in-stagger"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 transition-all duration-300 hover:scale-110">
                      <FileEdit size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{exam.title}</p>
                      <p className="text-sm text-gray-500">{exam.className} | {exam.date}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110 hover:rotate-12">
                    <Edit size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Past Exams */}
      <div 
        ref={(el) => (sectionRefs.current[2] = el)}
        className={`p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-1000 ease-out ${
          visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <h3 className="text-lg font-semibold mb-4">Past Exams - Enter Marks</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium">Exam</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {pastExams.map((exam, idx) => (
                <tr 
                  key={exam.id} 
                  className="hover:bg-blue-50 transition-all duration-300 animate-fade-in-stagger"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <td className="px-6 py-4">{exam.title}</td>
                  <td className="px-6 py-4">{exam.className}</td>
                  <td className="px-6 py-4">{exam.date}</td>
                  <td className="px-6 py-4">
                    <a 
                      href="/ReportCardPage"
                      onClick={() => saveExamForReport(exam)}
                      className="inline-block py-1 px-4 bg-blue-100 text-[#2F69FF] rounded-lg hover:bg-blue-200 hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      Enter Marks
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-stagger {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
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

export default ExamsPage;
