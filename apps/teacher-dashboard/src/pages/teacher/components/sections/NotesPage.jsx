// Notes Page component 
import React, { useState, useEffect, useRef } from 'react';
import { Upload, Edit, Trash, FileText } from 'lucide-react';
import { MOCK_NOTES } from '../../data/mockData';


const NotesPage = () => {
  const [view, setView] = useState("upload");
  const [uploadedNotes, setUploadedNotes] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set([0]));
  const [formData, setFormData] = useState({
    title: '',
    className: '',
    description: '',
    file: null
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

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('uploadedNotes');
      if (savedNotes) {
        const parsed = JSON.parse(savedNotes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUploadedNotes(parsed);
        } else {
          setUploadedNotes(MOCK_NOTES);
        }
      } else {
        setUploadedNotes(MOCK_NOTES);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
      setUploadedNotes(MOCK_NOTES);
    }
  }, []);

  // Save to localStorage when notes change
  useEffect(() => {
    try {
      if (uploadedNotes.length > 0) {
        localStorage.setItem('uploadedNotes', JSON.stringify(uploadedNotes));
      }
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  }, [uploadedNotes]);

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
    
    if (!formData.title || !formData.className || !formData.file) {
      alert('Please fill all required fields');
      return;
    }

    const existingSubjectIndex = uploadedNotes.findIndex(
      note => note.subject === formData.className
    );

    if (existingSubjectIndex !== -1) {
      const updatedNotes = [...uploadedNotes];
      updatedNotes[existingSubjectIndex].topics.push(formData.title);
      setUploadedNotes(updatedNotes);
    } else {
      const newNote = {
        id: Date.now(),
        subject: formData.className,
        topics: [formData.title]
      };
      setUploadedNotes([...uploadedNotes, newNote]);
    }

    setFormData({
      title: '',
      className: '',
      description: '',
      file: null
    });

    alert('Note uploaded successfully!');
  };

  const handleDelete = (subjectId, topicToDelete) => {
    const updatedNotes = uploadedNotes.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          topics: subject.topics.filter(topic => topic !== topicToDelete)
        };
      }
      return subject;
    }).filter(subject => subject.topics.length > 0);

    setUploadedNotes(updatedNotes);
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
          Upload New Note
        </button>
        <button
          onClick={() => setView("view")}
          className={`py-2 px-5 font-medium rounded-3xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            view === "view" 
              ? "bg-[#2F69FF] text-white" 
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          View Previously Added Notes
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
            <h3 className="text-lg font-semibold mb-4">Upload New Note</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="animate-fade-in-stagger" style={{ animationDelay: '0ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500"></span>
                </label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                  placeholder="e.g. Algebra Basics"
                  required
                />
              </div>
              <div className="animate-fade-in-stagger" style={{ animationDelay: '100ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class/Subject <span className="text-red-500"></span>
                </label>
                <select 
                  name="className"
                  value={formData.className}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
              <div className="animate-fade-in-stagger" style={{ animationDelay: '200ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                  rows="3" 
                  placeholder="Add a short description..."
                ></textarea>
              </div>
              <div className="animate-fade-in-stagger" style={{ animationDelay: '300ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload File <span className="text-red-500"></span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-3xl hover:border-blue-400 transition-all duration-300 hover:scale-102">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 transition-transform duration-300 hover:scale-110" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-[#2F69FF] hover:text-blue-700">
                        <span>Upload a file</span>
                        <input 
                          type="file" 
                          className="sr-only" 
                          accept=".pdf,.docx,.pptx"
                          onChange={handleFileChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOCX, PPTX (Max 10MB)</p>
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
                className="w-full py-2 px-6 bg-[#2F69FF] text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 animate-fade-in-stagger"
                style={{ animationDelay: '400ms' }}
              >
                Upload Note
              </button>
            </form>
          </div>

          {/* Previously Added Notes - Right Side */}
          <div className="p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4">Previously Added Notes</h3>
            {uploadedNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400 animate-fade-in">
                <FileText size={64} className="mb-4 animate-bounce-slow" />
                <p className="text-lg font-medium">No notes uploaded yet</p>
                <p className="text-sm">Upload your first note to get started</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                {uploadedNotes.map((subject, idx) => (
                  <div 
                    key={subject.id} 
                    className="p-4 rounded-2xl shadow-sm bg-blue-50 hover:shadow-md hover:scale-102 transition-all duration-300 animate-fade-in-stagger"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <h4 className="font-semibold text-base mb-3 text-gray-800">{subject.subject}</h4>
                    <div className="space-y-2">
                      {subject.topics.map((topic, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-white rounded-2xl hover:shadow-sm hover:scale-102 transition-all duration-300"
                        >
                          <span className="text-sm font-medium text-gray-700">{topic}</span>
                          <div className="flex gap-2">
                            <button className="text-blue-500 hover:text-blue-700 transition-all duration-300 hover:scale-110 hover:rotate-12">
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(subject.id, topic)}
                              className="text-blue-500 hover:text-red-600 transition-all duration-300 hover:scale-110 hover:rotate-12"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* View Notes View - Full Width */}
      {view === "view" && (
        <div 
          ref={(el) => (sectionRefs.current[1] = el)}
          className={`p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-1000 ease-out ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Previously Added Notes</h3>
          {uploadedNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 animate-fade-in">
              <FileText size={80} className="mb-4 animate-bounce-slow" />
              <p className="text-xl font-medium">No notes uploaded yet</p>
              <p className="text-sm mt-2">Click "Upload New Note" to add your first note</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {uploadedNotes.map((subject, idx) => (
                <div 
                  key={subject.id} 
                  className="p-5 rounded-3xl shadow-sm bg-blue-50 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-700 ease-out animate-fade-in-stagger"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <h4 className="font-semibold text-lg mb-3">{subject.subject}</h4>
                  <div className="space-y-2">
                    {subject.topics.map((topic, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 bg-white rounded-3xl hover:shadow-md hover:scale-102 transition-all duration-300"
                      >
                        <span className="text-sm font-medium text-gray-700">{topic}</span>
                        <div className="flex gap-2">
                          <button className="text-blue-500 hover:text-blue-700 transition-all duration-300 hover:scale-110 hover:rotate-12">
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(subject.id, topic)}
                            className="text-blue-500 hover:text-red-600 transition-all duration-300 hover:scale-110 hover:rotate-12"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
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

export default NotesPage;
