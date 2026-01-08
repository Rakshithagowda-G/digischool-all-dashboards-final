import Student from '../models/student.model.js';
import ResultSnapshot from '../models/result.model.js';
import AttendanceSnapshot from '../models/attendance.model.js';

/**
 * GET /api/student/results/overview
 * Purpose: Result Page Header Overview
 */
export const getResultOverview = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        if (!studentId) return res.status(200).json({});

        const [student, result, attendance] = await Promise.all([
            Student.findOne({ studentId }),
            ResultSnapshot.findOne({ studentId }).sort({ createdAt: -1 }),
            AttendanceSnapshot.findOne({ studentId }).sort({ createdAt: -1 })
        ]);

        if (!result) return res.status(200).json({});

        const totalMaxMarks = result.subjects.reduce((sum, s) => sum + s.maxMarks, 0);

        res.status(200).json({
            fullName: student?.fullName || "",
            examName: result.testName,
            totalMarksObtained: result.total,
            totalMaxMarks: totalMaxMarks,
            percentage: result.percentage,
            rank: result.rank || 0,
            resultStatus: result.percentage >= 35 ? "PASS" : "FAIL",
            attendancePercentage: attendance?.attendancePercentage || 0
        });
    } catch (error) {
        res.status(200).json({});
    }
};

/**
 * GET /api/student/results/subjects
 * Purpose: Table/Progress bars data
 */
export const getSubjectWiseMarks = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        if (!studentId) return res.status(200).json([]);

        const result = await ResultSnapshot.findOne({ studentId }).sort({ createdAt: -1 });

        if (!result || !result.subjects) return res.status(200).json([]);

        const subjectsData = result.subjects.map(s => ({
            subject: s.subjectName,
            maxMarks: s.maxMarks,
            minMarks: s.minMarks || 35,
            marksObtained: s.marks,
            percentage: Math.round((s.marks / s.maxMarks) * 100 * 10) / 10,
            result: s.marks >= (s.minMarks || 35) ? "PASS" : "FAIL"
        }));

        res.status(200).json(subjectsData);
    } catch (error) {
        res.status(200).json([]);
    }
};

/**
 * GET /api/student/results/performance
 * Purpose: Donut / Pie chart data
 */
export const getPerformanceChart = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        if (!studentId) return res.status(200).json({});

        const result = await ResultSnapshot.findOne({ studentId }).sort({ createdAt: -1 });

        if (!result || !result.subjects) return res.status(200).json({});

        res.status(200).json({
            totalMarks: result.total,
            subjects: result.subjects.map(s => ({
                label: s.subjectName,
                value: s.marks
            })),
            trend: result.trend || ""
        });
    } catch (error) {
        res.status(200).json({});
    }
};

/**
 * GET /api/student/results/top-subjects
 * Purpose: Middle school dashboard cards
 */
export const getTopSubjects = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        if (!studentId) return res.status(200).json([]);

        const result = await ResultSnapshot.findOne({ studentId }).sort({ createdAt: -1 });

        if (!result || !result.subjects) return res.status(200).json([]);

        // Sort by marks obtained desc and take top 3
        const topSubjects = [...result.subjects]
            .sort((a, b) => b.marks - a.marks)
            .slice(0, 3)
            .map(s => ({
                subject: s.subjectName,
                marks: s.marks,
                maxMarks: s.maxMarks,
                percentage: Math.round((s.marks / s.maxMarks) * 100 * 10) / 10
            }));

        res.status(200).json(topSubjects);
    } catch (error) {
        res.status(200).json([]);
    }
};

/**
 * GET /api/student/results/remarks
 * Purpose: Teacher feedback section
 */
export const getTeacherRemarks = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        if (!studentId) return res.status(200).json({});

        const result = await ResultSnapshot.findOne({ studentId }).sort({ createdAt: -1 });

        if (!result) return res.status(200).json({});

        res.status(200).json({
            remarks: result.remarks || "",
            teacherName: result.teacherName || ""
        });
    } catch (error) {
        res.status(200).json({});
    }
};
