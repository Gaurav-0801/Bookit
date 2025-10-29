import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config';

export interface JwtPayload {
  userId: string;
  email: string;
}

export function generateToken(payload: JwtPayload): string {
  if (!JWT_CONFIG.secret) {
    throw new Error('JWT_SECRET is not configured');
  }
  
  return jwt.sign(payload, JWT_CONFIG.secret, {
    expiresIn: '7d',
  });
}

export function verifyToken(token: string): JwtPayload {
  if (!JWT_CONFIG.secret) {
    throw new Error('JWT_SECRET is not configured');
  }
  
  return jwt.verify(token, JWT_CONFIG.secret) as JwtPayload;
}
