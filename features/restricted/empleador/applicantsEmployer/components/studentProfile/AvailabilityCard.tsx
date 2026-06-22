"use client";

import { Calendar, Clock, Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  workSchedule?: string;
  workDays?: string[];
}

export const AvailabilityCard = ({ workSchedule, workDays }: Props) => {
  const getScheduleLabel = (schedule?: string) => {
    if (!schedule) return "No especificada";
    const mapping: Record<string, string> = {
      MORNING: "Jornada Mañana",
      AFTERNOON: "Jornada Tarde",
      FULL_TIME: "Jornada Completa",
      PART_TIME: "Media Jornada",
      FLEXIBLE: "Horario Flexible",
    };
    return mapping[schedule.toUpperCase()] || schedule;
  };

  const daysOfWeek = [
    { key: "MONDAY", label: "Lunes", shortLabel: "Lun" },
    { key: "TUESDAY", label: "Martes", shortLabel: "Mar" },
    { key: "WEDNESDAY", label: "Miércoles", shortLabel: "Mié" },
    { key: "THURSDAY", label: "Jueves", shortLabel: "Jue" },
    { key: "FRIDAY", label: "Viernes", shortLabel: "Vie" },
    { key: "SATURDAY", label: "Sábado", shortLabel: "Sáb" },
    { key: "SUNDAY", label: "Domingo", shortLabel: "Dom" },
  ];

  const normalizedWorkDays = workDays?.map((d) => d.trim().toUpperCase()) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-linear-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl shadow-sm text-white">
          <Calendar className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Disponibilidad Horaria</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Work Schedule preference */}
        <div className="md:col-span-4 flex flex-col justify-center">
          <div className="bg-linear-to-br from-blue-50 to-indigo-50/30 border border-blue-100/50 rounded-xl p-4 flex items-center gap-3.5 shadow-2xs">
            <div className="bg-white p-2 rounded-xl text-blue-600 shadow-3xs shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Jornada preferida</p>
              <p className="text-sm font-bold text-blue-950 mt-0.5">
                {getScheduleLabel(workSchedule)}
              </p>
            </div>
          </div>
        </div>

        {/* Days grid */}
        <div className="md:col-span-8 flex flex-col gap-2">
          <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Días disponibles en la semana</p>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {daysOfWeek.map((day) => {
              const isAvailable = normalizedWorkDays.includes(day.key);
              return (
                <div
                  key={day.key}
                  className={`flex flex-col items-center justify-between py-2.5 px-1 rounded-xl text-center border transition-all duration-300 ${
                    isAvailable
                      ? "bg-green-50/50 text-green-700 border-green-200/80 shadow-3xs"
                      : "bg-gray-50/35 text-gray-300 border-gray-100 opacity-60"
                  }`}
                >
                  <span className="text-[11px] font-extrabold uppercase tracking-tight block">
                    {day.shortLabel}
                  </span>
                  
                  <div className="mt-2">
                    {isAvailable ? (
                      <div className="h-4.5 w-4.5 rounded-xl bg-green-500 text-white flex items-center justify-center">
                        <Check size={10} strokeWidth={4} />
                      </div>
                    ) : (
                      <div className="h-4.5 w-4.5 rounded-xl bg-gray-100 text-gray-300 flex items-center justify-center">
                        <X size={10} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
