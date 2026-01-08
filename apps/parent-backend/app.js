import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.js';
import parentHomeRoutes from './routes/parent.home.routes.js';
import parentAttendanceRoutes from './routes/parent.attendance.routes.js';
import parentResultsRoutes from './routes/parent.results.routes.js';
import parentProfileRoutes from './routes/parent.profile.routes.js';
import parentPerformanceRoutes from './routes/parent.performance.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/api/parent/home', parentHomeRoutes);
app.use('/api/parent/attendance', parentAttendanceRoutes);
app.use('/api/parent/results', parentResultsRoutes);
app.use('/api/parent/profile', parentProfileRoutes);
app.use('/api/parent/performance', parentPerformanceRoutes);

// Error handling middleware (placeholder)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});

export default app;
