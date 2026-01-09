import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/student.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d'; // Token expires in 7 days

/**
 * Student Login
 * POST /api/auth/login
 */
export const login = async (req, res) => {
    try {
        const { loginId, password } = req.body;

        // Validate input
        if (!loginId || !password) {
            return res.status(400).json({
                error: 'Please provide both loginId and password'
            });
        }

        // Find student by loginId
        const student = await Student.findOne({ loginId }).select('+password');

        if (!student) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                role: 'student',
                studentId: student.studentId,
                educationLevel: student.educationLevel
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Return success response
        res.json({
            token,
            role: 'student',
            studentId: student.studentId,
            educationLevel: student.educationLevel,
            name: student.name || student.fullName
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
};

/**
 * Verify Token (Optional - for checking if token is still valid)
 * GET /api/auth/verify
 */
export const verifyToken = async (req, res) => {
    try {
        // Token is already verified by auth middleware
        // Just return user info
        res.json({
            valid: true,
            user: req.user
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ error: 'Token verification failed' });
    }
};
