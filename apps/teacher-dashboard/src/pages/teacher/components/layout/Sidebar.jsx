// Sidebar component 
import React from 'react';
import {
  LayoutDashboard, Users, ClipboardCheck, BookCopy, FileEdit, FileText, 
  Calendar, Briefcase, Video
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, isSidebarOpen, setIsSidebarOpen }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const navItems = [
    { name: "Home", icon: LayoutDashboard },
    { name: "Subject", icon: Briefcase },
    { name: "Classes", icon: Users },
    { name: "Assignments", icon: ClipboardCheck },
    { name: "Notes", icon: BookCopy },
    { name: "Exams", icon: FileEdit },
    { name: "Report Card", icon: FileText },
    { name: "Lesson planner", icon: Calendar },
    { name: "Meeting", icon: Video }
  ];

  const NavLink = ({ item }) => {
    const { name, icon: Icon } = item;
    const isActive = currentPage === name;
    return (
      <button
        onClick={() => {
          setCurrentPage(name);
          setIsSidebarOpen(false);
        }}
        className={`
          group relative flex items-center w-full px-4 py-3 rounded-xl 
          transition-all duration-300 ease-in-out 
          ${isActive
            ? "bg-gradient-to-r from-white to-white/95 text-[#2F69FF] shadow-lg scale-1 rounded-3xl "
            : "text-white/90 hover:text-white hover:bg-white/10 hover:scale-105 hover:shadow-md"
          }
          ${!isExpanded ? 'justify-center' : ''}
        `}
        title={!isExpanded ? name : ''}
      >
        <div className={`${isActive ? 'animate-pulse' : ''}`}>
          <Icon 
            size={22} 
            className={`${!isExpanded ? '' : 'mr-3'} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`} 
            strokeWidth={2.5}
          />
        </div>
        <span 
          className={`font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden ${
            !isExpanded ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}
        >
          {name}
        </span>
        {isActive && isExpanded && (
          <div className="absolute right-3 w-2 h-2 bg-blue-900 rounded-full"></div>
        )}
      </button>
    );
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen 
          bg-gradient-to-b from-blue-900 via-blue-900 to-blue-900
          text-white flex flex-col p-4 
          transition-all duration-300 ease-in-out
          shadow-2xl
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${isExpanded ? 'w-64' : 'w-20'}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center p-[-2] mb-2">
          <div className={`transition-all duration-300 overflow-hidden ${
            !isExpanded ? 'w-10 h-10' : 'w-full'
          }`}>
            <div className={`flex items-center ${!isExpanded ? 'justify-center' : 'justify-start'} gap-3`}>
              <span 
                className={`text-xl font-bold whitespace-nowrap transition-all duration-300 ${
                  !isExpanded ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}
              >
                EduPortal
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 mb-6"></div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
          <span 
            className={`px-4 text-xs font-semibold text-white/60 uppercase tracking-wider transition-all duration-300 block mb-3 ${
              !isExpanded ? 'opacity-0 h-0' : 'opacity-100 h-auto'
            }`}
          >
            MENU
          </span>
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>

        {/* Footer decoration */}
        <div className="mt-auto pt-4">
          <div className={`h-1 bg-gradient-to-r from-white/0 via-white/40 to-white/0 rounded-full transition-all duration-300 ${
            !isExpanded ? 'opacity-50' : 'opacity-100'
          }`}></div>
        </div>
      </aside>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 1.5px;

        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
};

export default Sidebar;
