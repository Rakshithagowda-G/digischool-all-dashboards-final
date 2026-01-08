import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from '../models/student.model.js';
import Assignment from '../models/assignment.model.js';
import AttendanceSnapshot from '../models/attendance.model.js';
import ResultSnapshot from '../models/result.model.js';
import Announcement from '../models/announcement.model.js';
import StudentProfileSnapshot from '../models/studentProfileSnapshot.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_db';

const seedData = async () => {
    try {
        console.log('Connecting to MongoDB:', MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Student.deleteMany({});
        await Assignment.deleteMany({});
        await AttendanceSnapshot.deleteMany({});
        await ResultSnapshot.deleteMany({});
        await Announcement.deleteMany({});
        await StudentProfileSnapshot.deleteMany({});
        console.log('Cleaned up existing collections.');

        // 1. Students
        const students = [
            {
                studentId: "STU001",
                fullName: "Alice Johnson",
                email: "alice.j@university.edu",
                schoolType: "UNIVERSITY",
                educationLevel: "university",
                class: "Year 3",
                section: "Computer Science",
                createdAt: new Date()
            },
            {
                studentId: "STU002",
                fullName: "Bob Smith",
                email: "bob.s@middle.school",
                schoolType: "MIDDLE",
                educationLevel: "middle",
                class: "Grade 8",
                section: "A",
                createdAt: new Date()
            },
            {
                studentId: "STU003",
                fullName: "Charlie Brown",
                email: "charlie.b@primary.school",
                schoolType: "PRIMARY",
                educationLevel: "primary",
                class: "Grade 4",
                section: "B",
                createdAt: new Date()
            }
        ];

        await Student.insertMany(students);
        console.log('Students seeded.');

        // 1.5 Student Profile Snapshots
        const profileSnapshots = [
            {
                studentId: "STU001",
                dob: new Date('2004-05-15'),
                phone: "+1 555-010-1234",
                currentCourse: "B.Tech Computer Science",
                profileImage: "/img/icon1.jpg"
            },
            {
                studentId: "STU002",
                dob: new Date('2011-08-22'),
                phone: "+1 555-020-5678",
                currentCourse: "Middle School - Grade 8",
                profileImage: "/img/icon1.jpg"
            },
            {
                studentId: "STU003",
                dob: new Date('2015-11-30'),
                phone: "+1 555-030-9012",
                currentCourse: "Primary School - Grade 4",
                profileImage: "/img/icon1.jpg"
            }
        ];

        await StudentProfileSnapshot.insertMany(profileSnapshots);
        console.log('Student Profile Snapshots seeded.');

        // 2. Assignments
        const assignments = [
            { assignmentId: "ASN001", studentId: "STU001", subject: "Advanced Algorithms", title: "Dynamic Programming Challenge", dueDate: new Date('2026-01-20'), assignedDate: new Date(), status: "Pending" },
            { assignmentId: "ASN002", studentId: "STU001", subject: "Database Systems", title: "SQL Optimization Report", dueDate: new Date('2026-01-15'), assignedDate: new Date('2026-01-01'), status: "Submitted" },
            { assignmentId: "ASN003", studentId: "STU002", subject: "Science", title: "Plant Cell Diagram", dueDate: new Date('2026-01-18'), assignedDate: new Date(), status: "Pending" },
            { assignmentId: "ASN004", studentId: "STU002", subject: "History", title: "Renaissance Essay", dueDate: new Date('2026-01-12'), assignedDate: new Date('2026-01-05'), status: "Pending" },
            { assignmentId: "ASN005", studentId: "STU003", subject: "Math", title: "Multiplication Table 1-10", dueDate: new Date('2026-01-10'), assignedDate: new Date(), status: "Pending" },
            { assignmentId: "ASN006", studentId: "STU003", subject: "English", title: "Short Story Illustration", dueDate: new Date('2026-01-14'), assignedDate: new Date(), status: "Pending" }
        ];

        await Assignment.insertMany(assignments);
        console.log('Assignments seeded.');

        // 3. Attendance Snapshots
        const attendanceSnapshots = [
            {
                studentId: "STU001", month: "December", year: 2025, attendancePercentage: 92, presentCount: 23, absentCount: 2,
                days: [{ date: new Date('2025-12-01'), status: "Present" }, { date: new Date('2025-12-02'), status: "Absent" }]
            },
            {
                studentId: "STU002", month: "December", year: 2025, attendancePercentage: 88, presentCount: 22, absentCount: 3,
                days: [{ date: new Date('2025-12-01'), status: "Present" }, { date: new Date('2025-12-03'), status: "Present" }]
            },
            {
                studentId: "STU003", month: "December", year: 2025, attendancePercentage: 95, presentCount: 24, absentCount: 1,
                days: [{ date: new Date('2025-12-01'), status: "Present" }, { date: new Date('2025-12-05'), status: "Leave" }]
            }
        ];

        await AttendanceSnapshot.insertMany(attendanceSnapshots);
        console.log('Attendance snapshots seeded.');

        // 4. Result Snapshots
        const results = [
            {
                studentId: "STU001", testName: "Mid-Term Examination", testMonth: "November",
                subjects: [
                    { subjectName: "React JS", marks: 85, maxMarks: 100, minMarks: 35 },
                    { subjectName: "Node JS", marks: 90, maxMarks: 100, minMarks: 35 }
                ],
                total: 175, percentage: 87.5, rank: 5, remarks: "Excellent progress in core modules.", teacherName: "John Doe", trend: "+2.5%"
            },
            {
                studentId: "STU002", testName: "Monthly Assessment", testMonth: "December",
                subjects: [
                    { subjectName: "Algebra", marks: 78, maxMarks: 100, minMarks: 35 },
                    { subjectName: "Literature", marks: 82, maxMarks: 100, minMarks: 35 }
                ],
                total: 160, percentage: 80, rank: 12, remarks: "Good performance, keep focusing on Algebra.", teacherName: "Ms. Samantha William", trend: "+1.2%"
            },
            {
                studentId: "STU003", testName: "Unit Test", testMonth: "December",
                subjects: [
                    { subjectName: "Basic Math", marks: 95, maxMarks: 100, minMarks: 35 },
                    { subjectName: "Drawing", marks: 88, maxMarks: 100, minMarks: 35 }
                ],
                total: 183, percentage: 91.5, rank: 2, remarks: "Outstanding creativity and logic.", teacherName: "Robert Fox", trend: "+5.2%"
            }
        ];

        await ResultSnapshot.insertMany(results);
        console.log('Result snapshots seeded.');

        // 5. Shared Announcements
        const announcements = [
            {
                title: "Winter Break Schedule",
                message: "The school will be closed from Dec 24 to Jan 2.",
                type: "Event",
                issuedBy: { name: "Ms. Samantha William", role: "ADMIN" },
                target: "ALL_STUDENTS",
                schoolType: "ALL"
            },
            {
                title: "Annual Science Fair",
                message: "Register by Jan 15 to participate in the upcoming science fair.",
                type: "Academic",
                issuedBy: { name: "Robert Fox", role: "TEACHER" },
                target: "SCHOOL",
                schoolType: "PRIMARY"
            },
            {
                title: "Library New Arrivals",
                message: "Check out the new collection of technical books in the library.",
                type: "General",
                issuedBy: { name: "John Doe", role: "ADMIN" },
                target: "SCHOOL",
                schoolType: "UNIVERSITY"
            },
            {
                title: "Maintenance Alert",
                message: "The student portal will be down for maintenance on Saturday midnight.",
                type: "General",
                issuedBy: { name: "System Admin", role: "ADMIN" },
                target: "ALL_STUDENTS",
                schoolType: "ALL"
            },
            {
                title: "Holiday Notice – School Closed",
                message: "School will remain closed on Friday.",
                issuedBy: {
                    role: "ADMIN",
                    name: "Ms. Samantha William"
                },
                schoolType: "MIDDLE",
                target: "SCHOOL"
            },
            {
                title: "Grade 8 - Field Trip",
                message: "The field trip for Grade 8 students is scheduled for next Monday.",
                issuedBy: { name: "Robert Fox", role: "TEACHER" },
                target: "CLASS",
                targetGrade: "Grade 8",
                schoolType: "MIDDLE"
            },
            {
                title: "Year 3 - Thesis Submission",
                message: "Final thesis submission deadline for Year 3 is Feb 1st.",
                issuedBy: { name: "John Doe", role: "ADMIN" },
                target: "CLASS",
                targetGrade: "Year 3",
                schoolType: "UNIVERSITY"
            },
            {
                title: "Grade 4 - Drawing Competition",
                message: "Inter-class drawing competition for Grade 4 tomorrow.",
                issuedBy: { name: "Ms. Samantha William", role: "ADMIN" },
                target: "CLASS",
                targetGrade: "Grade 4",
                schoolType: "PRIMARY"
            }
        ];

        await Announcement.insertMany(announcements);
        console.log('Announcements seeded.');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
