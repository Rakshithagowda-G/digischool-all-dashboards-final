// Assignments Page component 
import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, FileText, Edit, Trash } from 'lucide-react';
import { MOCK_ASSIGNMENTS } from '../../data/mockData';


const AssignmentsPage = () => {
  const [view, setView] = useState("upload"); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadedAssignments, setUploadedAssignments] = useState([]);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set([0]));
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    className: '',
    description: '',
    file: null
  });
  const [gradeData, setGradeData] = useState({
    marks: ''
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
  }, [view]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedUploaded = localStorage.getItem('uploadedAssignments');
      const savedSubmitted = localStorage.getItem('submittedAssignments');
      
      if (savedUploaded) {
        const parsed = JSON.parse(savedUploaded);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUploadedAssignments(parsed);
        }
      }
      
      if (savedSubmitted) {
        const parsed = JSON.parse(savedSubmitted);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSubmittedAssignments(parsed);
        } else {
          setSubmittedAssignments(MOCK_ASSIGNMENTS);
        }
      } else {
        setSubmittedAssignments(MOCK_ASSIGNMENTS);
      }
    } catch (error) {
      console.error('Error loading assignments:', error);
      setSubmittedAssignments(MOCK_ASSIGNMENTS);
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    try {
      if (uploadedAssignments.length > 0) {
        localStorage.setItem('uploadedAssignments', JSON.stringify(uploadedAssignments));
      }
    } catch (error) {
      console.error('Error saving uploaded assignments:', error);
    }
  }, [uploadedAssignments]);

  useEffect(() => {
    try {
      if (submittedAssignments.length > 0) {
        localStorage.setItem('submittedAssignments', JSON.stringify(submittedAssignments));
      }
    } catch (error) {
      console.error('Error saving submitted assignments:', error);
    }
  }, [submittedAssignments]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setFormData({
        ...formData,
        file: file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.dueDate || !formData.className || !formData.file) {
      alert('Please fill all required fields');
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title: formData.title,
      dueDate: formData.dueDate,
      className: formData.className,
      description: formData.description,
      fileName: formData.file.name,
      uploadedOn: new Date().toLocaleDateString()
    };

    setUploadedAssignments([...uploadedAssignments, newAssignment]);
    
    setFormData({
      title: '',
      dueDate: '',
      className: '',
      description: '',
      file: null
    });

    alert('Assignment uploaded successfully!');
  };

  const handleDeleteUploaded = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setUploadedAssignments(uploadedAssignments.filter(a => a.id !== id));
    }
  };

  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
    setGradeData({ marks: '' });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
    setGradeData({ marks: '' });
  };

  const handleGradeSubmit = (action) => {
    if (action === 'accept') {
      if (!gradeData.marks || gradeData.marks < 0 || gradeData.marks > 100) {
        alert('Please enter valid marks (0-100)');
        return;
      }

      const updatedAssignments = submittedAssignments.map(a => 
        a.id === selectedAssignment.id 
          ? { ...a, status: `Reviewed - ${gradeData.marks}/100`, marks: gradeData.marks }
          : a
      );
      setSubmittedAssignments(updatedAssignments);
      alert('Assignment graded successfully!');
    } else {
      const updatedAssignments = submittedAssignments.map(a => 
        a.id === selectedAssignment.id 
          ? { ...a, status: 'Resubmission Required' }
          : a
      );
      setSubmittedAssignments(updatedAssignments);
      alert('Assignment rejected. Student will be notified for resubmission.');
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      {/* Tab Buttons */}
      <div 
        ref={(el) => (sectionRefs.current[0] = el)}
        className={`flex gap-4 transition-all duration-1000 ease-out ${
          visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <button
          onClick={() => setView("upload")}
          className={`py-2 px-5 font-medium rounded-3xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            view === "upload" 
              ? "bg-[#2F69FF] text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Upload New Assignments
        </button>
        <button
          onClick={() => setView("view")}
          className={`py-2 px-5 font-medium rounded-3xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            view === "view" 
              ? "bg-[#2F69FF] text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          View Submitted Assignments
        </button>
      </div>

      {/* Upload View - Split Layout */}
      {view === "upload" && (
        <div 
          ref={(el) => (sectionRefs.current[1] = el)}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 ease-out ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Upload Form */}
          <div className="p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4">Upload New Assignment</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="animate-fade-in-stagger" style={{ animationDelay: '0ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-blue-500"></span>
                </label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                  placeholder="e.g. Algebra Homework"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-stagger" style={{ animationDelay: '100ms' }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date <span className="text-blue-500"></span>
                  </label>
                  <input 
                    type="date" 
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class/Subject <span className="text-blue-500"></span>
                  </label>
                  <select 
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="Class 5 Math">Class 5 Math</option>
                    <option value="Class 6 Science">Class 6 Science</option>
                    <option value="Class 7 English">Class 7 English</option>
                    <option value="Class 8 History">Class 8 History</option>
                    <option value="Class 9 Physics">Class 9 Physics</option>
                    <option value="Class 10 Chemistry">Class 10 Chemistry</option>
                  </select>
                </div>
              </div>
              <div className="animate-fade-in-stagger" style={{ animationDelay: '200ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                  rows="3" 
                  placeholder="Add a description..."
                ></textarea>
              </div>
              <div className="animate-fade-in-stagger" style={{ animationDelay: '300ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attach File (Max 10MB) <span className="text-blue-500"></span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-2xl hover:border-blue-400 transition-all duration-300 hover:scale-102">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 transition-transform duration-300 hover:scale-110" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-[#2F69FF] hover:text-blue-700">
                        <span>Upload a file</span>
                        <input 
                          type="file" 
                          className="sr-only" 
                          accept=".zip,.pdf,.docx"
                          onChange={handleFileChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500"> PDF, DOCX up to 10MB</p>
                    {formData.file && (
                      <p className="text-sm text-blue-600 font-medium mt-2 animate-scale-in">
                        ✓ {formData.file.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-2 px-6 bg-[#2F69FF] text-white font-medium rounded-3xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 animate-fade-in-stagger"
                style={{ animationDelay: '400ms' }}
              >
                Upload Assignment
              </button>
            </form>
          </div>

          {/* Previously Uploaded Assignments - Right Side */}
          <div className="p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4">Previously Uploaded Assignments</h3>
            {uploadedAssignments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400 animate-fade-in">
                <FileText size={64} className="mb-4 animate-bounce-slow" />
                <p className="text-lg font-medium">No assignments uploaded yet</p>
                <p className="text-sm">Upload your first assignment to get started</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                {uploadedAssignments.map((assignment, idx) => (
                  <div 
                    key={assignment.id} 
                    className="p-4 bg-blue-50 rounded-2xl hover:scale-102 hover:shadow-md transition-all duration-300 animate-fade-in-stagger"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{assignment.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{assignment.className}</p>
                        <p className="text-xs text-gray-500 mt-1">Due: {assignment.dueDate}</p>
                        <p className="text-xs text-gray-500">Uploaded: {assignment.uploadedOn}</p>
                        {assignment.description && (
                          <p className="text-sm text-gray-600 mt-2">{assignment.description}</p>
                        )}
                        <p className="text-xs text-blue-600 mt-1"> {assignment.fileName}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="text-blue-500 hover:text-blue-700 transition-all duration-300 hover:scale-110 hover:rotate-12">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteUploaded(assignment.id)}
                          className="text-blue-500 hover:text-blue-600 transition-all duration-300 hover:scale-110 hover:rotate-12"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* View Submissions View */}
      {view === "view" && (
        <div 
          ref={(el) => (sectionRefs.current[1] = el)}
          className={`p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-1000 ease-out ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Submitted Assignments</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class/Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submittedAssignments.map((asm, idx) => (
                  <tr 
                    key={asm.id} 
                    className="hover:bg-blue-50 transition-all duration-300 animate-fade-in-stagger"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asm.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asm.className}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asm.submittedOn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        asm.status === 'Pending Review' 
                          ? 'bg-blue-100 text-blue-800' 
                          : asm.status.startsWith('Reviewed') 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {asm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(asm)}
                        className="text-[#2F69FF] hover:text-blue-700 font-medium hover:scale-110 transition-all duration-300"
                      >
                        {asm.status === 'Pending Review' ? 'Grade' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grading Modal */}
      {isModalOpen && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 relative animate-slide-up-modal">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-300 hover:rotate-90 hover:scale-110"
            >
              <X size={24} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Grade Assignment</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center animate-scale-in">
                <FileText size={48} className="text-blue-600" />
              </div>
            </div>
            <div className="text-center mb-4">
              <p className="font-medium text-lg">{selectedAssignment.studentName}</p>
              <p className="text-sm text-gray-500">{selectedAssignment.className}</p>
              <p className="text-sm text-gray-500">Submitted: {selectedAssignment.submittedOn}</p>
              <a href="#" className="text-sm text-[#2F69FF] hover:underline mt-2 inline-block">
                 {selectedAssignment.file || 'assignment.pdf'}
              </a>
            </div>
            {selectedAssignment.status === 'Pending Review' && (
              <div className="mb-4 animate-fade-in-stagger" style={{ animationDelay: '100ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marks (0-100) <span className="text-blue-500"></span>
                </label>
                <input 
                  type="number" 
                  min="0"
                  max="100"
                  value={gradeData.marks}
                  onChange={(e) => setGradeData({ marks: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                  placeholder="Enter marks"
                />
              </div>
            )}
            {selectedAssignment.status.startsWith('Reviewed') && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg text-center animate-scale-in">
                <p className="text-sm text-gray-600">Grade</p>
                <p className="text-2xl font-bold text-blue-600">{selectedAssignment.marks}/100</p>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {selectedAssignment.status === 'Pending Review' ? (
                <>
                  <button
                    onClick={() => handleGradeSubmit('accept')}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
                  >
                    Accept & Grade
                  </button>
                  <button
                    onClick={() => handleGradeSubmit('reject')}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-300"
                  >
                    Reject & Ask for Resubmission
                  </button>
                </>
              ) : (
                <button
                  onClick={closeModal}
                  className="w-full py-2 px-4 bg-[#2F69FF] text-white font-medium rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                >
                  Close
                </button>
              )}
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

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
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

export default AssignmentsPage;
