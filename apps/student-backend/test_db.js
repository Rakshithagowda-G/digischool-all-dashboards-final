import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_db';

async function test() {
    try {
        console.log('Testing connection to:', MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('Connected!');
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        const studentsCount = await mongoose.connection.collection('students').countDocuments();
        console.log('Students count:', studentsCount);

        const coursesCount = await mongoose.connection.collection('courses').countDocuments();
        console.log('Courses count:', coursesCount);

        process.exit(0);
    } catch (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
}

test();
