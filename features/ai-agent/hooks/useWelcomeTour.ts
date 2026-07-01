"use client";
import { useState, useCallback } from 'react';

interface TourStep {
  icon: string;
  title: string;
  description: string;
}

const STUDENT_STEPS: TourStep[] = [
  { icon: '👋', title: '¡Hola! Soy Turnito', description: 'Tu asistente personal en ServiStudy. Estoy aquí para ayudarte a encontrar oportunidades laborales compatibles con tu perfil estudiantil.' },
  { icon: '🔍', title: 'Busca Ofertas', description: 'En "Buscar Ofertas" encontrarás empleos flexibles adaptados a tu horario universitario. ¡Filtra por jornada, salario y más!' },
  { icon: '📋', title: 'Mis Postulaciones', description: 'Aquí podrás dar seguimiento a todas las ofertas a las que te has postulado y ver el estado de cada una.' },
  { icon: '✨', title: '¡Activa Premium!', description: 'Con ServiStudy Premium desbloqueas el Dashboard de métricas y acceso completo a mí, tu Agente IA personal. ¡Potencia tu búsqueda!' },
];

const STUDENT_PREMIUM_STEPS: TourStep[] = [
  { icon: '👋', title: '¡Hola! Soy Turnito', description: 'Tu asistente IA premium en ServiStudy. Puedo ayudarte a mejorar tu perfil, analizar compatibilidades y mucho más.' },
  { icon: '📊', title: 'Tu Dashboard', description: 'Aquí tienes métricas de tu perfil: vistas, likes recibidos, compatibilidad con ofertas y más información valiosa.' },
  { icon: '🤖', title: 'Agente IA', description: 'Puedo crear tu perfil desde cero, sugerirte mejoras, y ayudarte a prepararte para procesos de selección. ¡Solo dime qué necesitas!' },
  { icon: '🎯', title: '¡Empecemos!', description: 'Tienes acceso completo a ServiStudy Premium. Explora todas las funciones y no dudes en consultarme cualquier cosa.' },
];

const EMPLOYER_STEPS: TourStep[] = [
  { icon: '👋', title: '¡Hola! Soy Turnito', description: 'Tu asistente en ServiStudy para empleadores. Te ayudaré a encontrar el talento estudiantil perfecto para tu empresa.' },
  { icon: '💼', title: 'Gestiona Ofertas', description: 'En "Mis Ofertas" puedes crear, editar y monitorear tus publicaciones de trabajo. ¡Atrae a los mejores estudiantes!' },
  { icon: '🔍', title: 'Busca Talento', description: 'Explora perfiles de estudiantes y analiza su compatibilidad con tus necesidades. Filtra por habilidades, disponibilidad y más.' },
  { icon: '🤖', title: 'Agente IA Premium', description: 'Con Premium puedo crear ofertas de trabajo por ti, analizar candidatos y darte recomendaciones personalizadas.' },
];

export function useWelcomeTour(role: 'STUDENT' | 'EMPLOYER', isPremium: boolean) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = role === 'EMPLOYER'
    ? EMPLOYER_STEPS
    : isPremium
    ? STUDENT_PREMIUM_STEPS
    : STUDENT_STEPS;

  const next = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const prev = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  return { steps, currentStep, next, prev, isLast, isFirst };
}
