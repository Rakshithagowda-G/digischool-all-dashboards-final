import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const snapshotSchema = new mongoose.Schema({}, { strict: false });
const AttendanceSnapshot = mongoose.model('AttendanceSnapshot', snapshotSchema, 'attendance_snapshots');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
        const stuid = 'STU001';
        const snapshots = await AttendanceSnapshot.find({ studentId: stuid }).lean();
        console.log(`Total snapshots for ${stuid}: ${snapshots.length}`);
        snapshots.forEach(s => {
            console.log(`- ${s.month} ${s.year} (monthIndex: ${s.monthIndex})`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
