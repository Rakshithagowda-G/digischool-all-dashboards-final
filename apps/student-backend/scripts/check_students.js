import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_db';
        console.log(`Connecting to ${uri}...`);
        await mongoose.connect(uri);
        const db = mongoose.connection.db;
        const students = await db.collection('students').find({}).toArray();
        console.log(`Students found: ${students.length}`);
        if (students.length > 0) {
            console.log(`First student ID: ${students[0].studentId}`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
check();
