import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseId: { type: String, required: true, unique: true },
    studentId: { type: String }, // Optional: Link to a specific student
    title: { type: String, required: true },
    subject: { type: String, required: true },
    educationLevel: {
        type: String,
        required: true,
        enum: ["primary", "middle", "university"]
    },
    grade: { type: String },
    department: { type: String },
    credits: { type: Number },
    university: { type: String }, // For university level courses
    description: { type: String, required: true },
    instructor: {
        name: { type: String, required: true },
        role: { type: String, required: true }
    },
    durationWeeks: { type: Number, required: true },
    thumbnail: { type: String }, // Alternative to thumbnailUrl
    thumbnailUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Course', courseSchema, 'courses');
