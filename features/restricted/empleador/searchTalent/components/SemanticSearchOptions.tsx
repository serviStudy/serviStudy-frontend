import React from 'react';
import { Sparkles, MessageSquare, Briefcase, CheckCircle2 } from 'lucide-react';
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
    <div className="relative w-full rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
      {/* Soft Blurred Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] bg-green-300/55 blur-[80px] rounded-full" />
        <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] bg-lime-300/35 blur-[80px] rounded-full" />
      </div>

      {/* Colorful Header */}
      <div className="bg-linear-to-r from-blue-400 via-lime-500 to-green-600 p-5 text-white relative overflow-hidden">
        {/* Glows inside header */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-300/30 blur-xl rounded-full translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-inner">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white leading-tight">
              Búsqueda Semántica con IA
            </h2>
            <p className="text-xs text-white font-medium mt-0.5">
              Encuentra tu talento ideal de forma inteligente
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Mode Selection */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Por Texto */}
          <div className="flex-1">
            <button
              onClick={() => setSearchMode("text")}
              className={cn(
                "w-full flex items-center gap-3 p-2.5 sm:p-3 transition-all duration-300 text-left relative overflow-hidden",
                searchMode === "text"
                  ? "rounded-xl bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] border-none transform scale-[1.02]"
                  : "rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-green-300 group"
              )}
            >
              {searchMode === "text" && <div className="absolute inset-0 bg-white/20 blur-xl rounded-full -translate-y-1/2 translate-x-1/2" />}
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors relative z-10",
                searchMode === "text" ? "bg-white/20 text-white shadow-inner" : "bg-slate-100 text-slate-500 group-hover:bg-green-100 group-hover:text-green-600"
              )}>
                <MessageSquare size={16} />
              </div>
              <div className="flex-1 relative z-10">
                <span className={cn(
                  "block text-sm font-bold",
                  searchMode === "text" ? "text-white" : "text-slate-700"
                )}>Por Texto</span>
              </div>
              {searchMode === "text" && <CheckCircle2 size={16} className="text-white relative z-10" />}
            </button>
          </div>

          {/* Por Oferta */}
          <div className="flex-1">
            <button
              onClick={() => setSearchMode("offer")}
              className={cn(
                "w-full flex items-center gap-3 p-2.5 sm:p-3 transition-all duration-300 text-left relative overflow-hidden",
                searchMode === "offer"
                  ? "rounded-xl bg-lime-500 text-white border-none transform scale-[1.02]"
                  : "rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-lime-300 group"
              )}
            >
              {searchMode === "offer" && <div className="absolute inset-0 bg-white/20 blur-xl rounded-full -translate-y-1/2 translate-x-1/2" />}
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors relative z-10",
                searchMode === "offer" ? "bg-white/20 text-white shadow-inner" : "bg-slate-100 text-slate-500 group-hover:bg-lime-100 group-hover:text-lime-600"
              )}>
                <Briefcase size={16} />
              </div>
              <div className="flex-1 relative z-10">
                <span className={cn(
                  "block text-sm font-bold",
                  searchMode === "offer" ? "text-white" : "text-slate-700"
                )}>Por Oferta</span>
              </div>
              {searchMode === "offer" && <CheckCircle2 size={16} className="text-white relative z-10" />}
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 relative z-10">
          {searchMode === "text" && (
            <div className="space-y-2">
              <textarea
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Ej: Busco un estudiante de ingeniería con conocimientos en React..."
                className="w-full bg-white/50 backdrop-blur-sm border border-green-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all placeholder:text-slate-400 min-h-[100px] resize-none shadow-inner"
              />
            </div>
          )}

          {searchMode === "offer" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1">
              {offers.length > 0 ? (
                offers.map((offer) => (
                  <div key={offer.jobOfferId} className="w-full">
                    <button
                      onClick={() => setSelectedOfferId(offer.jobOfferId || "")}
                      className={cn(
                        "w-full flex items-center gap-3 p-2.5 transition-all duration-300 text-left relative overflow-hidden",
                        selectedOfferId === offer.jobOfferId
                          ? "rounded-xl bg-[#f9fbf4] border  border-lime-300 shadow-md transform scale-[1.0]"
                          : "rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:bg-slate-50 group"
                      )}
                    >
                      {selectedOfferId === offer.jobOfferId && <div className="absolute inset-0 bg-white/10 blur-xl rounded-full" />}
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors relative z-10",
                        selectedOfferId === offer.jobOfferId 
                          ? "bg-lime-50 text-lime-500 shadow-inner" 
                          : "bg-slate-100 text-slate-500 group-hover:bg-lime-100 group-hover:text-lime-600"
                      )}>
                        <Briefcase size={14} />
                      </div>
                      <div className="min-w-0 flex-1 relative z-10">
                        <span className={cn(
                          "block text-[13px] font-bold truncate",
                          selectedOfferId === offer.jobOfferId ? "text-lime-700 capitalize" : "text-slate-700 group-hover:text-slate-900"
                        )}>
                          {offer.title}
                        </span>
                      </div>
                      {selectedOfferId === offer.jobOfferId && (
                        <CheckCircle2 size={16} className="text-lime-500 shrink-0 relative z-10" />
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-6 flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-xl bg-white/40 backdrop-blur-sm">
                  <p className="text-xs text-slate-500 font-medium">No tienes ofertas activas para comparar.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="mt-5 flex justify-end relative z-10">
          <Button 
            onClick={onSearch}
            disabled={loading || (searchMode === "offer" && !selectedOfferId) || (searchMode === "text" && !searchText.trim())}
            className={cn(
              "relative overflow-hidden group px-6 py-3 rounded-xl font-bold text-[13px] tracking-wide transition-all duration-300 border-0 h-auto",
              "bg-green-600 bg-linear-to-r hover:from-blue-400 hover:via-lime-500 hover:to-green-600 text-white shadow-lg shadow-green-500/20 hover:shadow-blue-500/30 hover:-translate-y-1 hover:scale-[1.02]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:scale-100"
            )}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            
            <div className="relative z-10 flex items-center justify-center">
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : (
                <Sparkles size={16} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
              )}
              <span>
                {searchMode === "text" ? "Analizar con IA" : "Buscar Candidatos"}
              </span>
            </div>
          </Button>
        </div>
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
