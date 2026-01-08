import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { NotificationPopup } from './notification-popup';

export const NotificationsWidget = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Recent notifications to display in the widget
    const recentNotifications = [
        {
            id: 1,
            type: "success",
            title: "Assignment Submitted",
            message: "Your Math assignment has been successfully submitted.",
            time: "2 hours ago",
            read: false,
        },
        {
            id: 2,
            type: "info",
            title: "New Course Available",
            message: "Science Chapter 5: The Solar System is now available.",
            time: "5 hours ago",
            read: false,
        },
        {
            id: 3,
            type: "warning",
            title: "Upcoming Test",
            message: "English test scheduled for tomorrow at 10:00 AM.",
            time: "1 day ago",
            read: true,
        },
    ];

    const getNotificationIcon = (type) => {
        switch (type) {
            case "success":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "warning":
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            case "info":
                return <Info className="h-5 w-5 text-blue-500" />;
            default:
                return <Bell className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <>
            <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] rounded-full flex items-center justify-center">
                            <Bell className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-600">
                            {recentNotifications.filter(n => !n.read).length} New
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    {/* Notifications List */}
                    <div className="divide-y divide-gray-100">
                        {recentNotifications.map((notification, index) => (
                            <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 hover:bg-purple-50/50 transition-colors cursor-pointer"
                            >
                                <div className="flex gap-3">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 mt-0.5">
                                        {getNotificationIcon(notification.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className={`font-semibold text-gray-900 text-sm ${!notification.read ? 'font-bold' : ''}`}>
                                                {notification.title}
                                            </h3>
                                            {!notification.read && (
                                                <span className="flex-shrink-0 w-2 h-2 bg-[#A78BFA] rounded-full mt-1.5"></span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <Clock className="h-3 w-3" />
                                            <span>{notification.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* See All Button */}
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="w-full py-2.5 bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white rounded-lg font-semibold text-sm hover:from-[#8B5CF6] hover:to-[#7C3AED] transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            See All Notifications
                        </button>
                    </div>
                </div>
            </div>

            {/* Notification Popup */}
            <NotificationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </>
    );
};
