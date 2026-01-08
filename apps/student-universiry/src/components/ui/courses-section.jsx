import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCourses } from "@/lib/api";
import { Loader2, AlertCircle } from "lucide-react";
import { useDarkMode } from "@/contexts/DarkModeContext";

export const CoursesSection = () => {
  const { darkMode } = useDarkMode();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(window.location.search);
        const studentId = searchParams.get('studentId') || 'STU001';
        const response = await getAllCourses(studentId);
        setCourses(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full h-full flex flex-col gap-6">
      <div className="px-2" />

      {error && (
        <div className={`flex flex-col items-center justify-center p-12 rounded-[40px] shadow-sm ${darkMode ? 'bg-[#111c44]' : 'bg-white'}`}>
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>{error}</p>
        </div>
      )}

      {!error && (
        <div className="relative flex-1 w-full rounded-[40px] p-4 md:p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20">
              <Loader2 className="w-12 h-12 animate-spin text-[#1D8CF8] mb-4" />
              <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className={`flex flex-col items-center justify-center p-20 rounded-[32px] border border-dashed ${darkMode ? 'bg-[#111c44] border-gray-700' : 'bg-white border-slate-300'}`}>
              <AlertCircle className="w-12 h-12 text-slate-300 mb-4" />
              <p className={`font-medium text-lg ${darkMode ? 'text-gray-300' : 'text-slate-500'}`}>No courses available</p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>Check back later for new content</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses.map((course) => (
                <article
                  key={course.courseId || course.id}
                  className={`rounded-[32px] overflow-hidden flex flex-col transition-all duration-300 border hover:scale-[1.02] hover:shadow-xl ${darkMode
                    ? 'bg-[#111c44] border-gray-800 shadow-[0_15px_30px_rgba(0,0,0,0.3)]'
                    : 'bg-white border-slate-100 shadow-[0_15px_30px_rgba(15,23,42,0.08)]'
                    }`}
                >
                  <div className={`h-32 w-full ${darkMode ? 'bg-gray-800' : 'bg-slate-200'}`}>
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 px-5 py-4">
                    <p className={`text-[10px] uppercase tracking-wider font-bold ${darkMode ? 'text-blue-400' : 'text-slate-500'}`}>
                      {course.university || "University"}
                    </p>
                    <h3 className={`text-base font-semibold leading-snug line-clamp-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {course.title}
                    </h3>
                    <div className="mt-auto pt-2">
                      <Link
                        to={`/courses-detail?courseId=${course.courseId}`}
                        className="inline-flex w-full justify-center rounded-full bg-[#1D8CF8] text-white text-sm font-semibold py-2 shadow-[0_10px_20px_rgba(29,140,248,0.25)] hover:bg-[#1A7FE6] transition-colors"
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
