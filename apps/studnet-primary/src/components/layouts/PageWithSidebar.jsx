import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, Settings, LogOut, BookOpen, Calendar, ClipboardCheck, CheckSquare, BarChart3, Trophy, Bell } from "lucide-react";
import { PiBooksFill } from 'react-icons/pi';
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export function Logo() {
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
}

export function LogoIcon() {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
}

export function PageWithSidebar({ children }) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [searchParams] = useSearchParams();
  // Temporary development fallback to Primary Student-3 (STU003)
  const studentId = searchParams.get('studentId') || 'STU003';
  const studentQuery = studentId ? `?studentId=${studentId}` : '';

  const links = [
    {
      label: "Dashboard",
      href: `/${studentQuery}`,
      icon: (
        <LayoutDashboard className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Courses",
      href: `/courses${studentQuery}`,
      icon: (
        <BookOpen className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Assignment",
      href: `/assignment${studentQuery}`,
      icon: (
        <BarChart3 className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Events",
      href: `/events${studentQuery}`,
      icon: (
        <Calendar className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "E-Library",
      href: `/elibrary${studentQuery}`,
      icon: (
        <PiBooksFill className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Attendance",
      href: `/attendance${studentQuery}`,
      icon: (
        <ClipboardCheck className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Results",
      href: `/results${studentQuery}`,
      icon: (
        <Trophy className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Announcements",
      href: `/announcements${studentQuery}`,
      icon: (
        <Bell className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: `/profile${studentQuery}`,
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
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

        </SidebarBody>
      </Sidebar>
      <div className="flex-1 min-w-0 h-full overflow-auto">
        {children}
      </div>
    </div>
  );
}



