import express from 'express';
import {
    getWelcomeData,
    getHomeSummary,
    getAttendanceOverview,
    getTopAssignments,
    getLatestAnnouncements,
    getGradeBook,
    getPerformance
} from '../controllers/student.home.controller.js';

const router = express.Router();

// 1) Welcome card data
router.get('/welcome', getWelcomeData);

// 2) Summary cards data
router.get('/summary', getHomeSummary);

// 3) Attendance overview (calendar)
router.get('/attendance-overview', getAttendanceOverview);

// 4) Assignments list (Top 5)
router.get('/assignments', getTopAssignments);

// 5) Latest announcements
router.get('/announcements', getLatestAnnouncements);

// 6) GradeBook widget data
router.get('/gradebook', getGradeBook);

// 7) Performance widget (Primary dashboard)
router.get('/performance', getPerformance);

export default router;
