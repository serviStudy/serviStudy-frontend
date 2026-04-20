import { getAuthHeaders } from "@/lib/api/authHeaders";
import { ApplicationPageResponse} from "../types/applicationTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getApplications = async (studentId: string): Promise<ApplicationPageResponse> => {
    const res = await fetch(`${API_URL}/applicants/student/${studentId}`, {
        headers: getAuthHeaders()
    })

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || "Error al obtener ofertas")
    }

    return data
}
