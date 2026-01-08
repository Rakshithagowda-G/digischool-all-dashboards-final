import express from 'express';
import {
    getHeaderStats,
    getMonthlyRate,
    getAttendanceSummary,
    getSubjectWiseAttendance
} from '../controllers/student.attendance.controller.js';

const router = express.Router();

router.get('/header', getHeaderStats);
router.get('/monthly-rate', getMonthlyRate);
router.get('/summary', getAttendanceSummary);
router.get('/subject-wise', getSubjectWiseAttendance);

export default router;
