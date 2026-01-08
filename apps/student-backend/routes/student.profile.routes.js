import express from 'express';
import { getProfile } from '../controllers/student.profile.controller.js';

const router = express.Router();

router.get('/', getProfile);

export default router;
