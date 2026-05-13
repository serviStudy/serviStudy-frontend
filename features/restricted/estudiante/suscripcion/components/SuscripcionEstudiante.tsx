"use client";

import React, { useEffect, useState } from "react";
import { PricingPlan } from "@/features/landing/constants/pricing";
import { PricingGrid } from "@/features/landing/components/pricing/PricingGrid";
import { PricingCarousel } from "@/features/landing/components/pricing/PricingCarousel";
import { useEpaycoCheckout } from "@/hooks/useEpaycoCheckout";
import { usePlans } from "@/features/suscripcion/hooks/usePlans";
import type { ExtendedPlan } from "@/features/suscripcion/hooks/usePlans";
import { useSubscriptionStatus } from "@/features/suscripcion/hooks/useSubscriptionStatus";
import { ActiveSubscriptionCard } from "@/features/suscripcion/components/ActiveSubscriptionCard";
import { Loader2, AlertCircle } from "lucide-react";

function getUserIdFromToken(): string | null {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    return decoded.userId ?? decoded.user_id ?? decoded.id ?? decoded.sub ?? null;
  } catch {
    return null;
  }
}

export function SuscripcionEstudiante() {
  const activeType = "estudiante";
  const [mounted, setMounted] = useState(false);
  const { openCheckout, isReady } = useEpaycoCheckout();
  const { plans, loading: plansLoading, error: plansError } = usePlans("STUDENT");
  const { status, loading: statusLoading, error: statusError } = useSubscriptionStatus();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectPlan = (plan: PricingPlan) => {
    if (!isReady) {
      console.warn("ePayco SDK no está listo aún.");
      return;
    }

    const extendedPlan = plan as ExtendedPlan;
    const userId = getUserIdFromToken();
    const planId = extendedPlan.planId;
    const rawPrice = extendedPlan.rawPrice;

    const invoice = `EST-${userId ?? "anon"}-${planId ?? "0"}-${Date.now()}`;

    openCheckout({
      name: `Suscripción ${plan.tier} - Estudiante`,
      description: plan.description,
      invoice,
      amount: String(rawPrice ?? plan.price.replace(/\./g, "")),
      extra1: userId ?? "",
      extra2: String(planId ?? ""),
    });
  };

  if (!mounted) return null;

  const isStatusLoading = statusLoading;
  const isPlansLoading = plansLoading;
  const isActive = status?.status === "ACTIVE" && status.currentSubscription;

  return (
    <div className="w-full flex flex-col gap-8 pb-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Suscripción y Planes
        </h1>
        <p className="text-slate-500 max-w-2xl">
          {isActive
            ? "Gestiona tu suscripción actual y revisa los beneficios activos de tu cuenta premium."
            : "Potencia tu búsqueda de oportunidades. Desbloquea notificaciones inteligentes, mayor visibilidad y herramientas de IA para conectar con las mejores empresas."
          }
        </p>
      </div>

      <div className="w-full relative mt-4">
        {/* Estado de carga de status (o si no es activo y cargando planes) */}
        {(isStatusLoading || (!isActive && !isStatusLoading && isPlansLoading)) && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-slate-500 font-medium">Verificando estado...</span>
          </div>
        )}

        {(!isStatusLoading && statusError && !isActive) && (
          <div className="flex items-center justify-center py-20 gap-3 text-red-600">
            <AlertCircle className="h-6 w-6" />
            <span>{statusError}</span>
          </div>
        )}
        {(!isStatusLoading && !isActive && !isPlansLoading && plansError) && (
          <div className="flex items-center justify-center py-20 gap-3 text-red-600">
            <AlertCircle className="h-6 w-6" />
            <span>{plansError}</span>
          </div>
        )}

        {/* Mostrar suscripción activa si existe */}
        {!isStatusLoading && isActive && (
          <div className="py-4">
            <ActiveSubscriptionCard
              subscription={status.currentSubscription!}
              type="estudiante"
            />
          </div>
        )}

        {!isStatusLoading && !isActive && !isPlansLoading && !plansError && !statusError && (
          <>
            <div className="md:hidden">
              <PricingCarousel
                plans={plans}
                activeType={activeType}
                onSelectPlan={handleSelectPlan}
              />
            </div>

            {/* Vista escritorio */}
            <div className="hidden md:block">
              <PricingGrid
                plans={plans}
                activeType={activeType}
                onSelectPlan={handleSelectPlan}
              />
            </div>
          </>
        )}

        <div id="epayco-checkout-container" className="hidden" />
      </div>
    </div>
  );
}

