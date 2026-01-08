import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, LogOut, ClipboardCheck, Trophy, BarChart3, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardNavbar } from "@/components/ui/dashboard-navbar";
import { ProfilePage } from "@/components/ui/profile-page";
import { ParentStatsCards } from "@/components/ui/parent-stats-cards";
import { ParentDashboardBanner } from "@/components/ui/parent-dashboard-banner";
import { SupportBanner } from "@/components/ui/support-banner";
import { MonthlyAttendanceCalendar } from "@/components/ui/monthly-attendance-calendar";
import { GradeProgressChart } from "@/components/ui/grade-progress-chart";
import { AssignmentsTable } from "@/components/ui/assignments-table";
import { ParentAnnouncements } from "@/components/ui/parent-announcements";
import avatarImage from "@/assets/images/avatar-simmmple.png";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <LayoutDashboard className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Billing",
      href: "/billing",
      icon: (
        <CreditCard className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Attendance",
      href: "/attendance",
      icon: (
        <ClipboardCheck className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Results",
      href: "/results",
      icon: (
        <Trophy className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Performance",
      href: "/performance",
      icon: (
        <BarChart3 className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <UserCog className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <LogOut className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Handle link clicks
  const handleLinkClick = (label) => {
    if (label === "Profile") {
      setCurrentPage("profile");
    } else if (label === "Dashboard") {
      setCurrentPage("dashboard");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-[#f8fafc] dark:bg-gradient-to-b dark:from-[#0A1333] dark:to-[#050B24] overflow-hidden">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} onClick={() => handleLinkClick(link.label)}>
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 min-w-0 h-full">
        {currentPage === "profile" ? <ProfilePage onBackToDashboard={() => setCurrentPage("dashboard")} /> : <Dashboard onProfileClick={() => setCurrentPage("profile")} />}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        Edu Learn
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};

// Dashboard component with Parent Dashboard design
const Dashboard = ({ onProfileClick }) => {
  return (
    <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
      <div className="w-full h-full bg-[#f8fafc] dark:bg-gradient-to-b dark:from-[#0A1333] dark:to-[#050B24] rounded-xl shadow-lg flex flex-col overflow-hidden relative">
        {/* Static Navbar at top */}
        <DashboardNavbar onProfileClick={onProfileClick} />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 relative scrollbar-hide w-full">

          {/* Mobile/Tablet/Small Desktop Layout (< xl) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:hidden w-full max-w-full">
            {/* Row 1: Top Stats Cards (Full Width) */}
            <div className="w-full lg:col-span-2">
              <ParentStatsCards />
            </div>

            {/* Row 2: Banners (Side-by-side on lg) */}
            <div className="w-full">
              <ParentDashboardBanner />
            </div>
            <div className="w-full">
              <SupportBanner />
            </div>

            {/* Row 3: Calendar and Chart (Side-by-side on lg) */}
            <div className="w-full">
              <MonthlyAttendanceCalendar />
            </div>
            <div className="w-full">
              <GradeProgressChart />
            </div>

            {/* Row 4: Assignments and Announcements (Side-by-side on lg) */}
            <div className="w-full">
              <AssignmentsTable />
            </div>
            <div className="w-full">
              <ParentAnnouncements />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:flex flex-col gap-6 w-full">
            {/* Row 1: Top Stats Cards (4 cards in a row) */}
            <div className="w-full">
              <ParentStatsCards />
            </div>

            {/* Row 2: Two banners side by side */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <ParentDashboardBanner />
              </div>
              <div className="col-span-1">
                <SupportBanner />
              </div>
            </div>

            {/* Row 3: Calendar (left) and Chart (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="w-full lg:col-span-2">
                <MonthlyAttendanceCalendar />
              </div>
              <div className="w-full lg:col-span-3">
                <GradeProgressChart />
              </div>
            </div>

            {/* Row 4: Assignments table (left, wider) and Announcements (right) */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <AssignmentsTable />
              </div>
              <div className="col-span-1">
                <ParentAnnouncements />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
