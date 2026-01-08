import React, { useState, useEffect } from "react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { FileText, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { getGradeBook } from "@/lib/api";

export const GradeBook = () => {
    const { darkMode } = useDarkMode();
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const searchParams = new URLSearchParams(window.location.search);
                const studentId = searchParams.get('studentId') || 'STU001';
                const response = await getGradeBook(studentId);
                setGrades(response?.subjects || []);
            } catch (error) {
                console.error("Error fetching gradebook:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div
            className={`rounded-[20px] p-6 w-full h-full flex flex-col ${darkMode ? 'bg-[#111c44] text-white' : 'bg-white text-slate-900'} shadow-sm`}
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold">Grade Book</h3>
            </div>

            <div className="overflow-x-auto scrollbar-hide flex-1">
                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>Loading grades...</p>
                    </div>
                ) : grades.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                        <AlertCircle className="w-10 h-10 text-gray-400 mb-4" />
                        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>No grade data available</p>
                    </div>
                ) : (
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <th className="pb-4 text-left font-semibold">Subject</th>
                                <th className="pb-4 text-center font-semibold">Max Marks</th>
                                <th className="pb-4 text-center font-semibold">Min Marks</th>
                                <th className="pb-4 text-left font-semibold pl-4">Marks Obtained</th>
                                <th className="pb-4 text-right font-semibold">Result</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {grades.map((grade, index) => {
                                const marks = grade.marks || 0;
                                const maxMarks = grade.maxMarks || 100;
                                const minMarks = grade.minMarks || 35;
                                const isPass = grade.result === 'PASS' || marks >= minMarks;
                                const resultText = isPass ? "PASS" : "FAIL";

                                return (
                                    <tr key={index} className={`group ${index !== grades.length - 1 ? 'border-b' : ''} ${darkMode ? 'border-gray-800' : 'border-gray-50'}`}>
                                        <td className="py-4 font-semibold">{grade.subject}</td>
                                        <td className={`py-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{maxMarks}</td>
                                        <td className={`py-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{minMarks}</td>
                                        <td className="py-4 pl-4">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold w-6">{marks}</span>
                                                <div className={`flex-1 h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full overflow-hidden max-w-[120px]`}>
                                                    <div
                                                        className={`h-full rounded-full ${isPass ? 'bg-green-500' : 'bg-red-500'}`}
                                                        style={{ width: `${(marks / maxMarks) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${isPass
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                                }`}>
                                                {isPass && (
                                                    <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                                )}
                                                {resultText}
                                            </span>
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
