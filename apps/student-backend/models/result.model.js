import mongoose from 'mongoose';

const resultSnapshotSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    testName: { type: String, required: true },
    testMonth: { type: String, required: true },
    subjects: [{
        subjectName: { type: String, required: true },
        marks: { type: Number, required: true },
        maxMarks: { type: Number, required: true },
        minMarks: { type: Number, default: 35 }
    }],
    total: { type: Number, required: true },
    percentage: { type: Number, required: true },
    rank: { type: Number },
    remarks: { type: String },
    teacherName: { type: String },
    trend: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ResultSnapshot', resultSnapshotSchema);
