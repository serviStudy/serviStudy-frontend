"use client";

import { useState } from "react";
import { PriceCard } from "./PriceCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";

const employerPlans = [
  {
    tier: "Plan Empleador Mensual",
    price: "15.000",
    term: "mes",
    description: "Flexibilidad total para contrataciones puntuales.",
    features: [
      "Búsqueda de estudiantes por IA: Permite la búsqueda semántica de estudiantes para llevar un proceso más eficiente y personalizado.",
      "Análisis de compatibilidad: Visualiza la compatibilidad exacta entre el estudiante y tu oferta al momento de la postulación.",
      "Mayor visibilidad en publicaciones: Tus ofertas se mostrarán con mayor frecuencia a los estudiantes más compatibles.",
    ],
    ctaText: "Comenzar Plan",
  },
  {
    tier: "Plan Empleador Trimestral",
    price: "36.000",
    term: "3 meses",
    description: "Optimiza tu proceso de reclutamiento anual.",
    features: [
      "Búsqueda de estudiantes por IA: Permite la búsqueda semántica de estudiantes para llevar un proceso más eficiente y personalizado.",
      "Análisis de compatibilidad: Visualiza la compatibilidad exacta entre el estudiante y tu oferta al momento de la postulación.",
      "Mayor visibilidad en publicaciones: Tus ofertas se mostrarán con mayor frecuencia a los estudiantes más compatibles.",
    ],
    isRecommended: true,
    ctaText: "¡Suscribirme ahora!",
  },
  {
    tier: "Plan Empleador Semestral",
    price: "63.000",
    term: "6 meses",
    description: "Máximo ahorro y herramientas corporativas completas.",
    features: [
      "Búsqueda de estudiantes por IA: Permite la búsqueda semántica de estudiantes para llevar un proceso más eficiente y personalizado.",
      "Análisis de compatibilidad: Visualiza la compatibilidad exacta entre el estudiante y tu oferta al momento de la postulación.",
      "Mayor visibilidad en publicaciones: Tus ofertas se mostrarán con mayor frecuencia a los estudiantes más compatibles.",
    ],
    ctaText: "Comenzar Plan",
  },
];

const studentPlans = [
  {
    tier: "Plan Estudiante Mensual",
    price: "10.000",
    term: "mes",
    description: "Ideal para búsquedas activas y rápidas.",
    features: [
      "Notificaciones de ofertas compatibles: La IA analiza las ofertas de trabajo cuando se crean. Si es adecuado para tus aptitudes y disponibilidad, serás notificado por correo.",
      "Mayor visibilidad del perfil: Tu perfil se mostrará con mayor frecuencia a empleadores con ofertas compatibles.",
    ],
    ctaText: "Comenzar Plan",
  },
  {
    tier: "Plan Estudiante Trimestral",
    price: "19.000",
    term: "3 meses",
    description: "La opción recomendada para asegurar tu futuro.",
    features: [
      "Notificaciones de ofertas compatibles: La IA analiza las ofertas de trabajo cuando se crean. Si es adecuado para tus aptitudes y disponibilidad, serás notificado por correo.",
      "Mayor visibilidad del perfil: Tu perfil se mostrará con mayor frecuencia a empleadores con ofertas compatibles.",
    ],
    isRecommended: true,
    ctaText: "¡Suscribirme ahora!",
  },
];

export function PricingSection() {
  const [activeType, setActiveType] = useState<"employer" | "student">("employer");

  const plans = activeType === "employer" ? employerPlans : studentPlans;

  return (
    <section id="precios" className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Encabezado */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-10 text-center">
            Nuestros Planes Premium
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl">
            Desbloquea el máximo potencial de ServiStudy con nuestras herramientas avanzadas de IA y servicios prioritarios.
          </p>
        </div>

        {/* Interruptor de Estado (Píldora) */}
        <div className="flex justify-center mb-16 md:mb-20">
          <div className="inline-flex h-14 items-center rounded-full bg-white p-1 shadow-inner border border-slate-200">
            <button
              onClick={() => setActiveType("employer")}
              className={cn(
                "inline-flex h-12 items-center justify-center rounded-full px-6 py-2 text-md font-semibold transition-all",
                activeType === "employer"
                  ? "bg-green-100 text-green-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              )}
            >
              <Briefcase className="mr-2.5 h-5 w-5" />
              Empleador
            </button>
            <button
              onClick={() => setActiveType("student")}
              className={cn(
                "inline-flex h-12 items-center justify-center rounded-full px-6 py-2 text-md font-semibold transition-all",
                activeType === "student"
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              )}
            >
              <User className="mr-2.5 h-5 w-5" />
              Estudiante
            </button>
          </div>
        </div>

        {/* Visualización Responsiva */}
        <div className="w-full">
          {/* Móvil y Tablet pequeña: Carrusel */}
          <Carousel className="w-full md:hidden">
            <CarouselContent className="px-4">
              {plans.map((plan, index) => (
                <CarouselItem key={index} className="pl-4 basis-full">
                  <div className="p-1 h-full">
                    <PriceCard {...plan} type={activeType} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Controles de carrusel personalizados */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <CarouselPrevious className="relative h-10 w-10 rounded-full" />
              {/* Indicadores de carrusel (Puntos) */}
              <div className="flex gap-2.5">
                {plans.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-3 rounded-full transition-all",
                      index === 1 ? "w-8 bg-blue-600" : "w-3 bg-slate-300" // Indicador simple para simular el estado actual en el mockup
                    )}
                  />
                ))}
              </div>
              <CarouselNext className="relative h-10 w-10 rounded-full" />
            </div>
          </Carousel>

          {/* Escritorio: Grid */}
          <div
            className={cn(
              "hidden md:grid gap-8 items-stretch",
              activeType === "employer" ? "grid-cols-3" : "grid-cols-2 max-w-5xl mx-auto"
            )}
          >
            {plans.map((plan, index) => (
              <PriceCard key={index} {...plan} type={activeType} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}