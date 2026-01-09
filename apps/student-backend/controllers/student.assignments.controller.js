import Assignment from '../models/assignment.model.js';

const getStudentId = (req) => req.user.studentId; // From JWT token

// Helper to get start and end of "Today"
const getTodayRange = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    return { start, end };
};

export const getAssignmentsSummary = async (req, res) => {
    try {
        const studentId = getStudentId(req);
        if (!studentId) return res.status(200).json({ total: 0, pending: 0, submitted: 0, overdue: 0 });

        const assignments = await Assignment.find({ studentId }).lean();

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        let pending = 0;
        let submitted = 0;
        let overdue = 0;

        assignments.forEach(asg => {
            if (asg.status === "Submitted") {
                submitted++;
            } else {
                const due = new Date(asg.dueDate);
                due.setHours(0, 0, 0, 0);
                if (due < now) {
                    overdue++;
                } else {
                    pending++;
                }
            }
        });

        res.status(200).json({
            total: assignments.length,
            pending,
            submitted,
            overdue
        });
    } catch (error) {
        console.error("Error in getAssignmentsSummary:", error);
        res.status(200).json({ total: 0, pending: 0, submitted: 0, overdue: 0 });
    }
};

export const getAssignmentsList = async (req, res) => {
    try {
        const studentId = getStudentId(req);
        if (!studentId) return res.status(200).json([]);

        const assignments = await Assignment.find({ studentId })
            .sort({ dueDate: 1 })
            .lean();

        const result = assignments.map(asg => ({
            assignmentId: asg.assignmentId,
            subject: asg.subject,
            title: asg.title,
            dueDate: asg.dueDate.toISOString().split('T')[0],
            status: asg.status
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getAssignmentsList:", error);
        res.status(200).json([]);
    }
};

export const getSubmitTodayAssignments = async (req, res) => {
    try {
        const studentId = getStudentId(req);
        if (!studentId) return res.status(200).json([]);

        const { start, end } = getTodayRange();

        const todayAssignments = await Assignment.find({
            studentId,
            status: "Pending",
            dueDate: {
                $gte: start,
                $lt: end
            }
        }).lean();

        const result = todayAssignments.map(asg => ({
            assignmentId: asg.assignmentId,
            subject: asg.subject,
            title: asg.title,
            dueDate: asg.dueDate.toISOString().split('T')[0]
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getSubmitTodayAssignments:", error);
        res.status(200).json([]);
    }
};

export const downloadAssignmentFile = async (req, res) => {
    try {
        const studentId = getStudentId(req);
        const { assignmentId } = req.params;

        if (!studentId || !assignmentId) return res.status(200).json({});

        const assignment = await Assignment.findOne({
            assignmentId,
            studentId
        }).lean();

        if (!assignment) return res.status(200).json({});

        res.status(200).json({
            assignmentId: assignment.assignmentId,
            fileUrl: assignment.fileUrl || "/files/mock-document.pdf"
        });
    } catch (error) {
        console.error("Error in downloadAssignmentFile:", error);
        res.status(200).json({});
    }
};
