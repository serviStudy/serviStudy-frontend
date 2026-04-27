"use client";
import React from 'react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEmployerDashboard } from '@/features/restricted/employer/dashboard/hooks/useEmployerDashboard';

const DashboardSkeleton = () => (
  <div className="flex flex-col gap-10 pb-12 animate-pulse">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="h-12 w-64 bg-gray-200 rounded-2xl"></div>
      <div className="h-16 w-56 bg-gray-200 rounded-[24px]"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-48 bg-gray-100 rounded-[40px]"></div>
      ))}
    </div>
  </div>
);

export default function EmployerDashboard() {
  const { stats, recentActivity, profile, loading } = useEmployerDashboard();

  if (loading) return <DashboardSkeleton />;

  const displayStats = [
    { 
      label: 'Ofertas Activas', 
      value: stats.activeOffers.toString(), 
      icon: Briefcase, 
      color: 'bg-green-50 text-green-600', 
      trend: stats.activeOffers > 0 ? 'En línea' : 'Sin ofertas' 
    },
    { 
      label: 'Candidatos Totales', 
      value: stats.totalCandidates.toString(), 
      icon: Users, 
      color: 'bg-blue-50 text-blue-600', 
      trend: stats.totalCandidates > 0 ? '+5%' : 'Esperando' 
    },
    { 
      label: 'Perfil Completo', 
      value: `${stats.profileCompletion}%`, 
      icon: CheckCircle2, 
      color: 'bg-purple-50 text-purple-600', 
      trend: stats.profileCompletion === 100 ? 'Excelente' : 'Pendiente' 
    },
    { 
      label: 'Total de Ofertas', 
      value: stats.totalOffers.toString(), 
      icon: TrendingUp, 
      color: 'bg-orange-50 text-orange-600', 
      trend: 'Histórico' 
    },
  ];

  const userName = profile?.employerName || (profile as any)?.employer_name || "Usuario";

  return (
    <div className="flex flex-col gap-10 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter">¡Hola, {userName}! 👋</h1>
          <p className="text-gray-400 font-bold text-lg mt-2">Aquí tienes un resumen de lo que está pasando hoy.</p>
        </div>
        <Link 
          href="/empleador/ofertas/crear"
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-[24px] font-black text-sm shadow-2xl shadow-green-900/20 transition-all active:scale-95 flex items-center gap-3 w-fit"
        >
          <Plus size={24} /> Crear Nueva Vacante
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-xl shadow-gray-200/40 hover:shadow-2xl transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-[20px] ${stat.color} shadow-inner transition-transform group-hover:scale-110`}>
                <stat.icon size={28} />
              </div>
              <span className={`text-[12px] font-black px-3 py-1.5 rounded-full ${
                stat.trend === 'Excelente' || stat.trend === 'En línea' ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-500'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-black text-gray-900 tracking-tight">{stat.value}</span>
              <span className="text-base font-bold text-gray-400 mt-2">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Actividad Reciente</h2>
            <Link href="/empleador/ofertas" className="text-sm font-black text-green-600 hover:underline tracking-widest uppercase">Ver todo</Link>
          </div>
          
          <div className="bg-white rounded-[48px] border border-gray-50 shadow-xl shadow-gray-200/40 overflow-hidden min-h-[300px]">
             {recentActivity.length > 0 ? (
               recentActivity.map((offer, i) => (
                 <Link 
                   href={`/empleador/ofertas/${offer.jobOfferId || offer.id}`}
                   key={offer.jobOfferId || offer.id || i} 
                   className={`p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all cursor-pointer ${i !== recentActivity.length - 1 ? 'border-b border-gray-50' : ''} group`}
                 >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[24px] bg-gray-50 flex items-center justify-center font-black text-gray-400 text-xl border border-gray-100 shadow-inner group-hover:bg-green-50 group-hover:text-green-600 transition-all uppercase">
                        {(offer.title || "O").charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-gray-800 text-lg">Nueva oferta publicada: <span className="text-green-600">{offer.title}</span></p>
                        <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-wider">
                          {offer.establishmentAddress || "Ubicación pendiente"}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={22} className="text-gray-300 group-hover:text-green-600 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                 </Link>
               ))
             ) : (
               <div className="flex flex-col items-center justify-center p-20 text-center">
                 <AlertCircle size={48} className="text-gray-200 mb-4" />
                 <p className="text-gray-400 font-bold text-lg">No hay actividad reciente.</p>
                 <p className="text-gray-300 text-sm mt-1">Tus nuevas ofertas aparecerán aquí.</p>
               </div>
             )}
          </div>
        </div>

        {/* Tips / Suggestions */}
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight px-4">Consejos Pro</h2>
          <div className="bg-green-600 rounded-[48px] p-10 text-white relative overflow-hidden group shadow-2xl shadow-green-900/30">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
             <h3 className="text-2xl font-black mb-4 relative z-10">
               {stats.profileCompletion < 100 ? "Completa tu perfil" : "Consigue más talento"}
             </h3>
             <p className="text-base font-medium opacity-90 leading-relaxed mb-10 relative z-10">
               {stats.profileCompletion < 100 
                 ? "Un perfil completo genera un 60% más de confianza en los candidatos." 
                 : "Mantén tus ofertas actualizadas para atraer a los mejores estudiantes de la plataforma."}
             </p>
             {stats.profileCompletion < 100 && (
               <Link 
                 href="/empleador/perfil/editar"
                 className="bg-white text-green-600 px-8 py-4 rounded-[20px] font-black text-sm shadow-2xl relative z-10 hover:bg-gray-50 transition-all active:scale-95 inline-block"
               >
                  Completar Perfil
               </Link>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}


