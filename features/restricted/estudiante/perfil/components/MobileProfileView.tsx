"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Briefcase, Calendar, SquarePen, MapPin, CircleDollarSign, FileText, Star, CalendarDays, CheckCircle2 } from 'lucide-react'
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
    isPremium
}: Props) => {
    return (
        <div className="flex flex-col gap-4 pb-8 w-full">
            {/* Header - Rediseñado con fondo degradado como en Desktop */}
            <motion.div 
                variants={variants} 
                className={`rounded-xl shadow-sm border p-6 relative overflow-hidden text-white ${
                    isPremium 
                        ? "bg-linear-to-r from-[#00d15a] via-[#0088ff] to-[#004ee0] border-transparent shadow-[0_8px_30px_rgb(0,78,224,0.2)]" 
                        : "bg-linear-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#3b82f6] border-transparent"
                }`}
            >
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>

                <div className="flex flex-col items-center relative z-10 text-center">
                    {/* Foto / Avatar */}
                    <div className="relative shrink-0 mb-3">
                        <div className="h-24 w-24 rounded-full flex items-center justify-center border-4 border-white/30 shadow-lg bg-blue-600/30 text-white">
                            {profile.imgUrl ? (
                                <Image src={profile.imgUrl} alt="Perfil" width={96} height={96} className="h-full w-full object-cover rounded-full" />
                            ) : (
                                <span className="text-3xl font-bold">{inicial}</span>
                            )}
                        </div>
                        {profile.verificationStatus && (
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 border-2 border-blue-600 shadow-sm">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 fill-current" />
                            </div>
                        )}
                    </div>

                    {/* Nombre */}
                    <h1 className="text-xl font-bold text-white tracking-tight capitalize mb-1">
                        {profile.name || "Tu Nombre"}
                    </h1>

                    {/* Detalles de Contacto */}
                    <div className="mt-4 flex flex-col gap-2.5 w-full text-sm text-blue-50 font-medium">
                        <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md py-2.5 px-3 rounded-xl border border-white/10">
                            <Mail className="h-4 w-4 text-blue-100 shrink-0" />
                            <span className="truncate">{email || "Sin correo"}</span>
                        </div>
                        {profile.contactNumber && (
                            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md py-2.5 px-3 rounded-xl border border-white/10">
                                <Phone className="h-4 w-4 text-blue-100 shrink-0" />
                                <span>{profile.contactNumber}</span>
                            </div>
                        )}
                    </div>

                    {/* Botón Editar Perfil */}
                    <Link
                        href="/estudiante/perfil/editar-perfil"
                        className="mt-5 w-full flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-900 py-3 rounded-xl text-base font-bold shadow-md transition-all active:scale-95"
                    >
                        <SquarePen className="h-4.5 w-4.5 text-blue-900" />
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

                                <div className="flex items-start gap-3 pt-7">
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
                                        <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center font-bold text-emerald-600 text-lg uppercase shrink-0">
                                            {app.jobOffer?.title?.charAt(0) || "P"}
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
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
