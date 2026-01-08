import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const names = collections.map(c => c.name);
        console.log('Collections:', names);

        for (const name of ['attendance_snapshots', 'attendancesnapshots']) {
            if (names.includes(name)) {
                const count = await db.collection(name).countDocuments({ studentId: 'STU001' });
                console.log(`Count for STU001 in ${name}:`, count);
                if (count > 0) {
                    const sample = await db.collection(name).findOne({ studentId: 'STU001' });
                    console.log(`Sample from ${name}:`, JSON.stringify(sample, null, 2));
                }
            }
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
