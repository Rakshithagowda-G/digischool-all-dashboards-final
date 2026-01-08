import React, { useState, useEffect } from 'react';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import ParentService from '../services/ParentService';
import { Loader2, Info } from 'lucide-react';

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await ParentService.getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const formatDate = (ann) => {
    const dateValue = ann.issuedDate || ann.createdAt || ann.date;
    if (!dateValue) return "—";

    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return ann.date || "—";

    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6 @[media(min-width:1024px)_and_(max-width:1366px)]:p-4">
        <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex flex-col overflow-hidden relative">
          <DashboardNavbar />
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 relative scrollbar-hide flex flex-col @[media(min-width:1024px)_and_(max-width:1366px)]:p-4">
            <div className="flex-1 flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 ml-0 sm:ml-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Announcements
              </h1>

              <div className="flex flex-col gap-3 sm:gap-4 flex-1">
                {loading ? (
                  <div className="flex items-center justify-center p-10">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                  </div>
                ) : announcements.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-10 text-gray-500 italic bg-white rounded-lg shadow-sm border border-gray-100">
                    <Info className="w-8 h-8 mb-2" />
                    <span>No data available</span>
                  </div>
                ) : (
                  announcements.map((announcement, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-sm p-4 sm:p-6 relative border-l-4 border-[#171E57]"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${(announcement.authorType || 'admin') === 'admin'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                            }`}
                        >
                          By {announcement.author || 'Admin'}
                        </span>
                      </div>

                      <div className="pr-16 sm:pr-24">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                          {announcement.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                          Issued on {formatDate(announcement)}
                        </p>

                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {announcement.message || announcement.description}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default AnnouncementsPage;

