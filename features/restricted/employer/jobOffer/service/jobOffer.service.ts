import { jobOffersMock } from "../mocks/jobOffer.mock";
import { JobOfferDTO } from "../types/jobOffer.types";

const USE_MOCK = true;
const API = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const getEmployerOffers = async () => {
  if (USE_MOCK) {
    return new Promise<JobOfferDTO[]>((resolve) =>
      setTimeout(() => resolve(jobOffersMock as JobOfferDTO[]), 500)
    );
  }

  const res = await fetch(`${API}/api/v1/job-offers/employer`);
  if (!res.ok) throw new Error("Error fetching offers");
  return res.json();
};

export const getEmployerOfferById = async (id: string) => {
  if (USE_MOCK) {
    return new Promise<JobOfferDTO | undefined>((resolve) => {
      setTimeout(() => {
        const offer = jobOffersMock.find(o => o.id_job_offers === id);
        resolve(offer as JobOfferDTO | undefined);
      }, 500);
    });
  }

  const res = await fetch(`${API}/api/v1/job-offers/${id}`);
  if (!res.ok) throw new Error("Error fetching offer");
  return res.json();
};