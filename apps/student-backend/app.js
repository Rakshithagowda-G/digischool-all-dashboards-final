import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import studentHomeRoutes from './routes/student.home.routes.js';
import studentResultsRoutes from './routes/student.results.routes.js';
import studentAnnouncementRoutes from './routes/student.announcement.routes.js';
import studentEventsRoutes from './routes/student.events.routes.js';
import studentCoursesRoutes from './routes/student.courses.routes.js';
import studentAttendanceRoutes from './routes/student.attendance.routes.js';
import studentProfileRoutes from './routes/student.profile.routes.js';
import studentAssignmentsRoutes from './routes/student.assignments.routes.js';
import libraryRoutes from './routes/library.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/api/student/home', studentHomeRoutes);
app.use('/api/student/results', studentResultsRoutes);
app.use('/api/student/announcements', studentAnnouncementRoutes);
app.use('/api/student/events', studentEventsRoutes);
app.use('/api/student/courses', studentCoursesRoutes);
app.use('/api/student/attendance', studentAttendanceRoutes);
app.use('/api/student/profile', studentProfileRoutes);
app.use('/api/student/assignments', studentAssignmentsRoutes);
app.use('/api/student/library', libraryRoutes);

export default app;
