// mock data goes here 
export const MOCK_USER = {
  name: "Teacher",
  avatar: `https://placehold.co/100x100/2F69FF/FFFFFF?text=T`
};

export const MOCK_STATS = {
  activeClasses: 10,
  pendingAssignments: 17,
  classAttendance: 92,
  averageGpa: 3.5
};

export const MOCK_RECENT_ACTIVITY = [
  { id: 1, user: { name: "Alice Smith", avatar: "https://placehold.co/100x100/E8F0FE/505050?text=AS" }, action: "reviewed assignment for", subject: "Class 5 Math" },
  { id: 2, user: { name: "John Doe", avatar: "https://placehold.co/100x100/E8F0FE/505050?text=JD" }, action: "scheduled exam for", subject: "Class 8 Science" },
  { id: 1, user: { name: "Alice Smith", avatar: "https://placehold.co/100x100/E8F0FE/505050?text=AS" }, action: "reviewed assignment for", subject: "Class 5 Math" },
  { id: 2, user: { name: "John Doe", avatar: "https://placehold.co/100x100/E8F0FE/505050?text=JD" }, action: "scheduled exam for", subject: "Class 8 Science" }
];

export const MOCK_CLASSES = [
  { id: 1, name: "Class 5 - Math", students: 30 },
  { id: 2, name: "Class 6 - Science", students: 30 },
  { id: 3, name: "Class 6 - Science", students: 28 },
  { id: 4, name: "Class 6 - English", students: 30, pending: 17 },
  { id: 5, name: "Class 7 - English", students: 30, pending: 4 },
  { id: 6, name: "Class 8 - History", students: 30, pending: 1 },
];

export const MOCK_STUDENTS_FOR_CLASS = [
  { id: 1, name: "Alice Smith", email: "alice@email.com", lastActive: "Today", attendance: "Present" },
  { id: 2, name: "Bob Johnson", email: "bob@email.com", lastActive: "Yesterday", attendance: "Present" },
  { id: 3, name: "Charlie Davis", email: "charlie@email.com", lastActive: "Today", attendance: "Absent" },
  { id: 4, name: "David Kim", email: "david@email.com", lastActive: "2 days ago", attendance: "Present" },
  { id: 5, name: "Eva Rodriguez", email: "eva@email.com", lastActive: "Today", attendance: "Present" },
];

export const MOCK_ASSIGNMENTS = [
  { id: 1, studentName: "Alice Smith", className: "Class 5 Math", submittedOn: "Nov 8, 2025", file: "algebra_hw.zip", status: "Pending Review" },
  { id: 2, studentName: "Bob Johnson", className: "Class 6 Science", submittedOn: "Nov 8, 2025", file: "ecology_project.pdf", status: "Reviewed - 92/100" },
  { id: 3, studentName: "Charlie Davis", className: "Class 6 English", submittedOn: "Nov 8, 2025", file: "geometry_hw.pdf", status: "Resubmission" },
  { id: 4, studentName: "David Kim", className: "Class 7 English", submittedOn: "Nov 8, 2025", file: "project.zip", status: "Rejected" },
  { id: 5, studentName: "Eva Rodriguez", className: "Class 8 History", submittedOn: "Nov 7, 2025", file: "history_essay.docx", status: "Pending Review" },
];

export const MOCK_NOTES = [
  { id: 1, subject: "Mathematics", topics: ["Algebra Basics", "Geometry Fundamentals"] },
  { id: 2, subject: "Science", topics: ["Chemical Bonding", "Plant Cells"] },
  { id: 3, subject: "History", topics: ["Renaissance", "World War II"] },
  { id: 4, subject: "English", topics: ["Shakespearean Sonnets", "Grammar Rules"] },
];

export const MOCK_EXAMS = [
  { id: 1, title: "Mid-Term Physics Exam", className: "Class 9", date: "Nov 15, 2025", type: "upcoming" },
  { id: 2, title: "History Final", className: "Class 9", date: "Dec 10, 2025", type: "upcoming" },
  { id: 3, title: "Biology Quiz", className: "Class 9", date: "Oct 28, 2025", type: "past" },
  { id: 4, title: "Biology Final", className: "Class 7", date: "Oct 27, 2025", type: "past" },
];

export const MOCK_REPORT_CARD = {
  className: "Class 9 Mathematics",
  year: "2024-2025",
  students: [
    { id: 1, name: "Alice Smith", asm1: 85, midterm: 78, final: 92, total: 86.8, grade: "A" },
    { id: 2, name: "Bob Johnson", asm1: 70, midterm: 85, final: 82, total: 79.9, grade: "B+" },
    { id: 3, name: "Charlie Davis", asm1: 90, midterm: 88, final: 95, total: 91.6, grade: "A+" },
    { id: 4, name: "David Kim", asm1: 60, midterm: 55, final: 72, total: 63.1, grade: "C" },
  ]
};

export const MOCK_TIMETABLE_EVENTS = [
  { id: 1, day: 10, title: "Class 5 Math", color: "bg-green-100 text-green-800" },
  { id: 2, day: 11, title: "Class 8 Science", color: "bg-blue-100 text-blue-800" },
  { id: 3, day: 13, title: "Class 6 English", color: "bg-green-100 text-green-800" },
  { id: 4, day: 14, title: "Staff Meeting", color: "bg-yellow-100 text-yellow-800" },
  { id: 5, day: 17, title: "Grading", color: "bg-yellow-100 text-yellow-800" },
  { id: 6, day: 19, title: "Class 7 English", color: "bg-green-100 text-green-800" },
  { id: 7, day: 24, title: "Project Day", color: "bg-yellow-100 text-yellow-800" },
];
