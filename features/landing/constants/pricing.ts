export interface PricingPlan {
  tier: string;
  price: string;
  term: string;
  description: string;
  features: string[];
  ctaText: string;
  isRecommended?: boolean;
}

export const employerPlans: PricingPlan[] = [
  {
    tier: "Plan Empleador Mensual",
    price: "15.000",
    term: "mes",
    description: "Flexibilidad total para contrataciones puntuales.",
    features: [
      "Búsqueda de estudiantes por IA: Permite la búsqueda semántica.",
      "Análisis de compatibilidad: Visualiza la compatibilidad exacta.",
      "Mayor visibilidad: Tus ofertas se mostrarán con mayor frecuencia.",
    ],
    ctaText: "Comenzar Plan",
  },
  {
    tier: "Plan Empleador Trimestral",
    price: "36.000",
    term: "3 meses",
    description: "Optimiza tu proceso de reclutamiento anual.",
    features: [
      "Búsqueda de estudiantes por IA: Permite la búsqueda semántica.",
      "Análisis de compatibilidad: Visualiza la compatibilidad exacta.",
      "Mayor visibilidad: Tus ofertas se mostrarán con mayor frecuencia.",
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
      "Búsqueda de estudiantes por IA: Permite la búsqueda semántica.",
      "Análisis de compatibilidad: Visualiza la compatibilidad exacta.",
      "Mayor visibilidad: Tus ofertas se mostrarán con mayor frecuencia.",
    ],
    ctaText: "Comenzar Plan",
  },
];

export const studentPlans: PricingPlan[] = [
  {
    tier: "Plan Estudiante Mensual",
    price: "10.000",
    term: "mes",
    description: "Ideal para búsquedas activas y rápidas.",
    features: [
      "Notificaciones de ofertas compatibles.",
      "Mayor visibilidad del perfil para empresas compatibles.",
    ],
    ctaText: "Comenzar Plan",
  },
  {
    tier: "Plan Estudiante Trimestral",
    price: "19.000",
    term: "3 meses",
    description: "La opción recomendada para asegurar tu futuro.",
    features: [
      "Notificaciones de ofertas compatibles.",
      "Mayor visibilidad del perfil para empresas compatibles.",
    ],
    isRecommended: true,
    ctaText: "¡Suscribirme ahora!",
  },
];
