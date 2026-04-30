import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { translateDay } from '../../utils/workDays.utils';
import { Calendar } from 'lucide-react';

export const SPECIFIC_DAYS = [
  { id: 'MONDAY', label: 'Lunes' },
  { id: 'TUESDAY', label: 'Martes' },
  { id: 'WEDNESDAY', label: 'Miércoles' },
  { id: 'THURSDAY', label: 'Jueves' },
  { id: 'FRIDAY', label: 'Viernes' },
  { id: 'SATURDAY', label: 'Sábado' },
  { id: 'SUNDAY', label: 'Domingo' }
];

interface WorkDaysModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDays: string[];
  onToggleDay?: (day: string) => void;
  readOnly?: boolean;
}

export const WorkDaysModal: React.FC<WorkDaysModalProps> = ({ 
  open, 
  onOpenChange, 
  selectedDays, 
  onToggleDay,
  readOnly = false
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] sm:max-w-125 rounded-2xl md:rounded-3xl">
        <DialogHeader>
          <DialogTitle className='flex gap-2 items-center'>
            <Calendar className='text-gray-600 w-5 h-5 md:w-6 md:h-6'/>
            <p className="text-lg md:text-xl font-semibold text-gray-600">{readOnly ? 'Días laborales' : 'Selecciona tus días laborales'}</p>
          </DialogTitle>
        </DialogHeader>
        <div className={`mt-4 ${readOnly ? 'flex flex-wrap gap-2 md:gap-4' : 'grid grid-cols-2 gap-2 md:gap-3'}`}>
          {readOnly ? (
            selectedDays.map((d, idx) => (
              <span key={idx} className="bg-green-50 border border-green-600 text-green-700 rounded-lg px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium">
                {translateDay(d)}
              </span>
            ))
          ) : (
            SPECIFIC_DAYS.map((sd) => (
              <button
                key={sd.id}
                type="button"
                onClick={() => onToggleDay && onToggleDay(sd.id)}
                className={`px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-lg border transition-colors ${
                  selectedDays.includes(sd.id)
                    ? "bg-green-50 border-green-600 text-green-700 shadow-sm"
                    : "bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {sd.label}
              </button>
            ))
          )}
        </div>
        {!readOnly && (
          <div className="mt-6 flex justify-end">
            <Button
              className="bg-green-900 px-6 md:px-8 h-10 md:h-12 text-white font-bold hover:bg-blue-800 rounded-xl"
              onClick={() => onOpenChange(false)}
            >
              Aceptar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
