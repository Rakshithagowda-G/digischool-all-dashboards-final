import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    assignmentId: { type: String, required: true, unique: true },
    studentId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    assignedDate: { type: Date, default: Date.now },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Submitted"],
        default: "Pending"
    },
    fileUrl: { type: String }
}, { collection: 'assignments', timestamps: true });

export default mongoose.model('Assignment', assignmentSchema);
