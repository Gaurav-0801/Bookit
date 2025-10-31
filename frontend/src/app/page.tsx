'use client';

import { useState, useEffect } from 'react';
import { experienceAPI } from '../../lib/api';
import ExperienceCard from '../../components/ExperienceCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import type { Experience } from '../../types';

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const categories = [
    'all',
    'Adventure',
    'Cultural',
    'Food & Wine',
    'Nature',
    'Water Sports',
  ];

  useEffect(() => {
    fetchExperiences();
  }, [category, search]);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (category !== 'all') params.category = category;
      if (search) params.search = search;

      const { experiences: data } = await experienceAPI.getAll(params);
      setExperiences(data);
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-dark to-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32 pb-16 lg:pb-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Discover Amazing
              <span className="block bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                Experiences
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto animate-slide-up">
              Book unique adventures and create unforgettable memories around the world
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-slide-up mb-12 md:mb-16">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search experiences..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-xl focus:ring-4 focus:ring-white/20 focus:bg-white transition-all duration-200 placeholder:text-text-muted"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer between hero and filters */}
      <div className="h-12 md:h-16 bg-surface"></div>

      {/* Filters Section */}
      <div className="bg-white border-b border-border-light sticky top-16 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-primary text-white shadow-md transform scale-105'
                    : 'bg-surface text-secondary hover:bg-primary-light hover:text-primary hover:shadow-sm'
                }`}
              >
                {cat === 'all' ? 'All Experiences' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-2">No experiences found</h3>
            <p className="text-text-muted">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <div 
                key={experience.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ExperienceCard experience={experience} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}