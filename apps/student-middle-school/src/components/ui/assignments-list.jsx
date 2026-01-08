import React from "react";
import { FileText, CheckCircle2, Clock, AlertCircle, FileSpreadsheet, FileBox, FileCode } from "lucide-react";

const AssignmentsList = ({ assignments = [] }) => {
    const processedAssignments = assignments.map(asg => {
        const isCompleted = asg.status === "Submitted";
        return {
            ...asg,
            icon: isCompleted ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Clock className="w-5 h-5 text-white" />,
            iconBg: isCompleted ? "bg-green-500" : "bg-blue-500",
            statusColor: isCompleted ? "text-green-600 bg-green-50" : "text-orange-600 bg-orange-50",
            statusIcon: isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />
        };
    });

    const submittedCount = assignments.filter(a => a.status === "Submitted").length;
    const pendingCount = assignments.filter(a => a.status === "Pending").length;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col w-full h-full overflow-hidden">
            <div className="p-6 pb-2 border-b border-gray-50 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold text-[#1E266D]">Assignments</h3>
            </div>

            <div className="flex-1 overflow-auto">
                {assignments.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Assignment</th>
                                <th className="text-left px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Subject</th>
                                <th className="text-left px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Due Date</th>
                                <th className="text-left px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {processedAssignments.map((item, idx) => (
                                <tr key={item.id || idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${item.iconBg}`}>
                                                {item.icon}
                                            </div>
                                            <span className="font-semibold text-[#1E266D] text-sm">{item.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{item.subject}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{item.dueDate}</td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${item.statusColor}`}>
                                            {item.statusIcon}
                                            {item.status}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 h-full">
                        <FileText className="w-12 h-12 text-slate-200 mb-2" />
                        <p className="text-sm text-slate-500 font-medium">No data available</p>
                    </div>
                )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-slate-50/30 flex gap-6 mt-auto">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-xs font-semibold text-slate-600">Submitted: {submittedCount}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-orange-500" />
                    <span className="text-xs font-semibold text-slate-600">Pending: {pendingCount}</span>
                </div>
            </div>
        </div>
    );
};

export { AssignmentsList };
