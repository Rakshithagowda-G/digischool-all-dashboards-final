import Announcement from '../models/announcement.model.js';
import Student from '../models/student.model.js';

/**
 * GET /api/student/announcements
 * Purpose: Fetch announcements relevant to the student based on school type
 */
export const getAnnouncements = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        if (!studentId) {
            return res.status(200).json([]);
        }

        // 1. Fetch the student using studentId
        const student = await Student.findOne({ studentId }).lean();

        if (!student) {
            return res.status(200).json([]);
        }

        // 2. Read schoolType and class from student record (with fallback for old schema)
        const studentSchoolType = student.schoolType || student.educationLevel?.toUpperCase();
        const studentGrade = student.class;

        // 3. Fetch announcements where:
        //    target = "ALL_STUDENTS" OR
        //    (schoolType matches AND target = "SCHOOL") OR
        //    (targetGrade matches AND target = "CLASS") OR
        //    (fallback for old data where target doesn't exist)
        const query = {
            $or: [
                { target: "ALL_STUDENTS" },
                { schoolType: studentSchoolType, target: "SCHOOL" },
                { targetGrade: studentGrade, target: "CLASS" },
                // Fallback for old data: if target field is missing, check schoolType
                { target: { $exists: false }, schoolType: studentSchoolType },
                // Fallback for even older data: check targetLevel if it existed
                { targetLevel: { $in: ["all", studentSchoolType?.toLowerCase()] } }
            ]
        };

        const announcements = await Announcement.find(query)
            .sort({ issuedDate: -1, postedDate: -1 }) // Sort by both just in case
            .limit(20)
            .lean();

        // 4. Transform response format as expected by UI
        const formattedAnnouncements = announcements.map(a => {
            // Handle both old and new field names
            const title = a.title;
            const message = a.message || a.content;
            const rawDate = a.issuedDate || a.postedDate;
            const issuedDate = rawDate ? new Date(rawDate).toISOString().split('T')[0] : "";

            return {
                title,
                message,
                issuedDate,
                issuedBy: {
                    role: a.issuedBy?.role || "ADMIN",
                    name: a.issuedBy?.name || "School Administration"
                },
                schoolType: a.schoolType || a.targetLevel
            };
        });

        res.status(200).json(formattedAnnouncements);
    } catch (error) {
        // Safe fail
        res.status(200).json([]);
    }
};
