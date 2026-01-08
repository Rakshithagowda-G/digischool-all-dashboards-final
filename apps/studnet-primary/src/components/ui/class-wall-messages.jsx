import React, { useState } from 'react';
import { MoreVertical, Heart, MessageSquare, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const ClassWallMessages = () => {
    const { mode } = useTheme();
    const isDark = mode === 'dark';
    const isHomePage = window.location.pathname === '/';

    const announcements = [
        {
            id: 1,
            author: "Principal Smith",
            role: "Principal",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
            time: "Nov 25, 09:00am",
            content: "Important: Annual Sports Day will be held on December 15th. All students are required to participate. Please submit your event preferences by December 1st."
        },
        {
            id: 2,
            author: "Ms. Johnson",
            role: "Academic Coordinator",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
            time: "Nov 24, 02:30pm",
            content: "Mid-term examinations are scheduled from December 5th to December 12th. The exam timetable has been uploaded to the student portal."
        },
        {
            id: 3,
            author: "Mr. Davis",
            role: "Admin",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            time: "Nov 23, 11:15am",
            content: "Winter break will commence from December 20th. School will reopen on January 8th. Wishing everyone a wonderful holiday season!"
        },
        {
            id: 4,
            author: "Dr. Martinez",
            role: "Health Officer",
            avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
            time: "Nov 22, 10:00am",
            content: "Health checkup camp will be organized on November 30th. All students must bring their health cards."
        },
        {
            id: 5,
            author: "Library Staff",
            role: "Librarian",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
            time: "Nov 21, 03:45pm",
            content: "New books have arrived in the library. Students can check them out starting Monday. Happy reading!"
        }
    ];

    return (
        <>
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className={`
                    rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full flex flex-col
                    ${isDark && isHomePage ? 'bg-[#181B21]' : 'bg-white'}
                `}
            >
                {/* Header */}
                <div className={`
                    flex border-b
                    ${isDark && isHomePage ? 'border-[#232730]' : 'border-gray-100'}
                `}>
                    <div className={`
                        flex-1 px-4 py-3 text-sm font-medium
                        ${isDark && isHomePage
                            ? 'bg-[#06B6D4] text-white'
                            : 'bg-gradient-to-r from-purple-300 to-purple-400 text-white'
                        }
                    `}>
                        Announcements
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex-1 flex flex-col min-h-0">
                    <div className="space-y-4 flex-1 overflow-y-auto hide-scrollbar max-h-[400px] md:max-h-[180px] lg:max-h-[400px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {announcements.map((post) => (
                            <div key={post.id} className={`
                                border-b last:border-0 pb-4 last:pb-0
                                ${isDark && isHomePage ? 'border-[#232730]' : 'border-gray-100'}
                            `}>
                                <div className="flex items-center gap-3 mb-3">
                                    <img
                                        src={post.avatar}
                                        alt={post.author}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className={`
                                                font-semibold text-sm
                                                ${isDark && isHomePage ? 'text-[#FFFFFF]' : 'text-gray-900'}
                                            `}>
                                                {post.author}
                                            </h3>
                                            <span className={`
                                                text-xs
                                                ${isDark && isHomePage ? 'text-[#6B7280]' : 'text-gray-400'}
                                            `}>•</span>
                                            <span className={`
                                                text-xs
                                                ${isDark && isHomePage ? 'text-[#9CA3AF]' : 'text-gray-500'}
                                            `}>
                                                {post.role}
                                            </span>
                                        </div>
                                        <p className={`
                                            text-xs
                                            ${isDark && isHomePage ? 'text-[#6B7280]' : 'text-gray-400'}
                                        `}>
                                            {post.time}
                                        </p>
                                    </div>
                                </div>

                                <p className={`
                                    text-sm mb-3 leading-relaxed
                                    ${isDark && isHomePage ? 'text-[#9CA3AF]' : 'text-gray-600'}
                                `}>
                                    {post.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};
