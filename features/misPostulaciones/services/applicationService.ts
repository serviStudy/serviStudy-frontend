import { getAuthHeaders } from "@/lib/api/authHeaders";
import { ApplicationPageResponse} from "../types/applicationTypes";
import { ApplicationResponse } from "@/features/postPostularse/types/applicationTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getApplications = async (): Promise<ApplicationPageResponse> => {
    const headers = getAuthHeaders();
    console.log("API_URL:", API_URL);

    console.log("HEADERS:", headers);
    
    const res = await fetch(`${API_URL}/applicants/my-applications`, {
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



// delete application
type DeleteApplication = ApplicationResponse["jobOfferId"]

export const deleteApplication = async (id: DeleteApplication): Promise<void> => {
    const res = await fetch(`${API_URL}/applicants/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        let errorMessage = "Error al retirar postulación";

        try {
            const data = await res.json();
            errorMessage = data?.message || errorMessage;
        } catch {
            // algunos DELETE no retornan body
        }

        throw new Error(errorMessage);
    }
};
