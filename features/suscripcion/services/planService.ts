import { getAuthHeaders } from "@/lib/api/authHeaders";

export interface ApiPlan {
  id: number;
  name: string;
  description: string | null;
  type: string;        // "STUDENT" | "EMPLOYER"
  price: number;       // BigDecimal viene como número en JSON
  durationDays: number;
  active: boolean;
}

/**
 * Obtiene los planes activos filtrados por el rol del usuario.
 * Llama al proxy interno de Next.js (/api/plans) para evitar el CORS
 * que bloquea el header X-User-Role cuando el browser llama directamente
 * al backend externo.
 *
 * @param role "STUDENT" | "EMPLOYER"
 */
export const getPlansByRole = async (role: "STUDENT" | "EMPLOYER"): Promise<ApiPlan[]> => {
  const res = await fetch(`/api/plans?role=${role}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error(`Error al obtener planes: ${res.status}`);
  }

  const data = await res.json();
  // El proxy reenvía la respuesta del backend directamente (List<Plan>)
  return Array.isArray(data) ? data : data.data ?? [];
};

