import mongoose from 'mongoose';

const StudentProfileSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    parentName: { type: String, required: true },
    dob: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    course: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'student_profiles' });

export const StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);
