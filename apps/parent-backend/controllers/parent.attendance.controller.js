import { AttendanceSnapshot } from '../models/snapshots.model.js';
import { StudentProfile } from '../models/student.profile.model.js';

// Helper to determine status based on percentage
const getStatus = (percentage) => {
    if (percentage >= 85) return 'Good';
    if (percentage >= 70) return 'Average';
    return 'Poor';
};

/**
 * 1) GET /api/parent/attendance/header
 * Purpose: Top summary cards (Total, Attended, Absent, Leaves)
 */
export const getAttendanceHeader = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        if (!studentId) return res.status(400).json({ message: 'studentId is required' });

        // Aggregate totals across all snapshots for this student
        const stats = await AttendanceSnapshot.aggregate([
            { $match: { studentId } },
            {
                $group: {
                    _id: null,
                    totalClasses: { $sum: { $add: ["$presentCount", "$absentCount", "$leaveCount"] } },
                    attended: { $sum: "$presentCount" },
                    absent: { $sum: "$absentCount" },
                    leave: { $sum: "$leaveCount" }
                }
            }
        ]);

        const summary = stats[0] || { totalClasses: 0, attended: 0, absent: 0, leave: 0 };
        delete summary._id;

        // Fetch actual student profile from DB
        const profile = await StudentProfile.findOne({ studentId });

        const student = {
            name: profile?.name || "",
            studentId: studentId,
            mobile: profile?.phoneNumber || "",
            email: "", // Not in StudentProfile schema but required by UI interface? profile.model doesn't have email.
            address: "" // Not in StudentProfile schema but required by UI interface? profile.model doesn't have email.
        };

        res.status(200).json({ student, summary });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/parent/attendance/yearly-rate
 * Purpose: Yearly percentage and Monthly graph data (with Fallback)
 */
export const getYearlyRate = async (req, res) => {
    try {
        const studentId = req.query.studentId || req.user?.studentId;
        if (!studentId) return res.status(400).json({ message: 'studentId is required' });

        // 1. Get the latest year available for this student
        const latestRecord = await AttendanceSnapshot.findOne({ studentId })
            .sort({ year: -1, createdAt: -1 });

        if (!latestRecord) {
            return res.status(200).json({
                year: new Date().getFullYear(),
                attendanceRate: 0,
                monthlyRates: []
            });
        }

        const targetYear = latestRecord.year;

        // 2. Fetch all snapshots for that specific year
        const snapshots = await AttendanceSnapshot.find({ studentId, year: targetYear })
            .sort({ month: 1 });

        const monthlyRates = snapshots.map(s => ({
            month: s.month,
            percentage: s.attendancePercentage
        }));

        const totalPercentage = snapshots.reduce((acc, curr) => acc + curr.attendancePercentage, 0);
        const yearlyPercentage = Math.round(totalPercentage / snapshots.length);

        res.status(200).json({
            year: targetYear,
            attendanceRate: yearlyPercentage,
            monthlyRates
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/parent/attendance/summary
 * Purpose: Totals (Present / Absent / Leaves) for current month (with Fallback)
 */
export const getAttendanceSummary = async (req, res) => {
    try {
        const studentId = req.query.studentId || req.user?.studentId;
        if (!studentId) return res.status(400).json({ message: 'studentId is required' });

        const now = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentMonth = monthNames[now.getMonth()];
        const currentYear = now.getFullYear();

        // 1. Try to fetch snapshot for current month/year
        let snapshot = await AttendanceSnapshot.findOne({
            studentId,
            month: currentMonth,
            year: currentYear
        });

        // 2. Fallback to latest available snapshot if current is missing
        if (!snapshot) {
            snapshot = await AttendanceSnapshot.findOne({ studentId })
                .sort({ year: -1, createdAt: -1 });
        }

        if (!snapshot) {
            return res.status(200).json({
                month: currentMonth,
                year: currentYear,
                totalPresent: 0,
                totalAbsent: 0,
                totalLeaves: 0
            });
        }

        // 3. Calculate totals from days array
        const summary = snapshot.days.reduce((acc, day) => {
            if (day.status === "Present") acc.totalPresent++;
            else if (day.status === "Absent") acc.totalAbsent++;
            else if (day.status === "Leave") acc.totalLeaves++;
            return acc;
        }, {
            totalPresent: 0,
            totalAbsent: 0,
            totalLeaves: 0
        });

        res.status(200).json({
            month: snapshot.month,
            year: snapshot.year,
            ...summary
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 4) GET /api/parent/attendance/subjects
 * Purpose: Subject wise table
 */
export const getSubjectWiseAttendance = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        const year = req.query.year || new Date().getFullYear();

        // Get the latest snapshot to get current subject-wise status
        const latestSnapshot = await AttendanceSnapshot.findOne({
            studentId,
            year: parseInt(year)
        }).sort({ createdAt: -1 });

        if (!latestSnapshot || !latestSnapshot.subjectWiseAttendance) {
            return res.status(200).json({ subjects: [] });
        }

        // Transform subjectWiseAttendance map/object to the requested array format
        // schema: { "Physics": 92, "Chemistry": 90 }
        const subjects = Object.entries(latestSnapshot.subjectWiseAttendance).map(([course, percentage]) => ({
            course,
            totalClasses: 100, // Normalized for UI
            present: percentage,
            absent: 100 - percentage,
            attendancePercentage: percentage,
            status: getStatus(percentage)
        }));

        res.status(200).json({ subjects });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
