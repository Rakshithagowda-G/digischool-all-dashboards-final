import React from 'react';
import { MoreVertical, Heart, MessageSquare, Share2 } from 'lucide-react';

export const ClassWall = () => {
    const posts = [
        {
            id: 1,
            author: "Mrs. Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
            time: "2 hours ago",
            content: "Don't forget to submit your science projects by Friday! 🧪✨",
            likes: 12,
            comments: 4
        },
        {
            id: 2,
            author: "Mr. Smith",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            time: "5 hours ago",
            content: "Great job everyone on the math quiz today! 📝💯",
            likes: 24,
            comments: 8
        }
    ];

    return (
        <div className="w-full bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Class Wall</h2>
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>

            <div className="space-y-6">
                {posts.map((post) => (
                    <div key={post.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={post.avatar}
                                alt={post.author}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-900 text-sm">{post.author}</h3>
                                <p className="text-xs text-gray-500">{post.time}</p>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {post.content}
                        </p>

                        <div className="flex items-center gap-6">
                            <button className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors group">
                                <Heart size={18} className="group-hover:fill-current" />
                                <span className="text-xs font-medium">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors">
                                <MessageSquare size={18} />
                                <span className="text-xs font-medium">{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors">
                                <Share2 size={18} />
                                <span className="text-xs font-medium">Share</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
