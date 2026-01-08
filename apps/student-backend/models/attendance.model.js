import mongoose from 'mongoose';

const attendanceSnapshotSchema = new mongoose.Schema({
    studentId: { type: String, required: true, index: true },
    month: { type: String, required: true },
    monthIndex: { type: Number },
    year: { type: Number, required: true },
    attendancePercentage: { type: Number, required: true },
    presentCount: { type: Number, required: true },
    absentCount: { type: Number, required: true },
    leaveCount: { type: Number, default: 0 },
    days: [{
        date: { type: Date, required: true },
        status: { type: String, enum: ["Present", "Absent", "Leave"], required: true }
    }],
    subjectWiseAttendance: mongoose.Schema.Types.Mixed
}, { collection: 'attendancesnapshots', strict: false, timestamps: true });

export default mongoose.model('AttendanceSnapshot', attendanceSnapshotSchema);
