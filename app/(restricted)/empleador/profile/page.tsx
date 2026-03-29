"use client"

import React, { useState, useEffect } from 'react'
import { HeaderLR } from '@/components/shared/HeaderLR'
// Manteniendo las importaciones originales si estaban
import { ProfileVerification } from '@/components/shared/ProfileVerification'
import { VerifiedUser } from '@/components/shared/VerifiedUser'
import VerifyProfileModal from "@/components/shared/VerifyProfileModal"
import Link from 'next/link'

import {
  AtSign,
  BriefcaseBusiness,
  Building2,
  MapPin,
  MessageCircleMore,
  Phone,
  SquarePen,
  Star,
  Trash2,
  UserRound,
  Pencil,
  ShieldCheck,
  CheckCircle2,
  Mail,
  CircleDollarSign
} from 'lucide-react'

// Mock Data local o estados originales que el usuario necesite
const MOCK_JOBS = [
  {
    title: "Recepcionista nocturno",
    isActive: true,
    location: "portal del quindio",
    salary: "$ 1.600.000"
  },
  {
    title: "Programador Front",
    isActive: false,
    location: "portal del quindio",
    salary: "$ 1.600.000"
  }
]

const MOCK_REVIEWS = [
  {
    name: "Usuario",
    date: "10/8/2025",
    content: "Gran ambiente de trabajo y flexibilidad horaria absoluta.",
    rating: 4
  },
  {
    name: "Usuario",
    date: "7/9/2025",
    content: "Gran ambiente de trabajo y flexibilidad horaria absoluta.",
    rating: 4
  }
]

const page = () => {
  const [isVerifyOpen, setIsVerifyOpen] = useState(false)

  const [nombre, setNombre] = useState('Carlos Guerra Morales')
  const [telefono, setTelefono] = useState('315-887-9086')
  const [empresa, setEmpresa] = useState('Tech Solutions')
  const [direccion, setDireccion] = useState('Plaza de bolívar')
  const [descripcion, setDescripcion] = useState('Tech Solutions es una empresa dedicada al desarrollo e implementación de soluciones tecnológicas innovadoras, orientadas a optimizar procesos y mejorar la eficiencia de organizaciones de diferentes sectores. Se caracteriza por su enfoque en la calidad, el uso de tecnologías modernas y el trabajo colaborativo, ofreciendo un entorno dinámico que promueve el crecimiento profesional y el aprendizaje continuo.')

  useEffect(() => {
    // Load from localStorage if available
    const savedData = localStorage.getItem('employer_profile')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        if (parsedData.nombre) setNombre(parsedData.nombre)
        if (parsedData.telefono) setTelefono(parsedData.telefono)
        if (parsedData.empresa) setEmpresa(parsedData.empresa)
        if (parsedData.direccion) setDireccion(parsedData.direccion)
        if (parsedData.descripcion) setDescripcion(parsedData.descripcion)
      } catch (error) {
        console.error('Error parsing employer profile data:', error)
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center gap-9 bg-gray-200 pt-24 pb-12 w-full px-4 lg:px-0">
      <HeaderLR />

      <div className="flex w-full flex-col gap-6 items-center">

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


        <div className="w-full max-w-[912px] rounded-[24px] bg-white shadow-sm overflow-hidden border border-gray-100">

          <div className="h-[120px] w-full bg-[#f4fbf3] lg:h-[160px] relative">
            <Link
              href="/empleador/profile/edit"
              className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-[#2552d0] p-3 rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
            >
              <Pencil className="h-5 w-5 text-white" />
            </Link>
          </div>


          <div className="px-6 lg:px-12 -mt-16 relative pb-10">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-end">

              <div className="h-28 w-28 shrink-0 rounded-full bg-[#34c759] border-4 border-white flex items-center justify-center text-white text-[56px] font-bold shadow-sm lg:h-[136px] lg:w-[136px]">
                {empresa.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col -mt-4 lg:mt-0 lg:pb-2">
                <h1 className="text-2xl font-extrabold text-[#1a4b9e] lg:text-[32px]">Empleador</h1>
                <h2 className="text-lg font-bold text-[#1a4b9e]">{empresa}</h2>

                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5 min-w-fit">
                    <MapPin className="h-4 w-4 text-[#1a4b9e]" />
                    <span>{direccion}</span>
                  </div>
                  <div className="flex items-center gap-1.5 min-w-fit">
                    <Mail className="h-4 w-4 text-[#1a4b9e]" />
                    <span>Ejemplo@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-1.5 min-w-fit">
                    <Phone className="h-4 w-4 text-[#1a4b9e]" />
                    <span>{telefono}</span>
                  </div>
                </div>

                <div className="mt-4 flex">
                  <span className="flex items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-500 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Empleador no verificado
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />


          <div className="px-6 py-8 lg:px-12 lg:py-10 flex flex-col gap-10">


            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
                <h3 className="text-xl font-bold text-[#1a4b9e]">Resumen profesional</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 font-medium lg:max-w-[800px]">
                {descripcion}
              </p>
            </section>


            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
                <h3 className="text-xl font-bold text-[#1a4b9e]">Ofertas Publicadas</h3>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 lg:max-w-[700px]">
                {MOCK_JOBS.map((job, idx) => (
                  <div key={idx} className="flex w-full min-w-[270px] flex-col gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex gap-3">
                      <div className="h-12 w-12 shrink-0 rounded-md bg-gray-400" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="line-clamp-2 text-sm font-bold leading-tight text-blue-900 lg:text-base">
                            {job.title}
                          </h5>
                          <div className="flex items-center gap-2">
                            <button className="text-gray-600 transition-colors hover:text-blue-600"><Pencil className="h-4 w-4" /></button>
                            <button className="text-red-500 transition-colors hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-end">
                          {job.isActive ? (
                            <span className="flex items-center gap-1 rounded-full border border-green-500 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                              Activa <span className="h-2 w-4 rounded-full bg-green-500"></span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 rounded-full border border-orange-500 bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-500">
                              <span className="h-2 w-4 rounded-full bg-white border border-gray-300"></span> Desactivada
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span className="truncate">{job.location}</span></div>
                      <div className="flex items-center gap-1 font-medium"><CircleDollarSign className="h-4 w-4" /><span>{job.salary}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-4 pb-6">
              <div className="flex items-center gap-2">
                <MessageCircleMore className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
                <h3 className="text-xl font-bold text-[#1a4b9e]">Reseñas</h3>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 lg:max-w-[700px]">
                {MOCK_REVIEWS.map((review, idx) => (
                  <div key={idx} className="flex w-full min-w-[300px] flex-col gap-3 rounded-xl border border-gray-300 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 p-2">
                        <UserRound className="h-5 w-5" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-center justify-between">
                          <h6 className="text-sm font-bold text-blue-900">{review.name}</h6>
                          <span className="text-xs text-blue-800 font-semibold">{review.date}</span>
                        </div>
                        <p className="mt-2 text-xs italic text-gray-600 leading-snug">"{review.content}"</p>
                        <div className="mt-3 flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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