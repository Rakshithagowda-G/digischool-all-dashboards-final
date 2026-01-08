const BASE_URL = 'http://localhost:3001/api/parent';
export const DEFAULT_STUDENT_ID = 'STU12345';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || 'Network response was not ok');
    }
    return response.json();
};

const ParentService = {
    // Home Page APIs
    getHomeSummary: (studentId = DEFAULT_STUDENT_ID) =>
        fetch(`${BASE_URL}/home/summary?studentId=${studentId}`).then(handleResponse),

    getAttendanceOverview: (studentId = DEFAULT_STUDENT_ID, month, year) => {
        let url = `${BASE_URL}/home/attendance-overview?studentId=${studentId}`;
        if (month) url += `&month=${month}`;
        if (year) url += `&year=${year}`;
        return fetch(url).then(handleResponse);
    },

    getLatestResults: (studentId = DEFAULT_STUDENT_ID) =>
        fetch(`${BASE_URL}/home/latest-results?studentId=${studentId}`).then(handleResponse),

    getAssignments: (studentId = DEFAULT_STUDENT_ID) =>
        fetch(`${BASE_URL}/home/assignments?studentId=${studentId}`).then(handleResponse),

    getAnnouncements: () =>
        fetch(`${BASE_URL}/home/announcements`).then(handleResponse),

    // Attendance Page APIs
    getAttendanceHeader: (studentId = DEFAULT_STUDENT_ID) => {
        console.log(`[ParentService] getAttendanceHeader for studentId: ${studentId}`);
        return fetch(`${BASE_URL}/attendance/header?studentId=${studentId}`).then(handleResponse);
    },

    getYearlyAttendanceRate: (studentId = DEFAULT_STUDENT_ID) => {
        console.log(`[ParentService] getYearlyAttendanceRate for studentId: ${studentId}`);
        return fetch(`${BASE_URL}/attendance/yearly-rate?studentId=${studentId}`).then(handleResponse);
    },

    getAttendanceSummary: (studentId = DEFAULT_STUDENT_ID) => {
        console.log(`[ParentService] getAttendanceSummary for studentId: ${studentId}`);
        return fetch(`${BASE_URL}/attendance/summary?studentId=${studentId}`).then(handleResponse);
    },

    getSubjectWiseAttendance: (studentId = DEFAULT_STUDENT_ID, year) => {
        console.log(`[ParentService] getSubjectWiseAttendance for studentId: ${studentId}, year: ${year || 'default'}`);
        let url = `${BASE_URL}/attendance/subjects?studentId=${studentId}`;
        if (year) url += `&year=${year}`;
        return fetch(url).then(handleResponse);
    },

    // Results Page APIs
    getResultsProfile: (studentId = DEFAULT_STUDENT_ID) => {
        console.log(`[ParentService] getResultsProfile for studentId: ${studentId}`);
        return fetch(`${BASE_URL}/results/profile?studentId=${studentId}`).then(handleResponse);
    },

    getTopSubjects: (studentId = DEFAULT_STUDENT_ID) => {
        console.log(`[ParentService] getTopSubjects for studentId: ${studentId}`);
        return fetch(`${BASE_URL}/results/top-subjects?studentId=${studentId}`).then(handleResponse);
    },

    getSubjectMarks: (studentId = DEFAULT_STUDENT_ID) => {
        console.log(`[ParentService] getSubjectMarks for studentId: ${studentId}`);
        return fetch(`${BASE_URL}/results/subject-marks?studentId=${studentId}`).then(handleResponse);
    },

    getMonthlyTests: (studentId = DEFAULT_STUDENT_ID) => {
        console.log(`[ParentService] getMonthlyTests for studentId: ${studentId}`);
        return fetch(`${BASE_URL}/results/monthly-tests?studentId=${studentId}`).then(handleResponse);
    },

    // Performance Page APIs
    getAcademicStrengths: (studentId = DEFAULT_STUDENT_ID) =>
        fetch(`${BASE_URL}/performance/academic-strengths?studentId=${studentId}`).then(handleResponse),

    getGradeProgress: (studentId = DEFAULT_STUDENT_ID) =>
        fetch(`${BASE_URL}/performance/grade-progress?studentId=${studentId}`).then(handleResponse),

    getPerformanceComparison: (studentId = DEFAULT_STUDENT_ID) =>
        fetch(`${BASE_URL}/performance/comparison?studentId=${studentId}`).then(handleResponse),

    // Profile API
    getProfile: (studentId = DEFAULT_STUDENT_ID) =>
        fetch(`${BASE_URL}/profile?studentId=${studentId}`).then(handleResponse),
};

export default ParentService;
