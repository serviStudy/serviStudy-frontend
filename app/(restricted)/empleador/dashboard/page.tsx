"use client";
import React from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  ArrowUpRight,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEmployerDashboard } from '@/features/restricted/empleador/dashboard/hooks/useEmployerDashboard';

const DashboardSkeleton = () => (
  <div className="flex flex-col gap-8 pb-12 animate-pulse">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="h-10 w-64 bg-gray-200 rounded-xl"></div>
      <div className="h-11 w-52 bg-gray-200 rounded-xl"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-36 bg-gray-100 rounded-xl"></div>
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
    <div className="flex flex-col gap-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">¡Hola, {userName}! 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Aquí tienes un resumen de lo que está pasando hoy.</p>
        </div>
        <Link 
          href="/empleador/ofertas/crear"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2 w-full sm:w-fit justify-center"
        >
          <Plus size={18} /> Crear Nueva Vacante
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {displayStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                stat.trend === 'Excelente' || stat.trend === 'En línea'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</span>
              <span className="text-sm font-medium text-gray-500 mt-1">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Actividad Reciente</h2>
            <Link
              href="/empleador/ofertas"
              className="text-xs font-medium text-green-600 hover:underline uppercase tracking-wider"
            >
              Ver todo
            </Link>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[200px]">
            {recentActivity.length > 0 ? (
              recentActivity.map((offer, i) => (
                <Link 
                  href={`/empleador/ofertas/${offer.jobOfferId || offer.id}`}
                  key={offer.jobOfferId || offer.id || i} 
                  className={`p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer ${
                    i !== recentActivity.length - 1 ? 'border-b border-gray-100' : ''
                  } group`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-gray-400 text-sm border border-gray-200 group-hover:bg-green-50 group-hover:text-green-600 transition-all uppercase shrink-0">
                      {(offer.title || "O").charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate max-w-[180px] sm:max-w-none">
                        Nueva oferta: <span className="text-green-600">{offer.title}</span>
                      </p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5 uppercase tracking-wider truncate">
                        {offer.establishmentAddress || "Ubicación pendiente"}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-300 group-hover:text-green-600 transition-all shrink-0"
                  />
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <AlertCircle size={40} className="text-gray-200 mb-3" />
                <p className="text-gray-400 font-semibold text-base">No hay actividad reciente.</p>
                <p className="text-gray-300 text-sm mt-1">Tus nuevas ofertas aparecerán aquí.</p>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Consejos Pro</h2>
          <div className="bg-green-600 rounded-xl p-6 text-white relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
            <h3 className="text-lg font-semibold mb-2 relative z-10">
              {stats.profileCompletion < 100 ? "Completa tu perfil" : "Consigue más talento"}
            </h3>
            <p className="text-sm font-medium opacity-90 leading-relaxed mb-6 relative z-10">
              {stats.profileCompletion < 100
                ? "Un perfil completo genera un 60% más de confianza en los candidatos."
                : "Mantén tus ofertas actualizadas para atraer a los mejores estudiantes de la plataforma."}
            </p>
            {stats.profileCompletion < 100 && (
              <Link 
                href="/empleador/perfil/editar"
                className="bg-white text-green-600 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm relative z-10 hover:bg-gray-50 transition-all active:scale-95 inline-block"
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
