import { useEffect, useState } from "react";
import { getEmployerOffers } from "../service/jobOffer.service";
import { JobOfferDTO } from "../types/jobOffer.types";

// Global cache to make navigation feel instant
let globalOffersCache: JobOfferDTO[] | null = null;
let isFirstLoad = true;

export const useJobOffers = () => {
  const [offers, setOffers] = useState<JobOfferDTO[]>(globalOffersCache || []);
  const [loading, setLoading] = useState(isFirstLoad && !globalOffersCache);

  const fetchOffers = async (force = false) => {
    if (!force && globalOffersCache) {
       setLoading(false);
    }
    
    try {
      const data = await getEmployerOffers();
      const visible = data.filter((o: JobOfferDTO) => String(o.status).toUpperCase() !== "DELETED");
      
      globalOffersCache = visible;
      setOffers(visible);
      isFirstLoad = false;
    } catch (err) {
      console.error("[useJobOffers] Error fetching offers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return { offers, loading, refresh: () => fetchOffers(true) };
};