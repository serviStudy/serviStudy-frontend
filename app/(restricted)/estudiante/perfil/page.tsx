"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { 
    Loader2, SquarePen, Mail, Phone, CheckCircle2, User, Zap, Clock, Calendar, Users, MapPin, Briefcase, CircleDollarSign
} from 'lucide-react'
import { HeaderLR } from '@/components/shared/HeaderLR'
import { ProfileVerification } from '@/components/shared/ProfileVerification'
import { useStudentProfile } from '@/features/restricted/estudiante/perfil/hooks/useStudentProfile'
import { normalizeDays, isWeekDays, isWeekend, isSpecificDays } from '@/features/restricted/estudiante/perfil/utils/workDays.utils'
import { WorkDaysModal } from '@/features/restricted/estudiante/perfil/components/modals/WorkDaysModal'
import { Tag } from '@/features/restricted/estudiante/perfil/components/ui/Tag'
import { getApplications } from '@/features/restricted/estudiante/misPostulaciones/services/applicationService'
import { ApplicationItem } from '@/features/restricted/estudiante/misPostulaciones/types/applicationTypes'
import Image from 'next/image'

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ProfilePage = () => {
    const { loading, profile, email, inicial } = useStudentProfile()
    const [isDaysModalOpen, setIsDaysModalOpen] = useState(false);
    const [postulaciones, setPostulaciones] = useState<ApplicationItem[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
        getApplications()
            .then(data => setPostulaciones(data.content.slice(0, 3)))
            .catch(() => {})
            .finally(() => setLoadingPosts(false));
    }, []);

    if (loading || !profile) {
        return (
            <div className="flex min-h-[90vh] items-center justify-center ">
                <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
            </div>
        )
    }

    const normalizedDays = normalizeDays(profile.workDays || []);
    const isEntreSemana = isWeekDays(normalizedDays);
    const isFinesDeSemana = isWeekend(normalizedDays);
    const isEspecificos = isSpecificDays(normalizedDays);

    const scheduleLabel = profile.workSchedule ? (
        {
            FULL_TIME: 'Jornada completa',
            PART_TIME: 'Media jornada',
            FLEXIBLE: 'Flexible'
        }[profile.workSchedule] || profile.workSchedule
    ) : null;

    return (
        <div className="flex flex-col min-h-screen w-full pb-16">

            {/* Profile Verification Banner (if applies) */}
            <div className="pt-6 px-4 max-w-6xl mx-auto w-full">
                <ProfileVerification />
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="w-full flex flex-col items-center mt-4"
            >
                {/* Full Width Cover Banner */}
                <motion.div 
                    variants={itemVariants}
                    className="w-full max-w-6xl mx-auto h-48 md:h-56 rounded-3xl bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#3b82f6] relative overflow-hidden shadow-lg mx-4"
                >
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>
                    
                    <Link
                        href="/estudiante/perfil/editar-perfil"
                        className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl hover:bg-white/30 transition-all shadow-md border border-white/20 z-10"
                    >
                        <SquarePen className="h-5 w-5 text-white" />
                    </Link>
                </motion.div>

                {/* Two-Column Layout Container */}
                <div className="w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 -mt-20 relative z-10">
                    
                    {/* Left Column: Avatar & Quick Info Sidebar */}
                    <div className="w-full md:w-[350px] flex flex-col gap-6 shrink-0">
                        {/* Avatar & Basic Info Card */}
                        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center">
                            <div className="h-32 w-32 -mt-16 overflow-hidden rounded-full bg-[#2552d0] border-4 border-white flex items-center justify-center text-white text-[56px] font-bold shadow-lg ring-4 ring-blue-50">
                                {profile.imgUrl ? (
                                    <img src={profile.imgUrl} alt="Perfil" className="h-full w-full object-cover" />
                                ) : (
                                    inicial
                                )}
                            </div>
                            
                            <h1 className="text-2xl font-extrabold text-gray-900 mt-5">
                                {profile.name || <span className="text-gray-400 italic font-medium text-lg">Sin nombre</span>}
                            </h1>
                            <h2 className="text-blue-600 font-semibold mt-1">Estudiante</h2>

                            <div className="mt-4 flex w-full justify-center">
                                <span className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold shadow-sm ${profile.verificationStatus ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                                    <CheckCircle2 className="h-4 w-4" />
                                    {profile.verificationStatus ? "Perfil verificado" : "No verificado"}
                                </span>
                            </div>

                            <hr className="w-full border-gray-100 my-6" />

                            <div className="flex flex-col gap-4 w-full text-left text-sm text-gray-600 font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <span className="truncate">{email || "—"}</span>
                                </div>
                                {profile.contactNumber && (
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        <span>{profile.contactNumber}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Availability Card */}
                        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-blue-600" />
                                Disponibilidad
                            </h3>
                            
                            <div className="flex flex-col gap-6">
                                <div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wider">
                                        <Clock className="h-4 w-4" /> Días
                                    </div>
                                    {normalizedDays.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {isEntreSemana && <Tag variant="day" label="Entre semana" />}
                                            {isFinesDeSemana && <Tag variant="day" label="Fines de semana" />}
                                            {isEspecificos && (
                                                <button
                                                    type="button"
                                                    onClick={() => setIsDaysModalOpen(true)}
                                                    className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-3 py-1 text-sm font-bold hover:bg-green-100 transition-colors"
                                                >
                                                    Ver días
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">No especificado</p>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wider">
                                        <Calendar className="h-4 w-4" /> Jornada
                                    </div>
                                    {scheduleLabel ? (
                                        <Tag variant="schedule" label={scheduleLabel} />
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">No especificado</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Main Details */}
                    <div className="w-full flex-1 flex flex-col gap-6 pt-4 md:pt-0">
                        {/* Summary Card */}
                        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-600 p-2.5 rounded-xl shadow-md shadow-blue-600/20 text-white">
                                    <User className="h-5 w-5" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Sobre mí</h3>
                            </div>
                            {profile.description ? (
                                <p className="text-[15px] leading-relaxed text-gray-600 font-medium">
                                    {profile.description}
                                </p>
                            ) : (
                                <div className="bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-200 text-center">
                                    <p className="text-sm text-gray-500 font-medium">No has añadido un resumen profesional.</p>
                                    <Link href="/estudiante/perfil/editar-perfil" className="text-blue-600 font-bold text-sm hover:underline mt-2 inline-block">
                                        Añadir resumen
                                    </Link>
                                </div>
                            )}
                        </motion.div>

                        {/* Skills Card */}
                        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-600 p-2.5 rounded-xl shadow-md shadow-blue-600/20 text-white">
                                    <Zap className="h-5 w-5" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Cualidades destacadas</h3>
                            </div>
                            {profile.studentSkills && profile.studentSkills.length > 0 ? (
                                <div className="flex flex-wrap font-semibold gap-3">
                                    {profile.studentSkills.map((s, idx) => (
                                        <div key={idx} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100 shadow-sm flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                            {s.skillName}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-200 text-center">
                                    <p className="text-sm text-gray-500 font-medium">No has añadido cualidades aún.</p>
                                    <Link href="/estudiante/perfil/editar-perfil" className="text-blue-600 font-bold text-sm hover:underline mt-2 inline-block">
                                        Añadir cualidades
                                    </Link>
                                </div>
                            )}
                        </motion.div>

                        {/* Postulaciones Card */}
                        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between gap-3 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-600 p-2.5 rounded-xl shadow-md shadow-blue-600/20 text-white">
                                        <Briefcase className="h-5 w-5" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Mis Postulaciones</h3>
                                </div>
                                <Link href="/estudiante/misPostulaciones" className="text-sm font-bold text-blue-600 hover:underline">
                                    Ver todas
                                </Link>
                            </div>

                            {loadingPosts ? (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="h-7 w-7 animate-spin text-[#2552d0]" />
                                </div>
                            ) : postulaciones.length === 0 ? (
                                <div className="bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center py-10">
                                    <Briefcase className="h-8 w-8 text-gray-400 mb-3" />
                                    <p className="text-sm text-gray-500 font-medium">No tienes postulaciones aún.</p>
                                    <Link href="/estudiante/ofertasActivas" className="text-blue-600 font-bold text-sm hover:underline mt-2 inline-block">Buscar ofertas</Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {postulaciones.map((app) => (
                                        <div key={app.jobOffer.jobOfferId} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                                                <Image
                                                    width={56}
                                                    height={56}
                                                    src={app.jobOffer.imageUrl || '/placeholder-job.png'}
                                                    alt={app.jobOffer.title}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 truncate text-sm">{app.jobOffer.title}</p>
                                                <p className="text-xs text-[#2552d0] font-semibold truncate">{app.jobOffer.businessName}</p>
                                                <div className="flex flex-wrap gap-3 mt-1">
                                                    <span className="flex items-center gap-1 text-[11px] text-gray-500">
                                                        <MapPin className="h-3 w-3" />{app.jobOffer.establishmentAddress}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-[11px] text-orange-600 font-semibold">
                                                        <CircleDollarSign className="h-3 w-3" />{app.jobOffer.salary}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="flex-shrink-0 text-[11px] text-[#2552d0] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full font-medium">
                                                {app.applicationDate}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <WorkDaysModal 
                open={isDaysModalOpen} 
                onOpenChange={setIsDaysModalOpen} 
                selectedDays={normalizedDays}
                readOnly={true}
            />
        </div>
    )
}

export default ProfilePage