import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Clock, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const NotificationPopup = ({ isOpen, onClose }) => {
    // Generate notifications for the past week
    const generateNotifications = () => {
        const now = new Date();
        const notifications = [
            {
                id: 1,
                type: "success",
                title: "Assignment Submitted",
                message: "Your Math assignment has been successfully submitted.",
                time: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
                read: false,
            },
            {
                id: 2,
                type: "info",
                title: "New Course Available",
                message: "Science Chapter 5: The Solar System is now available.",
                time: new Date(now - 5 * 60 * 60 * 1000), // 5 hours ago
                read: false,
            },
            {
                id: 3,
                type: "warning",
                title: "Upcoming Test",
                message: "English test scheduled for tomorrow at 10:00 AM.",
                time: new Date(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
                read: true,
            },
            {
                id: 4,
                type: "success",
                title: "Achievement Unlocked",
                message: "You've completed 10 reading activities! Keep it up!",
                time: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                read: true,
            },
            {
                id: 5,
                type: "info",
                title: "New Event Added",
                message: "Annual Sports Day scheduled for next Friday.",
                time: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                read: true,
            },
            {
                id: 6,
                type: "warning",
                title: "Assignment Due Soon",
                message: "History assignment due in 2 days.",
                time: new Date(now - 4 * 24 * 60 * 60 * 1000), // 4 days ago
                read: true,
            },
            {
                id: 7,
                type: "success",
                title: "Great Performance",
                message: "You scored 95% in your recent Math test!",
                time: new Date(now - 5 * 24 * 60 * 60 * 1000), // 5 days ago
                read: true,
            },
            {
                id: 8,
                type: "info",
                title: "Library Book Reminder",
                message: "Your library book 'The Adventures of Tom Sawyer' is due in 3 days.",
                time: new Date(now - 6 * 24 * 60 * 60 * 1000), // 6 days ago
                read: true,
            },
        ];
        return notifications;
    };

    const notifications = generateNotifications();

    const getTimeAgo = (date) => {
        const now = new Date();
        const diffInMs = now - date;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
        } else {
            return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
        }
    };

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
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white px-6 py-4 flex items-center justify-between border-b border-purple-400">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Bell className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">All Notifications</h2>
                                    <p className="text-sm text-purple-100">Last 7 days</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
                            >
                                <X className="h-5 w-5 text-white" />
                            </button>
                        </div>

                        {/* Notifications List */}
                        <div className="overflow-y-auto max-h-[calc(80vh-88px)] scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
                            {notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 px-6">
                                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                        <Bell className="h-10 w-10 text-purple-400" />
                                    </div>
                                    <p className="text-gray-500 text-center">No notifications yet</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {notifications.map((notification, index) => (
                                        <motion.div
                                            key={notification.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={cn(
                                                "px-6 py-4 hover:bg-purple-50/50 transition-colors duration-200 cursor-pointer",
                                                !notification.read && "bg-purple-50/30"
                                            )}
                                        >
                                            <div className="flex gap-4">
                                                {/* Icon */}
                                                <div className="flex-shrink-0 mt-1">
                                                    {getNotificationIcon(notification.type)}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-1">
                                                        <h3
                                                            className={cn(
                                                                "font-semibold text-gray-900 text-sm",
                                                                !notification.read && "font-bold"
                                                            )}
                                                        >
                                                            {notification.title}
                                                        </h3>
                                                        {!notification.read && (
                                                            <span className="flex-shrink-0 w-2 h-2 bg-[#A78BFA] rounded-full mt-1.5"></span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{getTimeAgo(notification.time)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-gray-50 px-6 py-3 border-t border-gray-200">
                            <button
                                onClick={onClose}
                                className="w-full py-2.5 bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white rounded-lg font-semibold hover:from-[#8B5CF6] hover:to-[#7C3AED] transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
