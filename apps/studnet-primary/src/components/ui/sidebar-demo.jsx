import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, Settings, LogOut, BookOpen, Calendar, ClipboardCheck, FileText, CheckSquare, BarChart3, Bell, Search, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Trophy } from "lucide-react";
import { PiBooksFill } from 'react-icons/pi';
import { motion } from "framer-motion";
import { DashboardNavbar } from "@/components/ui/dashboard-navbar";
import { ProfilePage } from "@/components/ui/profile-page";
import { Pie, PieChart, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { SuggestedActivities } from "@/components/ui/suggested-activities";
import { AverageStudyTime } from "@/components/ui/average-study-time";
import { StudentPerformance } from "@/components/ui/student-performance";
import { ClassWallMessages } from "@/components/ui/class-wall-messages";
import { DueAssignments } from "@/components/ui/due-assignments";
import { useTheme } from "../../context/ThemeContext";


export function SidebarDemo() {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const [searchParams] = useSearchParams();
  // Temporary development fallback to Primary Student-3 (STU003)
  const studentId = searchParams.get('studentId') || 'STU003';

  const links = [
    {
      label: "Dashboard",
      href: `/?studentId=${studentId}`,
      icon: (
        <LayoutDashboard className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Courses",
      href: `/courses?studentId=${studentId}`,
      icon: (
        <BookOpen className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Assignment",
      href: `/assignment?studentId=${studentId}`,
      icon: (
        <BarChart3 className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Events",
      href: `/events?studentId=${studentId}`,
      icon: (
        <Calendar className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "E-Library",
      href: `/elibrary?studentId=${studentId}`,
      icon: (
        <PiBooksFill className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Attendance",
      href: `/attendance?studentId=${studentId}`,
      icon: (
        <ClipboardCheck className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Results",
      href: `/results?studentId=${studentId}`,
      icon: (
        <Trophy className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Announcements",
      href: `/announcements?studentId=${studentId}`,
      icon: (
        <Bell className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: `/profile?studentId=${studentId}`,
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
    if (label === "Dashboard") {
      setCurrentPage("dashboard");
    }
    // Profile and other routes are handled by React Router
  };

  return (
    <div className={`
      flex flex-col md:flex-row h-screen w-screen overflow-hidden transition-colors duration-200
      ${isDark ? 'bg-slate-900' : 'bg-[#A78BFA]'}
    `}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                // Only use custom navigation for Dashboard
                const needsCustomNav = link.label === "Dashboard";
                return (
                  <div key={idx} onClick={needsCustomNav ? () => handleLinkClick(link.label) : undefined}>
                    <SidebarLink link={link} />
                  </div>
                );
              })}
            </div>
          </div>

        </SidebarBody>
      </Sidebar>
      <div className="flex-1 min-w-0 h-full">
        {currentPage === "profile" ? (
          <ProfilePage onBackToDashboard={() => setCurrentPage("dashboard")} />
        ) : (
          <Dashboard onProfileClick={() => setCurrentPage("profile")} />
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

// Home Page Dashboard Component
const Dashboard = ({ onProfileClick }) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:px-3 md:py-4 lg:p-6 nest-hub-outer-container">
      <style>{`
        @media (min-width: 1024px) and (max-height: 600px) {
          /* 1. Global Layout & Scrolling */
          .nest-hub-outer-container {
             padding: 0.6rem !important;
             height: 100vh !important;
             overflow: hidden !important;
          }
          
          .nest-hub-dashboard-wrapper {
             border-radius: 12px !important;
             overflow: hidden !important;
             display: flex !important;
             flex-direction: column !important;
          }

          .nest-hub-scroll-area {
             overflow-y: auto !important;
             overflow-x: hidden !important;
             padding: 0.6rem !important;
          }

          /* 2. Main Grid Layout */
          .nest-hub-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px 12px !important; /* Row Gap 16px, Col Gap 12px */
            width: 100% !important;
            max-width: none !important;
          }

          /* Flatten intermediate containers */
          .nest-hub-flatten {
            display: contents !important;
          }

          /* 3. Grid Placement */
          /* Row 1: Suggested Activities (Full Width) */
          .nest-item-suggested {
            grid-column: 1 / -1 !important;
            width: 100% !important;
            margin-bottom: 0 !important;
          }
          
          /* Row 2: Study Time (Left) + Announcements (Right) */
          .nest-item-study {
            grid-column: 1 !important;
          }
          .nest-item-messages {
            grid-column: 2 !important;
          }

          /* Row 3: Performance (Left) + Due Assignments (Right) */
          .nest-item-performance {
            grid-column: 1 !important;
          }
          .nest-item-due {
            grid-column: 2 !important;
          }

          /* 4. Sizing & Constraints */
          .nest-item-study,
          .nest-item-messages,
          .nest-item-performance,
          .nest-item-due {
            max-height: 260px !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
            min-height: 0 !important;
          }

          /* Ensure content fills height */
          .nest-item-study > div,
          .nest-item-messages > div,
          .nest-item-performance > div,
          .nest-item-due > div {
            height: 100% !important;
            max-height: 100% !important;
            padding: 12px !important;
          }

          /* 5. Due Assignment Specifics */
          .nest-item-due > div {
             display: flex !important;
             flex-direction: column !important;
          }
          
          .nest-item-due img {
             width: 100% !important;
             max-height: 150px !important;
             object-fit: contain !important;
             margin-bottom: 8px !important;
             margin-right: 0 !important;
          }

          /* 6. Suggested Activities Specifics */
          .nest-item-suggested > div > div {
             display: flex !important;
             flex-direction: row !important;
             flex-wrap: nowrap !important;
             overflow-x: visible !important;
             gap: 12px !important;
          }
          .nest-item-suggested > div > div > div {
             min-width: 30% !important;
             max-width: 30% !important;
             flex: 1 !important;
          }

          /* 7. Typography Scaling */
          .nest-hub-grid h1, .nest-hub-grid h2, .nest-hub-grid h3, .nest-hub-grid h4 { font-size: 90% !important; }
          .nest-hub-grid span, .nest-hub-grid p, .nest-hub-grid div, .nest-hub-grid button { font-size: 90% !important; }
          
          /* Chart Constraints */
          .recharts-responsive-container {
             height: 100% !important;
             max-height: 180px !important;
          }
        }

        @media (min-width: 820px) and (max-width: 900px) {
          /* Remove bottom whitespace */
          .dashboard-wrapper {
            min-height: auto !important;
            padding-bottom: 0 !important;
          }

          /* Performance + Due row */
          .performance-due-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }

          /* Smaller Start button */
          .due-start-btn {
            padding: 4px 10px !important;
            font-size: 12px !important;
            height: 28px !important;
          }
        }

        .study-notice-row {
          display: contents;
        }

        /* Nest Hub layout fix only */
        @media (min-width: 980px) and (max-width: 1040px) {
          /* Main Grid Layout */
          .nest-hub-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            grid-template-areas:
              "welcome graph"
              "stack   graph"
              "announce performance"
              "due due" !important;
            gap: 16px !important;
            align-items: start !important;
          }

          /* Show Nest Hub specific elements */
          .nest-welcome,
          .nest-stack,
          .nest-graph,
          .nest-announce,
          .nest-performance,
          .nest-due {
            display: block !important;
          }

          /* LEFT TOP - Welcome Card */
          .nest-welcome {
            grid-area: welcome !important;
          }

          /* LEFT STACKED CARDS - Assignments + Watch Lessons */
          .nest-stack {
            grid-area: stack !important;
            display: grid !important;
            grid-template-rows: 1fr 1fr !important;
            gap: 12px !important;
          }

          /* RIGHT GRAPH - Study Time */
          .nest-graph {
            grid-area: graph !important;
            grid-row: 1 / 3 !important; /* Span 2 rows */
          }

          /* ANNOUNCEMENT */
          .nest-announce {
            grid-area: announce !important;
          }

          /* PIE CHART - Performance */
          .nest-performance {
            grid-area: performance !important;
          }

          /* DUE ASSIGNMENTS FULL WIDTH */
          .nest-due {
            grid-area: due !important;
          }

          /* Ensure equal spacing and alignment */
          .nest-welcome,
          .nest-stack,
          .nest-graph,
          .nest-announce,
          .nest-performance,
          .nest-due {
            width: 100% !important;
            height: 100% !important;
          }

          /* Hide original suggested activities container */
          .nest-item-suggested {
            display: none !important;
          }

          /* Hide original wrappers */
          .study-notice-row,
          .performance-due-row {
            display: none !important;
          }

          /* Prevent overflow */
          .dashboard-wrapper {
            overflow-x: hidden !important;
          }
        }

        /* Surface Pro 7 only */
        @media (min-width: 880px) and (max-width: 950px) {

          .announcements-wrapper,
          .performance-wrapper,
          .due-assignments-wrapper {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

        }
      `}</style>
      <div className={`
        w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden transition-colors duration-200 nest-hub-dashboard-wrapper dashboard-wrapper
        ${isDark ? 'bg-[#0F1115]' : 'bg-[#f7f8fc]'}
      `}>
        {/* Static Navbar at top */}
        <DashboardNavbar onProfileClick={onProfileClick} />

        {/* Main Content Area */}
        <div className={`
          flex-1 overflow-y-auto overflow-x-hidden p-4 md:px-3 md:py-6 lg:p-6 relative scrollbar-hide transition-colors duration-200 nest-hub-scroll-area
          ${isDark ? 'bg-[#0F1115]' : ''}
        `}>
          <div className="w-full md:max-w-full lg:max-w-[1600px] mx-auto nest-hub-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-8">
            {/* NEST HUB LAYOUT (980px-1040px) - Hidden on other breakpoints */}
            {/* Welcome Card */}
            <div className="nest-welcome" style={{ display: 'none' }}>
              <WelcomeCard isDark={isDark} />
            </div>

            {/* Stacked Cards - Assignments + Watch Lessons */}
            <div className="nest-stack" style={{ display: 'none' }}>
              <AssignmentsCard isDark={isDark} />
              <WatchLessonsCard isDark={isDark} />
            </div>

            {/* Study Time Graph */}
            <div className="nest-graph" style={{ display: 'none' }}>
              <AverageStudyTime />
            </div>

            {/* Announcements */}
            <div className="nest-announce" style={{ display: 'none' }}>
              <ClassWallMessages />
            </div>

            {/* Performance Pie Chart */}
            <div className="nest-performance" style={{ display: 'none' }}>
              <StudentPerformance />
            </div>

            {/* Due Assignments Full Width */}
            <div className="nest-due" style={{ display: 'none' }}>
              <DueAssignments />
            </div>

            {/* ORIGINAL LAYOUT - Hidden on Nest Hub (980px-1040px) */}
            {/* Suggested Activities */}
            <div className="md:col-span-2 lg:col-span-6 nest-item-suggested dashboard-section suggested-card">
              <SuggestedActivities />
            </div>

            {/* Study Time + Notice Wrapper */}
            <div className="study-notice-row dashboard-section">
              {/* Average Study Time */}
              <div className="md:col-span-1 lg:col-span-6 nest-item-study study-time-wrapper">
                <AverageStudyTime />
              </div>

              {/* Announcements */}
              <div className="md:col-span-1 lg:col-span-3 nest-item-messages announcements-wrapper">
                <ClassWallMessages />
              </div>
            </div>

            {/* Performance + Due Wrapper */}
            <div className="md:col-span-2 lg:col-span-9 nest-item-performance-due performance-due-row dashboard-section grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Your Performance (Progress Card with Chart) */}
              <div className="lg:col-span-2 h-full nest-item-performance performance-wrapper">
                <StudentPerformance />
              </div>

              {/* Due Assignments */}
              <div className="lg:col-span-3 h-full nest-item-due due-assignments-wrapper">
                <DueAssignments />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual Card Components for Nest Hub Layout
const WelcomeCard = ({ isDark }) => {
  const isHomePage = window.location.pathname === '/';
  return (
    <motion.div
      className="relative rounded-2xl p-4 md:p-3 lg:p-6 overflow-hidden flex md:flex-row-reverse lg:flex-row items-center gap-3 md:gap-2 lg:gap-4"
      style={{
        background: isDark && isHomePage ? 'linear-gradient(135deg, #155E75 0%, #0E7490 100%)' : '#4ECDC4'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-1 min-w-0 space-y-1 md:space-y-0.5 lg:space-y-2 z-10">
        <h3 className="text-lg md:text-sm lg:text-lg font-bold line-clamp-2 leading-tight text-white">
          Welcome Rakshitha
        </h3>
        <p className="text-[11px] md:text-[10px] lg:text-[11px] leading-tight opacity-90 line-clamp-2 text-white">
          Welcome to your student dashboard.
        </p>
      </div>
      <div className="flex-shrink-0 w-20 h-20 md:w-16 md:h-16 lg:w-32 lg:h-32 flex items-center justify-center">
        <img src="/img/Kids Studying from Home.png" alt="Welcome" className="w-full h-full object-contain" />
      </div>
    </motion.div>
  );
};

const AssignmentsCard = ({ isDark }) => {
  const navigate = useNavigate();
  const isHomePage = window.location.pathname === '/';
  return (
    <motion.div
      className="relative rounded-2xl p-4 md:p-3 lg:p-6 overflow-hidden flex md:flex-row-reverse lg:flex-row items-center gap-3 md:gap-2 lg:gap-4"
      style={{
        background: isDark && isHomePage ? 'linear-gradient(135deg, #1E3A8A 0%, #172554 100%)' : '#A0E7E5'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-1 min-w-0 space-y-1 md:space-y-0.5 lg:space-y-2 z-10">
        <h3 className={`text-lg md:text-sm lg:text-lg font-bold line-clamp-2 leading-tight ${isDark && isHomePage ? 'text-white' : 'text-gray-900'}`}>
          Assignments
        </h3>
        <p className={`text-[11px] md:text-[10px] lg:text-[11px] leading-tight opacity-90 line-clamp-2 ${isDark && isHomePage ? 'text-white' : 'text-gray-900'}`}>
          Complete your pending assignments.
        </p>
        <button
          onClick={() => navigate('/assignment')}
          className={`px-4 py-1.5 md:px-3 md:py-1 lg:px-6 lg:py-2 rounded-full text-xs md:text-[10px] lg:text-sm font-semibold transition-all mt-2 md:mt-1 lg:mt-0 ${isDark && isHomePage
            ? 'bg-white text-gray-800 hover:bg-opacity-90'
            : 'bg-white text-gray-800 hover:bg-opacity-90'
            }`}
        >
          START
        </button>
      </div>
      <div className="flex-shrink-0 w-20 h-20 md:w-16 md:h-16 lg:w-32 lg:h-32 flex items-center justify-center">
        <img src="/img/singing card.png" alt="Assignments" className="w-full h-full object-contain" />
      </div>
    </motion.div>
  );
};

const WatchLessonsCard = ({ isDark }) => {
  const navigate = useNavigate();
  const isHomePage = window.location.pathname === '/';
  return (
    <motion.div
      className="relative rounded-2xl p-4 md:p-3 lg:p-6 overflow-hidden flex md:flex-row-reverse lg:flex-row items-center gap-3 md:gap-2 lg:gap-4"
      style={{
        background: isDark && isHomePage ? 'linear-gradient(135deg, #1E3A8A 0%, #172554 100%)' : '#5567C9'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-1 min-w-0 space-y-1 md:space-y-0.5 lg:space-y-2 z-10">
        <h3 className="text-lg md:text-sm lg:text-lg font-bold line-clamp-2 leading-tight text-white">
          Watch Lessons
        </h3>
        <p className="text-[11px] md:text-[10px] lg:text-[11px] leading-tight opacity-90 line-clamp-2 text-white">
          Watch video lessons anytime.
        </p>
        <button
          onClick={() => navigate('/courses')}
          className="px-4 py-1.5 md:px-3 md:py-1 lg:px-6 lg:py-2 rounded-full text-xs md:text-[10px] lg:text-sm font-semibold transition-all mt-2 md:mt-1 lg:mt-0 bg-white text-gray-800 hover:bg-opacity-90"
        >
          START
        </button>
      </div>
      <div className="flex-shrink-0 w-20 h-20 md:w-16 md:h-16 lg:w-32 lg:h-32 flex items-center justify-center">
        <img src="/img/reading.png" alt="Watch Lessons" className="w-full h-full object-contain" />
      </div>
    </motion.div>
  );
};
