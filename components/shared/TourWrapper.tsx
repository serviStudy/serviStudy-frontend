"use client";
import { useState, useEffect } from 'react';
import { WelcomeTour } from '@/features/ai-agent/components/WelcomeTour';

interface TourWrapperProps {
  role: 'STUDENT' | 'EMPLOYER';
  isPremium: boolean;
}

export const TourWrapper = ({ role, isPremium }: TourWrapperProps) => {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Small delay so the page renders first
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem('has_seen_tour') === 'true';
      if (!hasSeen) setShowTour(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (!showTour) return null;

  return (
    <WelcomeTour
      role={role}
      isPremium={isPremium}
      onComplete={() => {
        localStorage.setItem('has_seen_tour', 'true');
        setShowTour(false);
      }}
    />
  );
};
