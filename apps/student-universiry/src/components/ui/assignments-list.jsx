import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "@/contexts/DarkModeContext";
import {
    FileText,
    Clock,
    CheckCircle,
    AlertCircle,
    Loader2,
    Calculator,
    FlaskConical,
    BookOpen,
    Languages,
    Code,
    TestTube,
    ArrowRight
} from "lucide-react";
import { getTopAssignments } from "@/lib/api";

const getSubjectIcon = (subject) => {
    const s = subject?.toLowerCase() || "";
    if (s.includes("math")) return Calculator;
    if (s.includes("science")) return FlaskConical;
    if (s.includes("history")) return BookOpen;
    if (s.includes("english")) return Languages;
    if (s.includes("computer") || s.includes("programming")) return Code;
    if (s.includes("chemistry")) return TestTube;
    return FileText;
};

const StatusBadge = ({ status }) => {
    const styles = {
        Submitted: "bg-green-100 text-green-600",
        Pending: "bg-orange-100 text-orange-600",
        "In Progress": "bg-slate-200 text-slate-800",
    };

    const icons = {
        Submitted: <CheckCircle className="w-3.5 h-3.5 mr-1.5" />,
        Pending: <AlertCircle className="w-3.5 h-3.5 mr-1.5" />,
        "In Progress": <Clock className="w-3.5 h-3.5 mr-1.5" />,
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-700"}`}>
            {icons[status] || <AlertCircle className="w-3.5 h-3.5 mr-1.5" />}
            {status}
        </span>
    );
};

export const AssignmentsList = () => {
    const { darkMode } = useDarkMode();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const searchParams = new URLSearchParams(window.location.search);
                const studentId = searchParams.get('studentId') || 'STU001';
                const response = await getTopAssignments(studentId);
                setAssignments(Array.isArray(response) ? response : []);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    };

    return (
        <div
            className={`rounded-[20px] p-6 w-full h-full flex flex-col ${darkMode ? 'bg-[#111c44] text-white' : 'bg-white text-slate-900'} shadow-sm`}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold">Assignments</h3>
                </div>
                <Link
                    to="/assignment"
                    className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                    View All
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="flex-1 overflow-x-auto scrollbar-hide">
                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-12">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>Loading assignments...</p>
                    </div>
                ) : assignments.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                        <AlertCircle className="w-10 h-10 text-gray-400 mb-4" />
                        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>No assignments available</p>
                    </div>
                ) : (
                    <table className="w-full min-w-[500px]">
                        <thead>
                            <tr className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <th className="pb-4 text-left font-semibold pl-2">Assignment</th>
                                <th className="pb-4 text-left font-semibold">Subject</th>
                                <th className="pb-4 text-left font-semibold">Due Date</th>
                                <th className="pb-4 text-right font-semibold pr-2">Completion</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {assignments.map((assignment, index) => {
                                const IconComponent = getSubjectIcon(assignment.subject);
                                return (
                                    <tr key={assignment.assignmentId || index} className={`group ${index !== assignments.length - 1 ? 'border-b' : ''} ${darkMode ? 'border-gray-800' : 'border-gray-50'}`}>
                                        <td className="py-4 pl-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500 text-white'}`}>
                                                    <IconComponent className="w-5 h-5" />
                                                </div>
                                                <span className="font-semibold truncate max-w-[150px]">{assignment.title}</span>
                                            </div>
                                        </td>
                                        <td className={`py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{assignment.subject}</td>
                                        <td className={`py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formatDate(assignment.dueDate)}</td>
                                        <td className="py-4 text-right pr-2">
                                            <StatusBadge status={assignment.status} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
