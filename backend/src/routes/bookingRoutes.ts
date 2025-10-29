import { Router } from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
} from '../controllers/bookingController';
import { authMiddleware } from '../middleware/auth';
import { createBookingValidator } from '../validators/bookingValidators';

const router = Router();

// All booking routes require authentication
router.use(authMiddleware);

router.post('/', createBookingValidator, createBooking);
router.get('/user/:userId', getUserBookings);
router.get('/:id', getBookingById);

export default router;


