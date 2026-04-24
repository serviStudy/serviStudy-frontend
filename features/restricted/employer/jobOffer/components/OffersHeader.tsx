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
    <div className="bg-gradient-to-br from-white to-blue-50/50 border border-gray-100 rounded-3xl shadow-sm py-10 px-8 mb-10 overflow-hidden">
      {/* Título */}
      <div className="text-center mb-8 flex flex-col items-center">
        <h2 className="text-[32px] md:text-4xl font-extrabold text-[#1a4b9e] mb-3 tracking-tight">Gestión de Ofertas</h2>
        <p className="text-gray-500 font-medium text-sm md:text-base max-w-md">
          Administra tus vacantes activas y encuentra al candidato ideal para tu empresa.
        </p>
      </div>

      {/* Filtros y acciones */}
      <motion.div layout className="flex flex-col md:flex-row justify-center items-center gap-4">
        
        <motion.div 
          layout
          initial={false}
          className="flex items-center gap-1 bg-white/50 p-1.5 rounded-full border border-gray-100 shadow-sm transition-all hover:bg-white pr-4"
        >
          <motion.button 
            layout
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all relative z-10 ${
              showFilters 
                ? "bg-[#1a4b9e] text-white shadow-lg shadow-blue-900/30" 
                : "text-gray-500 hover:text-[#1a4b9e] hover:bg-blue-50"
            }`}
          >
            <Filter size={16} className={showFilters ? "text-white" : "text-[#1a4b9e]"} />
            Filtros
          </motion.button>

          {/* Filter Buttons Section (Framer Motion Displacement) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex items-center gap-2 ml-2 overflow-hidden"
              >
                {[
                  { id: "ALL", label: "Todas" },
                  { id: "ACTIVE", label: "Activas" },
                  { id: "DISABLED", label: "Inactivas" }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleFilter(f.id as any)}
                    className={`px-5 py-2 rounded-full text-xs font-black transition-all whitespace-nowrap ${
                      active === f.id
                        ? "bg-blue-100 text-[#1a4b9e] shadow-inner"
                        : "text-gray-400 hover:text-[#1a4b9e] hover:bg-gray-50/50"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div layout>
          <Link
            href="/empleador/ofertas/crear"
            className="flex items-center gap-2 bg-gradient-to-r from-[#1a4b9e] to-[#2552d0] hover:from-[#143285] hover:to-[#1a4b9e] text-white px-8 py-3 rounded-full text-sm font-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            <Plus size={18} />
            Publicar nueva oferta
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};