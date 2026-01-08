import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, Settings, LogOut, BookOpen, Calendar, ClipboardCheck, FileText, Trophy, CreditCard } from "lucide-react";
import { PiBooksFill } from 'react-icons/pi';
import { motion } from "framer-motion";
import { StatsCardsSection } from "@/components/ui/stats-cards-section";
import { DashboardNavbar } from "@/components/ui/dashboard-navbar";
import { PromoBanner } from "@/components/ui/promo-banner";
import { AttendanceChartCard } from "@/components/ui/attendance-chart-card";
import { AssignmentsList } from "@/components/ui/assignments-list";
import { AnnouncementsSection } from "@/components/ui/announcements-section";
import { UpcomingWebinarCard } from "@/components/ui/upcoming-webinar-card";
import { GradeBook } from "@/components/ui/grade-book";
import { ProfilePage } from "@/components/ui/profile-page";
import avatarImage from "@/assets/images/avatar-simmmple.png";
import { useDarkMode } from "@/contexts/DarkModeContext";

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
      label: "Payment",
      href: "/payment",
      icon: (
        <CreditCard className="text-white h-5 w-5 flex-shrink-0" />
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
    <div className="flex flex-col md:flex-row h-screen w-screen bg-[#171E57] overflow-hidden">
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



// Single white card component
// Single white card component
const Dashboard = ({ onProfileClick }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-2 xl:p-4 2xl:p-6">
      <div
        className={`w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden relative ${!darkMode ? 'bg-slate-100' : ''}`}
        style={darkMode ? {
          backgroundImage: "url('/img/body-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        } : {}}
      >
        {/* Static Navbar at top */}
        <DashboardNavbar onProfileClick={onProfileClick} />
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-4 lg:p-5 xl:p-6 relative scrollbar-hide w-full">
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 max-w-[1600px] mx-auto pb-6">

            {/* Stats Cards Section */}
            <div className="w-full">
              <StatsCardsSection />
            </div>

            {/* Middle Section: Promo Banner & Attendance Chart */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 w-full">
              <div className="md:col-span-2 min-h-[250px] md:min-h-[280px] lg:min-h-[300px]">
                <PromoBanner />
              </div>
              <div className="md:col-span-1 min-h-[250px] md:min-h-[280px] lg:min-h-[300px]">
                <AttendanceChartCard />
              </div>
            </div>

            {/* Webinar & Grade Book Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 w-full">
              <div className="xl:col-span-1 min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
                <UpcomingWebinarCard />
              </div>
              <div className="xl:col-span-2 min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
                <GradeBook />
              </div>
            </div>

            {/* Bottom Section: Assignments & Announcements */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 w-full">
              <div className="xl:col-span-2 min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
                <AssignmentsList />
              </div>
              <div className="xl:col-span-1 min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
                <AnnouncementsSection />
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
};
