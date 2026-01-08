import express from 'express';
import {
    getResultOverview,
    getSubjectWiseMarks,
    getPerformanceChart,
    getTopSubjects,
    getTeacherRemarks
} from '../controllers/student.results.controller.js';

const router = express.Router();

// 1) Result Overview (Header)
router.get('/overview', getResultOverview);

// 2) Subject Wise Marks (Table/Progress)
router.get('/subjects', getSubjectWiseMarks);

// 3) Performance Chart (Donut/Pie)
router.get('/performance', getPerformanceChart);

// 4) Top Performing Subjects
router.get('/top-subjects', getTopSubjects);

// 5) Teacher Remarks
router.get('/remarks', getTeacherRemarks);

export default router;
