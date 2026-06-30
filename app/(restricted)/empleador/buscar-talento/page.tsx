"use client";

import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { StudentList } from '@/features/restricted/empleador/searchTalent/components/StudentList';
import { useEmployerProfile } from '@/features/restricted/empleador/perfil/hooks/useEmployerProfile';
import { useJobOffers } from '@/features/restricted/empleador/jobOffer/hooks/useJobOffers';
import { SemanticSearchOptions } from '@/features/restricted/empleador/searchTalent/components/SemanticSearchOptions';
import { getSemanticSearchByText, getSemanticSearchByOffer } from '@/features/restricted/empleador/searchTalent/services/searchTalent.service';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSubscriptionStatus } from '@/features/suscripcion/hooks/useSubscriptionStatus';

export default function BuscarTalentoPage() {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // AI Mode States
  const [isAiMode, setIsAiMode] = useState(false);
  const [searchMode, setSearchMode] = useState<"text" | "offer">("text");
  const [selectedOfferId, setSelectedOfferId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [semanticResults, setSemanticResults] = useState<any>(null);
  const [isAiSearching, setIsAiSearching] = useState(false);

  const { profile, loading: loadingProfile } = useEmployerProfile();
  const { offers, loading: loadingOffers } = useJobOffers();
  const { status: subStatus, loading: loadingSub } = useSubscriptionStatus();

  useEffect(() => {
    if (profile) {
      console.log("🔍 [DEBUG] Perfil del empleador cargado:", profile);
    }
    if (subStatus) {
      console.log("🔍 [DEBUG] Estado de suscripción detectado:", subStatus.status);
    }
  }, [profile, subStatus]);
  
  // Solo se permite el modo IA si tiene suscripción activa
  const hasSubscription = subStatus?.status === "ACTIVE";


  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSemanticResults(null);
    setSearchQuery(search);
  };

  const handleSemanticSearch = async () => {
    try {
      setIsAiSearching(true);
      let results;
      if (searchMode === "text") {
        results = await getSemanticSearchByText(searchText);
      } else {
        results = await getSemanticSearchByOffer(selectedOfferId);
      }
      setSemanticResults(results);
    } catch (error) {
      console.error("Error en búsqueda semántica:", error);
    } finally {
      setIsAiSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isAiMode) {
        handleSemanticSearch();
      } else {
        handleSearch();
      }
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearchQuery("");
    setSemanticResults(null);
  };

  return (
    <div className="flex flex-col gap-8 pb-16 pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-700 tracking-tight">Buscar Talento</h1>
          <p className="text-slate-500 font-bold mt-1 text-sm">
            Encuentra a los mejores estudiantes para tu empresa.
          </p>
        </div>

        {/* AI Toggle - Solo visible con suscripción */}
        {hasSubscription && (
          <div className="flex items-center bg-slate-100/80 p-1 rounded-full border border-slate-200/80 shadow-inner w-full sm:w-auto relative shrink-0">
            <button
              onClick={() => {
                setIsAiMode(false);
                setSemanticResults(null);
                setSearch("");
                setSearchQuery("");
              }}
              className={cn(
                "flex-1 sm:flex-none px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 relative z-10",
                !isAiMode 
                  ? "bg-white text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.08)] scale-[1.02]" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              )}
            >
              Estándar
            </button>
            <button
              onClick={() => setIsAiMode(true)}
              className={cn(
                "flex-1 sm:flex-none px-4 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 relative z-10",
                isAiMode 
                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] scale-[1.02]" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              )}
            >
              <Sparkles size={14} className={isAiMode ? "text-white" : "text-slate-400"} />
              Modo IA
            </button>
          </div>
        )}
      </div>

      {!isAiMode ? (
        /* Standard Search Bar */
        <form 
          onSubmit={handleSearch}
          className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3 focus-within:ring-2 focus-within:ring-green-600/10 focus-within:border-green-600/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3 flex-1 w-full">
            <div className="bg-green-50 p-3 rounded-xl text-green-600 shrink-0">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar por nombre, habilidades o descripción..."
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm font-medium text-gray-700 placeholder:text-gray-300 h-full py-2"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end sm:justify-start">
            {(search || searchQuery) && (
              <button 
                type="button"
                onClick={handleClearSearch}
                className="flex-1 sm:flex-none bg-gray-50 text-gray-600 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:bg-gray-100 active:scale-95 text-center cursor-pointer whitespace-nowrap"
              >
                Ver todos
              </button>
            )}
            <button 
              type="submit"
              className="flex-1 sm:flex-none bg-green-600 text-white px-6 sm:px-8 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all hover:bg-green-700 hover:shadow-md active:scale-95 text-center cursor-pointer"
            >
              Buscar
            </button>
          </div>
        </form>
      ) : (
        /* AI Search Options */
        <SemanticSearchOptions 
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          selectedOfferId={selectedOfferId}
          setSelectedOfferId={setSelectedOfferId}
          searchText={searchText}
          setSearchText={setSearchText}
          offers={offers}
          onSearch={handleSemanticSearch}
          loading={isAiSearching}
        />
      )}

      {/* Student List */}
      <StudentList searchQuery={searchQuery} manualResults={semanticResults} />
    </div>
  );
}
