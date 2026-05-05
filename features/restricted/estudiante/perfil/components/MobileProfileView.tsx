"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, Phone, User, Zap, Briefcase, Clock, SquarePen, MapPin, CircleDollarSign, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
    variants
}: Props) => {
    return (
        <div className="flex flex-col gap-6 pb-12 w-full">
            {/* Header Mobile - Restored Size */}
            <motion.div variants={variants} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-full h-32 bg-linear-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#3b82f6] relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>
                </div>
                
                <Link
                    href="/estudiante/perfil/editar-perfil"
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-xl text-white border border-white/10 shadow-lg z-20"
                >
                    <SquarePen className="h-5 w-5" />
                </Link>

                <div className="h-28 w-28 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center text-white text-4xl font-bold shadow-lg relative z-10 -mt-14">
                    {profile.imgUrl ? (
                        <Image src={profile.imgUrl} alt="Perfil" width={112} height={112} className="h-full w-full object-cover rounded-full" />
                    ) : (
                        inicial
                    )}
                </div>
                
                <div className="p-6 pt-4 w-full">
                    <h1 className="text-2xl font-bold text-blue-900 leading-tight">
                        {profile.name || "Tu Nombre"}
                    </h1>
                    {/* "Estudiante" label removed as requested */}

                    <div className="mt-4 flex justify-center">
                        <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {profile.verificationStatus ? "Perfil verificado" : "No verificado"}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 w-full mt-6 pt-6 border-t border-gray-50 text-left">
                        <div className="flex items-center gap-3 text-gray-700">
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                <Mail className="h-4 w-4" />
                            </div>
                            <span className="text-sm truncate font-medium">{email || "Sin correo"}</span>
                        </div>
                        {profile.contactNumber && (
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-medium">{profile.contactNumber}</span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Availability - Restored Size */}
            <motion.div variants={variants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-5 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Disponibilidad
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 tracking-widest mb-3">Días preferidos</p>
                        <div className="flex flex-wrap gap-2">
                            {isEntreSemana && <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-200">Entre semana</span>}
                            {isFinesDeSemana && <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-200">Fines de semana</span>}
                            {isEspecificos && (
                                <button onClick={onOpenDaysModal} className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-green-200">Ver días</button>
                            )}
                            {!normalizedDays.length && <span className="text-sm text-gray-400 italic">No especificado</span>}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 tracking-widest mb-3">Tipo de jornada</p>
                        {scheduleLabel ? (
                            <span className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-orange-200 tracking-wide">{scheduleLabel}</span>
                        ) : (
                            <span className="text-sm text-gray-400 italic">No especificado</span>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Sobre mí - Restored Size */}
            <motion.div variants={variants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Sobre mí
                </h3>
                {profile.description ? (
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {profile.description}
                    </p>
                ) : (
                    <p className="text-sm text-gray-400 italic bg-gray-50 p-4 rounded-xl text-center border border-dashed border-gray-200">Aún no has añadido un resumen profesional.</p>
                )}
            </motion.div>

            {/* Skills - Restored Size */}
            <motion.div variants={variants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Cualidades destacadas
                </h3>
                <div className="flex flex-wrap gap-2">
                    {profile.studentSkills?.length ? (
                        profile.studentSkills.map((s: any, idx: number) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-xs font-bold border border-blue-100 flex items-center gap-1.5">
                                <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                                {s.skillName}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400 italic">Sin cualidades añadidas</p>
                    )}
                </div>
            </motion.div>

            {/* Recent Applications - Restored Size */}
            <motion.div variants={variants} className="bg-white rounded-xl p-4 flex flex-col gap-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                        Postulaciones
                    </h3>
                    <Link href="/estudiante/misPostulaciones" className="text-xs font-bold text-blue-600 hover:underline">Ver todas</Link>
                </div>
                
                <div className="flex flex-col gap-4">
                    {postulaciones.length > 0 ? (
                        postulaciones.map((app) => (
                            <div key={app.jobOffer.jobOfferId} className="relative flex flex-col gap-2 p-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                {/* Date Tag at the edge (top-right) */}
                                <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 px-3 py-1 text-[9px] font-bold rounded-bl-xl border-b border-l border-blue-100 uppercase tracking-wider">
                                    {app.applicationDate}
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 flex">
                                        <Image
                                            width={64}
                                            height={64}
                                            src={app.jobOffer.imageUrl || '/placeholder-job.png'}
                                            alt={app.jobOffer.title}
                                            className="object-contain w-full h-full p-2"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 pr-12"> {/* Space for the date tag */}
                                        <p className="font-bold text-blue-900 truncate text-base leading-tight mb-1">{app.jobOffer.title}</p>
                                        <div className="flex items-center gap-1.5 text-blue-600">
                                            <Briefcase className="h-3 w-3" />
                                            <p className="text-xs font-semibold truncate">{app.jobOffer.businessName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-50">
                                    <div className="flex items-center gap-1.5 text-gray-700">
                                        <MapPin className="h-3.5 w-3.5 text-green-500" />
                                        <span className="text-xs font-medium">{app.jobOffer.establishmentAddress}</span>
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
