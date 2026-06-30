"use client";

import { useState } from "react";
import { useJobOffers } from "../hooks/useJobOffers";
import { OfferCard } from "./OfferCard";
import { OfferHeader } from "./OffersHeader";
import { JobOfferStatus } from "../types/jobOffer.types";
import { useEmployerProfile } from "@/features/restricted/empleador/perfil/hooks/useEmployerProfile";
import { motion } from "framer-motion";

interface OfferListProps {
  subscriptionStatus?: "ACTIVE" | "INACTIVE"
}

export const OfferList = ({ subscriptionStatus = "INACTIVE" }: OfferListProps) => {
  const { offers, loading, refresh } = useJobOffers();
  const { profile } = useEmployerProfile();
  const [filter, setFilter] = useState<JobOfferStatus | "ALL">("ALL");

  const imageUrl = profile?.imageUrl || (profile as any)?.image_url;

  const filteredOffers =
    filter === "ALL"
      ? offers
      : offers.filter((o) => String(o.status).toUpperCase() === filter);

  const isPremium = subscriptionStatus === "ACTIVE";

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 lg:px-0 flex flex-col gap-8 relative">
      {/* Premium background glows */}
      {isPremium && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-[15%] -right-[10%] w-[55%] h-[50%] bg-blue-300/10 blur-[100px] rounded-full" />
          <div className="absolute top-[30%] -left-[10%] w-[50%] h-[50%] bg-green-300/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[15%] right-[20%] w-[40%] h-[40%] bg-emerald-300/8 blur-[100px] rounded-full" />
        </div>
      )}
      <OfferHeader onFilterChange={setFilter} subscriptionStatus={subscriptionStatus} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-0">
        <div className="md:flex hidden items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Historial de ofertas</h2>
            {!loading && (
              <p className="text-gray-500 font-medium mt-1 text-[10px] sm:text-xs">
                Gestionando {offers.length} vacantes publicadas
              </p>
            )}
          </div>
        </div>
      </div>

      {loading && offers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Obteniendo vacantes...</p>
        </div>
      )}

      {!loading && filteredOffers.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
          <p className="text-gray-400 font-bold text-lg">
            No se encontraron ofertas con el filtro seleccionado.
          </p>
        </div>
      )}

      {/* lista de las ofertas */}
      <div className="grid grid-cols-1 gap-4 pb-20">
        {filteredOffers.map((offer) => {
          const offerId = offer.jobOfferId || offer.id;
          return (
            <motion.div key={offerId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <OfferCard 
                offer={offer} 
                imageUrl={imageUrl}
                onRefresh={refresh} 
                subscriptionStatus={subscriptionStatus}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};