import { jobOffersMock } from "../mocks/jobOffer.mock";

const USE_MOCK = true;
const API = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const getEmployerOffers = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(jobOffersMock), 500)
    );
  }

  const res = await fetch(`${API}/api/v1/job-offers/employer`);
  if (!res.ok) throw new Error("Error fetching offers");
  return res.json();
};