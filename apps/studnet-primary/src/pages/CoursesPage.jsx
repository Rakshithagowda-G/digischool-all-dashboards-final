import React from "react";
import { DashboardNavbar } from "@/components/ui/dashboard-navbar";
import { CoursesSection } from "@/components/ui/courses-section";
import { PageWithSidebar } from "@/components/layouts/PageWithSidebar";
import { useTheme } from "../context/ThemeContext";

export function CoursesPage() {
  return (
    <PageWithSidebar>
      <CoursesPageContent />
    </PageWithSidebar>
  );
}

// Courses page content with same structure as Dashboard
const CoursesPageContent = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
      <div className={`
        w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden relative transition-colors duration-200
        ${isDark ? 'bg-[#0F1115]' : 'bg-slate-100'}
      `}>
        {/* Static Navbar at top */}
        <DashboardNavbar />
        {/* Scrollable content area */}
        <div className={`
          flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 relative scrollbar-hide transition-colors duration-200
          ${isDark ? 'bg-[#0F1115]' : ''}
        `}>
          <CoursesSection />
        </div>
      </div>
    </div>
  );
};

