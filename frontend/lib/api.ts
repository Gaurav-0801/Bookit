import axios from 'axios';
import type { Experience, Booking, PromoCode, AuthResponse } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  getMe: async (): Promise<{ user: any }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Experience API
export const experienceAPI = {
  getAll: async (params?: {
    category?: string;
    search?: string;
  }): Promise<{ experiences: Experience[] }> => {
    const response = await api.get('/experiences', { params });
    return response.data;
  },

  getById: async (id: string): Promise<{ experience: Experience }> => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
  },
};

// Booking API
export const bookingAPI = {
  create: async (data: {
    experienceId: string;
    slotId: string;
    promoCode?: string;
  }): Promise<{ message: string; booking: Booking }> => {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  getUserBookings: async (
    userId: string
  ): Promise<{ bookings: Booking[] }> => {
    const response = await api.get(`/bookings/user/${userId}`);
    return response.data;
  },

  getById: async (id: string): Promise<{ booking: Booking }> => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
};

// Promo API
export const promoAPI = {
  validate: async (code: string): Promise<{ valid: boolean; promo: PromoCode }> => {
    const response = await api.post('/promo/validate', { code });
    return response.data;
  },
};

export default api;


