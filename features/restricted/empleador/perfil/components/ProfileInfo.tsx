import React from 'react'
import Link from 'next/link'
import {
  BriefcaseBusiness, Building2, MapPin, Pencil, CheckCircle2, 
  Mail, Phone, AlignLeft, Globe, Zap, ArrowRight
} from 'lucide-react'
import { type EmployerProfileResponse } from '../services/profileService'
import { ProfileOffersList } from './ProfileOffersList'
import { motion } from 'framer-motion'

interface ProfileInfoProps {
  profile: EmployerProfileResponse
  email: string
  inicial: string
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profile,
  email,
  inicial
}) => {
  return (
    <div className="flex w-full flex-col gap-8 pb-20">
      
      {/* 1. Hero Section (Banner & Identity) */}
      <div className="relative w-full rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
        {/* Background Banner - Green Gradient */}
        <div className="h-[200px] lg:h-[280px] w-full bg-gradient-to-br from-green-900 via-green-700 to-green-500 relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Action Buttons in Banner */}
          <div className="absolute top-5 right-5 sm:top-8 sm:right-10 flex gap-4">
             <Link
              href="/empleador/perfil/editar"
              className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-white text-green-700 font-bold text-[10px] sm:text-xs flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-all active:scale-95"
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
              <div className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-lg bg-white p-5 sm:p-6 shadow-sm border border-gray-100 flex items-center justify-center">
                {(profile.imageUrl || profile.image_url) ? (
                  <img src={profile.imageUrl || profile.image_url} alt="Logo" className="h-full w-full object-contain" />
                ) : (
                  <span className="text-[60px] sm:text-[80px] lg:text-[100px] font-black text-green-700/10">
                    {inicial}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 p-2.5 rounded-md shadow-sm border-4 border-white">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center lg:text-left lg:pb-6 min-w-0">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4 mb-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight truncate">
                  {profile.businessName || profile.business_name || "Nombre de Empresa"}
                </h1>
                <span className="w-fit mx-auto lg:mx-0 px-3 py-1 rounded-lg bg-green-50 text-green-600 text-xs font-medium uppercase tracking-wider border border-green-100">
                  Empresa Verificada
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

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column (Core Details) */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[
               { label: "Correo Electrónico", value: email || "No disponible", icon: Mail, color: "text-green-600 bg-green-50" },
               { label: "Teléfono", value: profile.contactNumber || profile.contact_number || "No disponible", icon: Phone, color: "text-green-600 bg-green-50" },
               { label: "Dirección", value: profile.businessAddress || profile.business_address || "No disponible", icon: MapPin, color: "text-green-600 bg-green-50" },
             ].map((item) => (
               <div key={item.label} className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon size={20} />
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 break-words">{item.value}</p>
               </div>
             ))}
          </div>

          {/* About Section */}
          <section className="bg-white rounded-xl p-6 lg:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                <AlignLeft size={24} />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 tracking-tight">Sobre nosotros</h3>
            </div>
            
            <p className="text-base text-gray-500 leading-relaxed">
              {profile.businessSummary || profile.business_summary || "Esta empresa aún no ha añadido una descripción sobre su visión y valores."}
            </p>
          </section>

          {/* Vacancies Section */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                  <BriefcaseBusiness size={24} />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 tracking-tight">Vacantes Activas</h3>
              </div>
              <Link href="/empleador/ofertas" className="px-6 py-3 rounded-xl bg-green-50 text-green-600 font-bold text-xs hover:bg-green-100 transition-all flex items-center gap-2 shadow-sm">
                Ver Todas <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="flex flex-col gap-6">
               <ProfileOffersList 
                 imageUrl={profile.imageUrl || profile.image_url} 
                 businessName={profile.businessName || profile.business_name}
               />
            </div>
          </section>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-10">
           {/* Action Card - Green Theme */}
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

           {/* Metrics - Simplified and premium */}
           <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Estado del Perfil</h3>
              <div className="flex flex-col gap-6">
                 <div className="flex items-center gap-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-sm font-medium text-gray-600">Perfil Visible</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]"></div>
                    <span className="text-sm font-medium text-gray-600">Cuenta Verificada</span>
                 </div>
                 <div className="pt-6 border-t border-gray-50">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Completitud del Perfil</p>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                       <div className="w-[85%] h-full bg-green-500 rounded-full"></div>
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
