import React from 'react';
import { Notifications } from '../components/ui/Notifications';

const NotificationsDemo = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Notifications Component */}
                    <div>
                        <Notifications />
                    </div>

                    {/* Other Dashboard Content */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Other Content</h2>
                        <p className="text-gray-600">
                            This is where other dashboard widgets would go. The notifications panel
                            will expand inline without affecting this content.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsDemo;
