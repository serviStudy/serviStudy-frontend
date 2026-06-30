"use client";

import { useState } from "react";
import { Search, Calendar, Clock, ChevronDown, X, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { routes } from "@/type/routes";

interface Props {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
  selectedDays: string[];
  toggleDay: (day: string) => void;
  selectedJornada: string[];
  toggleJornada: (jornada: string) => void;
  onClearAll: () => void;
}

export const HeaderOfertas = ({
  inputValue,
  onInputChange,
  onSearch,
  selectedDays,
  toggleDay,
  selectedJornada,
  toggleJornada,
  onClearAll,
}: Props) => {
  const [activeFilter, setActiveFilter] = useState<"days" | "jornada" | null>(null);

  const filterDays = ["Entre semana", "Fines de semana", "Específicos"];
  const filterJornadas = ["Tiempo completo", "Medio tiempo", "flexible"];

  const toggleFilter = (filter: "days" | "jornada") => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className="bg-linear-to-r from-blue-800 via-indigo-500 to-blue-600 rounded-xl p-6 mb-8 overflow-hidden relative shadow-sm">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Encuentra nuevas <span className="text-blue-300">Ofertas</span>
        </h1>
        <p className="text-white/80 font-medium text-sm md:text-base max-w-xl mb-6 leading-relaxed">
          Explora cientos de oportunidades para estudiantes y da el siguiente paso en tu carrera profesional.
        </p>

        {/* Action Bar Container */}
        <div className="flex flex-col gap-6 w-full max-w-5xl">
          {/* Row 1: Search and Mis Postulaciones */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="relative group w-full md:max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
              <input
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearch();
                }}
                className="w-full h-11 bg-white border-0 rounded-xl pl-12 pr-14 text-gray-700 placeholder:text-gray-400 focus:ring-4 focus:ring-blue-600/20 transition-all text-base font-normal shadow-lg"
                placeholder="Puesto, empresa o palabra clave..."
              />
              <button
                onClick={onSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-md"
              >
                <Search size={18} strokeWidth={2.5} />
              </button>
            </div>

            <Link
              href={"/estudiante/misPostulaciones"}
              className="flex items-center gap-2 bg-white/40 text-white px-4 py-3.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:bg-gray-50 hover:text-blue-900 active:scale-95 group whitespace-nowrap h-11"
            >
              <div className="bg-blue-600 p-1.5 mr-2.5 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
                <Briefcase size={18} strokeWidth={3} />
              </div>
              Mis Postulaciones
            </Link>
          </div>

          {/* Row 2: Filters - Horizontal Expansion */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap gap-4 w-full">
              
              {/* Días Container */}
              <motion.div 
                layout
                className="flex items-center bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-1"
              >
                <button
                  onClick={() => toggleFilter("days")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold tracking-wider transition-all ${
                    activeFilter === "days" || selectedDays.length > 0
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Calendar size={16} />
                  <span>Días laborales</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${
                      activeFilter === "days" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeFilter === "days" && (
                    <motion.div
                      initial={{ opacity: 0, width: 0, x: -10 }}
                      animate={{ opacity: 1, width: "auto", x: 0 }}
                      exit={{ opacity: 0, width: 0, x: -10 }}
                      className="flex items-center gap-1.5 overflow-hidden ml-2 pr-1"
                    >
                      {filterDays.map((day) => (
                        <button
                          key={day}
                          onClick={() => toggleDay(day)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold capitalize tracking-wider transition-all border whitespace-nowrap ${
                            selectedDays.includes(day)
                              ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                              : "text-white/70 hover:text-white border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Jornada Container */}
              <motion.div 
                layout
                className="flex items-center bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-1"
              >
                <button
                  onClick={() => toggleFilter("jornada")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold tracking-wider transition-all ${
                    activeFilter === "jornada" || selectedJornada.length > 0
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Clock size={16} />
                  <span>Jornada</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${
                      activeFilter === "jornada" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeFilter === "jornada" && (
                    <motion.div
                      initial={{ opacity: 0, width: 0, x: -10 }}
                      animate={{ opacity: 1, width: "auto", x: 0 }}
                      exit={{ opacity: 0, width: 0, x: -10 }}
                      className="flex items-center gap-1.5 overflow-hidden ml-2 pr-1"
                    >
                      {filterJornadas.map((jornada) => (
                        <button
                          key={jornada}
                          onClick={() => toggleJornada(jornada)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold capitalize tracking-wider transition-all border whitespace-nowrap ${
                            selectedJornada.includes(jornada)
                              ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                              : "text-white/70 hover:text-white border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <span className="capitalize">{jornada}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Clear Button */}
              {(selectedDays.length > 0 || selectedJornada.length > 0) && (
                <button
                  onClick={onClearAll}
                  className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                  <X size={14} />
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
