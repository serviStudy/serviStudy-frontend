import React from 'react';
import { Calendar } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Tag } from '../ui/Tag';
import { SectionTitle } from './SectionTitle';
import { translateDay } from '../../utils/workDays.utils';

interface AvailabilitySectionProps {
  formData: {
    jornada: string | null;
  };
  setters: {
    setJornada: (val: string) => void;
  };
  errors: Record<string, string>;
  DAYS_OPTIONS: string[];
  SCHEDULE_OPTIONS: { id: string; label: string }[];
  handlePresetDays: (preset: string) => void;
  isEntreSemanaSelected: boolean;
  isFinesDeSemanaSelected: boolean;
  isEspecificosSelected: boolean;
  normalizedDays: string[];
}

export const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  formData,
  setters,
  errors,
  DAYS_OPTIONS,
  SCHEDULE_OPTIONS,
  handlePresetDays,
  isEntreSemanaSelected,
  isFinesDeSemanaSelected,
  isEspecificosSelected,
  normalizedDays
}) => {
  return (
    <section>
      <SectionTitle title="Disponibilidad" icon={Calendar} />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-2">
            Días Laborales
          </Label>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {DAYS_OPTIONS.map((day) => {
              const isSelected = 
                (day === "Entre semana" && isEntreSemanaSelected) ||
                (day === "Fines de semana" && isFinesDeSemanaSelected) ||
                (day === "Específicos" && isEspecificosSelected);
                
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handlePresetDays(day)}
                  className={`px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-medium rounded-xl transition-all duration-200 border-2 ${
                    isSelected
                      ? "bg-green-50 border-green-600 text-green-700 shadow-sm"
                      : "bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
          {isEspecificosSelected && normalizedDays.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-100">
              {normalizedDays.map(d => (
                <Tag key={d} variant="specific_day" label={translateDay(d)} />
              ))}
            </div>
          )}
          {errors.days && <p className="text-red-500 text-xs font-medium ml-1">{errors.days}</p>}
        </div>

        <div className="space-y-4">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-2">
            Tipo de Jornada
          </Label>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {SCHEDULE_OPTIONS.map((schedule) => {
              const isSelected = formData.jornada === schedule.id;
              return (
                <button
                  key={schedule.id}
                  type="button"
                  onClick={() => setters.setJornada(schedule.id)}
                  className={`px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-medium rounded-xl transition-all duration-200 border-2 ${
                    isSelected
                      ? "bg-orange-50 border-orange-600 text-orange-700 shadow-sm"
                      : "bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {schedule.label}
                </button>
              );
            })}
          </div>
          {errors.jornada && <p className="text-red-500 text-xs font-medium ml-1">{errors.jornada}</p>}
        </div>
      </div>
    </section>
  );
};
