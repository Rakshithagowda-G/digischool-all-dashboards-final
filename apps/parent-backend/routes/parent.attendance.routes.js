import express from 'express';
import {
    getAttendanceHeader,
    getYearlyRate,
    getAttendanceSummary,
    getSubjectWiseAttendance
} from '../controllers/parent.attendance.controller.js';

const router = express.Router();

router.get('/header', getAttendanceHeader);
router.get('/yearly-rate', getYearlyRate);
router.get('/summary', getAttendanceSummary);
router.get('/subjects', getSubjectWiseAttendance);

export default router;
