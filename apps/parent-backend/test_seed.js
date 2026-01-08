import mongoose from 'mongoose';
import { StudentProfile } from './models/student.profile.model.js';

console.log("Starting minimal seed...");

const mongoURI = "mongodb://localhost:27017/parent_db";

async function run() {
    try {
        console.log("Connecting to:", mongoURI);
        await mongoose.connect(mongoURI);
        console.log("Connected!");

        await StudentProfile.deleteMany({});
        console.log("Cleared collection.");

        await StudentProfile.create({
            studentId: "STU12345",
            name: "Amira",
            parentName: "Fatima",
            dob: new Date("2004-02-28"),
            phoneNumber: "1234567890",
            course: "B.Tech CSE"
        });
        console.log("Created record!");

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

run();
