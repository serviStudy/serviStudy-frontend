import { useState, useCallback } from 'react';
import { syncStudentWorkDays } from "../services/studentProfileService";

export const useWorkDays = () => {
  const [jornada, setJornada] = useState<string | null>(null);
  const [days, setDays] = useState<string[]>([]);
  const [initialDays, setInitialDays] = useState<string[]>([]);

  const handleToggleDay = useCallback((day: string) => {
    setDays((prev) => 
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }, []);

  const updateJornada = useCallback((val: string | null) => setJornada(val), []);
  const updateDays = useCallback((val: React.SetStateAction<string[]>) => setDays(val), []);

  const syncDays = async () => {
    try {
      await syncStudentWorkDays(days); 
      setInitialDays(days);
    } catch (e: any) { 
      console.error("Error adding days", e);
      throw e; // Rethrow to handle in main save
    }
  };

  return {
    jornada, setJornada: updateJornada,
    days, setDays: updateDays,
    initialDays, setInitialDays,
    handleToggleDay,
    syncDays
  };
};
