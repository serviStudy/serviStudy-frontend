import { useEffect, useState } from "react";
import { getEmployerOffers } from "../service/jobOffer.service";
import { JobOfferDTO } from "../types/jobOffer.types";

export const useJobOffers = () => {
  const [offers, setOffers] = useState<JobOfferDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  getEmployerOffers()
    .then((data) => {
      const visibleOffers = data.filter(
        (o: JobOfferDTO) => o.status !== "DELETED"
      );
      setOffers(visibleOffers);
    })
    .finally(() => setLoading(false));
    }, []);

  return { offers, loading };
};