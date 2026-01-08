import express from 'express';
import { getTodayEvents, getUpcomingEvents } from '../controllers/student.events.controller.js';

const router = express.Router();

router.get('/today', getTodayEvents);
router.get('/upcoming', getUpcomingEvents);

export default router;
