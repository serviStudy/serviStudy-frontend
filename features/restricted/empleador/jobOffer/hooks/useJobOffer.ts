import { useEffect, useState } from "react";
import { getEmployerOfferById } from "../service/jobOffer.service";
import { JobOfferDTO } from "../types/jobOffer.types";

export const useJobOffer = (id: string) => {
  const [offer, setOffer] = useState<JobOfferDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getEmployerOfferById(id)
      .then((data) => {
        if (data) {
          setOffer(data);
        } else {
          setError("Offer not found");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { offer, loading, error };
};
