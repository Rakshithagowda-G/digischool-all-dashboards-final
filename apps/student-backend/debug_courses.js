import mongoose from 'mongoose';
import fs from 'fs';

async function debug() {
    const logFile = 'debug_log.txt';
    fs.writeFileSync(logFile, 'Start debug\n');
    try {
        const uri = 'mongodb://127.0.0.1:27017/student_db';
        fs.appendFileSync(logFile, `Connecting to ${uri}\n`);
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        fs.appendFileSync(logFile, 'Connected\n');

        const db = mongoose.connection.db;
        const courses = await db.collection('courses').find({}).toArray();
        fs.appendFileSync(logFile, `Total courses: ${courses.length}\n`);

        const additional = courses.filter(c => c.courseId && c.courseId.startsWith('ADD_'));
        fs.appendFileSync(logFile, `Additional courses: ${additional.length}\n`);

        if (additional.length > 0) {
            fs.appendFileSync(logFile, `First additional: ${additional[0].courseId}\n`);
        }

        const students = await db.collection('students').find({}).toArray();
        fs.appendFileSync(logFile, `Total students: ${students.length}\n`);

        process.exit(0);
    } catch (err) {
        fs.appendFileSync(logFile, `Error: ${err.message}\n`);
        process.exit(1);
    }
}

debug();
