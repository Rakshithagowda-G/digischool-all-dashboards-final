import React from 'react';
import { MoreVertical } from 'lucide-react';

export const StudentProgress = () => {
    const data = [
        { course: 'Mathematics', icon: '📐', progress: 92, status: 'Completed', color: 'bg-green-500' },
        { course: 'Science', icon: '🔬', progress: 45, status: 'In Progress', color: 'bg-blue-500' },
        { course: 'English', icon: '📖', progress: 88, status: 'On Track', color: 'bg-purple-500' },
        { course: 'Art', icon: '🎨', progress: 30, status: 'Started', color: 'bg-yellow-500' },
        { course: 'History', icon: '📜', progress: 60, status: 'In Progress', color: 'bg-yellow-500' },
    ];

    return (
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Subject Progress</h2>
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Course</th>
                            <th className="text-center py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Progress</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Completion</th>
                            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="group border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#A78BFA] text-white rounded-xl flex items-center justify-center text-lg shadow-sm">
                                            {item.icon}
                                        </div>
                                        <span className="font-semibold text-gray-900">{item.course}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <span className="font-bold text-gray-900">{item.progress}%</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-xs font-medium text-gray-500">{item.status}</span>
                                        <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${item.color}`}
                                                style={{ width: `${item.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <button className="text-gray-300 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-100">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
