import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { translateDay } from '../../utils/workDays.utils';

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#1a4b9e]">
            {readOnly ? 'Días laborales' : 'Selecciona tus días laborales'}
          </DialogTitle>
        </DialogHeader>
        <div className={`mt-4 ${readOnly ? 'flex flex-wrap gap-2' : 'grid grid-cols-2 gap-3'}`}>
          {readOnly ? (
            selectedDays.map((d, idx) => (
              <span key={idx} className="bg-[#2552d0] text-white rounded-lg px-4 py-2 text-sm font-medium">
                {translateDay(d)}
              </span>
            ))
          ) : (
            SPECIFIC_DAYS.map((sd) => (
              <button
                key={sd.id}
                type="button"
                onClick={() => onToggleDay && onToggleDay(sd.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  selectedDays.includes(sd.id)
                    ? "bg-[#2552d0] text-white border-[#2552d0]"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
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
              className="bg-[#2552d0] text-white font-bold hover:bg-blue-800"
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
