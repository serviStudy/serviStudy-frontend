"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Filter, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { JobOfferStatus } from "../types/jobOffer.types";

interface Props {
  onFilterChange: (status: JobOfferStatus | "ALL") => void;
  subscriptionStatus?: "ACTIVE" | "INACTIVE";
}

export const OfferHeader = ({ onFilterChange, subscriptionStatus = "INACTIVE" }: Props) => {
  const [active, setActive] = useState<JobOfferStatus | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const handleFilter = (status: JobOfferStatus | "ALL") => {
    setActive(status);
    onFilterChange(status);
  };

  const isPremium = subscriptionStatus === "ACTIVE";

  return (
    <div className={`rounded-3xl py-12 px-8 mb-8 overflow-hidden relative shadow-md transition-all duration-500 ${
      isPremium
        ? "bg-gradient-to-br from-green-500 via-blue-500 to-blue-600 shadow-lg shadow-green-500/10"
        : "bg-gradient-to-br from-green-900 via-green-700 to-green-600 shadow-sm"
    }`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      {/* Premium glows inside banner */}
      {isPremium ? (
        <>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 animate-pulse duration-[8000ms]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-300/20 blur-2xl rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-blue-300/15 blur-xl rounded-full" />
        </>
      ) : (
        <>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {isPremium && (
          <div className="mb-6 bg-white/15 backdrop-blur-md border md:flex hidden  border-white/25 text-white text-[10px] sm:text-xs font-black px-4 py-2 rounded-xl uppercase tracking-widest items-center gap-2 shadow-inner w-fit">
            <Crown size={14} className="text-yellow-300" />
            Suscripción Premium Activa
          </div>
        )}
        <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
          Gestión de <span className="underline decoration-white/20 underline-offset-4">Ofertas</span>
        </h2>
        <p className="text-white/90 font-medium text-sm md:text-base max-w-xl mb-8 leading-relaxed hidden md:block">
          Administra tus vacantes activas y encuentra al candidato ideal para tu empresa de manera eficiente.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 w-full justify-center">
          
          {/* Filter Container */}
          <motion.div 
            layout
            className={`backdrop-blur-md border rounded-xl flex ${showFilters ? 'flex-col sm:flex-row' : 'items-center'} shadow-md transition-all ${
              isPremium
                ? "bg-white/20 border-white/30"
                : "bg-white/10 border-white/20"
            }`}
          >
            <motion.button 
              layout
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold transition-all relative z-10 w-full sm:w-auto justify-center ${
                showFilters 
                  ? isPremium
                    ? "bg-white text-blue-600 shadow-sm"
                    : "bg-white text-green-700 shadow-sm"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Filter size={20} className={showFilters ? isPremium ? "text-blue-600" : "text-green-700" : "text-white/80 whitespace-pre-line"} />
              {showFilters ? "Cerrar Filtros" : "Filtrar Ofertas"}
            </motion.button>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: "auto" }}
                  exit={{ opacity: 0, scale: 0.95, width: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
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
                          ? isPremium
                            ? "bg-white/25 text-white border border-white/30 shadow-inner"
                            : "bg-green-500 text-white shadow-sm"
                          : "text-white/70 hover:text-white hover:bg-white/10"
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
            className={`flex items-center gap-3 md:px-8 px-4 py-2 rounded-xl text-xs font-black transition-all shadow-md active:scale-95 group tracking-wider ${
              isPremium
                ? "bg-white hover:bg-white/95 text-gray-900 shadow-lg shadow-black/5 hover:-translate-y-0.5"
                : "bg-white text-green-700 hover:bg-gray-50"
            }`}
          >
            <div className={`p-1.5 rounded-lg transition-transform duration-500 group-hover:rotate-90 ${
              isPremium
                ? "bg-gradient-to-br from-green-500 to-blue-600 text-white"
                : "bg-green-600 text-white"
            }`}>
              <Plus size={18} strokeWidth={3} />
            </div>
            <span className={isPremium ? "group-hover:text-blue-600 transition-colors" : "whitespace-pre-line"}>
              Publicar Oferta
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};