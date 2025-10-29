export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'fallback-secret-key',
  expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as string,
};

export const SERVER_CONFIG = {
  port: parseInt(process.env.PORT || '5000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
} as const;

