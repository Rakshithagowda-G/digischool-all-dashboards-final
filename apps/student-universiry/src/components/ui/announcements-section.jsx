import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Bell, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { getLatestAnnouncements } from "@/lib/api";

export const AnnouncementsSection = () => {
  const { darkMode } = useDarkMode();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(window.location.search);
        const studentId = searchParams.get('studentId') || 'STU001';
        const response = await getLatestAnnouncements(studentId);
        setAnnouncements(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={`w-full h-full rounded-[20px] p-6 flex flex-col ${darkMode ? 'bg-[#111c44] text-white' : 'bg-white text-slate-900'} shadow-sm`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold">Announcements</h2>
        </div>
        <Link
          to="/announcements"
          className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Announcements List - Show only first 3 */}
      <div className="flex flex-col gap-4 w-full flex-1">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
            <AlertCircle className="w-8 h-8 text-gray-400 mb-2" />
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No announcements</p>
          </div>
        ) : announcements.slice(0, 3).map((announcement, index) => (
          <div
            key={announcement._id || index}
            className={`relative w-full rounded-xl p-4 pl-5 border shadow-sm hover:shadow transition-shadow overflow-hidden flex-shrink-0 ${darkMode ? 'bg-[#0F172A] border-gray-800' : 'bg-slate-50 border-gray-100'}`}
          >
            {/* Accent Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${darkMode ? 'bg-blue-500' : 'bg-[#111c44]'}`} />

            {/* Content */}
            <div className="flex flex-col gap-2">
              {/* Title */}
              <h3 className={`text-sm font-bold leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {announcement.title}
              </h3>

              {/* Date and Time */}
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-medium">{announcement.date}</span>
                </div>
                {announcement.time && (
                  <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span className="font-medium">{announcement.time}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

