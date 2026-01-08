import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/event.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_db';

const events = [
    // Today's Events (2026-01-06)
    {
        eventId: "EVT001",
        title: "Introduction to Addition",
        subject: "Mathematics",
        educationLevel: "primary",
        conductedBy: { name: "Ms. Samantha William", role: "Teacher" },
        date: new Date('2026-01-06'),
        startTime: "09:00 AM",
        endTime: "10:30 AM"
    },
    {
        eventId: "EVT002",
        title: "Chemical Bonding Basics",
        subject: "Chemistry",
        educationLevel: "middle",
        conductedBy: { name: "Robert Fox", role: "Teacher" },
        date: new Date('2026-01-06'),
        startTime: "11:00 AM",
        endTime: "12:30 PM"
    },
    {
        eventId: "EVT003",
        title: "Full-Stack Project Planning",
        subject: "Computer Science",
        educationLevel: "university",
        conductedBy: { name: "John Doe", role: "Admin" },
        date: new Date('2026-01-06'),
        startTime: "02:00 PM",
        endTime: "04:30 PM"
    },
    // Future Events
    {
        eventId: "EVT004",
        title: "Creative Storytelling",
        subject: "English",
        educationLevel: "primary",
        conductedBy: { name: "Alice Brown", role: "Teacher" },
        date: new Date('2026-01-07'),
        startTime: "10:00 AM",
        endTime: "11:30 AM"
    },
    {
        eventId: "EVT005",
        title: "Medieval History Overview",
        subject: "History",
        educationLevel: "middle",
        conductedBy: { name: "Ms. Samantha William", role: "Teacher" },
        date: new Date('2026-01-08'),
        startTime: "01:00 PM",
        endTime: "02:30 PM"
    },
    {
        eventId: "EVT006",
        title: "Microservices Architecture",
        subject: "Software Engineering",
        educationLevel: "university",
        conductedBy: { name: "Robert Fox", role: "Teacher" },
        date: new Date('2026-01-09'),
        startTime: "09:00 AM",
        endTime: "12:00 PM"
    },
    {
        eventId: "EVT007",
        title: "Primary Color Mixing",
        subject: "Art",
        educationLevel: "primary",
        conductedBy: { name: "John Doe", role: "Admin" },
        date: new Date('2026-01-10'),
        startTime: "11:00 AM",
        endTime: "12:00 PM"
    },
    {
        eventId: "EVT008",
        title: "Linear Algebra Workshop",
        subject: "Mathematics",
        educationLevel: "middle",
        conductedBy: { name: "Alice Brown", role: "Teacher" },
        date: new Date('2026-01-11'),
        startTime: "03:00 PM",
        endTime: "05:00 PM"
    }
];

const seedEvents = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Successfully connected to MongoDB.');

        // Clear existing events
        console.log('Clearing existing events...');
        await Event.deleteMany({});
        console.log('Existing events cleared.');

        // Insert new events
        console.log(`Seeding ${events.length} sample events...`);
        await Event.insertMany(events);
        console.log('Events seeded successfully!');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        console.log('Closing database connection...');
        await mongoose.connection.close();
        console.log('Database connection closed.');
        process.exit(0);
    }
};

seedEvents();
