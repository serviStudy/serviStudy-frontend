import { getAuthHeaders } from "@/lib/api/authHeaders";
import { Offer } from "../types/offersTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getApplications = async (): Promise<Offer[]> => {
    const res = await fetch(`${API_URL}/offers`, {
        headers: getAuthHeaders()
    })

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Error al obtener ofertas")
    }

    return data
}
