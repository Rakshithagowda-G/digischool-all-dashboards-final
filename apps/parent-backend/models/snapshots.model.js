import mongoose from 'mongoose';

const DashboardCacheSchema = new mongoose.Schema({
    studentId: { type: String, required: true, index: true },
    attendancePercentage: Number,
    assignmentsCompleted: Number,
    averageGrade: String,
    pendingTasks: Number,
    lastUpdatedAt: { type: Date, default: Date.now }
}, { collection: 'dashboard_cache', strict: false });

export const DashboardCache = mongoose.model('DashboardCache', DashboardCacheSchema);

const AttendanceSnapshotSchema = new mongoose.Schema({
    studentId: { type: String, required: true, index: true },
    year: Number,
    month: { type: String, required: true, index: true }, // e.g., "January" or "01"
    attendancePercentage: Number,
    presentCount: Number,
    absentCount: Number,
    leaveCount: Number,
    days: [{
        date: Date,
        status: String // e.g., "Present", "Absent", "Leave"
    }],
    subjectWiseAttendance: mongoose.Schema.Types.Mixed
}, { collection: 'attendance_snapshots', strict: false });

export const AttendanceSnapshot = mongoose.model('AttendanceSnapshot', AttendanceSnapshotSchema);

const ResultSnapshotSchema = new mongoose.Schema({
    studentId: { type: String, required: true, index: true },
    testName: String,
    testMonth: String,
    subjects: [{
        subjectName: String,
        marks: Number,
        maxMarks: Number
    }],
    total: Number,
    percentage: Number,
    createdAt: { type: Date, default: Date.now }
}, { collection: 'results_snapshots', strict: false });

export const ResultSnapshot = mongoose.model('ResultSnapshot', ResultSnapshotSchema);

const AssignmentSnapshotSchema = new mongoose.Schema({
    assignmentId: String,
    studentId: { type: String, required: true, index: true },
    subject: String,
    title: String,
    dueDate: Date,
    status: String,
    assignedDate: { type: Date, default: Date.now }
}, { collection: 'assignments_snapshots', strict: false });

export const AssignmentSnapshot = mongoose.model('AssignmentSnapshot', AssignmentSnapshotSchema);

const AnnouncementSnapshotSchema = new mongoose.Schema({
    announcementId: String,
    title: String,
    message: String,
    priority: String,
    source: String,
    issuedDate: { type: Date, default: Date.now }
}, { collection: 'announcements_snapshots', strict: false });

export const AnnouncementSnapshot = mongoose.model('AnnouncementSnapshot', AnnouncementSnapshotSchema);
