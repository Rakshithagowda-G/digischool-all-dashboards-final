import mongoose from 'mongoose';
import Course from './models/course.model.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
        const count = await Course.countDocuments();
        fs.writeFileSync('count_check.txt', 'Count in DB: ' + count);
        process.exit(0);
    } catch (err) {
        fs.writeFileSync('count_check.txt', 'Error: ' + err.message);
        process.exit(1);
    }
})();
