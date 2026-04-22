import React from 'react'
import Link from 'next/link'
import {
  BriefcaseBusiness, Building2, MapPin, MessageCircleMore,
  Phone, Pencil, CheckCircle2, Mail, Briefcase
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
    <div className="flex w-full flex-col gap-10 items-center">
      {/* Main Profile Card - Premium Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl rounded-[40px] bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] relative"
      >
        
        {/* Glow Effect Layer */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-100/20 blur-[80px] rounded-full pointer-events-none" />

        {/* Modern Pastel Green Banner */}
        <div className="h-[150px] w-full bg-gradient-to-r from-[#dcedc1] via-[#a8e6cf] to-[#81c784] lg:h-[200px] relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-15"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent"></div>
          <Link
            href="/empleador/perfil/editar"
            className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-white/90 backdrop-blur-md p-3 rounded-2xl hover:bg-white transition-all shadow-lg hover:shadow-xl group active:scale-95 z-20 border border-white/50"
          >
            <Pencil className="h-5 w-5 text-[#1a3683] group-hover:rotate-12 transition-transform" />
          </Link>
        </div>

        {/* Header Content Area */}
        <div className="px-6 lg:px-12 -mt-20 relative pb-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-end">
            
            {/* Elevated Avatar */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative shrink-0 group"
            >
              <div className="h-32 w-32 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white to-gray-50 border-[8px] border-white flex items-center justify-center shadow-[0_15px_35px_-5px_rgba(0,0,0,0.12)] lg:h-44 lg:w-44 transition-all duration-500 group-hover:shadow-[0_20px_45px_-8px_rgba(0,0,0,0.15)]">
                {(profile.imageUrl || profile.image_url) ? (
                  <img src={profile.imageUrl || profile.image_url} alt="Perfil" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-[64px] lg:text-[80px] font-black text-[#a8e6cf] drop-shadow-sm select-none">
                    {inicial}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-2.5 rounded-2xl shadow-lg border border-gray-50 hidden lg:block">
                <div className="bg-[#a8e6cf]/20 p-2 rounded-xl">
                  <CheckCircle2 className="h-5 w-5 text-[#2d5a3a]" />
                </div>
              </div>
            </motion.div>

            {/* Profile Essential Info */}
            <div className="flex flex-col flex-1 lg:pb-6 lg:mb-1">
              <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                <h1 className="text-3xl font-black text-[#1a3683] tracking-tight lg:text-[42px] leading-tight">
                  {profile.employerName || profile.employer_name || "Empleador"}
                </h1>
                <div className="flex items-center gap-2 rounded-2xl bg-blue-50/80 backdrop-blur-sm px-4 py-1.5 text-[11px] text-[#1a4b9e] font-bold uppercase tracking-widest border border-blue-100 shadow-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  { (profile.verificationStatus || profile.verification_status) ? "Verificado" : "Sin Verificar"}
                </div>
              </div>
              
              <div className="flex items-center gap-2.5 mt-2 transition-all hover:translate-x-1">
                <div className="bg-blue-50 p-1.5 rounded-lg border border-blue-100/50">
                  <Building2 className="h-5 w-5 text-[#1a4b9e]" />
                </div>
                <h2 className="text-xl font-bold text-[#1a4b9e]/80">
                  {profile.businessName || profile.business_name || (
                    <span className="text-gray-300 font-medium italic">Sin empresa vinculada</span>
                  )}
                </h2>
              </div>

              {/* Contact Information Row */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {(profile.businessAddress || profile.business_address) && (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-4 rounded-[22px] bg-white/50 backdrop-blur-sm shadow-sm border border-transparent hover:border-blue-100 transition-all duration-300 group/item cursor-default"
                  >
                    <div className="p-3 rounded-xl bg-white shadow-sm text-[#1a4b9e] group-hover/item:bg-blue-50 transition-all duration-300">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="text-[14px] text-gray-600 font-bold truncate group-hover/item:text-[#1a4b9e] transition-colors">
                      {profile.businessAddress || profile.business_address}
                    </span>
                  </motion.div>
                )}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-4 rounded-[22px] bg-white/50 backdrop-blur-sm shadow-sm border border-transparent hover:border-blue-100 transition-all duration-300 group/item cursor-default"
                >
                  <div className="p-3 rounded-xl bg-white shadow-sm text-[#1a4b9e] group-hover/item:bg-blue-50 transition-all duration-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-[14px] text-gray-600 font-bold truncate group-hover/item:text-[#1a4b9e] transition-colors">
                    {email || "—"}
                  </span>
                </motion.div>
                {(profile.contactNumber || profile.contact_number) && (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-4 rounded-[22px] bg-white/50 backdrop-blur-sm shadow-sm border border-transparent hover:border-blue-100 transition-all duration-300 group/item cursor-default"
                  >
                    <div className="p-3 rounded-xl bg-white shadow-sm text-[#1a4b9e] group-hover/item:bg-blue-50 transition-all duration-300">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span className="text-[14px] text-gray-600 font-bold group-hover/item:text-[#1a4b9e] transition-colors">
                      {profile.contactNumber || profile.contact_number}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="mx-6 lg:mx-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-blue-100/50"></div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
        </div>

        {/* Content Sections */}
        <div className="px-6 py-10 lg:px-12 lg:py-12 flex flex-col gap-12">
          
          {/* Business Summary */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 shadow-sm border border-blue-100/50">
                <Briefcase className="h-6 w-6 text-[#1a4b9e]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1a3683]">Sobre la empresa</h3>
                <div className="h-1 w-12 bg-blue-100 rounded-full mt-1"></div>
              </div>
            </div>
            
            <div className="relative group p-6 rounded-[32px] bg-gray-50/30 border border-transparent hover:border-blue-50 transition-all">
              {(profile.businessSummary || profile.business_summary) ? (
                <p className="text-lg lg:text-xl lg:leading-[1.6] text-gray-600 font-medium lg:max-w-[95%] relative z-10">
                  {profile.businessSummary || profile.business_summary}
                </p>
              ) : (
                <div className="py-2">
                  <p className="text-gray-400 italic mb-4">Aún no has añadido un resumen profesional.</p>
                  <Link href="/empleador/perfil/editar" className="inline-flex items-center gap-2 text-[#1a4b9e] font-bold bg-blue-50 px-5 py-2 rounded-2xl hover:bg-blue-100 transition-all">
                    Completar perfil <Pencil size={16} />
                  </Link>
                </div>
              )}
            </div>
          </motion.section>

          {/* Job Offers */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-[22px] bg-green-50 shadow-sm border border-green-100/50">
                <BriefcaseBusiness className="h-6 w-6 text-[#34c759]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1a3683]">Vacantes publicadas</h3>
                <div className="h-1 w-12 bg-green-100 rounded-full mt-1"></div>
              </div>
            </div>
            <div className="animate-in slide-in-from-bottom-6 duration-1000">
              <ProfileOffersList 
                imageUrl={profile.imageUrl || profile.image_url} 
                businessName={profile.businessName || profile.business_name}
              />
            </div>
          </motion.section>

          {/* Reviews Area */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8 mb-4"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-[22px] bg-orange-50 shadow-sm border border-orange-100/50">
                <MessageCircleMore className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1a3683]">Reseñas y reputación</h3>
                <div className="h-1 w-12 bg-orange-100 rounded-full mt-1"></div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center py-16 group bg-gray-50/30 rounded-[40px] border border-dashed border-gray-200 transition-all hover:bg-orange-50/10">
              <div className="bg-white p-6 rounded-[30px] shadow-sm mb-6 group-hover:scale-110 transition-transform border border-gray-100">
                <MessageCircleMore className="h-10 w-10 text-gray-300" />
              </div>
              <p className="text-xl text-gray-400 font-bold mb-2">Tu perfil es nuevo</p>
              <p className="text-lg text-gray-300 font-medium italic">Aún no has recibido valoraciones o comentarios.</p>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfileInfo;
