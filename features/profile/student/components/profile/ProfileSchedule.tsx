import React from 'react';
import { Calendar } from 'lucide-react';
import { Tag } from '../ui/Tag';

interface ProfileScheduleProps {
  workSchedule?: string;
}

export const ProfileSchedule: React.FC<ProfileScheduleProps> = ({ workSchedule }) => {
  const scheduleLabel = workSchedule ? (
    {
      FULL_TIME: 'Jornada completa',
      PART_TIME: 'Media jornada',
      FLEXIBLE: 'Flexible'
    }[workSchedule] || workSchedule
  ) : null;

  return (
    <section className="flex flex-col gap-4 flex-1">
      <div className="flex items-center gap-2">
        <Calendar className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
        <h3 className="text-xl font-bold text-[#1a4b9e]">Jornada</h3>
      </div>
      {scheduleLabel ? (
        <div className="flex flex-wrap gap-2">
          <Tag variant="schedule" label={scheduleLabel} />
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">No especificado.</p>
      )}
    </section>
  );
};
