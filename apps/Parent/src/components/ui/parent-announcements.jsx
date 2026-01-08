import React, { useState, useEffect } from "react";
import { Bell, Calendar, Clock, Loader2, Info } from "lucide-react";
import ParentService from "@/services/ParentService";

export const ParentAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await ParentService.getAnnouncements();
                setAnnouncements(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching announcements:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnnouncements();
    }, []);

    const formatDateTime = (announcement) => {
        // If we have a raw date field, use it for full formatting (including year)
        const dateValue = announcement.issuedDate || announcement.publishedAt || announcement.createdAt;

        if (dateValue) {
            const d = new Date(dateValue);
            // Check if date is valid
            if (!isNaN(d.getTime())) {
                return {
                    date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                    time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                };
            }
        }

        // Fallback to backend pre-formatted fields if available
        return {
            date: announcement.date || "—",
            time: announcement.time || "—"
        };
    };

    return (
        <div className="w-full h-[500px] bg-white dark:bg-[#0A1333] rounded-xl shadow-sm border border-gray-100 dark:border-white/10 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 dark:border-white/10 flex-shrink-0">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-400 dark:text-blue-300" />
                    Announcements
                </h3>
            </div>

            {/* Scrollable Announcements List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-5 md:p-6">
                {loading ? (
                    <div className="flex items-center justify-center p-10">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : announcements.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 text-slate-500 italic">
                        <Info className="w-6 h-6 mb-2" />
                        No announcements available
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {announcements.map((announcement, index) => {
                            const { date, time } = formatDateTime(announcement);
                            return (
                                <div
                                    key={index}
                                    className="relative rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:shadow-sm transition-shadow overflow-hidden"
                                >
                                    {/* Accent Bar */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#171E57]" />

                                    {/* Content */}
                                    <div className="p-4 pl-5">
                                        {/* Title */}
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug mb-2">
                                            {announcement.title}
                                        </h4>

                                        {/* Message snippet if available */}
                                        {(announcement.message || announcement.description) && (
                                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                                                {announcement.message || announcement.description}
                                            </p>
                                        )}

                                        {/* Date and Time */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                                                <Calendar className="w-3.5 h-3.5 text-blue-400 dark:text-blue-300" />
                                                <span>{date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                                                <Clock className="w-3.5 h-3.5 text-blue-400 dark:text-blue-300" />
                                                <span>{time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
