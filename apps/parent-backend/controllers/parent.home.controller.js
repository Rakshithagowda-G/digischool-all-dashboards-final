import {
    DashboardCache,
    AttendanceSnapshot,
    ResultSnapshot,
    AssignmentSnapshot,
    AnnouncementSnapshot
} from '../models/snapshots.model.js';

/**
 * GET /api/parent/home/summary
 * Home Page → Summary Cards
 */
export const getSummary = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        if (!studentId) {
            return res.status(400).json({ message: 'studentId is required' });
        }

        const summary = await DashboardCache.findOne({ studentId });

        const response = summary || {
            attendancePercentage: 0,
            assignmentsCompleted: 0,
            averageGrade: "N/A",
            pendingTasks: 0
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/parent/home/attendance-overview
 * Home Page → Monthly Attendance Calendar (LATEST snapshot)
 */
export const getAttendanceOverview = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        if (!studentId) {
            return res.status(400).json({ message: 'studentId is required' });
        }

        // Always fetch latest available snapshot (not system month)
        const attendance = await AttendanceSnapshot
            .findOne({ studentId })
            .sort({ year: -1, createdAt: -1 });

        if (!attendance) {
            return res.status(200).json({
                month: "N/A",
                year: new Date().getFullYear(),
                attendancePercentage: 0,
                days: []
            });
        }

        // Lightweight response for Home Page
        const response = {
            month: attendance.month,
            year: attendance.year,
            attendancePercentage: attendance.attendancePercentage,
            days: attendance.days.map(day => ({
                date: day.date,
                status: day.status
            }))
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/parent/home/latest-results
 * Home Page → Grade Book (Latest Test Only)
 */
export const getLatestResults = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        if (!studentId) {
            return res.status(400).json({ message: 'studentId is required' });
        }

        const latestResult = await ResultSnapshot
            .findOne({ studentId })
            .sort({ createdAt: -1 });

        if (!latestResult) {
            return res.status(200).json({
                testName: "No tests record",
                testMonth: "",
                subjects: [],
                total: 0,
                percentage: 0
            });
        }

        // Shape response for Home Page Grade Book
        const response = {
            testName: latestResult.testName,
            testMonth: latestResult.testMonth,
            subjects: latestResult.subjects,
            total: latestResult.total,
            percentage: latestResult.percentage
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/parent/home/assignments
 * Home Page → Upcoming 6 Assignments (Last 14 Days)
 */
export const getAssignments = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        if (!studentId) {
            return res.status(400).json({ message: 'studentId is required' });
        }

        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

        const assignments = await AssignmentSnapshot.find({
            studentId,
            assignedDate: { $gte: fourteenDaysAgo }
        })
            .sort({ dueDate: 1 })
            .limit(6);

        const response = assignments.map(asg => {
            const dateObj = new Date(asg.dueDate);
            const formattedDate = dateObj.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short'
            });

            return {
                title: asg.title,
                subject: asg.subject,
                dueDate: formattedDate,
                status: asg.status
            };
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/parent/home/announcements
 * Home Page → Latest 5 Announcements with BFF Formatting
 */
export const getAnnouncements = async (req, res) => {
    try {
        const announcements = await AnnouncementSnapshot.find()
            .sort({ issuedDate: -1 })
            .limit(5);

        const response = announcements.map(ann => {
            const dateObj = new Date(ann.issuedDate);

            // Format: DD Mon (e.g., 04 Jan)
            const formattedDate = dateObj.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short'
            });

            // Format: HH:MM AM/PM (e.g., 06:48 PM)
            const formattedTime = dateObj.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            return {
                title: ann.title,
                date: formattedDate,
                time: formattedTime
            };
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
