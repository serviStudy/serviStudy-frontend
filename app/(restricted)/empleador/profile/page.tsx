"use client"
import React, { useState, useEffect } from 'react'
import { HeaderLR } from '@/components/shared/HeaderLR'
import VerifyProfileModal from "@/components/shared/VerifyProfileModal"
import Link from 'next/link'
import { getEmployerProfile, type EmployerProfileResponse } from '@/features/profile/services/profileService'
import {
  BriefcaseBusiness, Building2, MapPin, MessageCircleMore,
  Phone, Pencil, ShieldCheck, CheckCircle2, Mail, Loader2
} from 'lucide-react'

const page = () => {
  const [isVerifyOpen, setIsVerifyOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<EmployerProfileResponse>({})
  const [email, setEmail] = useState("")

  useEffect(() => {
    setEmail(localStorage.getItem("user_email") ?? "")

    const loadProfile = async () => {
      try {
        const data = await getEmployerProfile()
        if (data) setProfile(data)
      } catch (error) {
        console.error("Error al cargar el perfil:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const inicial = (profile.businessName || profile.employerName || email).charAt(0).toUpperCase() || "E"

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-200">
        <HeaderLR />
        <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-9 bg-gray-200 pt-24 pb-12 w-full px-4 lg:px-0">
      <HeaderLR />

      <div className="flex w-full flex-col gap-6 items-center">

        {/* Banner verificación */}
        <div className="w-full max-w-[912px] flex flex-col lg:flex-row items-center justify-between rounded-[14px] bg-[#1a4b9e] p-5 shadow-sm lg:p-6 lg:px-8 gap-4">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <ShieldCheck className="h-8 w-8 text-white lg:h-12 lg:w-12 shrink-0" strokeWidth={1} />
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-white lg:text-2xl">Verifica tu perfil</h3>
              <p className="text-sm text-blue-100/90 lg:text-base">
                Adjunta tu documento para obtener la etiqueta de verificación
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVerifyOpen(true)}
            className="rounded-full bg-white text-[#1a4b9e] font-bold hover:bg-gray-100 px-8 py-2 w-full lg:w-auto"
          >
            Verificar
          </button>
        </div>

        {/* Tarjeta de perfil */}
        <div className="w-full max-w-[912px] rounded-[24px] bg-white shadow-sm overflow-hidden border border-gray-100">

          {/* Banner superior */}
          <div className="h-[120px] w-full bg-[#f4fbf3] lg:h-[160px] relative">
            <Link
              href="/empleador/profile/edit"
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
                {profile.imageUrl ? (
                  <img src={profile.imageUrl} alt="Perfil" className="h-full w-full object-cover" />
                ) : (
                  inicial
                )}
              </div>

              {/* Datos principales */}
              <div className="flex flex-col -mt-4 lg:mt-0 lg:pb-2">
                <h1 className="text-2xl font-extrabold text-[#1a4b9e] lg:text-[32px]">Empleador</h1>
                <h2 className="text-lg font-bold text-[#1a4b9e]">
                  {profile.businessName || (
                    <span className="text-gray-400 font-normal text-base italic">
                      Sin empresa —{" "}
                      <Link href="/empleador/profile/edit" className="underline">edita tu perfil</Link>
                    </span>
                  )}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                  {profile.businessAddress && (
                    <div className="flex items-center gap-1.5 min-w-fit">
                      <MapPin className="h-4 w-4 text-[#1a4b9e]" />
                      <span>{profile.businessAddress}</span>
                    </div>
                  )}
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
                    {profile.verificationStatus ? "Empleador verificado" : "Empleador no verificado"}
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
              {profile.businessSummary ? (
                <p className="text-sm leading-relaxed text-gray-500 font-medium lg:max-w-[800px]">
                  {profile.businessSummary}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  Sin descripción.{" "}
                  <Link href="/empleador/profile/edit" className="text-[#1a4b9e] underline">
                    Edita tu perfil
                  </Link>{" "}
                  para añadirla.
                </p>
              )}
            </section>

            {/* Ofertas */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
                <h3 className="text-xl font-bold text-[#1a4b9e]">Ofertas Publicadas</h3>
              </div>
              <p className="text-sm text-gray-400 italic">Aún no tienes ofertas publicadas.</p>
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

      <VerifyProfileModal
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
      />
    </div>
  )
}

export default page