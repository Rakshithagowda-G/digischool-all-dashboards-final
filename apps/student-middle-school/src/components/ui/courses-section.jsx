import React from "react";
import { Link } from "react-router-dom";
import { Loader2, AlertCircle, BookOpen } from "lucide-react";

export const CoursesSection = ({ courses = [], loading, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-white/50 rounded-[40px] backdrop-blur-sm border border-slate-200/50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
        <p className="text-lg font-medium text-slate-600">Loading your courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-white/50 rounded-[40px] backdrop-blur-sm border border-red-100 p-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-slate-800 mb-2">Oops!</h3>
        <p className="text-slate-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-2.5 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-white/50 rounded-[40px] backdrop-blur-sm border border-slate-200 p-6 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="w-10 h-10 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Courses Available</h3>
        <p className="text-slate-600">It looks like you haven't been enrolled in any courses yet.</p>
      </div>
    );
  }

  return (
    <section className="w-full h-full flex flex-col gap-6">
      <div className="px-2" />

      <div className="relative flex-1 w-full rounded-[40px] p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course, index) => (
            <article
              key={course.id || course._id || index}
              className="rounded-[32px] bg-white shadow-[0_15px_30px_rgba(15,23,42,0.08)] border border-slate-100 overflow-hidden flex flex-col group hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-40 w-full bg-slate-200 relative overflow-hidden">
                {course.thumbnail || course.image ? (
                  <img
                    src={course.thumbnail || course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-slate-400 opacity-20" />
                  </div>
                )}
                {course.courseCode && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      {course.courseCode}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 px-6 py-5">
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                  {course.educationLevel || course.schoolType || "Academy"}
                </p>
                <h3 className="text-base font-bold text-slate-900 leading-tight mb-2 min-h-[2.5rem] line-clamp-2">
                  {course.title}
                </h3>
                {course.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                )}
                <div className="mt-auto pt-2">
                  <Link
                    to={`/courses-detail/${course.courseId || course.id || course._id}`}
                    className="inline-flex w-full justify-center rounded-2xl bg-slate-900 py-3 text-sm font-bold text-white shadow-xl shadow-slate-200 transition-all hover:bg-blue-600 hover:shadow-blue-200 active:scale-95"
                  >
                    Open
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
