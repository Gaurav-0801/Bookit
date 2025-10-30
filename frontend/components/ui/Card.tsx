import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-2xl p-8 shadow-xl ring-1 ring-black/5 bg-white/85 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}


