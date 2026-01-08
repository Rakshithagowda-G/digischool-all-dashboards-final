import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    submissionId: { type: String, required: true, unique: true },
    assignmentId: { type: String, required: true, index: true },
    studentId: { type: String, required: true, index: true },
    submissionDate: { type: Date, default: Date.now },
    fileUrl: { type: String },
    status: { type: String, default: 'Submitted' }
}, { collection: 'assignment_submissions', timestamps: true });

export default mongoose.model('Submission', submissionSchema);
