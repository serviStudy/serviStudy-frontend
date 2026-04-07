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
    <div className="lg:max-w-5xl md:max-w-2xl max-w-full mx-auto px-4 py-6  md:px-0">
      <OfferHeader onFilterChange={setFilter} />

      {loading && <p className="text-gray-500 text-center" >Cargando...</p>}

      {!loading && filteredOffers.length === 0 && (
        <p className="text-center py-10 text-gray-500">
          No tienes ninguna oferta creada
        </p>
      )}

      <div className="space-y-5">
        {filteredOffers.map((offer) => (
          <OfferCard key={offer.id_job_offers} offer={offer} />
        ))}
      </div>
    </div>
  );
};