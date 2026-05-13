import { getAuthHeaders } from "@/lib/api/authHeaders";

export interface CreateSessionRequest {
  userId: string;
  planId: number;
  amount: number;
}

export interface CreateSessionResponse {
  sessionId?: string;
  invoiceId?: string;
  [key: string]: any;
}

/**
 * Registra la intención de pago en el backend antes de ir a ePayco.
 */
export const createPaymentSession = async (data: CreateSessionRequest): Promise<CreateSessionResponse> => {
  const res = await fetch("/api/payments/create-session", {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Error al crear sesión de pago: ${res.status}`);
  }

  return res.json();
};
