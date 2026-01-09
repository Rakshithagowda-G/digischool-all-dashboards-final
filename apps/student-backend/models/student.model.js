import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    loginId: { type: String, required: true, unique: true }, // For login authentication
    password: { type: String, required: true, select: false }, // Hashed password, not selected by default
    role: { type: String, default: 'student' }, // User role
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date },
    phone: { type: String },
    course: { type: String },
    profileImage: { type: String },
    schoolType: {
        type: String,
        required: true,
        enum: ["PRIMARY", "MIDDLE", "UNIVERSITY"]
    },
    educationLevel: { type: String }, // Normalized level (primary, middle, university)
    class: { type: String, required: true },
    grade: { type: String }, // Optional alternative to class
    section: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'students' });

export default mongoose.model('Student', studentSchema);
