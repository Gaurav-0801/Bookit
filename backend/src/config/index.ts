export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'fallback-secret-key',
  expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as string,
};

export const SERVER_CONFIG = {
  port: parseInt(process.env.PORT || '5000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
} as const;

// Normalized list of allowed CORS origins. Accepts comma-separated list in CORS_ORIGINS
// Falls back to FRONTEND_URL, and finally localhost for development.
export const CORS_CONFIG = {
  allowedOrigins: ((process.env.CORS_ORIGINS && process.env.CORS_ORIGINS.length > 0)
    ? process.env.CORS_ORIGINS
    : (process.env.FRONTEND_URL || 'http://localhost:3000'))
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, '')),
} as const;

