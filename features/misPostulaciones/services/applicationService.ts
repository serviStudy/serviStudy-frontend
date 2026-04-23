import { getAuthHeaders } from "@/lib/api/authHeaders";
import { ApplicationPageResponse} from "../types/applicationTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getApplications = async (): Promise<ApplicationPageResponse> => {
    const headers = getAuthHeaders();
    console.log("API_URL:", API_URL);

    console.log("HEADERS:", headers);
    
    const res = await fetch(`${API_URL}/applicants/student`, {
        method: "GET",
        headers: getAuthHeaders(),
        cache: "no-store",
    })

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Error al obtener postulaciones");
    }

    return data as ApplicationPageResponse
}
