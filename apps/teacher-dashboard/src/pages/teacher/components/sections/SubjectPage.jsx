import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Plus, Edit, Trash, Users, FileText, Clock, TrendingUp, X, Calendar, Award, CheckCircle, Target } from 'lucide-react';


const MOCK_SUBJECTS = [
  { 
    id: 1, 
    name: "Mathematics", 
    grade: "Grade 9-10",
    students: 85,
    topics: 12,
    nextClass: "Today, 2:00 PM",
    completion: 65,
    color: "bg-blue-100 text-blue-800",
    description: "Comprehensive mathematics curriculum covering algebra, geometry, and calculus",
    syllabus: [
      { topic: "Algebra Basics", completed: true, duration: "2 weeks" },
      { topic: "Linear Equations", completed: true, duration: "3 weeks" },
      { topic: "Quadratic Equations", completed: true, duration: "2 weeks" },
      { topic: "Geometry Fundamentals", completed: false, duration: "4 weeks" },
      { topic: "Trigonometry", completed: false, duration: "3 weeks" },
      { topic: "Calculus Introduction", completed: false, duration: "5 weeks" }
    ],
    recentTests: [
      { name: "Mid-Term Exam", date: "Nov 15, 2025", avgScore: 78 },
      { name: "Algebra Quiz", date: "Nov 22, 2025", avgScore: 85 },
      { name: "Geometry Test", date: "Nov 28, 2025", avgScore: 72 }
    ],
    assignments: [
      { title: "Homework Set 5", dueDate: "Dec 5, 2025", submitted: 72, total: 85 },
      { title: "Problem Solving", dueDate: "Dec 8, 2025", submitted: 45, total: 85 },
      { title: "Project Work", dueDate: "Dec 15, 2025", submitted: 12, total: 85 }
    ],
    topStudents: [
      { name: "Sarah Johnson", score: 95 },
      { name: "Michael Chen", score: 93 },
      { name: "Emily Davis", score: 91 }
    ]
  },
  { 
    id: 2, 
    name: "Physics", 
    grade: "Grade 11-12",
    students: 62,
    topics: 10,
    nextClass: "Tomorrow, 10:00 AM",
    completion: 45,
    color: "bg-blue-100 text-blue-800",
    description: "Advanced physics covering mechanics, thermodynamics, and electromagnetism",
    syllabus: [
      { topic: "Classical Mechanics", completed: true, duration: "4 weeks" },
      { topic: "Thermodynamics", completed: true, duration: "3 weeks" },
      { topic: "Waves and Optics", completed: false, duration: "3 weeks" },
      { topic: "Electromagnetism", completed: false, duration: "5 weeks" }
    ],
    recentTests: [
      { name: "Mechanics Test", date: "Nov 10, 2025", avgScore: 82 },
      { name: "Thermodynamics Quiz", date: "Nov 25, 2025", avgScore: 76 }
    ],
    assignments: [
      { title: "Lab Report 3", dueDate: "Dec 3, 2025", submitted: 58, total: 62 },
      { title: "Problem Set 4", dueDate: "Dec 10, 2025", submitted: 32, total: 62 }
    ],
    topStudents: [
      { name: "Alex Kumar", score: 94 },
      { name: "Lisa Wang", score: 92 },
      { name: "David Park", score: 89 }
    ]
  },
  { 
    id: 3, 
    name: "Chemistry", 
    grade: "Grade 11",
    students: 54,
    topics: 8,
    nextClass: "Friday, 11:00 AM",
    completion: 38,
    color: "bg-blue-100 text-blue-800",
    description: "Organic and inorganic chemistry with laboratory practicals",
    syllabus: [
      { topic: "Atomic Structure", completed: true, duration: "2 weeks" },
      { topic: "Chemical Bonding", completed: true, duration: "3 weeks" },
      { topic: "Organic Chemistry", completed: false, duration: "4 weeks" },
      { topic: "Reactions & Equations", completed: false, duration: "3 weeks" }
    ],
    recentTests: [
      { name: "Bonding Test", date: "Nov 20, 2025", avgScore: 80 }
    ],
    assignments: [
      { title: "Lab Experiment 2", dueDate: "Dec 6, 2025", submitted: 48, total: 54 }
    ],
    topStudents: [
      { name: "Rachel Green", score: 96 },
      { name: "Tom Martinez", score: 91 },
      { name: "Sophie Lee", score: 88 }
    ]
  },
  { 
    id: 4, 
    name: "Biology", 
    grade: "Grade 10",
    students: 72,
    topics: 15,
    nextClass: "Monday, 9:00 AM",
    completion: 52,
    color: "bg-blue-100 text-blue-800",
    description: "Life sciences covering cell biology, genetics, and ecology",
    syllabus: [
      { topic: "Cell Structure", completed: true, duration: "2 weeks" },
      { topic: "Genetics Basics", completed: true, duration: "3 weeks" },
      { topic: "Evolution", completed: true, duration: "2 weeks" },
      { topic: "Ecology", completed: false, duration: "4 weeks" },
      { topic: "Human Anatomy", completed: false, duration: "5 weeks" }
    ],
    recentTests: [
      { name: "Genetics Quiz", date: "Nov 18, 2025", avgScore: 84 },
      { name: "Cell Biology Test", date: "Nov 27, 2025", avgScore: 79 }
    ],
    assignments: [
      { title: "Research Paper", dueDate: "Dec 4, 2025", submitted: 65, total: 72 },
      { title: "Lab Report", dueDate: "Dec 12, 2025", submitted: 38, total: 72 }
    ],
    topStudents: [
      { name: "Nina Patel", score: 97 },
      { name: "Chris Brown", score: 94 },
      { name: "Amy Wilson", score: 92 }
    ]
  },
];


const SubjectPage = () => {
  const [subjects, setSubjects] = useState(MOCK_SUBJECTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set([0])); // Header always visible
  const [newSubject, setNewSubject] = useState({
    name: '',
    grade: '',
    students: 0,
    topics: 0
  });

  const sectionRefs = useRef([]);

  // Bidirectional Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15, // Trigger when 15% of element is visible
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };

    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add element to visible set when it enters viewport (scroll down or up)
              setTimeout(() => {
                setVisibleSections((prev) => new Set([...prev, index]));
              }, 50);
            } else {
              // Remove element from visible set when it exits viewport (except header)
              if (index !== 0) { // Keep header always visible
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
  }, [subjects.length]);

  const handleAddSubject = (e) => {
    e.preventDefault();
    const subject = {
      id: subjects.length + 1,
      ...newSubject,
      nextClass: "Not scheduled",
      completion: 0,
      color: "bg-blue-100 text-blue-800",
      description: "No description provided",
      syllabus: [],
      recentTests: [],
      assignments: [],
      topStudents: []
    };
    setSubjects([...subjects, subject]);
    setIsAddModalOpen(false);
    setNewSubject({ name: '', grade: '', students: 0, topics: 0 });
  };

  const handleDeleteSubject = (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const handleViewDetails = (subject) => {
    setSelectedSubject(subject);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        ref={(el) => (sectionRefs.current[0] = el)}
        className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-1000 ease-out ${
          visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Subjects</h2>
          <p className="text-gray-600">Manage your teaching subjects and curriculum</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 py-2 px-5 bg-[#2F69FF] text-white font-medium rounded-3xl shadow-md hover:bg-blue-700 hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          <Plus size={20} />
          Add New Subject
        </button>
      </div>

      {/* Summary Stats */}
      <div 
        ref={(el) => (sectionRefs.current[1] = el)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {[
          { icon: BookOpen, label: "Total Subjects", value: subjects.length },
          { icon: Users, label: "Total Students", value: subjects.reduce((sum, s) => sum + s.students, 0) },
          { icon: FileText, label: "Total Topics", value: subjects.reduce((sum, s) => sum + s.topics, 0) },
          { icon: TrendingUp, label: "Avg Completion", value: `${Math.round(subjects.reduce((sum, s) => sum + s.completion, 0) / subjects.length)}%` }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx}
              className={`p-5 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-700 ease-out ${
                visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: visibleSections.has(1) ? `${idx * 100}ms` : `${(3 - idx) * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                  <Icon className="text-blue-500" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subjects Grid */}
      <div 
        ref={(el) => (sectionRefs.current[2] = el)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {subjects.map((subject, idx) => (
          <div 
            key={subject.id} 
            className={`p-6 bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-700 ease-out group ${
              visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: visibleSections.has(2) ? `${idx * 100}ms` : `${Math.max(0, (subjects.length - 1 - idx) * 80)}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`px-3 py-1 rounded-full ${subject.color} font-medium text-sm transition-all duration-300 group-hover:scale-110`}>
                {subject.grade}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSubject(subject)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-12"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteSubject(subject.id)}
                  className="p-2 text-blue-500 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-12"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{subject.name}</h3>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm transform transition-transform duration-300 group-hover:translate-x-1">
                <span className="text-gray-600 flex items-center gap-2">
                  <Users size={16} className="group-hover:text-blue-500 transition-colors" />
                  Students
                </span>
                <span className="font-semibold text-gray-800">{subject.students}</span>
              </div>
              <div className="flex items-center justify-between text-sm transform transition-transform duration-300 group-hover:translate-x-1">
                <span className="text-gray-600 flex items-center gap-2">
                  <FileText size={16} className="group-hover:text-blue-500 transition-colors" />
                  Topics Covered
                </span>
                <span className="font-semibold text-gray-800">{subject.topics}</span>
              </div>
              <div className="flex items-center justify-between text-sm transform transition-transform duration-300 group-hover:translate-x-1">
                <span className="text-gray-600 flex items-center gap-2">
                  <Clock size={16} className="group-hover:text-blue-500 transition-colors" />
                  Next Class
                </span>
                <span className="font-semibold text-gray-800">{subject.nextClass}</span>
              </div>
            </div>

            {/* Progress Bar with animation */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Curriculum Progress</span>
                <span className="font-semibold text-gray-800">{subject.completion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#2F69FF] h-2 rounded-full transition-all duration-1000 ease-out group-hover:bg-blue-600"
                  style={{ width: visibleSections.has(2) ? `${subject.completion}%` : '0%' }}
                ></div>
              </div>
            </div>

            <button 
              onClick={() => handleViewDetails(subject)}
              className="w-full py-2 px-4 bg-blue-50 text-[#2F69FF] font-medium rounded-3xl hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Add Subject Modal with fade-in animation */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 animate-scale-in">
            <h3 className="text-lg font-semibold mb-4">Add New Subject</h3>
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                <input
                  type="text"
                  required
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="e.g., Mathematics"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade/Level</label>
                <input
                  type="text"
                  required
                  value={newSubject.grade}
                  onChange={(e) => setNewSubject({...newSubject, grade: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="e.g., Grade 9-10"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Students</label>
                  <input
                    type="number"
                    required
                    value={newSubject.students}
                    onChange={(e) => setNewSubject({...newSubject, students: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topics</label>
                  <input
                    type="number"
                    required
                    value={newSubject.topics}
                    onChange={(e) => setNewSubject({...newSubject, topics: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-[#2F69FF] text-white font-medium rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                >
                  Add Subject
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2 px-4 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 hover:scale-105 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subject Details Modal with slide-up animation */}
      {isDetailsModalOpen && selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto animate-fade-in">
          <div className="relative top-10 bg-white rounded-3xl shadow-xl w-full max-w-4xl my-8 animate-slide-up-modal">
            {/* Modal Header */}
            <div className={`${selectedSubject.color.replace('text', 'bg').replace('100', '500')} text-white p-6 rounded-t-3xl relative`}>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="absolute top-6 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:rotate-90 hover:scale-110"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-2 text-white/90">{selectedSubject.name}</h2>
              <p className="text-white/90">{selectedSubject.grade} • {selectedSubject.students} Students</p>
              <p className="text-sm text-white/80 mt-2">{selectedSubject.description}</p>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Topics", value: selectedSubject.topics },
                  { label: "Completion", value: `${selectedSubject.completion}%` },
                  { label: "Next Class", value: selectedSubject.nextClass, small: true },
                  { label: "Students", value: selectedSubject.students }
                ].map((stat, idx) => (
                  <div 
                    key={idx}
                    className="p-4 bg-blue-50 rounded-2xl text-center hover:bg-blue-100 hover:scale-105 transition-all duration-300 animate-fade-in-stagger"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className={`${stat.small ? 'text-sm' : 'text-2xl'} font-bold text-blue-600`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Syllabus */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Target size={20} className="text-blue-600" />
                    Course Syllabus
                  </h3>
                  <div className="space-y-2">
                    {selectedSubject.syllabus && selectedSubject.syllabus.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3 rounded-xl ${item.completed ? 'bg-blue-50 border border-blue-200' : 'bg-blue-50 border border-gray-200'} hover:scale-102 hover:shadow-md transition-all duration-300 animate-fade-in-stagger`}
                        style={{ animationDelay: `${idx * 80}ms` }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            {item.completed ? (
                              <CheckCircle size={18} className="text-blue-600 mt-0.5 animate-bounce-once" />
                            ) : (
                              <div className="w-4 h-4 border-2 border-gray-400 rounded-full mt-0.5"></div>
                            )}
                            <div>
                              <p className={`font-medium ${item.completed ? 'text-blue-800' : 'text-gray-800'}`}>
                                {item.topic}
                              </p>
                              <p className="text-xs text-gray-500">{item.duration}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Students */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Award size={20} className="text-blue-600" />
                    Top Performers
                  </h3>
                  <div className="space-y-2">
                    {selectedSubject.topStudents && selectedSubject.topStudents.map((student, idx) => (
                      <div 
                        key={idx} 
                        className="p-3 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-100 hover:scale-105 transition-all duration-300 animate-fade-in-stagger"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center font-bold text-white hover:bg-blue-600 transition-colors">
                              {idx + 1}
                            </div>
                            <p className="font-medium text-gray-800">{student.name}</p>
                          </div>
                          <p className="text-lg font-bold text-blue-600">{student.score}%</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Tests */}
                  <h3 className="text-lg font-semibold flex items-center gap-2 mt-6">
                    <FileText size={20} className="text-blue-600" />
                    Recent Tests
                  </h3>
                  <div className="space-y-2">
                    {selectedSubject.recentTests && selectedSubject.recentTests.map((test, idx) => (
                      <div 
                        key={idx} 
                        className="p-3 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 hover:scale-105 transition-all duration-300 animate-fade-in-stagger"
                        style={{ animationDelay: `${(idx + 3) * 100}ms` }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-800">{test.name}</p>
                          <p className="text-sm font-bold text-blue-600">{test.avgScore}%</p>
                        </div>
                        <p className="text-xs text-gray-500">{test.date}</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${test.avgScore}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assignments */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Calendar size={20} className="text-blue-600" />
                  Active Assignments
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedSubject.assignments && selectedSubject.assignments.map((assignment, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in-stagger"
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <p className="font-medium text-gray-800 mb-2">{assignment.title}</p>
                      <p className="text-xs text-gray-500 mb-3">Due: {assignment.dueDate}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Submitted</span>
                        <span className="font-bold text-blue-600">
                          {assignment.submitted}/{assignment.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
              <button className="flex-1 py-2 px-4 bg-[#2F69FF] text-white font-medium rounded-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                Edit Subject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-up-modal {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-stagger {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-once {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
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

        .animate-bounce-once {
          animation: bounce-once 0.6s ease-in-out;
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

export default SubjectPage;
