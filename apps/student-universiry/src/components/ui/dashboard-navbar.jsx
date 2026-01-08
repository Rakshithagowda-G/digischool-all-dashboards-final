import React, { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChatBox } from "./chat-box";
import { useDarkMode } from "../../contexts/DarkModeContext";

export const DashboardNavbar = ({ onProfileClick }) => {
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const [isChatOpen, setIsChatOpen] = useState(false);

  let pageTitle = "Dashboard";
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
      <nav className={`h-[70px] w-full border-b flex items-center justify-between px-4 md:px-6 flex-shrink-0 min-w-0 transition-colors duration-200
        ${darkMode ? '!bg-[#141E5A] border-white/10' : '!bg-[#141E5A] md:!bg-white border-white/10 md:border-gray-200'}
      `}>
        {/* Left side - Page title */}
        <div className="flex items-center min-w-0 flex-shrink">
          <h1 className={`text-lg font-semibold truncate ${darkMode ? 'text-white' : 'text-white md:text-gray-800'}`}>
            {pageTitle}
          </h1>
        </div>

        {/* Right side - Search bar and Icons */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-shrink-0">
          {/* Search bar */}
          <div className="relative max-w-[200px] md:max-w-[300px] lg:max-w-[350px] w-full hidden sm:block">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-white/70' : 'text-white/70 md:text-[#1D8CF8]'}`} />
            <input
              type="text"
              placeholder="Search here..."
              className={cn(
                "w-full pl-10 pr-4 py-2 rounded-full",
                "border shadow-sm transition-shadow duration-200",
                "focus:outline-none focus:ring-2 focus:border-transparent",
                darkMode
                  ? "bg-[#111C44] border-[#111C44] text-white placeholder-gray-400 focus:ring-blue-500"
                  : "bg-white/10 md:bg-gray-100 border-white/10 md:border-gray-300 text-white md:text-gray-700 placeholder-white/50 md:placeholder-gray-400 focus:ring-blue-500 ring-offset-[#171E57] md:ring-offset-white"
              )}
            />
          </div>

          {/* Chat icon */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setIsChatOpen(true)}
              className={cn(
                "relative w-9 h-9 md:w-10 md:h-10 rounded-full",
                "flex items-center justify-center",
                "transition-colors duration-200",
                darkMode ? "bg-[#1D8CF8] hover:bg-[#1A7FE6]" : "bg-white/10 md:bg-[#1D8CF8] hover:bg-white/20 md:hover:bg-[#1A7FE6]"
              )}
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-[#F0F2F5]"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Chat Box */}
      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};






