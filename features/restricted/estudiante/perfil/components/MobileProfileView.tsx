"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Briefcase, Calendar, SquarePen, MapPin, CircleDollarSign, FileText, Star, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Tag } from './ui/Tag'

interface Props {
    profile: any;
    email: string;
    inicial: string;
    postulaciones: any[];
    loadingPosts: boolean;
    normalizedDays: string[];
    isEntreSemana: boolean;
    isFinesDeSemana: boolean;
    isEspecificos: boolean;
    scheduleLabel: string | null;
    onOpenDaysModal: () => void;
    variants: any;
    isPremium?: boolean;
    receivedLikesCount?: number;
}

export const MobileProfileView = ({ 
    profile, 
    email, 
    inicial, 
    postulaciones, 
    loadingPosts,
    normalizedDays,
    isEntreSemana,
    isFinesDeSemana,
    isEspecificos,
    scheduleLabel,
    onOpenDaysModal,
    variants,
    isPremium,
    receivedLikesCount
}: Props) => {
    return (
        <div className="flex flex-col gap-3 pb-8 w-[92vw]">
            {/* Header */}
            <motion.div variants={variants} className="rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className={`w-full relative px-4 pt-4 pb-5 ${
                    isPremium 
                        ? "bg-linear-to-r from-[#00d15a] via-[#0088ff] to-[#004ee0]" 
                        : "bg-linear-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#3b82f6]"
                }`}>
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>

                    <div className='flex gap-4 relative z-10'>
                        <div className="h-20 w-20 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {profile.imgUrl ? (
                                <Image src={profile.imgUrl} alt="Perfil" width={80} height={80} className="h-full w-full object-cover rounded-full" />
                            ) : (
                                inicial
                            )}
                        </div>
                        <div className="min-w-0 flex-1 pt-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-4.5 font-bold text-blue-50 leading-tight capitalize">
                                    {profile.name || "Tu Nombre"}
                                </h1>
                                {typeof receivedLikesCount === 'number' && receivedLikesCount > 0 && (
                                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold border border-white/25 shrink-0">
                                        ❤️ {receivedLikesCount}
                                    </span>
                                )}
                            </div>
                            <div className="mt-2 grid grid-cols-1 gap-2 w-full text-left">
                                <div className="flex items-center gap-2.5 text-gray-50">
                                    <Mail className="h-4 w-4" />
                                    <span className="text-sm truncate font-medium">{email || "Sin correo"}</span>
                                </div>
                                {profile.contactNumber && (
                                    <div className="flex items-center gap-2.5 text-gray-50">
                                        <Phone className="h-4 w-4" />
                                        <span className="text-sm font-medium">{profile.contactNumber}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/estudiante/perfil/editar-perfil"                
                        className="mt-4 relative z-10 flex w-full items-center justify-center gap-2 bg-white rounded-xl text-blue-900 py-2.5 text-base font-semibold border border-white/10 shadow-md"
                    >
                        <SquarePen className="h-4.5 w-4.5" />
                        Editar perfil
                    </Link>
                </div>
            </motion.div>

            {/* Resumen profesional */}
            <motion.div variants={variants} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                        <FileText className="h-4 w-4" />
                    </div>
                    Resumen profesional
                </h3>
                {profile.description ? (
                    <p className="text-base text-gray-600 leading-relaxed capitalize">
                        {profile.description}
                    </p>
                ) : (
                    <p className="text-sm text-gray-400 italic">Aún no has añadido un resumen profesional.</p>
                )}
            </motion.div>

            {/* Cualidades */}
            <motion.div variants={variants} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                        <Star className="h-4 w-4" />
                    </div>
                    Cualidades
                </h3>
                <div className="flex flex-wrap gap-2">
                    {profile.studentSkills?.length ? (
                        profile.studentSkills.map((s: any, idx: number) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-semibold border border-blue-100 capitalize">
                                {s.skillName}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400 italic">Sin cualidades añadidas</p>
                    )}
                </div>
            </motion.div>

            {/* Disponibilidad */}
            <motion.div variants={variants} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
                        <CalendarDays className="h-4 w-4" />
                    </div>
                    Disponibilidad
                </h3>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-gray-400 font-semibold mb-2">Días Laborales</p>
                        <div className="flex flex-wrap gap-2">
                            {isEntreSemana && <Tag variant="day" label="Entre semana" />}
                            {isFinesDeSemana && <Tag variant="day" label="Fines de semana" />}
                            {isEspecificos && (
                                <button
                                    onClick={onOpenDaysModal}
                                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold border border-green-200"
                                >
                                    Ver días
                                </button>
                            )}
                            {!normalizedDays.length && <span className="text-sm text-gray-400 italic">No especificado</span>}
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 font-semibold mb-2">Jornada</p>
                        {scheduleLabel ? (
                            <Tag variant="schedule" label={scheduleLabel} />
                        ) : (
                            <span className="text-sm text-gray-400 italic">No especificado</span>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Postulaciones recientes */}
            <motion.div variants={variants} className="flex flex-col gap-3 pt-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-blue-900">
                        Postulaciones Recientes
                    </h3>
                    <Link href="/estudiante/misPostulaciones" className="text-base font-bold text-blue-600">Ver todas</Link>
                </div>
                
                <div className="flex flex-col gap-2">
                    {postulaciones.length > 0 ? (
                        postulaciones.map((app) => (
                            <div key={app.jobOffer.jobOfferId} className="relative flex flex-col gap-2 p-3 bg-white text-lg rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="absolute flex items-center gap-1.5 top-0 right-0 bg-linear-to-r from-[#00d15a] to-[#0088ff] text-white px-2.5 py-1 text-[10px] font-bold rounded-bl-xl border-b border-l border-white/40 shadow-sm">
                                    <Calendar className="h-3 w-3" />
                                    {app.applicationDate}
                                </div>

                                <div className="flex items-start gap-3 pt-3">
                                    {app.jobOffer.imageUrl ? (
                                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0 flex">
                                            <Image
                                                width={56}
                                                height={56}
                                                src={app.jobOffer.imageUrl || '/placeholder-job.png'}
                                                alt={app.jobOffer.title}
                                                className="object-contain w-full h-full p-2"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 md:w-28 md:h-28 bg-emerald-50 rounded-xl flex items-center justify-center font-bold text-emerald-600 text-2xl uppercase">
                                            {app.jobOffer?.title?.charAt(0) || "P"}
                                        </div>
                                    )
                                    }

                                    
                                    <div className="flex-1 min-w-0 pr-20">
                                        <p className="font-bold text-blue-900 truncate text-4.5 leading-tight mb-1 capitalize">{app.jobOffer.title}</p>
                                        <div className="flex pt-2 items-center gap-1.5 text-blue-600">
                                            <Briefcase className="h-3 w-3" />
                                            <p className="text-xs font-semibold truncate capitalize">{app.jobOffer.businessName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-50">
                                    <div className="flex items-center gap-1.5 text-gray-700">
                                        <MapPin className="h-3.5 w-3.5 text-green-500" />
                                        <span className="text-xs font-medium capitalize">{app.jobOffer.establishmentAddress}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-blue-900 bg-blue-50/50 px-2 py-0.5 rounded-lg">
                                        <CircleDollarSign className="h-3.5 w-3.5 text-blue-500" />
                                        <span className="text-xs font-bold">${app.jobOffer.salary?.toLocaleString("es-CO")}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400 italic text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">No hay postulaciones recientes</p>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
