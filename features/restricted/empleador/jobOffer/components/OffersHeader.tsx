"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { JobOfferStatus } from "../types/jobOffer.types";

interface Props {
  onFilterChange: (status: JobOfferStatus | "ALL") => void;
}

export const OfferHeader = ({ onFilterChange }: Props) => {
  const [active, setActive] = useState<JobOfferStatus | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const handleFilter = (status: JobOfferStatus | "ALL") => {
    setActive(status);
    onFilterChange(status);
  };

  return (
    <div className="bg-gradient-to-br from-green-900 via-green-700 to-green-600 rounded-xl py-10 px-8 mb-8 overflow-hidden relative shadow-sm">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
          Gestión de <span className="text-green-300">Ofertas</span>
        </h2>
        <p className="text-white/80 font-medium text-sm md:text-base max-w-xl mb-8 leading-relaxed">
          Administra tus vacantes activas y encuentra al candidato ideal para tu empresa de manera eficiente.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center">
          
          {/* Filter Container */}
          <motion.div 
            layout
            className={`bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 rounded-xl flex ${showFilters ? 'flex-col sm:flex-row' : 'items-center'} shadow-lg transition-all duration-500`}
          >
            <motion.button 
              layout
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold transition-all relative z-10 w-full sm:w-auto justify-center ${
                showFilters 
                  ? "bg-white text-green-700 shadow-sm" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Filter size={20} className={showFilters ? "text-green-700" : "text-green-300"} />
              {showFilters ? "Cerrar Filtros" : "Filtrar Resultados"}
            </motion.button>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0, x: -20 }}
                  animate={{ opacity: 1, height: "auto", x: 0 }}
                  exit={{ opacity: 0, height: 0, x: -20 }}
                  className="flex flex-col sm:flex-row items-center gap-2 mt-2 sm:mt-0 sm:ml-3 sm:pr-4 overflow-hidden py-2 sm:py-0"
                >
                  {[
                    { id: "ALL", label: "Todas" },
                    { id: "ACTIVE", label: "Activas" },
                    { id: "DISABLED", label: "Inactivas" }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => handleFilter(f.id as any)}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                        active === f.id
                          ? "bg-green-500 text-white shadow-sm"
                          : "text-white/60 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Create Button */}
          <Link
            href="/empleador/ofertas/crear"
            className="flex items-center gap-2 bg-white text-green-700 px-8 py-3.5 rounded-xl text-xs font-bold transition-all shadow-sm hover:bg-gray-50 active:scale-95 group"
          >
            <div className="bg-green-600 p-1.5 rounded-lg text-white group-hover:rotate-90 transition-transform duration-500">
               <Plus size={18} strokeWidth={3} />
            </div>
            Publicar Nueva Oferta
          </Link>
        </div>
      </div>
    </div>
  );
};