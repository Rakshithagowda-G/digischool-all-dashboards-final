import Course from '../models/course.model.js';
import Student from '../models/student.model.js';

/**
 * GET /api/student/courses
 * Logic: Fetch courses filtered by student's education level
 */
export const getAllCourses = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        if (!studentId) {
            return res.status(200).json([]);
        }

        // 1. Fetch Student Profile
        const student = await Student.findOne({ studentId }).lean();

        if (!student) {
            console.log(`[DEBUG] Student ${studentId} not found.`);
            return res.status(200).json([]);
        }

        // 2. Extract and normalize
        // Requirement: use student.educationLevel.toLowerCase()
        if (!student.educationLevel) {
            console.log(`[DEBUG] Student ${studentId} is missing educationLevel field.`);
            return res.status(200).json([]);
        }

        const educationLevel = student.educationLevel.toLowerCase();
        console.log(`[DEBUG] Fetching courses for educationLevel: ${educationLevel}`);

        // 3. Query MongoDB (Case-sensitive but normalized internally)
        const courses = await Course.find({ educationLevel })
            .sort({ title: 1 })
            .lean();

        console.log(`[DEBUG] Found ${courses.length} courses.`);

        // 4. Return formatted response
        // Expected Shape: { courseId, title, university, thumbnail, description }
        const response = courses.map(c => ({
            courseId: c.courseId,
            title: c.title,
            university: c.university || "Global Academy",
            thumbnail: c.thumbnail || c.thumbnailUrl || "",
            description: c.description || ""
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error("Courses API Error:", error);
        res.status(200).json([]);
    }
};

/**
 * GET /api/student/courses/:courseId
 * Logic: Fetch full course details by courseId
 */
export const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findOne({ courseId }).lean();

        if (!course) {
            return res.status(200).json({});
        }

        const response = {
            courseId: course.courseId,
            title: course.title,
            subject: course.subject,
            educationLevel: course.educationLevel,
            description: course.description,
            instructor: course.instructor?.name || "",
            durationWeeks: course.durationWeeks,
            university: course.university || "",
            thumbnail: course.thumbnail || course.thumbnailUrl || "",
            // Level specific
            ...(course.grade && { grade: course.grade }),
            ...(course.department && { department: course.department }),
            ...(course.credits && { credits: course.credits })
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("Course Detail API Error:", error);
        res.status(200).json({});
    }
};

