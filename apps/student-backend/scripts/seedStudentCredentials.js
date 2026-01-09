import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Student from '../models/student.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student_db';
const DEFAULT_PASSWORD = 'password123';
const SALT_ROUNDS = 10;

/**
 * Seed script to add login credentials to existing students
 * This script is IDEMPOTENT - safe to run multiple times
 * It will ONLY update students who don't have passwords yet
 */

async function seedStudentCredentials() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully');
        console.log(`📍 Database: ${mongoose.connection.name}`);
        console.log(`📍 Collection: students\n`);

        // Fetch all students
        console.log('🔍 Fetching all students...');
        const allStudents = await Student.find({}).select('+password');
        console.log(`📊 Found ${allStudents.length} students in database\n`);

        if (allStudents.length === 0) {
            console.log('⚠️  No students found in database!');
            console.log('💡 Please run the main seed script first to create students.');
            process.exit(0);
        }

        // Hash the default password once
        console.log('🔐 Hashing default password...');
        const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS);
        console.log('✅ Password hashed successfully\n');

        let updatedCount = 0;
        let skippedCount = 0;
        let errorCount = 0;

        console.log('📝 Processing students...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        for (const student of allStudents) {
            try {
                // Check if student already has a password
                if (student.password) {
                    console.log(`⏭️  SKIPPED: ${student.studentId} (${student.fullName || student.name}) - Already has password`);
                    skippedCount++;
                    continue;
                }

                // Generate loginId if not present
                let loginId = student.loginId;
                if (!loginId) {
                    // Create loginId from studentId and education level
                    const level = student.educationLevel || 'student';
                    loginId = `${student.studentId.toLowerCase()}.${level}`;
                }

                // Update student with credentials
                await Student.updateOne(
                    { _id: student._id },
                    {
                        $set: {
                            loginId: loginId,
                            password: hashedPassword,
                            role: 'student'
                        }
                    }
                );

                console.log(`✅ UPDATED: ${student.studentId} (${student.fullName || student.name})`);
                console.log(`   LoginID: ${loginId}`);
                console.log(`   Password: ${DEFAULT_PASSWORD} (hashed)`);
                console.log(`   Role: student\n`);

                updatedCount++;

            } catch (error) {
                console.error(`❌ ERROR updating ${student.studentId}:`, error.message);
                errorCount++;
            }
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n📊 Summary:');
        console.log(`   Total Students: ${allStudents.length}`);
        console.log(`   ✅ Updated: ${updatedCount}`);
        console.log(`   ⏭️  Skipped: ${skippedCount} (already had passwords)`);
        console.log(`   ❌ Errors: ${errorCount}`);

        if (updatedCount > 0) {
            console.log('\n✨ Student credentials seeding completed successfully!');
            console.log('\n🔑 Default Login Credentials:');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('Password for all students: password123');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

            // Show sample login credentials
            const sampleStudents = allStudents.slice(0, 3);
            console.log('\n📋 Sample Login Credentials:');
            for (const student of sampleStudents) {
                const level = student.educationLevel || 'student';
                const loginId = student.loginId || `${student.studentId.toLowerCase()}.${level}`;
                console.log(`\n   StudentID: ${student.studentId}`);
                console.log(`   Name: ${student.fullName || student.name}`);
                console.log(`   LoginID: ${loginId}`);
                console.log(`   Password: ${DEFAULT_PASSWORD}`);
                console.log(`   Education Level: ${student.educationLevel || 'N/A'}`);
            }
            console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        } else if (skippedCount === allStudents.length) {
            console.log('\n✅ All students already have login credentials!');
            console.log('💡 No updates needed. Script is safe to run multiple times.');
        }

        console.log('\n🎉 Script completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Fatal Error:', error);
        console.error('Stack:', error.stack);
        process.exit(1);
    }
}

// Run the seed function
console.log('🚀 Starting Student Credentials Seeding Script...\n');
seedStudentCredentials();
