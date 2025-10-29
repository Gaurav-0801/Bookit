import { Response } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { Decimal } from '@prisma/client/runtime/library';

export async function createBooking(req: AuthRequest, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { experienceId, slotId, promoCode } = req.body;
    const userId = req.user!.userId;

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Get slot with lock
      const slot = await tx.slot.findUnique({
        where: { id: slotId },
        include: { experience: true },
      });

      if (!slot) {
        throw new Error('Slot not found');
      }

      // Check if slot is available
      if (slot.bookedCount >= slot.capacity) {
        throw new Error('Slot is fully booked');
      }

      // Calculate price
      let totalPrice = slot.experience.price;

      // Apply promo code if provided
      if (promoCode) {
        const promo = await tx.promoCode.findUnique({
          where: { code: promoCode },
        });

        if (promo && promo.active) {
          const now = new Date();
          if (now >= promo.validFrom && now <= promo.validTo) {
            if (promo.discountType === 'PERCENTAGE') {
              const discount = totalPrice.mul(promo.discountValue).div(100);
              totalPrice = totalPrice.sub(discount);
            } else if (promo.discountType === 'FLAT') {
              totalPrice = totalPrice.sub(promo.discountValue);
            }
          }
        }
      }

      // Ensure price is not negative
      if (totalPrice.lessThan(0)) {
        totalPrice = new Decimal(0);
      }

      // Create booking
      const booking = await tx.booking.create({
        data: {
          userId,
          experienceId,
          slotId,
          totalPrice,
          promoCode: promoCode || null,
          status: 'CONFIRMED',
        },
        include: {
          experience: true,
          slot: true,
        },
      });

      // Update slot booked count
      await tx.slot.update({
        where: { id: slotId },
        data: {
          bookedCount: {
            increment: 1,
          },
        },
      });

      return booking;
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking: result,
    });
  } catch (error: any) {
    console.error('Create booking error:', error);
    if (error.message === 'Slot not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Slot is fully booked') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create booking' });
  }
}

export async function getUserBookings(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.userId;

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        experience: true,
        slot: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
}

export async function getBookingById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const booking = await prisma.booking.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        experience: true,
        slot: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
}


