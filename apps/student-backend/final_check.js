import mongoose from 'mongoose';
import fs from 'fs';

async function check() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/student_db');
        const count = await mongoose.connection.collection('courses').countDocuments({ courseId: /^ADD_/ });
        fs.writeFileSync('D:/project_root/apps/student-backend/final_check.txt', `Count: ${count}\nTime: ${new Date().toISOString()}`);
        process.exit(0);
    } catch (e) {
        fs.writeFileSync('D:/project_root/apps/student-backend/final_check.txt', `Error: ${e.message}\nTime: ${new Date().toISOString()}`);
        process.exit(1);
    }
}
check();
