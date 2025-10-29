import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.user.deleteMany();

  // Create experiences with royalty-free images from Unsplash
  const experiences = await Promise.all([
    prisma.experience.create({
      data: {
        title: 'Sunset Safari Adventure',
        description:
          'Experience the thrill of wildlife spotting during golden hour. Our expert guides will take you through pristine landscapes where you can witness majestic animals in their natural habitat.',
        location: 'Serengeti, Tanzania',
        price: 249.99,
        imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
        category: 'Adventure',
        rating: 4.8,
        duration: 240, // 4 hours
      },
    }),
    prisma.experience.create({
      data: {
        title: 'Traditional Cooking Class',
        description:
          'Learn to cook authentic local dishes with a professional chef. Discover secret family recipes and cooking techniques passed down through generations.',
        location: 'Tuscany, Italy',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
        category: 'Food & Wine',
        rating: 4.9,
        duration: 180, // 3 hours
      },
    }),
    prisma.experience.create({
      data: {
        title: 'Mountain Hiking Expedition',
        description:
          'Challenge yourself with breathtaking mountain trails. Perfect for adventure seekers looking to conquer new heights and enjoy spectacular panoramic views.',
        location: 'Swiss Alps, Switzerland',
        price: 189.99,
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        category: 'Nature',
        rating: 4.7,
        duration: 360, // 6 hours
      },
    }),
    prisma.experience.create({
      data: {
        title: 'Scuba Diving Paradise',
        description:
          'Explore vibrant coral reefs and swim alongside tropical fish. All equipment included, suitable for both beginners and experienced divers.',
        location: 'Great Barrier Reef, Australia',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        category: 'Water Sports',
        rating: 5.0,
        duration: 240, // 4 hours
      },
    }),
    prisma.experience.create({
      data: {
        title: 'Cultural Temple Tour',
        description:
          'Journey through ancient temples and learn about rich cultural heritage. Experience spiritual ceremonies and traditional rituals with local guides.',
        location: 'Kyoto, Japan',
        price: 99.99,
        imageUrl: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
        category: 'Cultural',
        rating: 4.9,
        duration: 180, // 3 hours
      },
    }),
    prisma.experience.create({
      data: {
        title: 'Northern Lights Expedition',
        description:
          'Witness the magical Aurora Borealis dancing across the Arctic sky. Includes warm clothing, hot beverages, and professional photography guidance.',
        location: 'Tromsø, Norway',
        price: 349.99,
        imageUrl: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800',
        category: 'Nature',
        rating: 4.8,
        duration: 300, // 5 hours
      },
    }),
    prisma.experience.create({
      data: {
        title: 'Wine Tasting Experience',
        description:
          'Sample exquisite wines from prestigious vineyards. Learn about wine-making processes while enjoying cheese pairings and stunning countryside views.',
        location: 'Bordeaux, France',
        price: 159.99,
        imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
        category: 'Food & Wine',
        rating: 4.9,
        duration: 240, // 4 hours
      },
    }),
    prisma.experience.create({
      data: {
        title: 'Rainforest Canopy Zipline',
        description:
          'Soar through lush rainforest canopy on thrilling ziplines. Experience the jungle from a unique perspective with certified safety equipment.',
        location: 'Costa Rica',
        price: 179.99,
        imageUrl: 'https://images.unsplash.com/photo-1606086518254-7f2dbb6c2f44?w=800',
        category: 'Adventure',
        rating: 4.7,
        duration: 180, // 3 hours
      },
    }),
    prisma.experience.create({
      data: {
        title: 'Surfing Lessons at Sunset',
        description:
          'Learn to ride the waves with experienced surf instructors. Perfect for beginners, all equipment provided including wetsuit and surfboard.',
        location: 'Bali, Indonesia',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800',
        category: 'Water Sports',
        rating: 4.8,
        duration: 120, // 2 hours
      },
    }),
    prisma.experience.create({
      data: {
        title: 'Desert Camel Trek',
        description:
          'Experience traditional desert travel on camelback through golden sand dunes. Includes traditional tea ceremony and stargazing session.',
        location: 'Sahara Desert, Morocco',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
        category: 'Adventure',
        rating: 4.6,
        duration: 300, // 5 hours
      },
    }),
    prisma.experience.create({
      data: {
        title: 'Street Food Walking Tour',
        description:
          'Discover hidden culinary gems on a guided street food adventure. Taste authentic local delicacies from the best street vendors.',
        location: 'Bangkok, Thailand',
        price: 69.99,
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        category: 'Food & Wine',
        rating: 4.9,
        duration: 180, // 3 hours
      },
    }),
    prisma.experience.create({
      data: {
        title: 'Glacier Hiking Adventure',
        description:
          'Trek across ancient ice formations with professional glacier guides. All safety equipment provided including crampons and ice axes.',
        location: 'Patagonia, Argentina',
        price: 269.99,
        imageUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800',
        category: 'Nature',
        rating: 4.8,
        duration: 420, // 7 hours
      },
    }),
  ]);

  console.log(`✅ Created ${experiences.length} experiences`);

  // Create slots for each experience (next 30 days)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let totalSlots = 0;

  for (const experience of experiences) {
    for (let day = 0; day < 30; day++) {
      const slotDate = new Date(today);
      slotDate.setDate(today.getDate() + day);

      // Create 2-3 time slots per day
      const timeSlots = [
        { startTime: '09:00', endTime: '12:00', capacity: 8 },
        { startTime: '14:00', endTime: '17:00', capacity: 10 },
        { startTime: '18:00', endTime: '21:00', capacity: 6 },
      ];

      for (const timeSlot of timeSlots) {
        await prisma.slot.create({
          data: {
            experienceId: experience.id,
            date: slotDate,
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            capacity: timeSlot.capacity,
            bookedCount: Math.floor(Math.random() * 3), // Random bookings (0-2)
          },
        });
        totalSlots++;
      }
    }
  }

  console.log(`✅ Created ${totalSlots} slots`);

  // Create promo codes
  const promoCodes = await Promise.all([
    prisma.promoCode.create({
      data: {
        code: 'SAVE10',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        validFrom: new Date('2025-01-01'),
        validTo: new Date('2025-12-31'),
        active: true,
      },
    }),
    prisma.promoCode.create({
      data: {
        code: 'FLAT100',
        discountType: 'FLAT',
        discountValue: 100,
        validFrom: new Date('2025-01-01'),
        validTo: new Date('2025-12-31'),
        active: true,
      },
    }),
    prisma.promoCode.create({
      data: {
        code: 'WELCOME20',
        discountType: 'PERCENTAGE',
        discountValue: 20,
        validFrom: new Date('2025-01-01'),
        validTo: new Date('2025-06-30'),
        active: true,
      },
    }),
  ]);

  console.log(`✅ Created ${promoCodes.length} promo codes`);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


