import React from 'react';
import { User } from 'lucide-react';

interface ProfileSummaryProps {
  description?: string;
}

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({ description }) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <User className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
        <h3 className="text-xl font-bold text-[#1a4b9e]">Resumen profesional</h3>
      </div>
      {description ? (
        <p className="text-sm leading-relaxed text-gray-500 font-medium lg:max-w-[800px]">
          {description}
        </p>
      ) : (
        <p className="text-sm text-gray-400 italic">
          Sin resumen profesional añadido.
        </p>
      )}
    </section>
  );
};
