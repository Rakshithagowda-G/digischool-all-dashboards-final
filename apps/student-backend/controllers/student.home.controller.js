import Student from '../models/student.model.js';
import Assignment from '../models/assignment.model.js';
import AttendanceSnapshot from '../models/attendance.model.js';
import ResultSnapshot from '../models/result.model.js';
import Announcement from '../models/announcement.model.js';

/**
 * GET /api/student/home/welcome
 * Purpose: Welcome card (student name)
 */
export const getWelcomeData = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        const student = await Student.findOne({ studentId });

        if (!student) {
            return res.status(200).json({});
        }

        res.status(200).json({
            studentId: student.studentId,
            fullName: student.fullName,
            schoolType: student.schoolType || student.educationLevel?.toUpperCase()
        });
    } catch (error) {
        res.status(200).json({});
    }
};

/**
 * GET /api/student/home/summary
 * Purpose: Summary cards shown on Home page
 */
export const getHomeSummary = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        const latestAttendance = await AttendanceSnapshot.findOne({ studentId }).sort({ year: -1, month: -1 });
        const assignmentsCompleted = await Assignment.countDocuments({ studentId, status: "Submitted" });
        const pendingTasks = await Assignment.countDocuments({ studentId, status: "Pending" });
        const latestResult = await ResultSnapshot.findOne({ studentId }).sort({ createdAt: -1 });

        res.status(200).json({
            attendancePercentage: latestAttendance?.attendancePercentage || 0,
            assignmentsCompleted: assignmentsCompleted || 0,
            averageGrade: latestResult?.percentage ? `${latestResult.percentage}%` : "", // Using percentage as grade as per schema
            pendingTasks: pendingTasks || 0
        });
    } catch (error) {
        res.status(200).json({
            attendancePercentage: 0,
            assignmentsCompleted: 0,
            averageGrade: "",
            pendingTasks: 0
        });
    }
};

/**
 * GET /api/student/home/attendance-overview
 * Purpose: Monthly attendance calendar (Home page)
 */
export const getAttendanceOverview = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        const snapshot = await AttendanceSnapshot.findOne({ studentId }).sort({ year: -1, month: -1 });

        if (!snapshot) {
            return res.status(200).json({});
        }

        res.status(200).json({
            month: snapshot.month,
            year: snapshot.year,
            attendancePercentage: snapshot.attendancePercentage,
            days: snapshot.days.map(day => ({
                date: day.date,
                status: day.status
            }))
        });
    } catch (error) {
        res.status(200).json({});
    }
};

/**
 * GET /api/student/home/assignments
 * Purpose: Home page assignments list
 */
export const getTopAssignments = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        const assignments = await Assignment.find({ studentId })
            .sort({ dueDate: 1 })
            .limit(5);

        res.status(200).json(assignments.map(a => ({
            assignmentId: a.assignmentId,
            subject: a.subject,
            title: a.title,
            dueDate: a.dueDate,
            status: a.status
        })));
    } catch (error) {
        res.status(200).json([]);
    }
};

/**
 * GET /api/student/home/announcements
 * Purpose: Latest announcements on Home page
 */
export const getLatestAnnouncements = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        // Fetch student for schoolType filtering
        const student = await Student.findOne({ studentId }).lean();

        let query = {};
        if (student) {
            const studentSchoolType = student.schoolType || student.educationLevel?.toUpperCase();
            query = {
                $or: [
                    { target: "ALL_STUDENTS" },
                    { schoolType: studentSchoolType, target: "SCHOOL" },
                    { targetGrade: student.class, target: "CLASS" },
                    // Fallbacks for old data
                    { target: { $exists: false }, schoolType: studentSchoolType },
                    { targetLevel: { $in: ["all", studentSchoolType?.toLowerCase()] } }
                ]
            };
        }

        const announcements = await Announcement.find(query)
            .sort({ issuedDate: -1, postedDate: -1 })
            .limit(5)
            .lean();

        res.status(200).json(announcements.map(a => ({
            title: a.title,
            message: a.message || a.content,
            issuedDate: a.issuedDate || a.postedDate,
            schoolType: a.schoolType || a.targetLevel
        })));
    } catch (error) {
        res.status(200).json([]);
    }
};

/**
 * GET /api/student/home/gradebook
 * Purpose: Grade Book widget on Home page
 */
export const getGradeBook = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        const snapshot = await ResultSnapshot.findOne({ studentId }).sort({ createdAt: -1 });

        if (!snapshot) {
            return res.status(200).json({});
        }

        res.status(200).json({
            testName: snapshot.testName,
            subjects: snapshot.subjects.map(s => ({
                subject: s.subjectName,
                marks: s.marks,
                maxMarks: s.maxMarks
            })),
            percentage: snapshot.percentage
        });
    } catch (error) {
        res.status(200).json({});
    }
};

/**
 * GET /api/student/home/performance
 * Purpose: Performance widget for Primary dashboard Home page (Donut Chart)
 */
export const getPerformance = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        if (!studentId) {
            return res.status(200).json({ subjects: [] });
        }

        const snapshot = await ResultSnapshot.findOne({ studentId }).sort({ createdAt: -1 });

        if (!snapshot || !snapshot.subjects || snapshot.subjects.length === 0) {
            return res.status(200).json({ subjects: [] });
        }

        const subjectsData = snapshot.subjects.map(item => {
            const percentage = (item.marks / item.maxMarks) * 100;
            return {
                subject: item.subjectName,
                percentage: Math.round(percentage * 10) / 10
            };
        });

        res.status(200).json({
            subjects: subjectsData
        });
    } catch (error) {
        res.status(200).json({ subjects: [] });
    }
};
