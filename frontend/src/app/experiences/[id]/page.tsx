'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { experienceAPI } from '../../../../lib/api';
import { useAuth } from '../../../../contexts/AuthContext';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import Card from '../../../../components/ui/Card';
import type { Experience, Slot } from '../../../../types';
import { format, parseISO } from 'date-fns';

export default function ExperienceDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchExperience(params.id as string);
    }
  }, [params.id]);

  const fetchExperience = async (id: string) => {
    try {
      setLoading(true);
      const { experience: data } = await experienceAPI.getById(id);
      setExperience(data);

      // Auto-select first available date
      if (data.slots && data.slots.length > 0) {
        setSelectedDate(data.slots[0].date);
      }
    } catch (error) {
      console.error('Failed to fetch experience:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    // Navigate to checkout with selected slot
    router.push(
      `/checkout?experienceId=${experience?.id}&slotId=${selectedSlot.id}`
    );
  };

  // Group slots by date
  const uniqueDates = Array.from(
    new Set(experience?.slots?.map((slot) => slot.date) || [])
  ).slice(0, 14); // Show next 14 days

  // Get slots for selected date
  const slotsForSelectedDate = experience?.slots?.filter(
    (slot) => slot.date === selectedDate
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Experience not found</p>
      </div>
    );
  }

  const price =
    typeof experience.price === 'string'
      ? parseFloat(experience.price)
      : experience.price;

  return (
    <div className="relative min-h-screen bg-linear-to-br from-surface via-white to-primary-light py-12 overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary-dark/15 blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-primary hover:text-primary-dark flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Experiences</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Image and Details */}
          <div>
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 mb-6">
              <Image
                src={experience.imageUrl}
                alt={experience.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Details */}
            <Card className="!p-10">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-4 py-2 bg-blue-50 text-primary font-medium rounded-full">
                    {experience.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="font-medium">{experience.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">
                  {experience.title}
                </h1>

                <div className="flex items-center text-gray-600 mb-6 space-x-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {experience.location}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {Math.floor(experience.duration / 60)}h {experience.duration % 60}m
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{experience.description}</p>
              </div>
            </Card>
          </div>

          {/* Right: Slot Selection */}
          <div>
            <Card className="sticky top-24 !p-10">
              <div>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Select Date & Time</h2>
                    <div className="text-3xl font-extrabold text-primary">${price.toFixed(2)}</div>
                  </div>
                  <p className="text-sm text-gray-600">per person</p>
                </div>

                {/* Date Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Choose Date
                  </label>
                  <div className="grid grid-cols-7 gap-3 max-h-56 overflow-y-auto">
                    {uniqueDates.map((date) => {
                      const dateObj = parseISO(date);
                      const isSelected = selectedDate === date;
                      return (
                        <button
                          key={date}
                          onClick={() => {
                            setSelectedDate(date);
                            setSelectedSlot(null);
                          }}
                          className={`px-3 py-4 rounded-xl text-center transition-colors shadow-sm ring-1 ring-transparent ${
                            isSelected
                              ? 'bg-primary text-white shadow-primary/30 ring-primary/40'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <div className="text-xs mb-1">{format(dateObj, 'EEE')}</div>
                          <div className="text-lg font-semibold">
                            {format(dateObj, 'd')}
                          </div>
                          <div className="text-xs mt-1">{format(dateObj, 'MMM')}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Selection */}
                {selectedDate && (
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Choose Time Slot
                    </label>
                    <div className="space-y-3 max-h-72 overflow-y-auto">
                      {slotsForSelectedDate && slotsForSelectedDate.length > 0 ? (
                        slotsForSelectedDate.map((slot) => {
                          const isSelected = selectedSlot?.id === slot.id;
                          const isSoldOut = slot.bookedCount >= slot.capacity;
                          const spotsLeft = slot.capacity - slot.bookedCount;

                          return (
                            <button
                              key={slot.id}
                              onClick={() => !isSoldOut && setSelectedSlot(slot)}
                              disabled={isSoldOut}
                              className={`w-full px-6 py-5 rounded-xl border-2 transition-all ${
                                isSoldOut
                                  ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60'
                                  : isSelected
                                  ? 'border-primary bg-blue-50 shadow-md'
                                  : 'border-gray-200 hover:border-primary hover:shadow-sm'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-left">
                                  <div className="font-semibold text-gray-900 mb-1">
                                    {slot.startTime} - {slot.endTime}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {isSoldOut ? (
                                      <span className="text-red-600 font-medium">Sold Out</span>
                                    ) : (
                                      <span>{spotsLeft} spots left</span>
                                    )}
                                  </div>
                                </div>
                                {isSelected && (
                                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            </button>
                          );
                        })
                      ) : (
                        <p className="text-gray-600 text-center py-6">
                          No slots available for this date
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <button
                  onClick={handleBookNow}
                  disabled={!selectedSlot}
                  className="w-full bg-linear-to-r from-primary to-primary-dark text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-primary-dark hover:to-primary focus:ring-4 focus:ring-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {!isAuthenticated
                    ? 'Login to Book'
                    : !selectedSlot
                    ? 'Select a Time Slot'
                    : 'Book Now'}
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


