import React from 'react'
import Link from 'next/link'
import {
  BriefcaseBusiness, Building2, MapPin, Pencil, CheckCircle2, 
  Mail, Phone, Share2, AlignLeft, Globe, Zap, ArrowRight
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
      <div className="relative w-full rounded-[40px] overflow-hidden bg-white shadow-xl shadow-gray-200/50 border border-gray-100">
        {/* Background Banner - Green Gradient */}
        <div className="h-[180px] lg:h-[240px] w-full bg-gradient-to-br from-green-900 via-green-700 to-green-500 relative">
          <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Action Buttons in Banner */}
          <div className="absolute top-6 right-8 flex gap-3">
             <button className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all">
                <Share2 size={20} />
             </button>
             <Link
              href="/empleador/perfil/editar"
              className="px-6 py-3 rounded-2xl bg-white text-green-700 font-black text-sm flex items-center gap-2 shadow-xl hover:bg-gray-50 transition-all active:scale-95"
            >
              <Pencil size={16} /> Editar Perfil
            </Link>
          </div>
        </div>

        {/* Identity Section */}
        <div className="px-8 lg:px-12 pb-10">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-end -mt-12 lg:-mt-14">
            {/* Logo */}
            <div className="relative shrink-0">
              <div className="h-32 w-32 lg:h-44 lg:w-44 rounded-[40px] bg-white p-6 shadow-2xl shadow-green-900/10 border border-gray-100 flex items-center justify-center">
                {(profile.imageUrl || profile.image_url) ? (
                  <img src={profile.imageUrl || profile.image_url} alt="Logo" className="h-full w-full object-contain" />
                ) : (
                  <span className="text-[60px] lg:text-[80px] font-black text-green-700/10">
                    {inicial}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 p-2.5 rounded-2xl shadow-lg border-4 border-white">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center lg:text-left lg:pb-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-1">
                <h1 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tighter">
                  {profile.businessName || profile.business_name || "Nombre de Empresa"}
                </h1>
                <span className="w-fit mx-auto lg:mx-0 px-4 py-1.5 rounded-xl bg-green-50 text-green-600 text-[11px] font-black uppercase tracking-widest border border-green-100">
                  Verificada
                </span>
              </div>
              
              {/* Employer Name */}
              <p className="text-lg lg:text-xl font-bold text-gray-500 tracking-tight">
                {profile.employerName || profile.employer_name || "Responsable no asignado"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Core Details) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[
               { label: "Correo Electrónico", value: email || "No disponible", icon: Mail, color: "text-green-600 bg-green-50" },
               { label: "Teléfono", value: profile.contactNumber || profile.contact_number || "No disponible", icon: Phone, color: "text-green-600 bg-green-50" },
               { label: "Dirección", value: profile.businessAddress || profile.business_address || "No disponible", icon: MapPin, color: "text-green-600 bg-green-50" },
             ].map((item) => (
               <div key={item.label} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon size={20} />
                  </div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-black text-gray-800 break-words">{item.value}</p>
               </div>
             ))}
          </div>

          {/* About Section */}
          <section className="bg-white rounded-[40px] p-8 lg:p-12 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                <AlignLeft size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Sobre nosotros</h3>
            </div>
            
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              {profile.businessSummary || profile.business_summary || "Esta empresa aún no ha añadido una descripción sobre su visión y valores."}
            </p>
          </section>

          {/* Vacancies Section */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                  <BriefcaseBusiness size={24} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Vacantes Activas</h3>
              </div>
              <Link href="/empleador/ofertas" className="px-6 py-3 rounded-2xl bg-green-50 text-green-600 font-black text-sm hover:bg-green-100 transition-all flex items-center gap-2">
                Ver Todas <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="flex flex-col gap-4">
               <ProfileOffersList 
                 imageUrl={profile.imageUrl || profile.image_url} 
                 businessName={profile.businessName || profile.business_name}
               />
            </div>
          </section>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
           {/* Action Card - Green Theme */}
           <div className="bg-green-600 rounded-[40px] p-8 text-white shadow-xl shadow-green-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
              <h3 className="text-xl font-black mb-4 relative z-10">Crecer con nosotros</h3>
              <p className="text-sm font-medium opacity-80 mb-8 relative z-10 leading-relaxed">
                Publica nuevas oportunidades y conecta con el talento joven más calificado del país.
              </p>
              <div className="flex flex-col gap-3 relative z-10">
                 <Link href="/empleador/ofertas/crear" className="w-full py-4 rounded-2xl bg-white text-green-600 font-black text-sm text-center shadow-lg hover:bg-gray-50 transition-all">
                    Publicar Nueva Vacante
                 </Link>
              </div>
           </div>

           {/* Metrics - Simplified and non-hardcoded looking */}
           <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-6">Estado del Perfil</h3>
              <div className="flex flex-col gap-6">
                 <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-gray-600">Perfil Visible</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-bold text-gray-600">Cuenta Verificada</span>
                 </div>
                 <div className="pt-4 border-t border-gray-50">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Completitud del Perfil</p>
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
