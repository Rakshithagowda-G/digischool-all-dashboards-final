import express from 'express';
import { getAnnouncements } from '../controllers/student.announcement.controller.js';

const router = express.Router();

router.get('/', getAnnouncements);

export default router;
