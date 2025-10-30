'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { experienceAPI, promoAPI, bookingAPI } from '../../../lib/api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Card from '../../../components/ui/Card';
import type { Experience, Slot, PromoCode } from '../../../types';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoData, setPromoData] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');

  const experienceId = searchParams.get('experienceId');
  const slotId = searchParams.get('slotId');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!experienceId || !slotId) {
      router.push('/');
      return;
    }

    fetchData();
  }, [experienceId, slotId, isAuthenticated]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { experience: exp } = await experienceAPI.getById(experienceId!);
      setExperience(exp);

      const selectedSlot = exp.slots?.find((s) => s.id === slotId);
      if (selectedSlot) {
        setSlot(selectedSlot);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    try {
      setPromoLoading(true);
      setPromoError('');
      const { promo } = await promoAPI.validate(promoCode.trim());
      setPromoData(promo);
    } catch (err: any) {
      setPromoError(err.response?.data?.error || 'Invalid promo code');
      setPromoData(null);
    } finally {
      setPromoLoading(false);
    }
  };

  const calculatePrice = () => {
    if (!experience) return 0;

    const basePrice =
      typeof experience.price === 'string'
        ? parseFloat(experience.price)
        : experience.price;

    if (!promoData) return basePrice;

    if (promoData.discountType === 'PERCENTAGE') {
      const discountValue =
        typeof promoData.discountValue === 'string'
          ? parseFloat(promoData.discountValue)
          : promoData.discountValue;
      return basePrice - (basePrice * discountValue) / 100;
    } else {
      const discountValue =
        typeof promoData.discountValue === 'string'
          ? parseFloat(promoData.discountValue)
          : promoData.discountValue;
      return Math.max(0, basePrice - discountValue);
    }
  };

  const handleConfirmBooking = async () => {
    try {
      setBookingLoading(true);
      setError('');

      const { booking } = await bookingAPI.create({
        experienceId: experienceId!,
        slotId: slotId!,
        promoCode: promoData?.code,
      });

      // Navigate to success page
      router.push(`/booking/${booking.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!experience || !slot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Booking details not found</p>
      </div>
    );
  }

  const basePrice =
    typeof experience.price === 'string'
      ? parseFloat(experience.price)
      : experience.price;
  const finalPrice = calculatePrice();
  const discount = basePrice - finalPrice;

  return (
    <div className="relative min-h-screen bg-linear-to-br from-surface via-white to-primary-light py-12 overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary-dark/15 blur-3xl" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Information */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Information
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
                {user?.phone && (
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Promo Code */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Promo Code
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary/50 outline-none placeholder:text-gray-400"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={promoLoading || !promoCode.trim()}
                  className="px-6 py-3 bg-linear-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:from-primary-dark hover:to-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {promoLoading ? 'Applying...' : 'Apply'}
                </button>
              </div>
              {promoError && (
                <p className="mt-2 text-sm text-red-600">{promoError}</p>
              )}
              {promoData && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">
                    ✓ Promo code applied! You save $
                    {discount.toFixed(2)}
                  </p>
                </div>
              )}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Try these codes:</span> <span className="font-mono">SAVE10</span>, <span className="font-mono">FLAT100</span>, <span className="font-mono">WELCOME20</span>
                </p>
              </div>
            </Card>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Booking Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {experience.location}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(slot.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {slot.startTime} - {slot.endTime}
                  </div>
                </div>

                <div className="pt-4 border-top border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Price</span>
                    <span className="font-medium">${basePrice.toFixed(2)}</span>
                  </div>
                  {promoData && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount</span>
                      <span className="font-medium text-green-600">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-primary">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={bookingLoading}
                className="w-full bg-linear-to-r from-primary to-primary-dark text-white py-4 rounded-xl font-semibold text-lg hover:from-primary-dark hover:to-primary focus:ring-4 focus:ring-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? 'Processing...' : 'Confirm Booking'}
              </button>

              <p className="mt-4 text-xs text-gray-500 text-center">
                By confirming, you agree to our terms and conditions
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}


