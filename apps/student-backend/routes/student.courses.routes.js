import express from 'express';
import { getAllCourses, getCourseDetails } from '../controllers/student.courses.controller.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:courseId', getCourseDetails);

export default router;
