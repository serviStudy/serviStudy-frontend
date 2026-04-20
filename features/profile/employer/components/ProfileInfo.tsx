import React from 'react'
import Link from 'next/link'
import {
  BriefcaseBusiness, Building2, MapPin, MessageCircleMore,
  Phone, Pencil, CheckCircle2, Mail
} from 'lucide-react'
import { type EmployerProfileResponse } from '../services/profileService'
import { ProfileVerification } from '@/components/shared/ProfileVerification'
import { ProfileOffersList } from './ProfileOffersList'

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
    <div className="flex w-full flex-col gap-6 items-center">
      {/* Banner verificación */}
      <ProfileVerification />

      {/* Tarjeta de perfil */}
      <div className="w-full max-w-[912px] rounded-[24px] bg-white shadow-sm overflow-hidden border border-gray-100">
        {/* Banner superior */}
        <div className="h-[120px] w-full bg-[#f4fbf3] lg:h-[160px] relative">
          <Link
            href="/empleador/perfil/editar"
            className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-[#2552d0] p-3 rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
          >
            <Pencil className="h-5 w-5 text-white" />
          </Link>
        </div>

        {/* Encabezado del perfil */}
        <div className="px-6 lg:px-12 -mt-16 relative pb-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-end">
            {/* Avatar */}
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-[#34c759] border-4 border-white flex items-center justify-center text-white text-[56px] font-bold shadow-sm lg:h-[136px] lg:w-[136px]">
              {(profile.imageUrl || profile.image_url) ? (
                <img src={profile.imageUrl || profile.image_url} alt="Perfil" className="h-full w-full object-cover" />
              ) : (
                inicial
              )}
            </div>

            {/* Datos principales */}
            <div className="flex flex-col -mt-4 lg:mt-0 lg:pb-2">
              <h1 className="text-2xl font-extrabold text-[#1a4b9e] lg:text-[32px]">Empleador</h1>
              <h2 className="text-lg font-bold text-[#1a4b9e]">
                {profile.businessName || profile.business_name || (
                  <span className="text-gray-400 font-normal text-base italic">
                    Sin empresa —{" "}
                    <Link href="/empleador/perfil/editar" className="underline">edita tu perfil</Link>
                  </span>
                )}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                {(profile.businessAddress || profile.business_address) && (
                  <div className="flex items-center gap-1.5 min-w-fit">
                    <MapPin className="h-4 w-4 text-[#1a4b9e]" />
                    <span>{profile.businessAddress || profile.business_address}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 min-w-fit">
                  <Mail className="h-4 w-4 text-[#1a4b9e]" />
                  <span>{email || "—"}</span>
                </div>
                {(profile.contactNumber || profile.contact_number) && (
                  <div className="flex items-center gap-1.5 min-w-fit">
                    <Phone className="h-4 w-4 text-[#1a4b9e]" />
                    <span>{profile.contactNumber || profile.contact_number}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex">
                <span className="flex items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-500 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  { (profile.verificationStatus || profile.verification_status) ? "Empleador verificado" : "Empleador no verificado"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Secciones */}
        <div className="px-6 py-8 lg:px-12 lg:py-10 flex flex-col gap-10">
          {/* Resumen */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
              <h3 className="text-xl font-bold text-[#1a4b9e]">Resumen profesional</h3>
            </div>
            {(profile.businessSummary || profile.business_summary) ? (
              <p className="text-sm leading-relaxed text-gray-500 font-medium lg:max-w-[800px]">
                {profile.businessSummary || profile.business_summary}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Sin descripción.{" "}
                <Link href="/empleador/perfil/editar" className="text-[#1a4b9e] underline">
                  Edita tu perfil
                </Link>{" "}
                para añadirla.
              </p>
            )}
          </section>

          {/* Ofertas */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <BriefcaseBusiness className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
              <h3 className="text-xl font-bold text-[#1a4b9e]">Ofertas Publicadas</h3>
            </div>
            <ProfileOffersList />
          </section>

          {/* Reseñas */}
          <section className="flex flex-col gap-4 pb-6">
            <div className="flex items-center gap-2">
              <MessageCircleMore className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
              <h3 className="text-xl font-bold text-[#1a4b9e]">Reseñas</h3>
            </div>
            <p className="text-sm text-gray-400 italic">Aún no tienes reseñas.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
