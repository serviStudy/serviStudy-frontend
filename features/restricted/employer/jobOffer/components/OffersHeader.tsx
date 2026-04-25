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
    <div className="bg-gradient-to-br from-green-900 via-green-700 to-green-600 rounded-[48px] py-16 px-10 mb-12 overflow-hidden relative shadow-2xl shadow-green-900/20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
          Gestión de <span className="text-green-300">Ofertas</span>
        </h2>
        <p className="text-white/80 font-bold text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
          Administra tus vacantes activas y encuentra al candidato ideal para tu empresa de manera eficiente.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center">
          
          {/* Filter Container */}
          <motion.div 
            layout
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-[28px] flex items-center shadow-2xl"
          >
            <motion.button 
              layout
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-3 px-8 py-4 rounded-[22px] text-sm font-black transition-all relative z-10 ${
                showFilters 
                  ? "bg-white text-green-700 shadow-xl" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Filter size={20} className={showFilters ? "text-green-700" : "text-green-300"} />
              {showFilters ? "Cerrar Filtros" : "Filtrar Resultados"}
            </motion.button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, x: -20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: "auto" }}
                  exit={{ opacity: 0, x: -20, width: 0 }}
                  className="flex items-center gap-2 ml-3 pr-4 overflow-hidden"
                >
                  {[
                    { id: "ALL", label: "Todas" },
                    { id: "ACTIVE", label: "Activas" },
                    { id: "DISABLED", label: "Inactivas" }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => handleFilter(f.id as any)}
                      className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        active === f.id
                          ? "bg-green-500 text-white shadow-lg"
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
            className="flex items-center gap-3 bg-white text-green-700 px-10 py-5 rounded-[28px] text-sm font-black transition-all shadow-2xl hover:bg-gray-50 active:scale-95 group"
          >
            <div className="bg-green-600 p-1.5 rounded-lg text-white group-hover:rotate-90 transition-transform duration-500">
               <Plus size={20} strokeWidth={3} />
            </div>
            Publicar Nueva Oferta
          </Link>
        </div>
      </div>
    </div>
  );
};