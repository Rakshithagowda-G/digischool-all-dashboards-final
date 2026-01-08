"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";

export const AnnouncementsSection = ({ announcements }) => {
  return (
    <div className="w-full md:w-full xl:max-w-[320px] h-auto flex flex-col pb-4 md:pb-6 overflow-visible">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 ml-2">Announcements</h2>
      </div>

      {/* Announcements List */}
      <div className="flex flex-col gap-4 w-full min-h-[100px]">
        {announcements && announcements.length > 0 ? (
          announcements.map((announcement, index) => (
            <div
              key={announcement.id || index}
              className="relative w-full rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow transition-shadow overflow-hidden"
            >
              {/* Accent Bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-2 ${announcement.accentColor || 'bg-blue-500'}`} />

              {/* Content */}
              <div className="p-4 pl-6">
                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-4">
                  {announcement.title}
                </h3>

                {/* Date and Time */}
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>{announcement.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>{announcement.time}</span>
                  </div>
                </div>

                {/* Posted By */}
                <div className="flex items-center gap-2.5">
                  <img
                    src={announcement.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"}
                    alt={announcement.postedBy}
                    className="w-6 h-6 rounded-full object-cover border border-gray-200"
                  />
                  <span className="text-xs text-gray-600">{announcement.postedBy || "Staff"}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center p-8 bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-sm text-gray-500 font-medium">No data available</p>
          </div>
        )}
      </div>

      {/* View More Button */}
      <Link
        to="/announcements"
        className="w-full mt-6 py-2.5 px-4 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm text-center block"
      >
        View More
      </Link>
    </div>
  );
};

