import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Student from '../models/student.model.js';
import Course from '../models/course.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_db';

const additionalCoursesData = {
    primary: [
        {
            title: "Spelling Bee Champion",
            subject: "English",
            description: "Master the art of spelling complex words and improve your vocabulary.",
            thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400",
            instructor: { name: "Ms. Emily Parker", role: "Primary Teacher" },
            durationWeeks: 4
        },
        {
            title: "Basic Arithmetic Mastery",
            subject: "Math",
            description: "Build a strong foundation in addition, subtraction, and mental math.",
            thumbnail: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400",
            instructor: { name: "Mr. James Wilson", role: "Math Coordinator" },
            durationWeeks: 6
        },
        {
            title: "Creative Art & Craft",
            subject: "Art",
            description: "Express your creativity through painting, drawing, and paper crafts.",
            thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400",
            instructor: { name: "Ms. Sofia Garcia", role: "Art Instructor" },
            durationWeeks: 5
        }
    ],
    middle: [
        {
            title: "Advanced Algebra",
            subject: "Math",
            description: "Exploration of linear equations, quadratic functions, and real-world applications.",
            thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
            instructor: { name: "Dr. Robert Wilson", role: "Senior Math Teacher" },
            durationWeeks: 12
        },
        {
            title: "World Geography & Cultures",
            subject: "Social Studies",
            description: "Study the physical features of the Earth and the diverse cultures of its people.",
            thumbnail: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=400",
            instructor: { name: "Mrs. Linda Carter", role: "Geography Expert" },
            durationWeeks: 10
        },
        {
            title: "Intro to Physical Science",
            subject: "Science",
            description: "Discover the fundamental concepts of physics and chemistry through experiments.",
            thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400",
            instructor: { name: "Mr. David Miller", role: "Science Specialist" },
            durationWeeks: 8
        }
    ],
    university: [
        {
            title: "Neural Networks & Deep Learning",
            subject: "Computer Science",
            description: "Advanced study of artificial neural networks and deep learning architectures.",
            thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400",
            instructor: { name: "Dr. Rahul Mehta", role: "AI Research Lead" },
            durationWeeks: 14,
            department: "Computer Science",
            credits: 4
        },
        {
            title: "Quantum Computing Foundations",
            subject: "Physics/CS",
            description: "Introduction to quantum bits, circuits, and quantum algorithms.",
            thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
            instructor: { name: "Prof. James Sterling", role: "Quantum Physics Professor" },
            durationWeeks: 12,
            department: "Physics",
            credits: 3
        },
        {
            title: "Behavioral Economics",
            subject: "Economics",
            description: "Analyzing the psychological factors that influence economic decision-making.",
            thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=400",
            instructor: { name: "Dr. Elena Rossi", role: "Senior Economist" },
            durationWeeks: 10,
            department: "Economics",
            credits: 3
        }
    ]
};

import fs from 'fs';

const logFile = path.join(__dirname, '../seed_debug.log');
fs.writeFileSync(logFile, `Seed start: ${new Date().toISOString()}\n`);

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync(logFile, `${msg}\n`);
};

const seedAdditionalCourses = async () => {
    try {
        log(`Connecting to MongoDB: ${MONGO_URI}`);
        await mongoose.connect(MONGO_URI);
        log('Connected to MongoDB.');

        const students = await Student.find({}).lean();
        log(`Found ${students.length} students.`);

        const newCourses = [];

        for (const student of students) {
            const level = student.educationLevel?.toLowerCase();
            const subjects = additionalCoursesData[level];

            if (!subjects) {
                log(`No course data for education level: ${level} (Student: ${student.studentId})`);
                continue;
            }

            subjects.forEach((course, index) => {
                newCourses.push({
                    courseId: `ADD_${student.studentId}_${index + 1}`,
                    studentId: student.studentId,
                    title: course.title,
                    subject: course.subject,
                    educationLevel: level,
                    description: course.description,
                    thumbnail: course.thumbnail,
                    instructor: course.instructor,
                    durationWeeks: course.durationWeeks,
                    university: student.schoolType === "UNIVERSITY" ? "Global University" : undefined,
                    grade: student.class,
                    department: course.department,
                    credits: course.credits,
                    createdAt: new Date()
                });
            });
        }

        if (newCourses.length > 0) {
            log(`Inserting ${newCourses.length} additional courses...`);
            await Course.insertMany(newCourses);
            log('Successfully inserted additional courses.');
        } else {
            log('No new courses to insert.');
        }

    } catch (error) {
        log(`Error seeding additional courses: ${error.message}`);
        console.error(error);
    } finally {
        await mongoose.disconnect();
        log('Database connection closed.');
    }
};

seedAdditionalCourses();
