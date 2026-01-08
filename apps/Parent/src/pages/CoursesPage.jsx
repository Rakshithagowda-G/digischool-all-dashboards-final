import React from "react";
import { DashboardNavbar } from "@/components/ui/dashboard-navbar";
import { CoursesSection } from "@/components/ui/courses-section";
import { PageWithSidebar } from "@/components/layouts/PageWithSidebar";

export function CoursesPage() {
  return (
    <PageWithSidebar>
      <CoursesPageContent />
    </PageWithSidebar>
  );
}

// Courses page content with same structure as Dashboard
const CoursesPageContent = () => {
  return (
    <div className="flex flex-1 min-w-0 h-full p-4 md:p-6">
      <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex flex-col overflow-hidden relative">
        {/* Static Navbar at top */}
        <DashboardNavbar />
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative scrollbar-hide">
          <CoursesSection />
        </div>
      </div>
    </div>
  );
};

