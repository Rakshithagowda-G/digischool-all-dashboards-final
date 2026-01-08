import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Course from '../models/course.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

const courses = [
    // Primary Courses (3)
    {
        courseId: "COURSE_P_001",
        title: "Intro to Numbers",
        subject: "Math",
        educationLevel: "primary",
        description: "Learn the basics of counting and arithmetic.",
        university: "Greenwood Academy",
        instructor: { name: "Ms. Sarah Jenkins", role: "Primary Teacher" },
        durationWeeks: 8,
        thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400",
        createdAt: new Date()
    },
    {
        courseId: "COURSE_P_002",
        title: "Nature Explorer",
        subject: "Science",
        educationLevel: "primary",
        description: "Discover the wonders of plants and animals.",
        university: "Greenwood Academy",
        instructor: { name: "Mr. Thomas Brown", role: "Science Instructor" },
        durationWeeks: 6,
        thumbnail: "https://images.unsplash.com/photo-1500622388414-85552044806a?auto=format&fit=crop&w=400",
        createdAt: new Date()
    },
    {
        courseId: "COURSE_P_003",
        title: "Creative Arts",
        subject: "Arts",
        educationLevel: "primary",
        description: "Explore your imagination with colors and crafts.",
        university: "Greenwood Academy",
        instructor: { name: "Ms. Emily White", role: "Arts Coordinator" },
        durationWeeks: 4,
        thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400",
        createdAt: new Date()
    },

    // Middle School Courses (3)
    {
        courseId: "COURSE_M_001",
        title: "Algebra Fundamentals",
        subject: "Math",
        educationLevel: "middle",
        description: "A comprehensive guide to algebraic equations and functions.",
        university: "Northview Middle",
        instructor: { name: "Dr. Robert Wilson", role: "Senior Math Teacher" },
        durationWeeks: 12,
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400",
        createdAt: new Date()
    },
    {
        courseId: "COURSE_M_002",
        title: "World History: Middle Ages",
        subject: "History",
        educationLevel: "middle",
        description: "Journey through the influential events of the medieval era.",
        university: "Northview Middle",
        instructor: { name: "Mrs. Linda Carter", role: "History Department Head" },
        durationWeeks: 10,
        thumbnail: "https://images.unsplash.com/photo-1461360228754-6e81c478bc88?auto=format&fit=crop&w=400",
        createdAt: new Date()
    },
    {
        courseId: "COURSE_M_003",
        title: "Coding Basics: Python",
        subject: "Computer Science",
        educationLevel: "middle",
        description: "Introduction to logical thinking and Python programming.",
        university: "Northview Middle",
        instructor: { name: "Mr. David Miller", role: "IT Specialist" },
        durationWeeks: 8,
        thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400",
        createdAt: new Date()
    },

    // University Courses (4)
    {
        courseId: "COURSE_U_001",
        title: "AI in Cyber Security",
        subject: "Computer Science",
        educationLevel: "university",
        description: "Foundational principles of AI applied to network security.",
        university: "Stanford University",
        instructor: { name: "Dr. Rahul Mehta", role: "Lead Researcher" },
        durationWeeks: 12,
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400",
        createdAt: new Date()
    },
    {
        courseId: "COURSE_U_002",
        title: "Macroeconomic Theory",
        subject: "Economics",
        educationLevel: "university",
        description: "Advanced study of national income and production analysis.",
        university: "Oxford University",
        instructor: { name: "Prof. James Sterling", role: "Economics Professor" },
        durationWeeks: 14,
        thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400",
        createdAt: new Date()
    },
    {
        courseId: "COURSE_U_003",
        title: "Quantum Physics I",
        subject: "Physics",
        educationLevel: "university",
        description: "Introduction to quantum mechanics and atomic structures.",
        university: "MIT",
        instructor: { name: "Dr. Elena Rossi", role: "Senior Physicist" },
        durationWeeks: 16,
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400",
        createdAt: new Date()
    },
    {
        courseId: "COURSE_U_004",
        title: "Bioinformatics",
        subject: "Biology",
        educationLevel: "university",
        description: "Merging biological data with computational tools.",
        university: "University of Toronto",
        instructor: { name: "Dr. Karen Lin", role: "Biotech Expert" },
        durationWeeks: 12,
        thumbnail: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400",
        createdAt: new Date()
    }
];

const seedCourses = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables.");
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully.");

        // Clear existing courses
        console.log("Clearing existing courses...");
        await Course.deleteMany({});

        // Insert new courses
        const inserted = await Course.insertMany(courses);
        console.log(`Successfully inserted ${inserted.length} courses.`);

        // Log education levels
        const levels = [...new Set(inserted.map(c => c.educationLevel))];
        console.log(`Education levels seeded: ${levels.join(", ")}`);

    } catch (error) {
        console.error("Error seeding courses:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Database connection closed.");
        process.exit(0);
    }
};

seedCourses();
