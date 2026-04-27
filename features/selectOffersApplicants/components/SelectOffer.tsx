"use client";

import { useState } from "react";
import { useEmployerProfile } from "@/features/profile/employer/hooks/useEmployerProfile";
import { useJobOffers } from "@/features/restricted/employer/jobOffer/hooks/useJobOffers";
import { JobOfferStatus } from "@/features/misPostulaciones/types/offersTypes";
import { OfferCard } from "@/features/restricted/employer/jobOffer/components/OfferCard";
import { SelectOfferCard } from "./selectOfferCard";
import { OfferHeaderApplicants } from "./OfferHeaderApplicants";

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
        <div className="lg:max-w-5xl md:max-w-2xl max-w-full mx-auto py-8 md:px-0">
        <OfferHeaderApplicants onFilterChange={setFilter} />
        

        {/* Historial Header con Refresco Integrado */}
        <div className="flex items-center justify-between gap-3 mb-6 mt-4 px-4 md:px-0">
            <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold text-[#1a4b9e]">Selecciona una oferta</h2>
            {!loading && <span className="ml-2 text-sm font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">({offers.length})</span>}
            </div>

            <button 
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 text-sm font-black text-[#1a4b9e] hover:bg-blue-50 px-4 py-2 rounded-xl transition-all disabled:opacity-50"
            >
            <svg className={loading ? "animate-spin" : ""} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
            {loading ? "Actualizando..." : "Actualizar historial"}
            </button>
        </div>

        {loading && offers.length === 0 && <p className="text-gray-500 text-center py-10" >Cargando ofertas...</p>}


        {/* Offers List */}
        <div className="space-y-4">
            {filteredOffers.map((offer) => {
            const offerId = offer.jobOfferId || offer.id;
            return <SelectOfferCard key={offerId} offer={offer} imageUrl={imageUrl} onRefresh={refresh} />;
            })}
        </div>
        </div>
    );
};