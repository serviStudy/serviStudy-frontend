"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';

interface DashboardStatsProps {
  itemVariants: any;
  loadingPosts: boolean;
  postulacionesCount: number;
  profileCompletion: number;
  skillsCount: number;
  subLoading: boolean;
  planName?: string;
  daysLeft: number;
}

export const DashboardStats = ({
  itemVariants,
  loadingPosts,
  postulacionesCount,
  profileCompletion,
  skillsCount,
  subLoading,
  planName,
  daysLeft
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1: Postulaciones Activas */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-3 py-1 rounded-xl tracking-wide uppercase">En proceso</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {loadingPosts ? "..." : postulacionesCount}
          </span>
          <span className="text-slate-500 font-medium text-sm mt-1">Postulaciones Activas</span>
        </div>
      </motion.div>

      {/* Card 2: Perfil Completo */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-purple-500" />
          </div>
          <span className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">Excelente</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-slate-800 tracking-tight">{profileCompletion}%</span>
          <span className="text-slate-500 font-medium text-sm mt-1">Perfil Completo</span>
        </div>
      </motion.div>

      {/* Card 3: Habilidades Registradas */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">Destacado</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-slate-800 tracking-tight">{skillsCount}</span>
          <span className="text-slate-500 font-medium text-sm mt-1">Habilidades Registradas</span>
        </div>
      </motion.div>

      {/* Card 4: Suscripción Restante */}
      <motion.div variants={itemVariants} className="relative p-6 rounded-2xl bg-linear-to-br from-green-500 to-blue-600 text-white overflow-hidden group hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.25)]">
        {/* Internal glows */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/15 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-green-300/20 blur-xl rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-inner transition-transform group-hover:scale-110">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 uppercase tracking-wider">
            {subLoading ? "..." : planName || "Premium"}
          </span>
        </div>
        <div className="flex flex-col relative z-10">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black tracking-tight">{subLoading ? "..." : daysLeft}</span>
            <span className="text-sm font-medium opacity-80">{daysLeft === 1 ? 'día' : 'días'}</span>
          </div>
          <span className="text-sm font-medium text-green-100 mt-1">Suscripción Restante</span>
        </div>
      </motion.div>
    </div>
  );
};
