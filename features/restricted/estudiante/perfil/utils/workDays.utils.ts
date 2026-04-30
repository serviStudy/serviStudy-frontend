export const normalizeDays = (days: string[]): string[] => {
  if (!days) return [];
  return Array.from(new Set(days.map(d => d.trim().toUpperCase())));
};

export const isWeekDays = (normalizedDays: string[]): boolean => {
  const weekdays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
  return weekdays.every(d => normalizedDays.includes(d)) && normalizedDays.length === 5;
};

export const isWeekend = (normalizedDays: string[]): boolean => {
  const weekend = ["SATURDAY", "SUNDAY"];
  return weekend.every(d => normalizedDays.includes(d)) && normalizedDays.length === 2;
};

export const isSpecificDays = (normalizedDays: string[]): boolean => {
  return normalizedDays.length > 0 && !isWeekDays(normalizedDays) && !isWeekend(normalizedDays);
};

export const translateDay = (day: string): string => {
  const translations: Record<string, string> = {
    MONDAY: 'Lunes',
    TUESDAY: 'Martes',
    WEDNESDAY: 'Miércoles',
    THURSDAY: 'Jueves',
    FRIDAY: 'Viernes',
    SATURDAY: 'Sábado',
    SUNDAY: 'Domingo'
  };
  return translations[day] || day;
};
