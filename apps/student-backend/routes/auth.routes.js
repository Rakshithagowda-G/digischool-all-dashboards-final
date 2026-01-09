import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * Authentication Routes
 * Base path: /api/auth
 */

// Student Login
router.post('/login', authController.login);

// Verify Token (Protected route)
router.get('/verify', authenticate, authController.verifyToken);

export default router;
