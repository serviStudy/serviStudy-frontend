import { ActiveOffer } from "@/features/ofertasActivas/types/ofertasActivas.types";
import { getAuthHeaders } from "@/lib/api/authHeaders";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const APPLICANTS_URL = `${API_URL}/applicants`;

interface CreateApplicationDTO {
    jobOfferId: string;
    studentProfileId: string
}

export const createApplication = async (body: CreateApplicationDTO) => {
        const headers = getAuthHeaders();

    console.log("BODY enviado:", body);
    console.log("HEADERS:", headers);

    const res = await fetch(APPLICANTS_URL, {
        method: "POST",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })

    let data = null;

    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) throw new Error(data.message || "Error al postularse");

    return data.data ?? data;
}

export const getOfferById = async (id: string): Promise<ActiveOffer> => {
    const res = await fetch(`${API_URL}/offers/${id}`, {
        headers: getAuthHeaders(),
    })

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "No se encontró la oferta")

    return data.data
}