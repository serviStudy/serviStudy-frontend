import { getAuthHeaders } from "@/lib/api/authHeaders";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const APPLICANTS_URL = `${API_URL}/applicants`;

interface CreateApplicationDTO {
    jobOfferId: string
}

export const createApplication = async (body: CreateApplicationDTO) => {
    const res = await fetch(APPLICANTS_URL, {
        method: "POST",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error al postularse");

    return data.data ?? data;
}
