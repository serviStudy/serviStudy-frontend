import { getAuthHeaders } from "@/lib/api/authHeaders";
import { ActiveOffer, ActiveOffersResponse } from "../types/ofertasActivas.types";
import { Offer } from "@/features/restricted/estudiante/postPostularse/types/offer";
import { mapActiveOfferToOffer } from "../mappers/offerMapper";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ACTIVE_OFFERS_URL = `${API_URL}/offers`;

export const getActiveOffers = async (): Promise<Offer[] | null> => {
    const res = await fetch(ACTIVE_OFFERS_URL, {
        headers: getAuthHeaders()
    })

    if (res.status == 404) return null;

    const data: ActiveOffersResponse = await res.json();

    if (!res.ok) throw new Error(data.message || "Error al obtener ofertas");

    const rawOffers: ActiveOffer[] = data.data ?? data;
    
    return rawOffers.map(mapActiveOfferToOffer);
}