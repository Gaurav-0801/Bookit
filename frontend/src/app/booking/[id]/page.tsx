'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { bookingAPI } from '../../../../lib/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import type { Booking } from '../../../../types';

export default function BookingResultPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchBooking(params.id as string);
    }
  }, [params.id]);

  const fetchBooking = async (id: string) => {
    try {
      setLoading(true);
      const { booking: data } = await bookingAPI.getById(id);
      setBooking(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Failed</h2>
          <p className="text-gray-600 mb-6">{error || 'Something went wrong'}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice =
    typeof booking.totalPrice === 'string'
      ? parseFloat(booking.totalPrice)
      : booking.totalPrice;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Your adventure is booked and ready to go
          </p>
          <div className="inline-block bg-blue-50 px-6 py-3 rounded-lg">
            <p className="text-sm text-gray-600">Booking ID</p>
            <p className="text-xl font-mono font-bold text-primary">
              {booking.id}
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Booking Details
          </h2>

          <div className="space-y-6">
            {/* Experience Info */}
            {booking.experience && (
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {booking.experience.title}
                </h3>
                <p className="text-gray-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {booking.experience.location}
                </p>
              </div>
            )}

            {/* Date & Time */}
            {booking.slot && (
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  Date & Time
                </h3>
                <div className="flex items-center text-gray-900 mb-2">
                  <svg
                    className="w-5 h-5 mr-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(booking.slot.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="flex items-center text-gray-900">
                  <svg
                    className="w-5 h-5 mr-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {booking.slot.startTime} - {booking.slot.endTime}
                </div>
              </div>
            )}

            {/* Customer Info */}
            {booking.user && (
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-900">
                    <span className="font-medium">Name:</span> {booking.user.name}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-medium">Email:</span> {booking.user.email}
                  </p>
                  {booking.user.phone && (
                    <p className="text-gray-900">
                      <span className="font-medium">Phone:</span>{' '}
                      {booking.user.phone}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Payment Info */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-3">
                Payment Summary
              </h3>
              {booking.promoCode && (
                <p className="text-sm text-green-600 mb-2">
                  ✓ Promo code <span className="font-mono font-semibold">{booking.promoCode}</span> applied
                </p>
              )}
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total Paid
                </span>
                <span className="text-2xl font-bold text-primary">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Booking Status
              </h3>
              <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                {booking.status}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/my-bookings"
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-medium text-center hover:bg-primary-dark transition-colors"
          >
            View All Bookings
          </Link>
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-medium text-center hover:bg-blue-50 transition-colors"
          >
            Explore More Experiences
          </Link>
        </div>
      </div>
    </div>
  );
}


