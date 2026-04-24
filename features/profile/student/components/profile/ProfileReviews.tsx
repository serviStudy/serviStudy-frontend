import React from 'react';
import { Users } from 'lucide-react';
import { Reviews } from '@/components/shared/Reviews';

export const ProfileReviews: React.FC = () => {
  return (
    <section className="flex flex-col gap-4 pb-6 mt-4">
      <div className="flex items-center gap-2">
        <Users className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
        <h3 className="text-xl font-bold text-[#1a4b9e]">Reseñas</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      </div>
    </section>
  );
};
