import { body } from 'express-validator';

export const createBookingValidator = [
  body('experienceId').notEmpty().withMessage('Experience ID is required'),
  body('slotId').notEmpty().withMessage('Slot ID is required'),
  body('promoCode').optional().isString(),
];


