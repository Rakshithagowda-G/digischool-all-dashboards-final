import mongoose from 'mongoose';
import fs from 'fs';

async function check() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/student_db');
        const count = await mongoose.connection.collection('courses').countDocuments({ courseId: /^ADD_/ });
        fs.writeFileSync('count_result.txt', `Count: ${count}`);
        process.exit(0);
    } catch (e) {
        fs.writeFileSync('count_result.txt', `Error: ${e.message}`);
        process.exit(1);
    }
}
check();
