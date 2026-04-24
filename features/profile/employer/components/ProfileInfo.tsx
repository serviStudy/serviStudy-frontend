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
      <div className="relative w-full rounded-[40px] overflow-hidden bg-white shadow-2xl shadow-gray-200/50 border border-gray-100">
        {/* Background Banner - Green Gradient */}
        <div className="h-[200px] lg:h-[280px] w-full bg-gradient-to-br from-green-900 via-green-700 to-green-500 relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Action Buttons in Banner */}
          <div className="absolute top-8 right-10 flex gap-4">
             <button className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl">
                <Share2 size={22} />
             </button>
             <Link
              href="/empleador/perfil/editar"
              className="px-8 py-4 rounded-2xl bg-white text-green-700 font-black text-sm flex items-center gap-2 shadow-2xl hover:bg-gray-50 transition-all active:scale-95"
            >
              <Pencil size={18} /> Editar Perfil
            </Link>
          </div>
        </div>

        {/* Identity Section */}
        <div className="px-10 lg:px-16 pb-12">
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-end -mt-16 lg:-mt-20">
            {/* Logo */}
            <div className="relative shrink-0">
              <div className="h-40 w-40 lg:h-52 lg:w-52 rounded-[48px] bg-white p-8 shadow-2xl shadow-green-900/20 border border-gray-100 flex items-center justify-center">
                {(profile.imageUrl || profile.image_url) ? (
                  <img src={profile.imageUrl || profile.image_url} alt="Logo" className="h-full w-full object-contain" />
                ) : (
                  <span className="text-[80px] lg:text-[100px] font-black text-green-700/10">
                    {inicial}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-3 -right-3 bg-green-500 p-3 rounded-2xl shadow-xl border-4 border-white">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center lg:text-left lg:pb-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-2">
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tighter">
                  {profile.businessName || profile.business_name || "Nombre de Empresa"}
                </h1>
                <span className="w-fit mx-auto lg:mx-0 px-5 py-2 rounded-2xl bg-green-50 text-green-600 text-[12px] font-black uppercase tracking-widest border border-green-100">
                  Empresa Verificada
                </span>
              </div>
              
              {/* Employer Name */}
              <p className="text-xl lg:text-2xl font-bold text-gray-400 tracking-tight">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
             {[
               { label: "Correo Electrónico", value: email || "No disponible", icon: Mail, color: "text-green-600 bg-green-50" },
               { label: "Teléfono", value: profile.contactNumber || profile.contact_number || "No disponible", icon: Phone, color: "text-green-600 bg-green-50" },
               { label: "Dirección", value: profile.businessAddress || profile.business_address || "No disponible", icon: MapPin, color: "text-green-600 bg-green-50" },
             ].map((item) => (
               <div key={item.label} className="bg-white p-8 rounded-[36px] border border-gray-100 shadow-xl shadow-gray-200/30">
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-6 shadow-inner`}>
                    <item.icon size={24} />
                  </div>
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-2">{item.label}</p>
                  <p className="text-base font-black text-gray-800 break-words">{item.value}</p>
               </div>
             ))}
          </div>

          {/* About Section */}
          <section className="bg-white rounded-[48px] p-10 lg:p-16 border border-gray-100 shadow-xl shadow-gray-200/30">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100 shadow-inner">
                <AlignLeft size={28} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">Sobre nosotros</h3>
            </div>
            
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              {profile.businessSummary || profile.business_summary || "Esta empresa aún no ha añadido una descripción sobre su visión y valores."}
            </p>
          </section>

          {/* Vacancies Section */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100 shadow-inner">
                  <BriefcaseBusiness size={28} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Vacantes Activas</h3>
              </div>
              <Link href="/empleador/ofertas" className="px-8 py-4 rounded-2xl bg-green-50 text-green-600 font-black text-sm hover:bg-green-100 transition-all flex items-center gap-2 shadow-sm">
                Ver Todas <ArrowRight size={20} />
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
           <div className="bg-green-600 rounded-[48px] p-10 text-white shadow-2xl shadow-green-900/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
              <h3 className="text-2xl font-black mb-6 relative z-10">Crecer con nosotros</h3>
              <p className="text-base font-medium opacity-80 mb-10 relative z-10 leading-relaxed">
                Publica nuevas oportunidades y conecta con el talento joven más calificado del país.
              </p>
              <div className="flex flex-col gap-4 relative z-10">
                 <Link href="/empleador/ofertas/crear" className="w-full py-5 rounded-2xl bg-white text-green-600 font-black text-sm text-center shadow-2xl hover:bg-gray-50 transition-all active:scale-95">
                    Publicar Nueva Vacante
                 </Link>
              </div>
           </div>

           {/* Metrics - Simplified and premium */}
           <div className="bg-white rounded-[48px] p-10 border border-gray-100 shadow-xl shadow-gray-200/30">
              <h3 className="text-xl font-black text-gray-900 mb-8">Estado del Perfil</h3>
              <div className="flex flex-col gap-8">
                 <div className="flex items-center gap-5">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-base font-bold text-gray-600">Perfil Visible</span>
                 </div>
                 <div className="flex items-center gap-5">
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
                    <span className="text-base font-bold text-gray-600">Cuenta Verificada</span>
                 </div>
                 <div className="pt-8 border-t border-gray-50">
                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-4">Completitud del Perfil</p>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                       <div className="w-[85%] h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
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
