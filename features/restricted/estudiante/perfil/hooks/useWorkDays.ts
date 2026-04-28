import { useState } from 'react';
import { addStudentWorkDay } from '../services/studentProfileService';
import { syncStudentWorkDays } from "../services/studentProfileService";

export const useWorkDays = () => {
  const [jornada, setJornada] = useState<string | null>(null);
  const [days, setDays] = useState<string[]>([]);
  const [initialDays, setInitialDays] = useState<string[]>([]);

  const handleToggleDay = (day: string) => {
    setDays((prev) => 
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const syncDays = async () => {
      try {
        await syncStudentWorkDays(days); 
        setInitialDays(days)
      } catch (e: any) { 
        console.error("Error adding days", e); 
      }
    }

  return {
    jornada, setJornada,
    days, setDays,
    initialDays, setInitialDays,
    handleToggleDay,
    syncDays
  };
};
