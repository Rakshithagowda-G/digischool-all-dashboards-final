import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const MONGO_URI = 'mongodb://127.0.0.1:27017/student_db';

const studentSchema = new mongoose.Schema({
    studentId: String,
    educationLevel: String,
    schoolType: String,
    class: String
}, { collection: 'students' });

const courseSchema = new mongoose.Schema({
    courseId: { type: String, required: true, unique: true },
    studentId: String,
    title: String,
    subject: String,
    educationLevel: String,
    description: String,
    thumbnail: String,
    instructor: Object,
    durationWeeks: Number,
    university: String,
    grade: String,
    department: String,
    credits: Number,
    createdAt: Date
}, { collection: 'courses' });

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

const additionalCoursesData = {
    primary: [
        { title: "Spelling Bee Champion", subject: "English", description: "Master the art of spelling complex words.", thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", instructor: { name: "Ms. Emily Parker", role: "Teacher" }, durationWeeks: 4 },
        { title: "Basic Arithmetic Mastery", subject: "Math", description: "Build a strong foundation in addition.", thumbnail: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400", instructor: { name: "Mr. James Wilson", role: "Coordinator" }, durationWeeks: 6 },
        { title: "Creative Art & Craft", subject: "Art", description: "Express your creativity.", thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400", instructor: { name: "Ms. Sofia Garcia", role: "Instructor" }, durationWeeks: 5 }
    ],
    middle: [
        { title: "Advanced Algebra", subject: "Math", description: "Exploration of linear equations.", thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400", instructor: { name: "Dr. Robert Wilson", role: "Teacher" }, durationWeeks: 12 },
        { title: "World Geography", subject: "Social Studies", description: "Study physical features of Earth.", thumbnail: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=400", instructor: { name: "Mrs. Linda Carter", role: "Expert" }, durationWeeks: 10 },
        { title: "Intro to Physical Science", subject: "Science", description: "Fundamental concepts of physics.", thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400", instructor: { name: "Mr. David Miller", role: "Specialist" }, durationWeeks: 8 }
    ],
    university: [
        { title: "Neural Networks", subject: "Computer Science", description: "Study of artificial neural networks.", thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", instructor: { name: "Dr. Rahul Mehta", role: "Lead" }, durationWeeks: 14, department: "CS", credits: 4 },
        { title: "Quantum Computing", subject: "Physics", description: "Introduction to quantum bits.", thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400", instructor: { name: "Prof. James Sterling", role: "Professor" }, durationWeeks: 12, department: "Physics", credits: 3 },
        { title: "Behavioral Economics", subject: "Economics", description: "Analyzing psychological factors.", thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400", instructor: { name: "Dr. Elena Rossi", role: "Economist" }, durationWeeks: 10, department: "Economics", credits: 3 }
    ]
};

async function run() {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(MONGO_URI);
        const students = await Student.find({}).lean();
        console.log(`Found ${students.length} students.`);

        for (const student of students) {
            const level = student.educationLevel?.toLowerCase();
            const subjects = additionalCoursesData[level];
            if (!subjects) continue;

            for (let i = 0; i < subjects.length; i++) {
                const c = subjects[i];
                const courseId = `ADD_${student.studentId}_${i + 1}`;
                await Course.updateOne(
                    { courseId },
                    { $set: { ...c, studentId: student.studentId, educationLevel: level, createdAt: new Date() } },
                    { upsert: true }
                );
            }
        }
        console.log('Done!');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
run();
