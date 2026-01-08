import React from 'react';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { useTheme } from '../context/ThemeContext';

const announcements = [
  {
    id: 1,
    title: 'Announcement Title',
    issuedDate: '14/11/2025',
    description: 'Exams have been postponed due to global warming in china.',
    author: 'Admin',
    authorType: 'admin'
  },
  {
    id: 2,
    title: 'Announcement Title',
    issuedDate: '14/11/2025',
    description: 'Exams have been postponed due to global warming in china.',
    author: 'Teacher',
    authorType: 'teacher'
  },
  {
    id: 3,
    title: 'Announcement Title',
    issuedDate: '14/11/2025',
    description: 'Exams have been postponed due to global warming in china.',
    author: 'Admin',
    authorType: 'admin'
  }
];

function AnnouncementsPage() {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
        <div className={`
          w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden relative transition-colors duration-200
          ${isDark ? 'bg-[#0F1115]' : 'bg-slate-100'}
        `}>
          {/* Static Navbar at top */}
          <DashboardNavbar />
          <div className={`
            flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 relative scrollbar-hide flex flex-col transition-colors duration-200
            ${isDark ? 'bg-[#0F1115]' : ''}
          `}>
            <div className="flex-1 flex flex-col">
              {/* Page Title */}
              <h1 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ml-0 sm:ml-3 ${isDark ? 'text-[#FFFFFF]' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Announcements
              </h1>

              {/* Announcements List */}
              <div className="flex flex-col gap-3 sm:gap-4 flex-1">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`rounded-lg shadow-sm p-4 sm:p-6 relative ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {/* Author Tag - Top Right */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${announcement.authorType === 'admin'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                          }`}
                      >
                        By {announcement.author}
                      </span>
                    </div>

                    {/* Announcement Content */}
                    <div className="pr-16 sm:pr-24">
                      {/* Title */}
                      <h2 className={`text-base sm:text-lg font-bold mb-2 ${isDark ? 'text-[#FFFFFF]' : 'text-gray-900'}`}>
                        {announcement.title}
                      </h2>

                      {/* Issue Date */}
                      <p className={`text-xs sm:text-sm mb-2 sm:mb-3 ${isDark ? 'text-[#9CA3AF]' : 'text-gray-500'}`}>
                        Issued on {announcement.issuedDate}
                      </p>

                      {/* Description */}
                      <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-gray-700'}`}>
                        {announcement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default AnnouncementsPage;

