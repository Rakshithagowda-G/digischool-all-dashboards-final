import React, { useState, useEffect } from "react";
import { FileText, CheckCircle, Clock, AlertCircle, Calculator, Beaker, BookOpen, BookA, Code, TestTube, Loader2, Info } from "lucide-react";
import ParentService, { DEFAULT_STUDENT_ID } from "@/services/ParentService";

// Subject icon mapping
const subjectIcons = {
    "Mathematics": Calculator,
    "Science": Beaker,
    "History": BookOpen,
    "English": BookA,
    "Computer Science": Code,
    "Chemistry": TestTube
};

const getStatusDetails = (status) => {
    switch (status) {
        case 'Completed':
        case 'Submitted':
            return {
                color: "text-green-600",
                bg: "bg-green-100",
                icon: CheckCircle
            };
        case 'Pending':
            return {
                color: "text-orange-600",
                bg: "bg-orange-100",
                icon: AlertCircle
            };
        case 'In Progress':
            return {
                color: "text-[#171E57]",
                bg: "bg-[#171E57]/10",
                icon: Clock
            };
        default:
            return {
                color: "text-slate-600",
                bg: "bg-slate-100",
                icon: Info
            };
    }
};
export const AssignmentsTable = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const studentId = urlParams.get('studentId') || DEFAULT_STUDENT_ID;

            try {
                const data = await ParentService.getAssignments(studentId);
                setAssignments(data);
            } catch (err) {
                console.error("Error fetching assignments:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, []);

    const safeAssignments = Array.isArray(assignments) ? assignments : [];

    const footerStats = safeAssignments.reduce((acc, curr) => {
        const status = curr?.status;
        if (status === 'Submitted' || status === 'Completed') acc.submitted++;
        else if (status === 'Pending') acc.pending++;
        else if (status === 'In Progress') acc.inProgress++;
        return acc;
    }, { submitted: 0, pending: 0, inProgress: 0 });

    return (
        <div className="w-full bg-white dark:bg-[#0A1333] rounded-xl shadow-sm border border-gray-100 dark:border-white/10 flex flex-col h-full min-h-[400px]">
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 dark:border-white/10 flex-shrink-0">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400 dark:text-blue-300" />
                    Assignments
                </h3>
            </div>

            {/* Scrollable Table */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {loading ? (
                    <div className="flex items-center justify-center p-10">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : safeAssignments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 text-slate-500 italic">
                        <Info className="w-6 h-6 mb-2" />
                        No assignments available
                    </div>
                ) : (
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse">
                            <thead className="sticky top-0 bg-white dark:bg-[#0A1333] z-10 shadow-[0_1px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
                                <tr className="border-b border-gray-200 dark:border-white/10">
                                    <th className="text-left py-3 px-2 sm:px-4 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Assignment</th>
                                    <th className="text-left py-3 px-2 sm:px-4 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase hidden sm:table-cell">Subject</th>
                                    <th className="text-left py-3 px-2 sm:px-4 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Due Date</th>
                                    <th className="text-left py-3 px-2 sm:px-4 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {safeAssignments.map((assignment, index) => {
                                    const { color, bg, icon: StatusIcon } = getStatusDetails(assignment.status || 'Unknown');
                                    const SubjectIcon = subjectIcons[assignment.subject] || FileText;
                                    return (
                                        <tr key={index} className="border-b border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="py-3 sm:py-4 px-2 sm:px-4">
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center flex-shrink-0">
                                                        <SubjectIcon className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{assignment.title || "Untitled"}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 sm:py-4 px-2 sm:px-4 hidden sm:table-cell">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{assignment.subject || "N/A"}</span>
                                            </td>
                                            <td className="py-3 sm:py-4 px-2 sm:px-4">
                                                <span className="text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">{assignment.dueDate || "N/A"}</span>
                                            </td>
                                            <td className="py-3 sm:py-4 px-2 sm:px-4">
                                                <div className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${bg} whitespace-nowrap`}>
                                                    <StatusIcon className={`w-3.5 h-3.5 ${color}`} />
                                                    <span className={`text-[10px] sm:text-xs font-semibold ${color}`}>
                                                        {assignment.status || "Unknown"}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer stats */}
            <div className="flex items-center justify-between p-5 md:px-6 md:py-4 border-t border-gray-100 dark:border-white/10 flex-shrink-0">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-slate-600 dark:text-slate-300">Submitted: {footerStats.submitted}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-xs text-slate-600 dark:text-slate-300">Pending: {footerStats.pending}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#171E57]"></div>
                        <span className="text-xs text-slate-600 dark:text-slate-300">In Progress: {footerStats.inProgress}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
