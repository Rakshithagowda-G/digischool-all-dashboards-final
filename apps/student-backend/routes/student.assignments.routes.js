import express from 'express';
import {
    getAssignmentsSummary,
    getAssignmentsList,
    getSubmitTodayAssignments,
    downloadAssignmentFile
} from '../controllers/student.assignments.controller.js';

const router = express.Router();

router.get('/summary', getAssignmentsSummary);
router.get('/', getAssignmentsList);
router.get('/submit-today', getSubmitTodayAssignments);
router.get('/:assignmentId/download', downloadAssignmentFile);

export default router;
