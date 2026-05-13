"use client";

import { useState, useEffect } from "react";
import { getMySubscriptionStatus, SubscriptionStatusResponse } from "../services/subscriptionService";

export function useSubscriptionStatus() {
  const [status, setStatus] = useState<SubscriptionStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadStatus = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMySubscriptionStatus();
        if (!cancelled) {
          setStatus(data);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || "Error al obtener el estado de la suscripción");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  return { status, loading, error };
}
