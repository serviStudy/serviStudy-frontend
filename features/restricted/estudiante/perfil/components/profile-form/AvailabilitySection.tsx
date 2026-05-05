import React from 'react';
import { Label } from '@/components/ui/label';
import { Tag } from '../ui/Tag';
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
    <div className="space-y-8">
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-400 ml-1">Días de disponibilidad</Label>
        <div className="flex flex-wrap gap-3">
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
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 border ${
                  isSelected
                    ? "bg-green-100 border-green-200 text-green-600"
                    : "bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:bg-gray-50 shadow-sm"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
        {isEspecificosSelected && normalizedDays.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
            {normalizedDays.map(d => (
              <Tag key={d} variant="specific_day" label={translateDay(d)} />
            ))}
          </div>
        )}
        {errors.days && <p className="text-red-500 text-xs font-medium ml-1">{errors.days}</p>}
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-400 ml-1">Jornada preferida</Label>
        <div className="flex flex-wrap gap-3">
          {SCHEDULE_OPTIONS.map((schedule) => {
            const isSelected = formData.jornada === schedule.id;
            return (
              <button
                key={schedule.id}
                type="button"
                onClick={() => setters.setJornada(schedule.id)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 border ${
                  isSelected
                    ? "bg-orange-100 border-orange-200 text-orange-700 shadow-sm"
                    : "bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:bg-gray-50 shadow-sm"
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
  );
};
