import Student from '../models/student.model.js';
import StudentProfileSnapshot from '../models/studentProfileSnapshot.model.js';

export const getProfile = async (req, res) => {
    try {
        const studentId = req.user?.studentId || req.query.studentId;

        if (!studentId) {
            return res.status(200).json({});
        }

        // Fetch basic info and snapshot in parallel
        const [student, snapshot] = await Promise.all([
            Student.findOne({ studentId }).lean(),
            StudentProfileSnapshot.findOne({ studentId }).lean()
        ]);

        if (!student) {
            return res.status(200).json({});
        }

        // Format DOB as DD/MM/YYYY from snapshot if available
        let formattedDob = "";
        const dobSource = snapshot?.dob || student.dob; // Fallback to student.dob for backward compatibility if snapshot missing

        if (dobSource) {
            const date = new Date(dobSource);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            formattedDob = `${day}/${month}/${year}`;
        }

        res.status(200).json({
            studentId: student.studentId,
            name: student.fullName || "",
            email: student.email || "",
            dob: formattedDob,
            phone: snapshot?.phone || student.phone || "",
            course: snapshot?.currentCourse || student.course || "",
            profileImage: snapshot?.profileImage || student.profileImage || ""
        });
    } catch (error) {
        console.error("Error fetching student profile:", error);
        res.status(200).json({});
    }
};
