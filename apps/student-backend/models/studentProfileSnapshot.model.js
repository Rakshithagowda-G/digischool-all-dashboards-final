import mongoose from 'mongoose';

const studentProfileSnapshotSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    dob: { type: Date },
    phone: { type: String },
    currentCourse: { type: String },
    profileImage: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'student_profile_snapshots' });

export default mongoose.model('StudentProfileSnapshot', studentProfileSnapshotSchema);
