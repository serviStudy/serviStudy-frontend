"use client";

import { usePersistentRole } from "@/hooks/usePersistentRole";
import { employerPlans, studentPlans } from "../constants/pricing";
import { PricingHeader } from "./pricing/PricingHeader";
import { PricingCarousel } from "./pricing/PricingCarousel";
import { PricingGrid } from "./pricing/PricingGrid";
import { RoleSwitch } from "@/components/shared/RoleSwitch";

export function PricingSection() {
  const { tipoUsuario: activeType, setTipoUsuario: setActiveType } = usePersistentRole();

  const plans = activeType === "empresa" ? employerPlans : studentPlans;

  return (
    <section id="precios" className="w-full py-24 bg-gray-50/50 relative overflow-hidden">
      {/* DECORATIVE BACKGROUND GLOWS */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 w-[400px] h-[400px] bg-green-100/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <PricingHeader />

        <div className="flex justify-center mb-16">
          <RoleSwitch
            tipoUsuario={activeType}
            setTipoUsuario={setActiveType}
          />
        </div>

        <div className="w-full">
          {/* Mobile View */}
          <PricingCarousel plans={plans} activeType={activeType} />

          {/* Desktop View */}
          <PricingGrid plans={plans} activeType={activeType} className="hidden md:grid" />
        </div>
      </div>
    </section>
  );
}