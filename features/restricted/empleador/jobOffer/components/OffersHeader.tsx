"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Filter, Crown, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { JobOfferStatus } from "../types/jobOffer.types";
import { Button } from "@/components/ui/button";

interface Props {
  onFilterChange: (status: JobOfferStatus | "ALL") => void;
  subscriptionStatus?: "ACTIVE" | "INACTIVE";
}

export const OfferHeader = ({ onFilterChange, subscriptionStatus = "INACTIVE" }: Props) => {
  const [active, setActive] = useState<JobOfferStatus | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleFilter = (status: JobOfferStatus | "ALL") => {
    setActive(status);
    onFilterChange(status);
  };

  const isPremium = subscriptionStatus === "ACTIVE";

  return (
    <div className={`rounded-xl p-5 md:p-6 overflow-hidden relative shadow-md transition-all duration-500 ${
      isPremium
        ? " bg-linear-to-r from-blue-400 via-lime-500 to-green-600 shadow-lg shadow-green-500/10"
        : "bg-linear-to-br from-green-950 via-green-800 to-green-600 shadow-sm"
    }`}>
      {/* Decorative background elements */}
      
      {/* Premium glows inside banner */}
      {isPremium ? (
        <>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 animate-pulse duration-[8000ms]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-300/20 blur-2xl rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-lime-300/15 blur-xl rounded-full" />
        </>
      ) : (
        <>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <div className="flex justify-between items-start gap-4">
          <div className="mb-2">
            <div className="flex gap-3 items-center mb-3">
              <div className="bg-white/20 p-3 rounded-xl flex items-center justify-center shrink-0">
                <Briefcase className="text-white h-5 w-5 md:h-6 md:w-6"/>
              </div>
              <h2 className="text-xl md:text-3xl font-black text-white tracking-tight leading-tight">
                Gestión de <span className="underline decoration-white/35 underline-offset-4 text-lime-300">Ofertas</span>
              </h2>
            </div>
            <p className="text-white/90 font-medium text-xs md:text-sm max-w-xl leading-relaxed hidden sm:block">
              Administra tus vacantes activas y encuentra al candidato ideal para tu empresa de manera eficiente.
            </p>
          </div>

          {/* Create Button */}
          <Link href="/empleador/ofertas/crear" className="shrink-0 flex items-center mt-1">
            <Button className={`hidden sm:flex items-center gap-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 group tracking-wider px-4 py-2.5 ${
                isPremium
                  ? "bg-white/25 hover:bg-white/40 border border-white/30 text-white shadow-lg shadow-black/10"
                  : "bg-white text-green-900 hover:bg-gray-50 hover:text-green-950"
              }`}>
              <Plus size={16} strokeWidth={3} />
              <span className="text-xs transition-colors whitespace-nowrap">
                Publicar Oferta
              </span>
            </Button>
          </Link>
        </div>


        {/* Action Buttons */}
        <div className="flex gap-4 w-full mt-4">
          {/* Filter Container */}
          <motion.div 
            layout
            className={`backdrop-blur-md border rounded-xl flex flex-col sm:flex-row sm:items-center shadow-md transition-all overflow-hidden w-full sm:w-auto p-1.5 gap-2 ${
              isPremium
                ? "bg-white/20 border-white/30"
                : "bg-white/10 border-white/20"
            }`}
          >
            <motion.button 
              layout
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg text-xs font-bold transition-all relative z-10 w-full sm:w-auto justify-center ${
                showFilters 
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Filter size={18} className={showFilters ? "text-white" : "text-white/90"} />
              {showFilters ? "Cerrar Filtros" : "Filtrar Ofertas"}
            </motion.button>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={isMobile ? { opacity: 0, height: 0 } : { opacity: 0, width: 0 }}
                  animate={isMobile ? { opacity: 1, height: "auto" } : { opacity: 1, width: "auto" }}
                  exit={isMobile ? { opacity: 0, height: 0 } : { opacity: 0, width: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex flex-col sm:flex-row items-center gap-2 w-full overflow-hidden pb-1 sm:pb-0"
                >
                  {[
                    { id: "ALL", label: "Todas" },
                    { id: "ACTIVE", label: "Activas" },
                    { id: "DISABLED", label: "Inactivas" }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => handleFilter(f.id as any)}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all whitespace-nowrap ${
                        active === f.id
                          ? isPremium
                            ? "bg-white text-emerald-950 border border-white shadow-md"
                            : "bg-white text-green-950 border border-white shadow-md"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};