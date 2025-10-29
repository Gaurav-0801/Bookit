import { Request, Response } from 'express';
import { prisma } from '../config/database';

export async function validatePromoCode(req: Request, res: Response) {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Promo code is required' });
    }

    const promo = await prisma.promoCode.findUnique({
      where: { code },
    });

    if (!promo) {
      return res.status(404).json({ error: 'Invalid promo code' });
    }

    if (!promo.active) {
      return res.status(400).json({ error: 'Promo code is inactive' });
    }

    const now = new Date();
    if (now < promo.validFrom || now > promo.validTo) {
      return res.status(400).json({ error: 'Promo code has expired' });
    }

    res.json({
      valid: true,
      promo: {
        code: promo.code,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
      },
    });
  } catch (error) {
    console.error('Validate promo error:', error);
    res.status(500).json({ error: 'Failed to validate promo code' });
  }
}


