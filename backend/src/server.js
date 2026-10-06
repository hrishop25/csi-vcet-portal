import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';
import { seedDatabase } from './utils/seeder.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { submitApplication } from './controllers/applicationController.js';

// Route imports
import authRoutes from './routes/auth.js';
import applicationRoutes from './routes/applications.js';
import memberRoutes from './routes/members.js';
import eventRoutes from './routes/events.js';
import statsRoutes from './routes/stats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Direct recruitment endpoint specified in requirements
app.post('/api/apply', submitApplication);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/stats', statsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    name: 'CSI VCET Chapter API Portal',
    college: "Vidyavardhini's College of Engineering and Technology (VCET)",
    status: 'ACTIVE',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    db: getDbStatus(),
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>CSI VCET API</title></head>
      <body style="font-family: sans-serif; padding: 2rem; background: #0f172a; color: #f8fafc;">
        <h1 style="color: #60a5fa;">Computer Society of India - VCET Chapter</h1>
        <p>API Server is running in production-ready mode.</p>
        <p>Status: <b style="color: #4ade80;">ONLINE</b></p>
        <ul>
          <li><a style="color: #93c5fd;" href="/api/health">/api/health</a></li>
          <li><a style="color: #93c5fd;" href="/api/members">/api/members</a></li>
          <li><a style="color: #93c5fd;" href="/api/events">/api/events</a></li>
        </ul>
      </body>
    </html>
  `);
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect DB & Launch Server
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`  CSI VCET Chapter Backend Server Active               `);
      console.log(`  URL: http://localhost:${PORT}                         `);
      console.log(`  Mode: ${getDbStatus().mode}                           `);
      console.log(`  Default Admin: admin@csivcet.org / CsiVcet@2026      `);
      console.log(`=======================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
