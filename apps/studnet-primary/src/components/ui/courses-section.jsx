import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { getAllCourses } from '../../lib/api';
import { Loader2, BookOpen, AlertCircle } from 'lucide-react';

export const CoursesSection = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Extract studentId from URL query params, default to STU003 as specified
        const searchParams = new URLSearchParams(window.location.search);
        const studentId = searchParams.get('studentId') || 'STU003';

        const data = await getAllCourses(studentId);
        setCourses(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className={`h-12 w-12 animate-spin mb-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
        <p className={`text-lg transition-colors duration-200 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Discovering your courses...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <p className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <BookOpen className={`h-16 w-16 mb-4 ${isDark ? 'text-gray-700' : 'text-gray-200'}`} />
        <p className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No Courses Found</p>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          We couldn't find any courses for your level at this time.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full h-full flex flex-col">
      <div className="flex-1 w-full p-0">
        <div className="pt-4 pb-8 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.courseId || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`
                                rounded-[24px] shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col
                                ${isDark
                  ? 'bg-[#181B21] border border-[#232730]'
                  : 'bg-white border border-gray-100'
                }
                            `}
            >
              {/* Course Image */}
              <div className={`bg-gray-100 h-44 flex items-center justify-center overflow-hidden`}>
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/img/sub1.png'; // Fallback
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <BookOpen size={48} />
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className={`text-lg font-bold mb-2 line-clamp-2 leading-tight ${isDark ? 'text-[#FFFFFF]' : 'text-gray-900'
                  }`}>
                  {course.title}
                </h3>

                {course.university && (
                  <p className={`text-sm mb-3 font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    {course.university}
                  </p>
                )}

                <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {course.description || "Learn more about this exciting course."}
                </p>

                <div className="space-y-2 mt-auto">
                  <div className="pt-4">
                    <button
                      onClick={() => navigate(`/courses-detail/${course.courseId}`)}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

