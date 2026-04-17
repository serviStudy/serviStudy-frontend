"use client";

import { useState } from "react";
import { useJobOffers } from "../hooks/useJobOffers";
import { OfferCard } from "./OfferCard";
import { OfferHeader } from "./OffersHeader";
import { JobOfferStatus } from "../types/jobOffer.types";

export const OfferList = () => {
  const { offers, loading } = useJobOffers();
  const [filter, setFilter] = useState<JobOfferStatus | "ALL">("ACTIVE");

  const filteredOffers =
    filter === "ALL"
      ? offers
      : offers.filter((o) => o.status === filter);

  return (
    <div className="lg:max-w-5xl md:max-w-2xl max-w-full mx-auto py-8 md:px-0">
      <OfferHeader onFilterChange={setFilter} />

      {loading && <p className="text-gray-500 text-center" >Cargando...</p>}

      {!loading && filteredOffers.length === 0 && (
        <p className="text-center py-10 text-gray-500">
          No tienes ninguna oferta creada
        </p>
      )}

      <h2 className="text-3xl font-bold text-[#143285] mb-6">Mi historial</h2>
      <div className="space-y-4">
        {filteredOffers.map((offer) => {
          const offerId = offer.jobOfferId || offer.id;
          return <OfferCard key={offerId} offer={offer} />;
        })}
      </div>
    </div>
  );
};