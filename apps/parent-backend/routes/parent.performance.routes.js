import express from 'express';
import { getAcademicStrengths, getGradeProgress, getComparison } from '../controllers/parent.performance.controller.js';

const router = express.Router();

router.get('/academic-strengths', getAcademicStrengths);
router.get('/grade-progress', getGradeProgress);
router.get('/comparison', getComparison);

export default router;
