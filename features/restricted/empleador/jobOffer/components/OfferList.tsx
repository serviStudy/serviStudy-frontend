"use client";

import { useState } from "react";
import { useJobOffers } from "../hooks/useJobOffers";
import { OfferCard } from "./OfferCard";
import { OfferHeader } from "./OffersHeader";
import { JobOfferStatus } from "../types/jobOffer.types";
import { useEmployerProfile } from "@/features/restricted/empleador/perfil/hooks/useEmployerProfile";
import { motion } from "framer-motion";

export const OfferList = () => {
  const { offers, loading, refresh } = useJobOffers();
  const { profile } = useEmployerProfile();
  const [filter, setFilter] = useState<JobOfferStatus | "ALL">("ALL");

  const imageUrl = profile?.imageUrl || (profile as any)?.image_url;

  const filteredOffers =
    filter === "ALL"
      ? offers
      : offers.filter((o) => String(o.status).toUpperCase() === filter);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-0 flex flex-col gap-10">
      <OfferHeader onFilterChange={setFilter} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-0">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-green-50 rounded-[24px] flex items-center justify-center text-green-600 shadow-inner border border-green-100">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter">Historial de ofertas</h2>
            {!loading && (
              <p className="text-gray-400 font-bold mt-1 uppercase tracking-widest text-[12px]">
                Gestionando {offers.length} vacantes publicadas
              </p>
            )}
          </div>
        </div>

        <button 
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-3 text-sm font-black text-green-600 hover:bg-green-50 px-8 py-4 rounded-2xl transition-all disabled:opacity-50 border border-green-100 shadow-sm active:scale-95"
        >
          <svg className={loading ? "animate-spin" : ""} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          {loading ? "Sincronizando..." : "Refrescar Listado"}
        </button>
      </div>

      {loading && offers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Obteniendo vacantes...</p>
        </div>
      )}

      {!loading && filteredOffers.length === 0 && (
        <div className="bg-white rounded-[40px] border border-gray-50 p-20 text-center shadow-xl shadow-gray-200/40">
          <p className="text-gray-400 font-bold text-xl">
            No se encontraron ofertas con el filtro seleccionado.
          </p>
        </div>
      )}

      {/* Offers List */}
      <div className="grid grid-cols-1 gap-8 pb-20">
        {filteredOffers.map((offer) => {
          const offerId = offer.jobOfferId || offer.id;
          return (
            <motion.div
              key={offerId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <OfferCard offer={offer} imageUrl={imageUrl} onRefresh={refresh} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};