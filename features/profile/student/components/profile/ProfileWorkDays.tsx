import React from 'react';
import { Clock } from 'lucide-react';
import { Tag } from '../ui/Tag';
import { isWeekDays, isWeekend, isSpecificDays } from '../../utils/workDays.utils';

interface ProfileWorkDaysProps {
  normalizedDays: string[];
  onOpenModal: () => void;
}

export const ProfileWorkDays: React.FC<ProfileWorkDaysProps> = ({ normalizedDays, onOpenModal }) => {
  const isEntreSemana = isWeekDays(normalizedDays);
  const isFinesDeSemana = isWeekend(normalizedDays);
  const isEspecificos = isSpecificDays(normalizedDays);

  return (
    <section className="flex flex-col gap-4 flex-1">
      <div className="flex items-center gap-2">
        <Clock className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
        <h3 className="text-xl font-bold text-[#1a4b9e]">Días laborales</h3>
      </div>
      {normalizedDays.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {isEntreSemana && <Tag variant="day" label="Entre semana" />}
          {isFinesDeSemana && <Tag variant="day" label="Fines de semana" />}
          {isEspecificos && (
            <button
              type="button"
              onClick={onOpenModal}
              className="bg-[#d2ffe1] border border-green-700 text-green-700 rounded-full px-4 py-1 text-sm font-bold hover:bg-[#c1d6fb] transition-colors"
            >
              Flexible (ver días)
            </button>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">No especificado.</p>
      )}
    </section>
  );
};
