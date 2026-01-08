import { StudentProfile } from '../models/student.profile.model.js';

/**
 * GET /api/parent/profile
 * Purpose: Fetch basic student profile details for the Parent Dashboard UI.
 */
export const getProfile = async (req, res) => {
    try {
        const studentId = req.query.studentId || req.user?.studentId;
        if (!studentId) return res.status(400).json({ message: 'studentId is required' });

        const profile = await StudentProfile.findOne({ studentId });

        if (!profile) {
            return res.status(200).json({
                name: "",
                parentName: "",
                dob: null,
                phoneNumber: "",
                course: ""
            });
        }

        // Return only the fields required by the UI
        res.status(200).json({
            name: profile.name,
            parentName: profile.parentName,
            dob: profile.dob ? profile.dob.toISOString().split('T')[0] : null, // Format as YYYY-MM-DD
            phoneNumber: profile.phoneNumber,
            course: profile.course
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
