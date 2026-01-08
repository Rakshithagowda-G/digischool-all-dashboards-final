import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subject: { type: String, required: true },
    educationLevel: {
        type: String,
        required: true,
        enum: ["primary", "middle", "university"]
    },
    conductedBy: {
        name: { type: String, required: true },
        role: { type: String, enum: ["Teacher", "Admin"], required: true }
    },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);
