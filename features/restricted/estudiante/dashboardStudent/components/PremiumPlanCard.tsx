"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Star, Briefcase, CheckCircle2, Crown } from 'lucide-react';

interface PremiumPlanCardProps {
  itemVariants: any;
  subLoading: boolean;
  hasActiveSubscription: boolean;
  planName?: string;
  daysLeft: number;
}

export const PremiumPlanCard = ({
  itemVariants,
  subLoading,
  hasActiveSubscription,
  planName,
  daysLeft
}: PremiumPlanCardProps) => {
  return (
    <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-slate-800 px-1">Tu Plan Premium</h2>
      {subLoading ? (
        <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center justify-center h-full">
          <span className="text-slate-500">Cargando suscripción...</span>
        </div>
      ) : hasActiveSubscription ? (
        <div className="relative rounded-xl overflow-hidden bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col">
          {/* Premium gradient header inside card */}
          <div className="bg-linear-to-r from-green-500 to-blue-600 p-5 text-white relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/15 blur-2xl rounded-xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-300/20 blur-xl rounded-xl translate-y-1/2 -translate-x-1/4" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 shadow-inner">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Beneficios Activos</h3>
                <p className="text-[11px] text-green-100 font-medium mt-0.5">{planName || 'Premium'} · {daysLeft} días restantes</p>
              </div>
            </div>
          </div>

          {/* Benefits list */}
          <div className="p-5 space-y-3 flex-1">
            {[
              { icon: Star, text: "Mayor visibilidad ante empresas" },
              { icon: Briefcase, text: "Postulaciones ilimitadas" },
              { icon: CheckCircle2, text: "Soporte prioritario" },
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 rounded-xl bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center shrink-0 border border-green-200/50">
                  <benefit.icon size={14} className="text-green-600" />
                </div>
                <span className="font-medium text-slate-700">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="px-5 pb-5 mt-auto">
            <Link 
              href="/estudiante/ofertasActivas"
              className="w-full relative overflow-hidden group flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 bg-linear-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white shadow-lg shadow-green-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              <Sparkles size={16} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Buscar Vacantes con IA</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-6 h-full items-center justify-center text-center">
          <Crown className="w-12 h-12 text-slate-300" />
          <span className="text-slate-500">No tienes una suscripción activa</span>
          <Link href="/estudiante/suscripcion">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md">
              Ver Planes
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};
