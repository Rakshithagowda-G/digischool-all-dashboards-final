import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardNavbar } from "@/components/ui/dashboard-navbar";
import { CoursesSection } from "@/components/ui/courses-section";
import { PageWithSidebar } from "@/components/layouts/PageWithSidebar";
import { getAllCourses, getWelcomeData } from "@/lib/api";

export function CoursesPage() {
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("studentId") || "STU002";
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesData, welcomeData] = await Promise.all([
          getAllCourses(studentId),
          getWelcomeData(studentId)
        ]);
        setCourses(coursesData || []);
        setStudentName(welcomeData?.fullName || "");
        setError(null);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchData();
    }
  }, [studentId]);

  return (
    <PageWithSidebar>
      <CoursesPageContent
        courses={courses}
        loading={loading}
        error={error}
        studentName={studentName}
      />
    </PageWithSidebar>
  );
}

// Courses page content with same structure as Dashboard
const CoursesPageContent = ({ courses, loading, error, studentName }) => {
  return (
    <div className="flex flex-1 min-w-0 h-full p-4 md:p-6">
      <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex flex-col overflow-hidden relative">
        {/* Static Navbar at top */}
        <DashboardNavbar studentName={studentName} />
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative scrollbar-hide">
          <CoursesSection
            courses={courses}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};
