"use client";

import { useState, useEffect } from "react";
import { getPlansByRole, ApiPlan } from "../services/planService";
import { PricingPlan } from "@/features/landing/constants/pricing";

/** PricingPlan enriquecido con los IDs reales de la BD */
export type ExtendedPlan = PricingPlan & {
  planId: number;
  rawPrice: number;
};

/**
 * Convierte el precio numérico de la API (ej: 10000.00) al formato
 * de string con puntos que usa el componente PriceCard (ej: "10.000")
 */
function formatPrice(price: number): string {
  return Math.round(price)
    .toLocaleString("es-CO")
    .replace(/,/g, ".");
}

/**
 * Determina si un plan es el recomendado (el del medio cuando hay 3,
 * o el segundo cuando hay 2).
 */
function isRecommended(index: number, total: number): boolean {
  if (total === 1) return false;
  if (total === 2) return index === 1;
  // Para 3 o más, el del medio
  return index === Math.floor(total / 2);
}

/**
 * Mapea un ApiPlan (del backend) al formato PricingPlan que usan
 * los componentes PricingGrid y PricingCarousel.
 * Se preserva planId en el campo `tier` para recuperarlo al seleccionar.
 */
function mapApiPlanToPricingPlan(plan: ApiPlan, index: number, total: number): ExtendedPlan {
  const recommended = isRecommended(index, total);
  return {
    tier: plan.name,
    price: formatPrice(plan.price),
    term: `${plan.durationDays} días`,
    description: plan.description ?? plan.name,
    features: [],          // El backend no tiene features aún; se puede extender
    ctaText: recommended ? "¡Suscribirme ahora!" : "Comenzar Plan",
    isRecommended: recommended,
    // Guardamos el ID real del plan en una propiedad extendida
    planId: plan.id,
    // Precio numérico para ePayco (sin formatear)
    rawPrice: Math.round(plan.price),
  } as PricingPlan & { planId: number; rawPrice: number };
}

// ─────────────────────────────────────────────
export type UsePlansRole = "STUDENT" | "EMPLOYER";

export interface UsePlansResult {
  plans: ExtendedPlan[];
  loading: boolean;
  error: string | null;
}

export function usePlans(role: UsePlansRole): UsePlansResult {
  const [plans, setPlans] = useState<ExtendedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiPlans = await getPlansByRole(role);
        if (!cancelled) {
          setPlans(apiPlans.map((p, i) => mapApiPlanToPricingPlan(p, i, apiPlans.length)));
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? "Error al cargar planes");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [role]);

  return { plans, loading, error };
}
