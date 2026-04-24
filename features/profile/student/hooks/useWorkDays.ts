import { useState } from 'react';
import { addStudentWorkDay, deleteStudentWorkDay } from '../services/studentProfileService';

export const useWorkDays = () => {
  const [jornada, setJornada] = useState<string | null>(null);
  const [days, setDays] = useState<string[]>([]);
  const [initialDays, setInitialDays] = useState<string[]>([]);

  const handleToggleDay = (day: string) => {
    setDays((prev) => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const syncDays = async (userId: string) => {
    const daysToAdd = Array.from(new Set(days.filter(d => !initialDays.includes(d))));
    const daysToRemove = Array.from(new Set(initialDays.filter(d => !days.includes(d))));

    if (daysToAdd.length > 0) {
      try { 
        await addStudentWorkDay(userId, daysToAdd); 
      } catch (e: any) { 
        console.error("Error adding days", e); 
      }
    }
    if (daysToRemove.length > 0) {
      try { 
        // Eliminando de la firma la dependencia del userId en el backend?
        // En tu request pediste "Eliminar dependencia de userId en deleteWorkDay si no es necesario"
        // pero veremos la API. Por ahora mantengo el signature local o lo ajusto luego en el Service.
        await deleteStudentWorkDay(userId, daysToRemove); 
      } catch (e: any) { 
        console.error("Error removing days", e); 
      }
    }
  };

  return {
    jornada, setJornada,
    days, setDays,
    initialDays, setInitialDays,
    handleToggleDay,
    syncDays
  };
};
