import React from 'react';
import { MoreVertical, Search } from 'lucide-react';

export const Messages = () => {
    const messages = [
        {
            id: 1,
            name: "Sarah Parker",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            message: "Hey! Do you have the notes for...",
            time: "10:30 AM",
            unread: 2
        },
        {
            id: 2,
            name: "Mike Johnson",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
            message: "Thanks for helping me out!",
            time: "Yesterday",
            unread: 0
        },
        {
            id: 3,
            name: "Emily Davis",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
            message: "Are we meeting for the group...",
            time: "Yesterday",
            unread: 0
        }
    ];

    return (
        <div className="w-full bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <Search size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                        <div className="relative">
                            <img
                                src={msg.avatar}
                                alt={msg.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            {msg.unread > 0 && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-gray-900 text-sm truncate">{msg.name}</h3>
                                <span className="text-xs text-gray-400">{msg.time}</span>
                            </div>
                            <p className="text-sm text-gray-500 truncate group-hover:text-gray-700 transition-colors">
                                {msg.message}
                            </p>
                        </div>

                        {msg.unread > 0 && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px] font-bold text-white">{msg.unread}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                View All Messages
            </button>
        </div>
    );
};
