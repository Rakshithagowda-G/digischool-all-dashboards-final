import express from 'express';
import {
    getSummary,
    getAttendanceOverview,
    getLatestResults,
    getAssignments,
    getAnnouncements
} from '../controllers/parent.home.controller.js';

const router = express.Router();

router.get('/summary', getSummary);
router.get('/attendance-overview', getAttendanceOverview);
router.get('/latest-results', getLatestResults);
router.get('/assignments', getAssignments);
router.get('/announcements', getAnnouncements);

export default router;
