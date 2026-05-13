import { getAuthHeaders } from "@/lib/api/authHeaders";

export interface ApiPlanInSubscription {
  id: number;
  name: string;
  description: string | null;
  type: string;
  price: number;
  durationDays: number;
  active: boolean;
}

export interface SubscriptionDetail {
  id: number;
  plan: ApiPlanInSubscription;
  startDate: string;   // ISO date-time string
  endDate: string;     // ISO date-time string
  status: string;      // "ACTIVE" | "EXPIRED" | "CANCELED"
  createdAt: string;
}

export interface SubscriptionStatusResponse {
  status: "ACTIVE" | "EXPIRED" | "NO_SUBSCRIPTION";
  currentSubscription?: SubscriptionDetail;
  history?: SubscriptionDetail[];
}

/**
 * Consulta el estado de suscripción del usuario autenticado.
 * Llama al proxy interno /api/subscriptions/me para evitar CORS.
 */
export const getMySubscriptionStatus = async (): Promise<SubscriptionStatusResponse> => {
  const res = await fetch("/api/subscriptions/me", {
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error(`Error al consultar suscripción: ${res.status}`);
  }

  return res.json();
};
