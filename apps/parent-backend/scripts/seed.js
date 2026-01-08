import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import {
    DashboardCache,
    AttendanceSnapshot,
    ResultSnapshot,
    AssignmentSnapshot,
    AnnouncementSnapshot
} from '../models/snapshots.model.js';
import { StudentProfile } from '../models/student.profile.model.js';

dotenv.config();

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync('debug_seed.log', msg + '\n');
};

const MOCK_STUDENT_ID = "STU12345";

const studentProfileData = {
    studentId: MOCK_STUDENT_ID,
    name: "Amira",
    parentName: "Fatima",
    dob: new Date("2004-02-28"), // Valid date
    phoneNumber: "1234567890",
    course: "B.Tech CSE"
};

const dashboardCacheData = {
    studentId: MOCK_STUDENT_ID,
    attendancePercentage: 88.5,
    assignmentsCompleted: 15,
    averageGrade: "A",
    pendingTasks: 4,
    lastUpdatedAt: new Date()
};

const now = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonth = monthNames[now.getMonth()];
const currentYear = now.getFullYear();

const attendanceSnapshotData = {
    studentId: MOCK_STUDENT_ID,
    year: currentYear,
    month: currentMonth,
    attendancePercentage: 92,
    presentCount: 23,
    absentCount: 2,
    leaveCount: 0,
    days: Array.from({ length: 28 }, (_, i) => ({
        date: new Date(currentYear, now.getMonth(), i + 1),
        status: i % 10 === 0 ? "Absent" : "Present"
    })),
    subjectWiseAttendance: {
        "Mathematics": 95,
        "Science": 90,
        "English": 88,
        "History": 94
    }
};

const resultSnapshotData = [
    {
        studentId: MOCK_STUDENT_ID,
        testName: "Monthly Assessment - October",
        testMonth: "October",
        subjects: [
            { subjectName: "Mathematics", marks: 75, maxMarks: 100 },
            { subjectName: "Science", marks: 70, maxMarks: 100 },
            { subjectName: "English", marks: 80, maxMarks: 100 },
            { subjectName: "History", marks: 72, maxMarks: 100 }
        ],
        total: 297,
        percentage: 74.25,
        createdAt: new Date("2025-10-15")
    },
    {
        studentId: MOCK_STUDENT_ID,
        testName: "Monthly Assessment - November",
        testMonth: "November",
        subjects: [
            { subjectName: "Mathematics", marks: 82, maxMarks: 100 },
            { subjectName: "Science", marks: 78, maxMarks: 100 },
            { subjectName: "English", marks: 85, maxMarks: 100 },
            { subjectName: "History", marks: 80, maxMarks: 100 }
        ],
        total: 325,
        percentage: 81.25,
        createdAt: new Date("2025-11-15")
    },
    {
        studentId: MOCK_STUDENT_ID,
        testName: "Monthly Assessment - December",
        testMonth: "December",
        subjects: [
            { subjectName: "Mathematics", marks: 92, maxMarks: 100 },
            { subjectName: "Science", marks: 85, maxMarks: 100 },
            { subjectName: "English", marks: 88, maxMarks: 100 },
            { subjectName: "History", marks: 94, maxMarks: 100 }
        ],
        total: 359,
        percentage: 89.75,
        createdAt: new Date("2025-12-15")
    }
];

const assignmentsSnapshotData = [
    {
        assignmentId: "ASG-001",
        studentId: MOCK_STUDENT_ID,
        subject: "Mathematics",
        title: "Calculus Problem Set 4",
        dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
        status: "Pending",
        assignedDate: new Date()
    },
    {
        assignmentId: "ASG-002",
        studentId: MOCK_STUDENT_ID,
        subject: "Science",
        title: "Physics Lab Report - Optics",
        dueDate: new Date(Date.now() + 86400000 * 5),
        status: "Completed",
        assignedDate: new Date(Date.now() - 86400000 * 2)
    },
    {
        assignmentId: "ASG-003",
        studentId: MOCK_STUDENT_ID,
        subject: "English",
        title: "Essay: The Great Gatsby Analysis",
        dueDate: new Date(Date.now() + 86400000 * 7),
        status: "Pending",
        assignedDate: new Date(Date.now() - 86400000 * 4)
    }
];

const announcementsSnapshotData = [
    {
        announcementId: "ANN-101",
        title: "Parent-Teacher Meeting",
        message: "The monthly PTM is scheduled for coming Saturday at 10:00 AM in the Main Hall.",
        priority: "High",
        source: "Principal Office",
        issuedDate: new Date()
    },
    {
        announcementId: "ANN-102",
        title: "Annual Sports Day Registration",
        message: "Students interested in participating in the Annual Sports Day can register via the portal.",
        priority: "Medium",
        source: "Sports Department",
        issuedDate: new Date(Date.now() - 86400000 * 1)
    }
];

const seedDB = async () => {
    try {
        if (fs.existsSync('debug_seed.log')) fs.unlinkSync('debug_seed.log');
        log("Started seed process...");

        const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/parent_db";
        log("Connecting to: " + mongoURI);
        await mongoose.connect(mongoURI);
        log("Connected to MongoDB for seeding...");

        // Clear existing data
        await DashboardCache.deleteMany({});
        await AttendanceSnapshot.deleteMany({});
        await ResultSnapshot.deleteMany({});
        await AssignmentSnapshot.deleteMany({});
        await AnnouncementSnapshot.deleteMany({});
        await StudentProfile.deleteMany({});
        log("Cleared existing snapshot data.");

        // Insert new data
        await DashboardCache.create(dashboardCacheData);
        await AttendanceSnapshot.create(attendanceSnapshotData);
        await ResultSnapshot.insertMany(resultSnapshotData);
        await AssignmentSnapshot.insertMany(assignmentsSnapshotData);
        await AnnouncementSnapshot.insertMany(announcementsSnapshotData);
        await StudentProfile.create(studentProfileData);
        log("Student Profile record created: " + studentProfileData.studentId);

        log("Mock data seeded successfully!");
        await mongoose.connection.close();
        log("Connection closed.");
        process.exit(0);
    } catch (error) {
        log("Error seeding database: " + error.message);
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
        process.exit(1);
    }
};

seedDB();
