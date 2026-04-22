import { useEffect, useState } from "react";
import { getEmployerOffers } from "../service/jobOffer.service";
import { JobOfferDTO } from "../types/jobOffer.types";

export const useJobOffers = () => {
  const [offers, setOffers] = useState<JobOfferDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const data = await getEmployerOffers();
      console.log("[useJobOffers] API Response:", data);
      
      // Filtramos DELETED para que las ofertas eliminadas desaparezcan de la lista
      const visible = data.filter((o: JobOfferDTO) => String(o.status).toUpperCase() !== "DELETED");
      console.log(`[useJobOffers] Visible: ${visible.length} / Total: ${data.length}`);
      setOffers(visible);
    } catch (err) {
      console.error("[useJobOffers] Error fetching offers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return { offers, loading, refresh: fetchOffers };
};