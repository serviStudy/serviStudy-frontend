"use client";
import React from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  ArrowUpRight,
  Plus,
  CheckCircle2,
  AlertCircle,
  Star,
  Sparkles,
  Clock,
  Crown
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEmployerDashboard } from '@/features/restricted/empleador/dashboard/hooks/useEmployerDashboard';
import { useSubscriptionStatus } from '@/features/suscripcion/hooks/useSubscriptionStatus';

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
  const { status: subStatus, loading: loadingSub } = useSubscriptionStatus();

  if (loading || loadingSub) return <DashboardSkeleton />;

  const currentSub = subStatus?.currentSubscription;
  const hasSubscription = subStatus?.status === "ACTIVE" && !!currentSub;

  let daysLeft = 0;
  let planName = '';
  if (hasSubscription && currentSub) {
    daysLeft = Math.ceil(
      (new Date(currentSub.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysLeft < 0) daysLeft = 0;
    planName = currentSub.plan?.name || 'Premium';
  }

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
      color: 'bg-blue-50 text-blue-600', 
      trend: 'Histórico' 
    },
  ];

  const userName = profile?.employerName || (profile as any)?.employer_name || "Usuario";

  /* ─── PREMIUM DASHBOARD (con suscripción) ─── */
  if (hasSubscription) {
    return (
      <div className="relative flex flex-col gap-8 pb-12">
        {/* Soft Blurred Background Glows — same palette as SemanticSearchOptions */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-[15%] -right-[10%] w-[55%] h-[50%] bg-blue-300/20 blur-[100px] rounded-full" />
          <div className="absolute top-[30%] -left-[10%] w-[50%] h-[50%] bg-green-300/20 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[15%] right-[20%] w-[40%] h-[40%] bg-emerald-300/10 blur-[100px] rounded-full" />
        </div>

        {/* ── Premium Welcome Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 p-6 sm:p-8 text-white overflow-hidden shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)]"
        >
          {/* Glows inside banner */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-300/30 blur-2xl rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-blue-300/20 blur-xl rounded-full" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-inner shrink-0">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  ¡Hola, {userName}! 👋
                </h1>
                <p className="text-sm text-green-50 font-medium mt-1">
                  Estás disfrutando de los beneficios premium de tu plan <span className="font-bold text-white">{planName}</span>.
                </p>
              </div>
            </div>
            <Link 
              href="/empleador/ofertas/crear"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2 w-full sm:w-fit justify-center border border-white/30"
            >
              <Plus size={18} /> Crear Nueva Vacante
            </Link>
          </div>
        </motion.div>

        {/* ── Stats Grid — 4 columns with glassmorphism ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Standard stat cards */}
          {displayStats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              className="relative p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
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

          {/* ── Premium Subscription Card ── */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 text-white overflow-hidden group hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.25)]"
          >
            {/* Internal glows */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/15 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-green-300/20 blur-xl rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-inner transition-transform group-hover:scale-110">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 uppercase tracking-wider">
                {planName}
              </span>
            </div>
            <div className="flex flex-col relative z-10">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black tracking-tight">{daysLeft}</span>
                <span className="text-sm font-medium opacity-80">{daysLeft === 1 ? 'día' : 'días'}</span>
              </div>
              <span className="text-sm font-medium text-green-100 mt-1">Suscripción Restante</span>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity — glassmorphic */}
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
            
            <div className="rounded-2xl overflow-hidden min-h-[200px] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              {recentActivity.length > 0 ? (
                recentActivity.map((offer, i) => (
                  <Link 
                    href={`/empleador/ofertas/${offer.jobOfferId || offer.id}`}
                    key={offer.jobOfferId || offer.id || i} 
                    className={`p-4 sm:p-5 flex items-center justify-between hover:bg-white/60 transition-all cursor-pointer ${
                      i !== recentActivity.length - 1 ? 'border-b border-gray-100/80' : ''
                    } group`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center font-bold text-green-600 text-sm border border-green-200/50 group-hover:from-green-100 group-hover:to-blue-100 transition-all uppercase shrink-0">
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

          {/* ── Premium Tips — dark premium card ── */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Tu Plan Premium</h2>
            <div className="relative rounded-2xl overflow-hidden bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              {/* Premium gradient header inside card */}
              <div className="bg-gradient-to-r from-green-500 to-blue-600 p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/15 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-300/20 blur-xl rounded-full translate-y-1/2 -translate-x-1/4" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 shadow-inner">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">Beneficios Activos</h3>
                    <p className="text-[11px] text-green-100 font-medium mt-0.5">{planName} · {daysLeft} días restantes</p>
                  </div>
                </div>
              </div>

              {/* Benefits list */}
              <div className="p-5 space-y-3">
                {[
                  { icon: Sparkles, text: "Búsqueda semántica con IA" },
                  { icon: Star, text: "Mayor visibilidad en la plataforma" },
                  { icon: CheckCircle2, text: "Soporte prioritario" },
                  { icon: Briefcase, text: "Búsqueda avanzada de candidatos" },
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center shrink-0 border border-green-200/50">
                      <benefit.icon size={14} className="text-green-600" />
                    </div>
                    <span className="font-medium text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-5 pb-5">
                <Link 
                  href="/empleador/buscar-talento"
                  className="w-full relative overflow-hidden group flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white shadow-lg shadow-green-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  <Sparkles size={16} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Buscar Talento con IA</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── STANDARD DASHBOARD (sin suscripción) ─── */
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
