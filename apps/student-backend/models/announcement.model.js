import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["Academic", "Event", "General"], default: "General" },
    issuedDate: { type: Date, default: Date.now },
    issuedBy: {
        name: { type: String, required: true },
        role: { type: String, enum: ["ADMIN", "TEACHER"], required: true }
    },
    target: {
        type: String,
        enum: ["SCHOOL", "ALL_STUDENTS", "CLASS"],
        default: "SCHOOL"
    },
    schoolType: {
        type: String,
        enum: ["PRIMARY", "MIDDLE", "UNIVERSITY", "ALL"]
    },
    targetGrade: {
        type: String
    }
});

export default mongoose.model('Announcement', announcementSchema);
