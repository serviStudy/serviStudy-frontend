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

  // Verificar suscripción (esto debería venir del backend)
  // FORZADO A TRUE PARA PRUEBAS
  const hasSubscription = true; // (profile as any)?.hasSubscription || (profile as any)?.subscriptionTier || false;

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
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-black tracking-tight">Buscar Talento</h1>
          <p className="text-gray-400 font-bold mt-1">
            Encuentra a los mejores estudiantes para tu empresa.
          </p>
        </div>

        {/* AI Toggle - Only if subscribed */}
        {hasSubscription && (
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
            <button
              onClick={() => {
                setIsAiMode(false);
                setSemanticResults(null);
                setSearch("");
                setSearchQuery("");
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                !isAiMode ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
              )}
            >
              Estándar
            </button>
            <button
              onClick={() => setIsAiMode(true)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all",
                isAiMode 
                  ? "bg-linear-to-r from-green-500 to-blue-500 text-white shadow-md shadow-green-500/20" 
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Sparkles size={14} className={isAiMode ? "text-white" : "text-gray-400"} />
              Modo IA
            </button>
          </div>
        )}
      </div>

      {!isAiMode ? (
        /* Standard Search Bar */
        <form 
          onSubmit={handleSearch}
          className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 focus-within:ring-2 focus-within:ring-green-600/10 focus-within:border-green-600/30 transition-all duration-300"
        >
          <div className="bg-green-50 p-3 rounded-xl text-green-600">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar por nombre, habilidades o descripción..."
            className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-gray-700 placeholder:text-gray-300 h-full py-2"
          />
          <div className="flex items-center gap-2">
            {(search || searchQuery) && (
              <button 
                type="button"
                onClick={handleClearSearch}
                className="bg-gray-50 text-gray-600 px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:bg-gray-100 active:scale-95 text-center cursor-pointer whitespace-nowrap"
              >
                Ver todos
              </button>
            )}
            <button 
              type="submit"
              className="bg-green-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all hover:bg-green-700 hover:shadow-md active:scale-95 text-center cursor-pointer"
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
