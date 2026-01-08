import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

const GradeBook = ({ gradeBook }) => {
    // Backend returns { subjects: [...], testName, percentage }
    // If gradeBook is the full object, extract subjects. Fallback to empty array.
    const subjects = Array.isArray(gradeBook)
        ? gradeBook
        : (gradeBook?.subjects || []);

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 w-full h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Grade Book</h2>
            </div>

            <div className="w-full">
                {subjects.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                                <th className="pb-4 pl-2">Subject</th>
                                <th className="pb-4 text-center">Max Marks</th>
                                <th className="pb-4 text-center">Min Marks</th>
                                <th className="pb-4 text-center">Marks Obtained</th>
                                <th className="pb-4 text-right pr-2">Result</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {subjects.map((grade, index) => {
                                // Map backend fields to UI requirements
                                const marksObtained = grade.marks; // Controller returns 'marks'
                                const maxMarks = grade.maxMarks;
                                const minMarks = grade.minMarks || 35; // Default if not provided
                                const isPass = marksObtained >= minMarks;
                                const status = isPass ? "Pass" : "Fail";

                                return (
                                    <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 pl-2 font-semibold text-gray-900">{grade.subject}</td>
                                        <td className="py-4 text-center text-gray-500">{maxMarks}</td>
                                        <td className="py-4 text-center text-gray-500">{minMarks}</td>
                                        <td className="py-4 text-center font-bold text-gray-900">
                                            {marksObtained}
                                        </td>
                                        <td className="py-4 text-right pr-2">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${isPass ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                                                {isPass ? <CheckCircle className="w-4 h-4" /> : <div className="h-4 w-4 bg-red-400 rounded-full" />}
                                                {status}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-200">
                        <FileText className="w-12 h-12 text-slate-200 mb-2" />
                        <p className="text-sm text-slate-500 font-medium text-center">No grade book data available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export { GradeBook };
