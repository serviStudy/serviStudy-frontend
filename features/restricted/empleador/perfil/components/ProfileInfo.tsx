import React from 'react'
import Link from 'next/link'
import {
  BriefcaseBusiness, Building2, MapPin, Pencil, CheckCircle2, 
  Mail, Phone, AlignLeft, Globe, Zap, ArrowRight, Crown, Sparkles, Star
} from 'lucide-react'
import { type EmployerProfileResponse } from '../services/profileService'
import { ProfileOffersList } from './ProfileOffersList'
import { motion } from 'framer-motion'

interface ProfileInfoProps {
  profile: EmployerProfileResponse
  email: string
  inicial: string
  isPremium?: boolean
  planName?: string
  daysLeft?: number
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profile,
  email,
  inicial,
  isPremium = false,
  planName = '',
  daysLeft = 0,
}) => {
  return (
    <div className="flex w-full flex-col gap-8 pb-20">
      
      {/* 1. Hero Section (Banner & Identity) */}
      <div className={`relative w-full rounded-xl overflow-hidden shadow-sm ${
        isPremium 
          ? 'bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' 
          : 'bg-white border border-gray-100'
      }`}>
        {/* Background Banner */}
        <div className={`h-[200px] lg:h-[280px] w-full relative overflow-hidden ${
          isPremium
            ? 'bg-gradient-to-br from-green-500 via-blue-500 to-blue-600'
            : 'bg-gradient-to-br from-green-900 via-green-700 to-green-500'
        }`}>
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Premium glows inside banner */}
          {isPremium && (
            <>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/15 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-300/25 blur-2xl rounded-full translate-y-1/2 -translate-x-1/4" />
              <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-300/20 blur-xl rounded-full" />
            </>
          )}
          
          {/* Premium badge in banner */}
          {isPremium && (
            <div className="absolute top-5 left-5 sm:top-8 sm:left-10 flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 shadow-inner">
              <Crown size={16} className="text-yellow-300" />
              <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider">{planName}</span>
              <span className="text-[10px] text-white/70 font-medium">· {daysLeft} {daysLeft === 1 ? 'día' : 'días'}</span>
            </div>
          )}
          
          {/* Action Buttons in Banner */}
          <div className="absolute top-5 right-5 sm:top-8 sm:right-10 flex gap-4">
            <Link
              href="/empleador/perfil/editar"
              className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-bold text-[10px] sm:text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 ${
                isPremium
                  ? 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
                  : 'bg-white text-green-700 hover:bg-gray-50'
              }`}
            >
              <Pencil size={14} className="sm:w-4 sm:h-4" /> Editar Perfil
            </Link>
          </div>
        </div>

        {/* Identity Section */}
        <div className="px-5 sm:px-10 lg:px-16 pb-12">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-center lg:items-end -mt-16 lg:-mt-20">
            {/* Logo */}
            <div className="relative shrink-0">
              <div className={`h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-lg p-5 sm:p-6 flex items-center justify-center ${
                isPremium
                  ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/80'
                  : 'bg-white shadow-sm border border-gray-100'
              }`}>
                {(profile.imageUrl || profile.image_url) ? (
                  <img src={profile.imageUrl || profile.image_url} alt="Logo" className="h-full w-full object-contain" />
                ) : (
                  <span className={`text-[60px] sm:text-[80px] lg:text-[100px] font-black ${
                    isPremium ? 'text-blue-600/10' : 'text-green-700/10'
                  }`}>
                    {inicial}
                  </span>
                )}
              </div>
              <div className={`absolute -bottom-2 -right-2 p-2.5 rounded-md shadow-sm border-4 border-white ${
                isPremium
                  ? 'bg-gradient-to-br from-green-500 to-blue-600'
                  : 'bg-green-500'
              }`}>
                {isPremium ? (
                  <Sparkles className="h-5 w-5 text-white" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-white" />
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center lg:text-left lg:pb-6 min-w-0">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4 mb-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight truncate">
                  {profile.businessName || profile.business_name || "Nombre de Empresa"}
                </h1>
                <span className={`w-fit mx-auto lg:mx-0 px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider border ${
                  isPremium
                    ? 'bg-gradient-to-r from-green-50 to-blue-50 text-blue-600 border-blue-200/50'
                    : 'bg-green-50 text-green-600 border-green-100'
                }`}>
                  {isPremium ? '✦ Premium Verificada' : 'Empresa Verificada'}
                </span>
              </div>
              
              {/* Employer Name */}
              <p className="text-sm lg:text-base font-normal text-gray-500">
                {profile.employerName || profile.employer_name || "Responsable no asignado"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium background glows */}
      {isPremium && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-[15%] -right-[10%] w-[55%] h-[50%] bg-blue-300/15 blur-[100px] rounded-full" />
          <div className="absolute top-[30%] -left-[10%] w-[50%] h-[50%] bg-green-300/15 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[15%] right-[20%] w-[40%] h-[40%] bg-emerald-300/10 blur-[100px] rounded-full" />
        </div>
      )}

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column (Core Details) */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
             {[
               { label: "Correo Electrónico", value: email || "No disponible", icon: Mail, gradient: "from-green-500 to-emerald-600" },
               { label: "Teléfono", value: profile.contactNumber || profile.contact_number || "No disponible", icon: Phone, gradient: "from-blue-500 to-cyan-600" },
               { label: "Dirección", value: profile.businessAddress || profile.business_address || "No disponible", icon: MapPin, gradient: "from-violet-500 to-purple-600" },
             ].map((item) => (
               <div key={item.label} className={`group relative p-5 sm:p-6 rounded-2xl overflow-hidden transition-all duration-300 ${
                 isPremium
                   ? 'bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] hover:-translate-y-1.5'
                   : 'bg-white border border-gray-100 shadow-sm'
               }`}>
                  {/* Glow sutil en hover (solo premium) */}
                  {isPremium && (
                    <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-15 blur-2xl rounded-full transition-opacity duration-500`} />
                  )}
                  <div className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
                    isPremium
                      ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-blue-500/10`
                      : 'text-green-600 bg-green-50'
                  }`}>
                    <item.icon size={20} />
                  </div>
                  <p className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-1.5 ${
                    isPremium ? 'text-gray-400' : 'text-gray-400'
                  }`}>{item.label}</p>
                  <p className="text-sm sm:text-base font-bold text-gray-800 break-words leading-snug">{item.value}</p>
               </div>
             ))}
          </div>

          {/* About Section */}
          <section className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
            isPremium
              ? 'bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
              : 'bg-white border border-gray-100 shadow-sm'
          }`}>
            {/* Barra decorativa superior (solo premium) */}
            {isPremium && (
              <div className="h-1 w-full bg-gradient-to-r from-green-500 via-blue-500 to-violet-500" />
            )}
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${
                  isPremium
                    ? 'bg-gradient-to-br from-green-500 to-blue-600 text-white shadow-lg shadow-green-500/15 border-transparent'
                    : 'bg-green-50 text-green-600 border-green-100'
                }`}>
                  <AlignLeft size={22} />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 tracking-tight">Sobre nosotros</h3>
                  {isPremium && (
                    <p className="text-[11px] font-medium text-gray-400 mt-0.5">Visión y valores de la empresa</p>
                  )}
                </div>
              </div>
              
              <p className={`leading-relaxed ${
                isPremium
                  ? 'text-[15px] text-gray-600'
                  : 'text-base text-gray-500'
              }`}>
                {profile.businessSummary || profile.business_summary || "Esta empresa aún no ha añadido una descripción sobre su visión y valores."}
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 px-2">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${
                  isPremium
                    ? 'bg-gradient-to-br from-green-50 to-blue-50 text-blue-600 border-blue-200/50'
                    : 'bg-green-50 text-green-600 border-green-100'
                }`}>
                  <BriefcaseBusiness size={24} />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 tracking-tight">Vacantes Activas</h3>
              </div>
              <Link href="/empleador/ofertas" className={`px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-sm justify-center sm:justify-start ${
                isPremium
                  ? 'bg-gradient-to-r from-green-50 to-blue-50 text-blue-600 hover:from-green-100 hover:to-blue-100 border border-blue-200/50'
                  : 'bg-green-50 text-green-600 hover:bg-green-100'
              }`}>
                Ver Todas <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="flex flex-col gap-6">
               <ProfileOffersList 
                 imageUrl={profile.imageUrl || profile.image_url} 
                 businessName={profile.businessName || profile.business_name}
                 isPremium={isPremium}
               />
            </div>
          </section>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-10">
           {/* Action Card */}
           {isPremium ? (
             /* Premium Action Card — gradient glassmorphic */
             <div className="relative rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(16,185,129,0.15)]">
               {/* Gradient header */}
               <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/15 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
                 <div className="absolute bottom-0 left-0 w-20 h-20 bg-green-300/20 blur-xl rounded-full translate-y-1/2 -translate-x-1/4" />
                 <div className="relative z-10 flex items-center gap-3 mb-3">
                   <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 shadow-inner">
                     <Crown size={20} className="text-yellow-300" />
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-white leading-tight">Plan {planName}</h3>
                     <p className="text-[11px] text-green-100 font-medium mt-0.5">{daysLeft} {daysLeft === 1 ? 'día restante' : 'días restantes'}</p>
                   </div>
                 </div>
                 <p className="text-sm font-medium text-white/80 relative z-10 leading-relaxed">
                   Aprovecha tus beneficios premium para encontrar al talento ideal.
                 </p>
               </div>
               {/* Benefits list */}
               <div className="bg-white/70 backdrop-blur-xl border-x border-b border-white/80 p-5 space-y-3">
                 {[
                   { icon: Sparkles, text: "Búsqueda semántica con IA" },
                   { icon: Star, text: "Mayor visibilidad" },
                   { icon: CheckCircle2, text: "Soporte prioritario" },
                 ].map((benefit, i) => (
                   <div key={i} className="flex items-center gap-3 text-sm">
                     <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center shrink-0 border border-blue-200/50">
                       <benefit.icon size={14} className="text-blue-600" />
                     </div>
                     <span className="font-medium text-gray-700">{benefit.text}</span>
                   </div>
                 ))}
               </div>
               {/* CTA */}
               <div className="bg-white/70 backdrop-blur-xl border-x border-b border-white/80 rounded-b-xl px-5 pb-5">
                 <Link 
                   href="/empleador/buscar-talento"
                   className="w-full relative overflow-hidden group flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white shadow-lg shadow-green-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
                 >
                   <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                   <Sparkles size={16} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                   <span className="relative z-10">Buscar Talento con IA</span>
                 </Link>
               </div>
             </div>
           ) : (
             /* Standard Action Card - Green Theme */
             <div className="bg-green-600 rounded-xl p-6 text-white shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
               <h3 className="text-lg font-semibold mb-4 relative z-10">Crecer con nosotros</h3>
               <p className="text-sm font-medium opacity-80 mb-6 relative z-10 leading-relaxed">
                 Publica nuevas oportunidades y conecta con el talento joven más calificado del país.
               </p>
               <div className="flex flex-col gap-3 relative z-10">
                  <Link href="/empleador/ofertas/crear" className="w-full py-4 rounded-xl bg-white text-green-600 font-bold text-xs text-center shadow-sm hover:bg-gray-50 transition-all active:scale-95 uppercase tracking-wider">
                     Publicar Nueva Vacante
                  </Link>
               </div>
             </div>
           )}

           {/* Metrics - Profile Status */}
           <div className={`rounded-xl p-6 shadow-sm ${
             isPremium
               ? 'bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
               : 'bg-white border border-gray-100'
           }`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Estado del Perfil</h3>
              <div className="flex flex-col gap-6">
                 <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                      isPremium
                        ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                        : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-600">Perfil Visible</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      isPremium
                        ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                        : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-600">Cuenta Verificada</span>
                 </div>
                 {isPremium && (
                   <div className="flex items-center gap-4">
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]"></div>
                     <span className="text-sm font-medium text-gray-600">Suscripción Premium Activa</span>
                   </div>
                 )}
                 <div className="pt-6 border-t border-gray-50">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Completitud del Perfil</p>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                       <div className={`w-[85%] h-full rounded-full ${
                         isPremium
                           ? 'bg-gradient-to-r from-green-500 to-blue-500'
                           : 'bg-green-500'
                       }`}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo;
