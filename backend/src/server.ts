import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import experienceRoutes from './routes/experienceRoutes';
import bookingRoutes from './routes/bookingRoutes';
import promoRoutes from './routes/promoRoutes';
import { errorHandler } from './middleware/errorHandler';
import { SERVER_CONFIG, CORS_CONFIG } from './config';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());

// CORS with normalized, multi-origin support
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (no origin)
    if (!origin) return callback(null, true);
    const normalizedRequestOrigin = origin.replace(/\/$/, '');
    const isAllowed = CORS_CONFIG.allowedOrigins.includes(normalizedRequestOrigin);
    if (isAllowed) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/promo', promoRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = SERVER_CONFIG.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${SERVER_CONFIG.nodeEnv}`);
});


