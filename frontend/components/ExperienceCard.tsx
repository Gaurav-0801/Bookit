import Link from 'next/link';
import Image from 'next/image';
import type { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const price = typeof experience.price === 'string' 
    ? parseFloat(experience.price) 
    : experience.price;

  return (
    <Link href={`/experiences/${experience.id}`}>
      <div className="group card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        {/* Image Container */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={experience.imageUrl}
            alt={experience.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
            <span className="text-sm font-bold text-primary">
              ${price.toFixed(2)}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1.5 text-xs font-semibold text-white bg-primary/90 backdrop-blur-sm rounded-full shadow-md">
              {experience.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Rating */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-warning fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-sm font-semibold text-secondary">
                {experience.rating.toFixed(1)}
              </span>
            </div>
            <div className="text-xs text-text-light">
              {Math.floor(experience.duration / 60)}h {experience.duration % 60}m
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {experience.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-sm text-text-muted mb-4">
            <svg
              className="w-4 h-4 mr-2 text-primary"
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
            <span className="truncate">{experience.location}</span>
          </div>

          {/* Action Indicator */}
          <div className="flex items-center justify-between text-sm text-primary font-medium">
            <span>View Details</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
