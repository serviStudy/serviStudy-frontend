import { getAuthHeaders } from "@/lib/api/authHeaders";

const API_URL = "/api/proxy";
const COMPATIBILYTY_URL = `${API_URL}/ai/compatibility`

interface CreateCompatibility {
  jobOfferId: string;
  ids: string[];
}

export const runCompatibilityAnalysis = async ({jobOfferId, ids,}: CreateCompatibility) => {
    const headers = getAuthHeaders();

    console.log("[compatibilityService] Request URL:", `${COMPATIBILYTY_URL}?id=${jobOfferId}`);
    console.log("[compatibilityService] Request Body:", JSON.stringify({ids}));

  try {
    const res = await fetch(`${COMPATIBILYTY_URL}?id=${jobOfferId}`, {
      method: "POST",
      headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ids}),
    });

    const responseData = await res.json();
    console.log("[compatibilityService] Response Status:", res.status);
    console.log("[compatibilityService] Response Data:", responseData);

    if (!res.ok) {
      throw new Error(responseData.message || `Error al realizar la compatibilidad: ${res.status}`);
    }

    return responseData;
  } catch (error: any) {
    console.error("[compatibilityService] Error en runCompatibilityAnalysis:", error.message);
    throw error;
  }
};