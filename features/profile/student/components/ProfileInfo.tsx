import React, { useState } from 'react'
import Link from 'next/link'
import {
  User, Pencil, CheckCircle2, Mail, Phone, Zap, Clock, Calendar, Users
} from 'lucide-react'
import { type StudentProfileResponse } from '../services/studentProfileService'
import { ProfileVerification } from '@/components/shared/ProfileVerification'
import { Reviews } from '@/components/shared/Reviews'
import { routes } from '@/type/routes'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ProfileInfoProps {
  profile: StudentProfileResponse
  email: string
  inicial: string
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profile,
  email,
  inicial
}) => {
  const [isDaysModalOpen, setIsDaysModalOpen] = useState(false)
  const workDays = profile.workDays || [];
  const normalizedDays = workDays.map(d => d.trim().toUpperCase());
  
  const isEntreSemana = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"].every(d => normalizedDays.includes(d)) && normalizedDays.length === 5;
  const isFinesDeSemana = ["SATURDAY", "SUNDAY"].every(d => normalizedDays.includes(d)) && normalizedDays.length === 2;
  const isEspecificos = normalizedDays.length > 0 && !isEntreSemana && !isFinesDeSemana;

  return (
    <div className="flex w-full flex-col gap-6 items-center">
      <ProfileVerification />

      <div className="w-full max-w-[912px] rounded-[24px] bg-white shadow-sm overflow-hidden border border-gray-100">
        <div className="h-[120px] w-full bg-[#f4fbf3] lg:h-[160px] relative">
          <Link
            href="/estudiante/profile/editProfile"
            className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-[#2552d0] p-3 rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
          >
            <Pencil className="h-5 w-5 text-white" />
          </Link>
        </div>

        <div className="px-6 lg:px-12 -mt-16 relative pb-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-end">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-[#2552d0] border-4 border-white flex items-center justify-center text-white text-[56px] font-bold shadow-sm lg:h-[136px] lg:w-[136px]">
              {profile.imgUrl ? (
                <img src={profile.imgUrl} alt="Perfil" className="h-full w-full object-cover" />
              ) : (
                inicial
              )}
            </div>

            <div className="flex flex-col -mt-4 lg:mt-0 lg:pb-2">
              <h1 className="text-2xl font-extrabold text-[#1a4b9e] lg:text-[32px]">Estudiante</h1>
              <h2 className="text-lg font-bold text-[#1a4b9e]">
                {profile.name || (
                  <span className="text-gray-400 font-normal text-base italic">
                    Sin nombre — <Link href="/estudiante/profile/editProfile" className="underline">edita tu perfil</Link>
                  </span>
                )}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1.5 min-w-fit">
                  <Mail className="h-4 w-4 text-[#1a4b9e]" />
                  <span>{email || "—"}</span>
                </div>
                {profile.contactNumber && (
                  <div className="flex items-center gap-1.5 min-w-fit">
                    <Phone className="h-4 w-4 text-[#1a4b9e]" />
                    <span>{profile.contactNumber}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex">
                <span className="flex items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-500 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {profile.verifyStatus ? "Estudiante verificado" : "Estudiante no verificado"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="px-6 py-8 lg:px-12 lg:py-10 flex flex-col gap-10">
          {/* Resumen Profesional */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
              <h3 className="text-xl font-bold text-[#1a4b9e]">Resumen profesional</h3>
            </div>
            {profile.description ? (
              <p className="text-sm leading-relaxed text-gray-500 font-medium lg:max-w-[800px]">
                {profile.description}
              </p>
            ) : (
             <p className="text-sm text-gray-400 italic">
               Sin resumen profesional añadido.
             </p>
            )}
          </section>

          {/* Cualidades */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
              <h3 className="text-xl font-bold text-[#1a4b9e]">Cualidades</h3>
            </div>
            {profile.studentSkills && profile.studentSkills.length > 0 ? (
               <div className="flex flex-wrap gap-2">
                 {profile.studentSkills.map((s, idx) => (
                   <span key={idx} className="bg-[#d2e3ff] text-blue-900 rounded-full px-4 py-1 text-sm font-medium">
                     {s.skillName}
                   </span>
                 ))}
               </div>
            ) : (
               <p className="text-sm text-gray-400 italic">Aún no has añadido cualidades.</p>
            )}
          </section>

          {/* Días y Jornada */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
             <section className="flex flex-col gap-4 flex-1">
               <div className="flex items-center gap-2">
                 <Clock className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
                 <h3 className="text-xl font-bold text-[#1a4b9e]">Días laborales</h3>
               </div>
                {normalizedDays.length > 0 ? (
                 <div className="flex flex-wrap gap-2">
                   {isEntreSemana && (
                     <span className="border border-gray-300 text-gray-600 rounded-full px-4 py-1 text-sm font-medium">Entre semana</span>
                   )}
                   {isFinesDeSemana && (
                     <span className="border border-gray-300 text-gray-600 rounded-full px-4 py-1 text-sm font-medium">Fines de semana</span>
                   )}
                   {isEspecificos && (
                     <button
                       type="button"
                       onClick={() => setIsDaysModalOpen(true)}
                       className="bg-[#d2e3ff] border border-[#2552d0] text-[#1a4b9e] rounded-full px-4 py-1 text-sm font-bold hover:bg-[#c1d6fb] transition-colors"
                     >
                       Flexible (ver días)
                     </button>
                   )}
                 </div>
               ) : (
                 <p className="text-sm text-gray-400 italic">No especificado.</p>
               )}
             </section>

             <section className="flex flex-col gap-4 flex-1">
               <div className="flex items-center gap-2">
                 <Calendar className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
                 <h3 className="text-xl font-bold text-[#1a4b9e]">Jornada</h3>
               </div>
               {profile.workSchedule ? (
                 <div className="flex flex-wrap gap-2">
                     <span className="border border-gray-300 text-gray-600 rounded-full px-4 py-1 text-sm font-medium">
                       {{
                         FULL_TIME: 'Jornada completa',
                         PART_TIME: 'Media jornada',
                         FLEXIBLE: 'Flexible'
                       }[profile.workSchedule] || profile.workSchedule}
                     </span>
                 </div>
               ) : (
                 <p className="text-sm text-gray-400 italic">No especificado.</p>
               )}
             </section>
          </div>

          {/* Reseñas */}
          <section className="flex flex-col gap-4 pb-6 mt-4">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
              <h3 className="text-xl font-bold text-[#1a4b9e]">Reseñas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Reviews />
                <Reviews />
            </div>
          </section>
        </div>
      </div>

      <Dialog open={isDaysModalOpen} onOpenChange={setIsDaysModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#1a4b9e]">Días laborales</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 mt-4">
            {normalizedDays.map((d, idx) => {
              const translatedDay = {
                MONDAY: 'Lunes',
                TUESDAY: 'Martes',
                WEDNESDAY: 'Miércoles',
                THURSDAY: 'Jueves',
                FRIDAY: 'Viernes',
                SATURDAY: 'Sábado',
                SUNDAY: 'Domingo'
              }[d] || d;
              return (
                <span key={idx} className="bg-[#2552d0] text-white rounded-lg px-4 py-2 text-sm font-medium">
                  {translatedDay}
                </span>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
