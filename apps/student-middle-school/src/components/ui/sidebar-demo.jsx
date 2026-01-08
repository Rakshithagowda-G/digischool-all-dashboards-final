import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, Settings, LogOut, BookOpen, Calendar, ClipboardCheck, FileText, Trophy, Loader2, AlertCircle } from "lucide-react";
import { PiBooksFill } from 'react-icons/pi';
import { motion } from "framer-motion";
import { PromoBanner } from "@/components/ui/promo-banner";
import { StatsCardsSection } from "@/components/ui/stats-cards-section";
import { DashboardNavbar } from "@/components/ui/dashboard-navbar";
import { AssignmentsList } from "@/components/ui/assignments-list";
import { UpcomingWebinarCard } from "@/components/ui/upcoming-webinar-card";
import { AnnouncementsSection } from "@/components/ui/announcements-section";
import AttendanceOverview from "@/components/ui/attendance-overview";
import { GradeBook } from "@/components/ui/grade-book";
import { ProfilePage } from "@/components/ui/profile-page";
import avatarImage from "@/assets/images/avatar-simmmple.png";
import { useSearchParams } from "react-router-dom";
import {
  getWelcomeData,
  getHomeSummary,
  getTopAssignments,
  getLatestAnnouncements,
  getGradeBook,
  getAttendanceOverview
} from "@/lib/api";

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
      label: "Courses",
      href: "/courses",
      icon: (
        <BookOpen className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Events",
      href: "/events",
      icon: (
        <Calendar className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Assignments",
      href: "/assignments",
      icon: (
        <FileText className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "E-Library",
      href: "/elibrary",
      icon: (
        <PiBooksFill className="text-white h-5 w-5 flex-shrink-0" />
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
      label: "Attendance",
      href: "/attendance",
      icon: (
        <ClipboardCheck className="text-white h-5 w-5 flex-shrink-0" />
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
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId') || 'STU002';

  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // State for data
  const [data, setData] = useState({
    welcome: null,
    summary: null,
    assignments: [],
    announcements: [],
    gradeBook: [],
    attendance: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [welcome, summary, assignments, announcements, gradeBook, attendance] = await Promise.all([
          getWelcomeData(studentId),
          getHomeSummary(studentId),
          getTopAssignments(studentId),
          getLatestAnnouncements(studentId),
          getGradeBook(studentId),
          getAttendanceOverview(studentId)
        ]);

        setData({
          welcome,
          summary,
          assignments,
          announcements,
          gradeBook,
          attendance
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchDashboardData();
    }
  }, [studentId]);

  // Handle link clicks
  const handleLinkClick = (label) => {
    if (label === "Profile") {
      setCurrentPage("profile");
    } else if (label === "Dashboard") {
      setCurrentPage("dashboard");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-[#1D8CF8] overflow-hidden">
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
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src={avatarImage}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 min-w-0 h-full overflow-hidden">
        {currentPage === "profile" ? (
          <ProfilePage onBackToDashboard={() => setCurrentPage("dashboard")} />
        ) : (
          <div className="h-full overflow-hidden">
            {loading ? (
              <div className="flex flex-1 items-center justify-center h-full bg-slate-100">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                  <p className="text-lg font-medium text-slate-600">Loading Dashboard...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex flex-1 items-center justify-center h-full bg-slate-100 p-6">
                <div className="flex flex-col items-center gap-4 text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100 max-w-md">
                  <AlertCircle className="w-16 h-16 text-red-500" />
                  <h2 className="text-2xl font-bold text-slate-800">Oops!</h2>
                  <p className="text-slate-600">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-8 py-2.5 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md active:scale-95"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <Dashboard
                onProfileClick={() => setCurrentPage("profile")}
                data={data}
              />
            )}
          </div>
        )}
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

// Single white card component
const Dashboard = ({ onProfileClick, data }) => {
  return (
    <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
      <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex flex-col overflow-hidden relative">
        {/* Static Navbar at top */}
        <DashboardNavbar onProfileClick={onProfileClick} studentName={data.welcome?.fullName} />
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 relative scrollbar-hide w-full">
          {/* Mobile/Tablet Layout */}
          <div className="flex flex-col gap-4 xl:hidden w-full max-w-full">
            {/* Promo Banner */}
            <div className="w-full">
              <PromoBanner studentName={data.welcome?.fullName} />
            </div>
            {/* Stats Cards Section */}
            <div className="w-full">
              <StatsCardsSection summary={data.summary} />
            </div>

            {/* Attendance + Announcements - Responsive Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] lg:grid-cols-[1fr_1.2fr] gap-4">
              <div className="w-full">
                <AttendanceOverview attendance={data.attendance} />
              </div>
              <div className="w-full">
                <AnnouncementsSection announcements={data.announcements} />
              </div>
            </div>

            {/* Assignments List */}
            <div className="w-full">
              <AssignmentsList assignments={data.assignments} />
            </div>
            {/* Upcoming Webinar */}
            <div className="w-full">
              <UpcomingWebinarCard
                title="Next Generation Frontend Architecture Using Layout Engine And React Native Web."
                date="17 Nov 23"
                duration="32 minutes"
                onJoinClick={() => console.log('Join webinar clicked')}
              />
            </div>
            {/* Grade Book at bottom */}
            <div className="w-full">
              <GradeBook gradeBook={data.gradeBook} />
            </div>
          </div>

          {/* Desktop Layout - Original Absolute Positioning */}
          <div className="hidden xl:block">
            {/* Promo Banner at top left */}
            <div className="absolute top-6 left-6 right-[360px]">
              <PromoBanner studentName={data.welcome?.fullName} />
            </div>
            {/* Stats Cards below banner, to the left of calendar */}
            <div className="absolute top-[250px] left-6 right-[360px]">
              <StatsCardsSection summary={data.summary} />
            </div>
            {/* Assignments List and Upcoming Webinar in a flex row */}
            <div className="absolute top-[440px] left-6 right-[360px] flex gap-4 pb-6">
              <div className="flex-[1.4] min-w-0 overflow-hidden">
                <AssignmentsList assignments={data.assignments} />
              </div>
              <div className="flex-[0.6] min-w-0 overflow-hidden">
                <UpcomingWebinarCard
                  title="Next Generation Frontend Architecture Using Layout Engine And React Native Web."
                  date="17 Nov 23"
                  duration="32 minutes"
                  onJoinClick={() => console.log('Join webinar clicked')}
                />
              </div>
            </div>
            {/* Grade Book at the bottom covering the left space */}
            <div className="absolute top-[880px] left-6 right-[360px] pb-10">
              <GradeBook gradeBook={data.gradeBook} />
            </div>
            {/* Attendance Overview section at top right */}
            <div className="absolute top-6 right-6">
              <AttendanceOverview attendance={data.attendance} />
            </div>
            {/* Announcements section below attendance */}
            <div className="absolute top-[490px] right-6 w-[320px] md:w-[340px] lg:w-[320px]">
              <AnnouncementsSection announcements={data.announcements} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
