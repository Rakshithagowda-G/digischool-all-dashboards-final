import AttendanceSnapshot from '../models/attendance.model.js';
import Student from '../models/student.model.js';
import Course from '../models/course.model.js';

const getStudentId = (req) => req.user?.studentId || req.query.studentId;

const monthOrder = {
    'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
    'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
};

const resolveAttendanceSnapshot = async (studentId) => {
    if (!studentId) return null;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthName = now.toLocaleString('default', { month: 'long' });

    // Step 1: Try current month/year
    let snapshot = await AttendanceSnapshot.findOne({
        studentId,
        year: currentYear,
        month: currentMonthName
    }).lean();

    if (snapshot) {
        console.log("[ATTENDANCE] Using snapshot:", snapshot.month, snapshot.year);
        return snapshot;
    }

    // Step 2: MANDATORY FALLBACK to latest available
    // We fetch all for the student and sort in memory to be 100% sure about the order
    // especially if monthIndex is missing in older docs.
    const allSnapshots = await AttendanceSnapshot.find({ studentId }).lean();
    if (!allSnapshots || allSnapshots.length === 0) return null;

    snapshot = allSnapshots.sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        const m1 = a.monthIndex || monthOrder[a.month] || 0;
        const m2 = b.monthIndex || monthOrder[b.month] || 0;
        if (m1 !== m2) return m2 - m1;
        return (new Date(b.createdAt || 0)) - (new Date(a.createdAt || 0));
    })[0];

    if (snapshot) {
        console.log("[ATTENDANCE] Using snapshot:", snapshot.month, snapshot.year);
    }
    return snapshot;
};

export const getHeaderStats = async (req, res) => {
    try {
        const studentId = getStudentId(req);
        const snapshot = await resolveAttendanceSnapshot(studentId);

        if (!snapshot) {
            return res.status(200).json({
                totalClasses: 0,
                attended: 0,
                absent: 0,
                leaves: 0,
                attendancePercentage: 0
            });
        }

        const attended = snapshot.presentCount || 0;
        const absent = snapshot.absentCount || 0;
        const leaves = snapshot.leaveCount || (snapshot.days ? snapshot.days.filter(d => d.status === "Leave").length : 0);
        const totalClasses = attended + absent + leaves;

        res.status(200).json({
            totalClasses,
            attended,
            absent,
            leaves,
            attendancePercentage: snapshot.attendancePercentage || 0
        });
    } catch (error) {
        console.error('Error in getHeaderStats:', error);
        res.status(200).json({
            totalClasses: 0,
            attended: 0,
            absent: 0,
            leaves: 0,
            attendancePercentage: 0
        });
    }
};

export const getMonthlyRate = async (req, res) => {
    try {
        const studentId = getStudentId(req);
        const snapshot = await resolveAttendanceSnapshot(studentId);

        if (!snapshot) {
            return res.status(200).json({ year: new Date().getFullYear(), monthlyRates: [] });
        }

        const targetYear = snapshot.year;
        const yearSnapshots = await AttendanceSnapshot.find({ studentId, year: targetYear }).lean();

        const monthlyRates = yearSnapshots
            .sort((a, b) => (monthOrder[a.month] || 0) - (monthOrder[b.month] || 0))
            .map(s => ({
                month: s.month,
                percentage: s.attendancePercentage || 0
            }));

        res.status(200).json({
            year: targetYear,
            monthlyRates
        });
    } catch (error) {
        console.error('Error in getMonthlyRate:', error);
        res.status(200).json({ year: new Date().getFullYear(), monthlyRates: [] });
    }
};

export const getAttendanceSummary = async (req, res) => {
    try {
        const studentId = getStudentId(req);
        const snapshot = await resolveAttendanceSnapshot(studentId);

        if (!snapshot) {
            return res.status(200).json({ present: 0, absent: 0, leaves: 0 });
        }

        const attended = snapshot.presentCount || 0;
        const absent = snapshot.absentCount || 0;
        const leaves = snapshot.leaveCount || (snapshot.days ? snapshot.days.filter(d => d.status === "Leave").length : 0);

        res.status(200).json({
            present: attended,
            absent: absent,
            leaves: leaves
        });
    } catch (error) {
        console.error('Error in getAttendanceSummary:', error);
        res.status(200).json({ present: 0, absent: 0, leaves: 0 });
    }
};

export const getSubjectWiseAttendance = async (req, res) => {
    try {
        const studentId = getStudentId(req);
        const snapshot = await resolveAttendanceSnapshot(studentId);

        if (!snapshot) return res.status(200).json([]);

        let result = [];

        if (snapshot.subjectWiseAttendance && Object.keys(snapshot.subjectWiseAttendance).length > 0) {
            result = Object.entries(snapshot.subjectWiseAttendance).map(([subject, data]) => {
                const percentage = data.attendancePercentage || 0;
                let status = "Poor";
                if (percentage >= 85) status = "Good";
                else if (percentage >= 70) status = "Average";

                return {
                    subject,
                    totalClasses: (data.present || 0) + (data.absent || 0),
                    present: data.present || 0,
                    absent: data.absent || 0,
                    attendancePercentage: percentage,
                    status
                };
            });
        } else {
            const student = await Student.findOne({ studentId }).lean();
            const educationLevel = student?.educationLevel?.toLowerCase() || "middle";
            const courses = await Course.find({ educationLevel }).lean();

            const uniqueSubjects = courses.length > 0
                ? [...new Set(courses.map(c => c.subject))]
                : ["General Studies"];

            const percentage = snapshot.attendancePercentage || 0;
            let status = "Poor";
            if (percentage >= 85) status = "Good";
            else if (percentage >= 70) status = "Average";

            result = uniqueSubjects.map(subject => ({
                subject,
                totalClasses: (snapshot.presentCount || 0) + (snapshot.absentCount || 0),
                present: snapshot.presentCount || 0,
                absent: snapshot.absentCount || 0,
                attendancePercentage: percentage,
                status
            }));
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error in getSubjectWiseAttendance:', error);
        res.status(200).json([]);
    }
};
