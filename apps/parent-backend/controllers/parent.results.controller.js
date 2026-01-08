import { ResultSnapshot } from '../models/snapshots.model.js';
import { StudentProfile } from '../models/student.profile.model.js';

// Helper for Grade mapping
const getPerformanceGrade = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    return 'Average';
};

/**
 * 1) GET /api/parent/results/profile
 */
export const getResultsProfile = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;
        if (!studentId) return res.status(400).json({ message: 'studentId is required' });

        const profile = await StudentProfile.findOne({ studentId });

        const response = {
            fullName: profile?.name || "",
            phone: profile?.phoneNumber || "",
            email: "", // Not in schema
            location: "", // Not in schema
            avatarUrl: null
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 2) GET /api/parent/results/top-subjects
 * Purpose: Top 3 performing subjects
 */
export const getTopSubjects = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        // Fetch latest cumulative performance or latest test snapshot
        const latestTest = await ResultSnapshot.findOne({ studentId }).sort({ createdAt: -1 });

        if (!latestTest || !latestTest.subjects) {
            return res.status(200).json([]);
        }

        const subjects = latestTest.subjects.map(s => {
            const percentage = s.maxMarks > 0 ? (s.marks / s.maxMarks) * 100 : 0;
            return {
                subject: s.subjectName,
                percentage: Math.round(percentage),
                grade: getPerformanceGrade(percentage)
            };
        });

        const top3 = subjects.sort((a, b) => b.percentage - a.percentage).slice(0, 3);

        res.status(200).json(top3);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 3) GET /api/parent/results/subject-marks
 * Purpose: Data for donut chart
 */
export const getSubjectMarks = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        const latestTest = await ResultSnapshot.findOne({ studentId }).sort({ createdAt: -1 });

        if (!latestTest) {
            return res.status(200).json({ totalMarks: 0, subjects: [] });
        }

        const response = {
            totalMarks: latestTest.total,
            subjects: latestTest.subjects.map(s => ({
                subject: s.subjectName,
                marks: s.marks
            }))
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 4) GET /api/parent/results/monthly-tests
 * Purpose: Table of all monthly test results
 */
export const getMonthlyTests = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        const tests = await ResultSnapshot.find({ studentId }).sort({ createdAt: -1 });

        const resultsPromises = tests.map(async (test) => {
            // Dynamically calculate rank among other students who took the same test
            const totalParticipants = await ResultSnapshot.countDocuments({ testName: test.testName });
            const higherScorers = await ResultSnapshot.countDocuments({
                testName: test.testName,
                total: { $gt: test.total }
            });
            const rank = totalParticipants > 1 ? higherScorers + 1 : 1;

            return {
                testName: test.testName,
                totalMarks: test.subjects.reduce((sum, s) => sum + s.maxMarks, 0),
                obtainedMarks: test.total,
                percentage: test.percentage,
                rank: rank,
                subjects: test.subjects.map(s => {
                    const minPassing = s.minMarks || 33; // Fallback to 33 if not in schema
                    return {
                        subject: s.subjectName,
                        maxMarks: s.maxMarks,
                        minMarks: minPassing,
                        obtainedMarks: s.marks,
                        result: s.marks >= minPassing ? "Pass" : "Fail"
                    };
                })
            };
        });

        const response = await Promise.all(resultsPromises);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
