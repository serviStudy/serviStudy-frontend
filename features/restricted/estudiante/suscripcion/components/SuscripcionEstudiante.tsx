"use client";

import React, { useEffect, useState } from "react";
import { studentPlans } from "@/features/landing/constants/pricing";
import { PricingGrid } from "@/features/landing/components/pricing/PricingGrid";
import { PricingCarousel } from "@/features/landing/components/pricing/PricingCarousel";

export function SuscripcionEstudiante() {
  const activeType = "estudiante";
  const plans = studentPlans;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col gap-8 pb-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Suscripción y Planes
        </h1>
        <p className="text-slate-500 max-w-2xl">
          Potencia tu búsqueda de oportunidades. Desbloquea notificaciones inteligentes, mayor visibilidad y herramientas de IA para conectar con las mejores empresas.
        </p>
      </div>

      <div className="w-full relative mt-4">
        {/* Mobile View */}
        <div className="md:hidden">
          <PricingCarousel plans={plans} activeType={activeType} />
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <PricingGrid plans={plans} activeType={activeType} />
        </div>
        
        {/* Placeholder Wrapper for future ePayco Smart Checkout */}
        <div id="epayco-checkout-container" className="hidden">
          {/* El script o botón de ePayco se inyectará aquí durante la integración */}
        </div>
      </div>
    </div>
  );
}
