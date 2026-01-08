import Student from '../models/student.model.js';
import Event from '../models/event.model.js';

/**
 * GET /api/student/events/today
 * Logic: Fetch student educationLevel, then fetch events for that level matching today's date range.
 */
export const getTodayEvents = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        if (!studentId) {
            return res.status(200).json([]);
        }

        // 1. Fetch Student Profile
        const student = await Student.findOne({ studentId }).lean();
        if (!student) {
            return res.status(200).json([]);
        }

        // 2. Map schoolType (UPPERCASE) or educationLevel to event educationLevel (lowercase)
        const rawType = student.schoolType || student.educationLevel?.toUpperCase();
        const levelMapping = {
            'PRIMARY': 'primary',
            'MIDDLE': 'middle',
            'UNIVERSITY': 'university'
        };
        const educationLevel = levelMapping[rawType] || rawType?.toLowerCase();

        // 3. Define Today's Range (Midnight to Midnight)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // 4. Fetch Events where educationLevel match and date is within today's range
        const events = await Event.find({
            educationLevel,
            date: {
                $gte: today,
                $lt: tomorrow
            }
        }).sort({ startTime: 1 }).lean();

        // 5. Format Response
        const formattedResponse = events.map(event => ({
            title: event.title,
            subject: event.subject,
            conductedBy: event.conductedBy?.name || "",
            date: event.date?.toISOString().split('T')[0],
            startTime: event.startTime,
            endTime: event.endTime
        }));

        res.status(200).json(formattedResponse);
    } catch (error) {
        // Safe fail - Always return 200 OK
        res.status(200).json([]);
    }
};

/**
 * GET /api/student/events/upcoming
 * Logic: Fetch student educationLevel, then fetch events where date > today.
 */
export const getUpcomingEvents = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        if (!studentId) {
            return res.status(200).json([]);
        }

        // 1. Fetch Student Profile
        const student = await Student.findOne({ studentId }).lean();
        if (!student) {
            return res.status(200).json([]);
        }

        const rawType = student.schoolType || student.educationLevel?.toUpperCase();
        const levelMapping = {
            'PRIMARY': 'primary',
            'MIDDLE': 'middle',
            'UNIVERSITY': 'university'
        };
        const educationLevel = levelMapping[rawType] || rawType?.toLowerCase();

        // 2. Define Upcoming Threshold (Start of tomorrow)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // 3. Fetch Events where date >= tomorrow
        const events = await Event.find({
            educationLevel,
            date: { $gte: tomorrow }
        }).sort({ date: 1, startTime: 1 }).lean();

        // 4. Format Response
        const formattedResponse = events.map(event => ({
            title: event.title,
            subject: event.subject,
            conductedBy: event.conductedBy?.name || "",
            date: event.date?.toISOString().split('T')[0],
            startTime: event.startTime,
            endTime: event.endTime
        }));

        res.status(200).json(formattedResponse);
    } catch (error) {
        res.status(200).json([]);
    }
};
