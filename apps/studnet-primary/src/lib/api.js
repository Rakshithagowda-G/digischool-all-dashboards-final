const API_BASE_URL = 'http://localhost:3002/api/student';

// For demo purposes, we'll use a hardcoded studentId (Fall back to Student-3 Primary)
// In a real app, this would come from auth context
const DEFAULT_STUDENT_ID = 'STU003';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || 'Network response was not ok');
    }
    return response.json();
};

export const getWelcomeData = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/home/welcome?studentId=${studentId}`).then(handleResponse);

export const getHomeSummary = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/home/summary?studentId=${studentId}`).then(handleResponse);

export const getTopAssignments = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/home/assignments?studentId=${studentId}`).then(handleResponse);

export const getLatestAnnouncements = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/home/announcements?studentId=${studentId}`).then(handleResponse);

export const getPerformance = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/home/performance?studentId=${studentId}`).then(handleResponse);

export const getGradeBook = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/home/gradebook?studentId=${studentId}`).then(handleResponse);

export const getAllCourses = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/courses?studentId=${studentId}`).then(handleResponse);

export const getCourseDetails = (courseId) =>
    fetch(`${API_BASE_URL}/courses/${courseId}`).then(handleResponse);

export const getAssignmentsSummary = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/assignments/summary?studentId=${studentId}`).then(handleResponse);

export const getAssignmentsList = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/assignments?studentId=${studentId}`).then(handleResponse);

export const getDownloadUrl = (assignmentId, studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/assignments/${assignmentId}/download?studentId=${studentId}`).then(handleResponse);

export const getEventsToday = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/events/today?studentId=${studentId}`).then(handleResponse);

export const getEventsUpcoming = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/events/upcoming?studentId=${studentId}`).then(handleResponse);

export const getAttendanceHeader = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/attendance/header?studentId=${studentId}`).then(handleResponse);

export const getAttendanceSummary = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/attendance/summary?studentId=${studentId}`).then(handleResponse);

export const getAttendanceMonthlyRate = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/attendance/monthly-rate?studentId=${studentId}`).then(handleResponse);

export const getAttendanceSubjectWise = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/attendance/subject-wise?studentId=${studentId}`).then(handleResponse);

export const getStudentProfile = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/profile?studentId=${studentId}`).then(handleResponse);

export const getResultOverview = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/results/overview?studentId=${studentId}`).then(handleResponse);

export const getSubjectWiseMarks = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/results/subjects?studentId=${studentId}`).then(handleResponse);

export const getTeacherRemarks = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/results/remarks?studentId=${studentId}`).then(handleResponse);

export const getPerformanceChart = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/results/performance?studentId=${studentId}`).then(handleResponse);

export const getTopSubjects = (studentId = DEFAULT_STUDENT_ID) =>
    fetch(`${API_BASE_URL}/results/top-subjects?studentId=${studentId}`).then(handleResponse);

// E-Library APIs
export const getLibraryBooks = (educationLevel = 'primary') =>
    fetch(`${API_BASE_URL}/library/books?educationLevel=${educationLevel}`).then(handleResponse);

export const getLibraryNewArrivals = (educationLevel = 'primary') =>
    fetch(`${API_BASE_URL}/library/books/new-arrivals?educationLevel=${educationLevel}`).then(handleResponse);

export const downloadBookPdf = (bookId) =>
    fetch(`${API_BASE_URL}/library/books/download/${bookId}`).then(handleResponse);
