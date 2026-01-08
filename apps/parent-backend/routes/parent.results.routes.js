import express from 'express';
import {
    getResultsProfile,
    getTopSubjects,
    getSubjectMarks,
    getMonthlyTests
} from '../controllers/parent.results.controller.js';

const router = express.Router();

router.get('/profile', getResultsProfile);
router.get('/top-subjects', getTopSubjects);
router.get('/subject-marks', getSubjectMarks);
router.get('/monthly-tests', getMonthlyTests);

export default router;
