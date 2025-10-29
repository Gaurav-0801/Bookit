export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string | number;
  imageUrl: string;
  category: string;
  rating: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
  slots?: Slot[];
}

export interface Slot {
  id: string;
  experienceId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  experienceId: string;
  slotId: string;
  bookingDate: string;
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  totalPrice: string | number;
  promoCode?: string;
  createdAt: string;
  updatedAt: string;
  experience?: Experience;
  slot?: Slot;
  user?: User;
}

export interface PromoCode {
  code: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  discountValue: string | number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
  errors?: Array<{ msg: string; param: string }>;
}


