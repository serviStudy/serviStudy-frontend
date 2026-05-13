"use client";

import React from 'react';
import { Sparkles, MessageSquare, Briefcase, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { JobOfferDTO } from "@/features/restricted/empleador/jobOffer/types/jobOffer.types";

interface Props {
  searchMode: "text" | "offer";
  setSearchMode: (mode: "text" | "offer") => void;
  selectedOfferId: string;
  setSelectedOfferId: (id: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  offers: JobOfferDTO[];
  onSearch: () => void;
  loading: boolean;
}

export const SemanticSearchOptions = ({ 
  searchMode, 
  setSearchMode, 
  selectedOfferId, 
  setSelectedOfferId, 
  searchText,
  setSearchText,
  offers,
  onSearch,
  loading
}: Props) => {
  return (
    <div className="relative overflow-hidden bg-white/40 backdrop-blur-xl p-6 rounded-2xl border border-white/60 shadow-2xl shadow-blue-500/5 animate-in fade-in slide-in-from-top-6 duration-700">
      
      {/* Decorative Glow Elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative flex items-center gap-4 mb-6">
        <div className="w-11 h-11 bg-linear-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 ring-4 ring-white/50">
          <Sparkles size={22} className="animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-black text-gray-900 tracking-tight leading-none">Búsqueda Semántica con IA</h3>
          <p className="text-xs text-gray-500 font-bold opacity-70 mt-1">Encuentra el talento ideal analizando el contexto y requerimientos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {/* Option: Search by Text */}
        <button
          onClick={() => setSearchMode("text")}
          className={cn(
            "flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-300 text-left group relative overflow-hidden",
            searchMode === "text" 
              ? "border-green-500/50 bg-white/80 shadow-xl shadow-green-500/5 ring-4 ring-green-500/5" 
              : "border-white/50 bg-white/40 hover:bg-white/60 hover:border-white"
          )}
        >
          <div className={cn(
            "p-2.5 rounded-lg shrink-0 transition-all duration-500",
            searchMode === "text" ? "bg-green-500 text-white rotate-3 scale-110" : "bg-white/60 text-gray-400 group-hover:scale-110"
          )}>
            <MessageSquare size={18} />
          </div>
          <div>
            <span className={cn(
              "block font-black text-sm transition-colors",
              searchMode === "text" ? "text-green-700" : "text-gray-900"
            )}>Por Texto</span>
            <span className="block text-[11px] text-gray-500 font-bold mt-1 leading-relaxed opacity-70">Escribe una descripción detallada del perfil que buscas.</span>
          </div>
        </button>

        {/* Option: Search by Offer */}
        <button
          onClick={() => setSearchMode("offer")}
          className={cn(
            "flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-300 text-left group relative overflow-hidden",
            searchMode === "offer" 
              ? "border-blue-500/50 bg-white/80 shadow-xl shadow-blue-500/5 ring-4 ring-blue-500/5" 
              : "border-white/50 bg-white/40 hover:bg-white/60 hover:border-white"
          )}
        >
          <div className={cn(
            "p-2.5 rounded-lg shrink-0 transition-all duration-500",
            searchMode === "offer" ? "bg-blue-500 text-white -rotate-3 scale-110" : "bg-white/60 text-gray-400 group-hover:scale-110"
          )}>
            <Briefcase size={18} />
          </div>
          <div>
            <span className={cn(
              "block font-black text-sm transition-colors",
              searchMode === "offer" ? "text-blue-700" : "text-gray-900"
            )}>Por Oferta</span>
            <span className="block text-[11px] text-gray-500 font-bold mt-1 leading-relaxed opacity-70">Usa una de tus vacantes actuales para encontrar candidatos.</span>
          </div>
        </button>
      </div>

      {searchMode === "text" && (
        <div className="mt-6 animate-in fade-in zoom-in-95 duration-500 relative z-10">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-2 ml-2">
            ¿Qué perfil estás buscando?
          </label>
          <div className="relative group">
            <textarea
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Ej: Busco un estudiante de ingeniería con conocimientos en React..."
              className="w-full bg-white/50 backdrop-blur-sm border-2 border-white/80 rounded-xl px-5 py-4 text-sm font-bold text-gray-700 outline-none focus:ring-4 focus:ring-green-500/5 focus:border-green-500/30 min-h-[120px] resize-none transition-all placeholder:text-gray-300 placeholder:font-medium"
            />
          </div>
        </div>
      )}

      {searchMode === "offer" && (
        <div className="mt-6 animate-in fade-in zoom-in-95 duration-500 relative z-10">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-3 ml-2">
            Selecciona una oferta para analizar
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {offers.length > 0 ? (
              offers.map((offer) => (
                <button
                  key={offer.jobOfferId}
                  onClick={() => setSelectedOfferId(offer.jobOfferId || "")}
                  className={cn(
                    "relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 group text-left",
                    selectedOfferId === offer.jobOfferId
                      ? "border-blue-500/50 bg-white shadow-xl shadow-blue-500/10 scale-[1.01] z-10"
                      : "border-white/60 bg-white/30 backdrop-blur-sm hover:border-blue-500/30 hover:bg-white/50"
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500",
                    selectedOfferId === offer.jobOfferId 
                      ? "bg-linear-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-500/30" 
                      : "bg-white/80 text-gray-400 group-hover:text-blue-500"
                  )}>
                    <Briefcase size={16} />
                  </div>
                  <div className="min-w-0">
                    <span className={cn(
                      "block text-xs font-black truncate leading-tight",
                      selectedOfferId === offer.jobOfferId ? "text-blue-700" : "text-gray-700"
                    )}>
                      {offer.title}
                    </span>
                    <span className="block text-[9px] text-gray-400 font-black uppercase tracking-wider mt-0.5 opacity-60">
                      Oferta Activa
                    </span>
                  </div>
                  
                  {selectedOfferId === offer.jobOfferId && (
                    <div className="absolute -top-1.5 -right-1.5">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="col-span-full py-8 text-center bg-white/20 backdrop-blur-sm rounded-xl border-2 border-dashed border-white/60">
                <p className="text-xs text-gray-400 font-bold opacity-60">No tienes ofertas activas para comparar.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-end relative z-10">
        <Button 
          onClick={onSearch}
          disabled={loading || (searchMode === "offer" && !selectedOfferId) || (searchMode === "text" && !searchText.trim())}
          className="group relative flex gap-2 py-6 px-10 rounded-xl cursor-pointer text-white text-base font-black bg-linear-to-r from-green-500 to-blue-600 hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
          )}
          <span>
            {searchMode === "text" ? "Analizar con IA" : "Buscar Candidatos Ideales"}
          </span>
          
          {/* Internal Glow Effect */}
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Button>
      </div>
    </div>
  );
};

const Loader2 = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={cn("lucide lucide-loader-2", className)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
