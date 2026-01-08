import React, { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChatBox } from "./chat-box";

export const DashboardNavbar = ({ onProfileClick }) => {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  let pageTitle = "Parent Dashboard";
  if (location.pathname === "/courses") {
    pageTitle = "Courses";
  } else if (location.pathname === "/attendance") {
    pageTitle = "Attendance";
  } else if (location.pathname === "/events") {
    pageTitle = "Events";
  } else if (location.pathname === "/courses-detail") {
    pageTitle = "Course Details";
  } else if (location.pathname === "/assignments") {
    pageTitle = "Assignment";
  } else if (location.pathname === "/elibrary") {
    pageTitle = "E-Library";
  } else if (location.pathname === "/results") {
    pageTitle = "Results";
  } else if (location.pathname === "/profile") {
    pageTitle = "Profile";
  }

  return (
    <>
      <nav className="h-[70px] w-full bg-[#F0F2F5] dark:bg-gradient-to-r dark:from-[#0A1333] dark:to-[#050B24] border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 md:px-6 flex-shrink-0 min-w-0 sticky top-0 z-10">
        {/* Left side - Page title */}
        <div className="flex items-center min-w-0 flex-shrink">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
            {pageTitle}
          </h1>
        </div>

        {/* Right side - Search bar and Icons */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-shrink-0">
          {/* Search bar */}
          <div className="relative max-w-[200px] md:max-w-[300px] lg:max-w-[350px] w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#171E57] dark:text-white/60 h-4 w-4" />
            <input
              type="text"
              placeholder="Search here..."
              className={cn(
                "w-full pl-10 pr-4 py-2 rounded-full",
                "border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-[#1A2040]",
                "focus:outline-none focus:ring-2 focus:ring-[#171E57] dark:focus:ring-[#2D8CFF] focus:border-transparent",
                "shadow-sm transition-shadow duration-200",
                "text-sm text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/60"
              )}
            />
          </div>

          {/* Chat icon */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setIsChatOpen(true)}
              className={cn(
                "relative w-9 h-9 md:w-10 md:h-10 rounded-full",
                "bg-[#171E57] flex items-center justify-center",
                "hover:bg-[#171E57]/90 transition-colors duration-200"
              )}
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-[#F0F2F5] dark:border-[#0A1333]"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Chat Box */}
      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};
