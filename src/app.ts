import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import morgan from 'morgan';

import userRoutes from './routes/users';
import messageRoutes from './routes/messages';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

// Global Middleware
app.use(helmet()); // Security headers
app.use(express.json()); // JSON body parsing
app.use(morgan('dev')); // Logging

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  })
);

// Routes
app.use('/app/users', userRoutes);
app.use('/app/messages', messageRoutes);
app.use('/app/auth', authRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
