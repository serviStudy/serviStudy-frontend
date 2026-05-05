"use client";

import { useState } from "react";
import { useEmployerProfile } from "@/features/restricted/empleador/perfil/hooks/useEmployerProfile";
import { useJobOffers } from "@/features/restricted/empleador/jobOffer/hooks/useJobOffers";
import { JobOfferStatus } from "@/features/restricted/estudiante/misPostulaciones/types/offersTypes";
import { SelectOfferCard } from "./selectOfferCard";
import { OfferHeaderApplicants } from "./OfferHeaderApplicants";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

export const SelectOffer = () => {
    const { offers, loading, refresh } = useJobOffers();
    const { profile } = useEmployerProfile();
    const [filter, setFilter] = useState<JobOfferStatus | "ALL">("ALL");

    const imageUrl = profile?.imageUrl || (profile as any)?.image_url;

    const filteredOffers =
        filter === "ALL"
        ? offers
        : offers.filter((o) => {
            const match = String(o.status).toUpperCase() === filter;
            if (!match && filter === "ACTIVE") {
                // Debug: ¿Por qué no es ACTIVA?
                console.log(`[OfferList] Ocultando oferta "${o.title}" porque su estado es "${o.status}" y buscamos "${filter}"`);
            }
            return match;
            });

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 lg:px-0 flex flex-col gap-8">
        <OfferHeaderApplicants onFilterChange={setFilter} />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-0">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
                    <Users size={24} />
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Selecciona una oferta</h2>
                    {!loading && (
                        <p className="text-gray-500 font-medium mt-1 text-xs">
                            {offers.length} vacantes publicadas
                        </p>
                    )}
                </div>
            </div>

            <button 
                onClick={refresh}
                disabled={loading}
                className="flex items-center gap-3 text-xs sm:text-sm font-bold text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl transition-all disabled:opacity-50 border border-green-100 shadow-sm active:scale-95 justify-center"
            >
                <svg className={loading ? "animate-spin" : ""} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                {loading ? "Sincronizando..." : "Refrescar Listado"}
            </button>
        </div>

        {loading && offers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">Obteniendo vacantes...</p>
            </div>
        )}

        {!loading && filteredOffers.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                <p className="text-gray-400 font-semibold text-base">
                    No se encontraron ofertas con el filtro seleccionado.
                </p>
            </div>
        )}

        {/* Offers List */}
        <div className="grid grid-cols-1 gap-4 pb-20">
            {filteredOffers.map((offer) => {
                const offerId = offer.jobOfferId || offer.id;
                return (
                    <motion.div
                        key={offerId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <SelectOfferCard offer={offer} imageUrl={imageUrl} onRefresh={refresh} />
                    </motion.div>
                );
            })}
        </div>
        </div>
    );
};