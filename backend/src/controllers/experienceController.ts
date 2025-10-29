import { Request, Response } from 'express';
import { prisma } from '../config/database';

export async function getAllExperiences(req: Request, res: Response) {
  try {
    const { category, search } = req.query;

    const where: any = {};

    if (category && category !== 'all') {
      where.category = category as string;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { location: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const experiences = await prisma.experience.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json({ experiences });
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
}

export async function getExperienceById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const experience = await prisma.experience.findUnique({
      where: { id },
      include: {
        slots: {
          where: {
            date: {
              gte: new Date(),
            },
          },
          orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
        },
      },
    });

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.json({ experience });
  } catch (error) {
    console.error('Get experience error:', error);
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
}


