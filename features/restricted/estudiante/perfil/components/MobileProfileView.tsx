"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Briefcase, Calendar, Pencil, MapPin, CircleDollarSign, FileText, Star, CalendarDays, CheckCircle2, Crown, Sparkles, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Tag } from './ui/Tag'
import { translateDay } from '@/features/restricted/estudiante/perfil/utils/workDays.utils'

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
    subLoading?: boolean;
    planName?: string;
    daysLeft?: number;
    hasActiveSubscription?: boolean;
    profileCompletion?: number;
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
    receivedLikesCount,
    subLoading,
    planName,
    daysLeft = 0,
    hasActiveSubscription,
    profileCompletion = 0
}: Props) => {
    const getDaysDisplay = () => {
        if (isEntreSemana) return "Entre semana";
        if (isFinesDeSemana) return "Fines de semana";
        if (normalizedDays.length > 0) {
            return normalizedDays.map(translateDay).join(", ");
        }
        return "No especificado";
    };

    const infoCards = [
        { 
            label: "Correo Electrónico", 
            value: email || "No disponible", 
            icon: Mail, 
            gradient: "from-green-500 to-emerald-600",
            bgClass: isPremium ? "bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "bg-white border border-gray-100 shadow-sm",
            isClickable: false,
            onClick: undefined
        },
        { 
            label: "Días Laborales", 
            value: getDaysDisplay(), 
            icon: Calendar, 
            gradient: "from-blue-500 to-cyan-600",
            bgClass: `${isPremium ? "bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "bg-white border border-gray-100 shadow-sm"} ${isEspecificos ? "cursor-pointer hover:shadow-md transition-all duration-300" : ""}`,
            isClickable: isEspecificos,
            onClick: isEspecificos ? () => onOpenDaysModal() : undefined
        },
        { 
            label: "Jornada", 
            value: scheduleLabel || "No especificado", 
            icon: Clock, 
            gradient: "from-orange-500 to-amber-600",
            bgClass: isPremium ? "bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "bg-white border border-gray-100 shadow-sm",
            isClickable: false,
            onClick: undefined
        },
    ];

    return (
        <div className="flex flex-col gap-4 pb-8 w-full">
            {/* Header - Rediseñado con banner superior verde y avatar solapado */}
            <motion.div 
                variants={variants} 
                className={`rounded-xl shadow-sm border overflow-hidden ${
                    isPremium 
                        ? 'bg-white/50 backdrop-blur-xl border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' 
                        : 'bg-white border border-gray-100'
                }`}
            >
                {/* Background Banner */}
                <div className="h-32 w-full relative overflow-hidden bg-linear-to-r from-blue-800 via-indigo-500 to-blue-600">
                    {isPremium && (
                        <>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-xl rounded-full" />
                            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>
                        </>
                    )}
                    {/* Action Button inside Banner */}
                    <div className="absolute top-4 right-4 flex">
                        <Link
                            href="/estudiante/perfil/editar-perfil"
                            className={`px-3 py-1.5 rounded-lg font-bold text-[10px] flex items-center gap-1.5 shadow-sm transition-all active:scale-95 ${
                                isPremium
                                    ? 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
                                    : 'bg-white text-green-700 hover:bg-gray-50'
                            }`}
                        >
                            <Pencil size={12} strokeWidth={2} />
                            <span>Editar</span>
                        </Link>
                    </div>
                </div>

                {/* Identity / Basic Info */}
                <div className="px-5 pb-6 flex flex-col items-center text-center -mt-12 relative z-10">
                    <div className="relative shrink-0 mb-3">
                        <div className={`h-24 w-24 rounded-full flex items-center justify-center border-4 border-white overflow-hidden shadow-md bg-blue-600`}>
                            {profile.imgUrl ? (
                                <Image src={profile.imgUrl} alt="Perfil" width={96} height={96} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-3xl font-bold text-white">{inicial}</span>
                            )}
                        </div>
                        {profile.verificationStatus && (
                            <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 border-2 border-white shadow-sm">
                                <CheckCircle2 className="h-4 w-4 text-white fill-current" />
                            </div>
                        )}
                    </div>

                    <h1 className="text-lg font-bold text-gray-900 tracking-tight capitalize mb-3">
                        {profile.name || "Sin nombre"}
                    </h1>

                    {/* Contact Details Stack */}
                    {profile.contactNumber && (
                        <div className="w-full flex flex-col gap-2">
                            <div className="flex items-center justify-center gap-2 bg-gray-50/50 py-2.5 px-3 rounded-xl border border-gray-100 text-xs font-semibold text-gray-600">
                                <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                <span>{profile.contactNumber}</span>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Contact & Availability Details Cards Grid */}
            <motion.div variants={variants} className="grid grid-cols-1 gap-3">
                {infoCards.map((item) => (
                    <div 
                        key={item.label} 
                        onClick={item.onClick}
                        className={`group relative p-4 rounded-xl overflow-hidden border transition-all duration-300 ${item.bgClass}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`relative z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-300 ${
                                isPremium
                                    ? `bg-gradient-to-br ${item.gradient} text-white shadow-md`
                                    : 'text-green-600 bg-green-50 border border-green-100'
                            }`}>
                                <item.icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.label}</p>
                                <p className="text-xs font-bold text-gray-800 break-words leading-tight mt-0.5">{item.value}</p>
                            </div>
                        </div>
                        {item.isClickable && (
                            <span className="text-[9px] font-bold text-green-600 mt-2 block hover:underline text-right">Haz clic para ver días</span>
                        )}
                    </div>
                ))}
            </motion.div>

            {/* Resumen profesional */}
            <motion.div variants={variants} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-base font-bold text-gray-700 mb-3 flex items-center gap-3">
                    <div className="bg-green-100 text-green-600 border border-green-200 p-1.5 rounded-lg">
                        <FileText className="h-4 w-4" />
                    </div>
                    Resumen profesional
                </h3>
                {profile.description ? (
                    <p className="text-sm text-gray-600 leading-relaxed capitalize">
                        {profile.description}
                    </p>
                ) : (
                    <p className="text-xs text-gray-400 italic">Aún no has añadido un resumen profesional.</p>
                )}
            </motion.div>

            {/* Cualidades */}
            <motion.div variants={variants} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-base font-bold text-gray-700 mb-3 flex items-center gap-3">
                    <div className="bg-green-100 text-green-600 border border-green-200 p-1.5 rounded-lg">
                        <Star className="h-4 w-4" />
                    </div>
                    Cualidades
                </h3>
                <div className="flex flex-wrap gap-2">
                    {profile.studentSkills?.length ? (
                        profile.studentSkills.map((s: any, idx: number) => (
                            <span 
                                key={idx} 
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border capitalize ${
                                    isPremium
                                        ? 'bg-linear-to-br from-green-50 to-blue-50 text-blue-600 border-blue-100'
                                        : 'bg-green-50 text-green-700 border-green-100'
                                }`}
                            >
                                {s.skillName}
                            </span>
                        ))
                    ) : (
                        <p className="text-xs text-gray-400 italic">Sin cualidades añadidas</p>
                    )}
                </div>
            </motion.div>

            {/* Subscription Card */}
            <motion.div variants={variants}>
                {subLoading ? (
                    <div className="bg-white rounded-xl p-5 border border-gray-100 flex items-center justify-center min-h-[100px]">
                        <span className="text-xs text-gray-400 font-semibold animate-pulse">Cargando suscripción...</span>
                    </div>
                ) : hasActiveSubscription ? (
                    <div className="relative rounded-xl overflow-hidden shadow-xs bg-white/70 backdrop-blur-xl border border-white/80">
                        <div className="bg-linear-to-r from-blue-800 via-indigo-500 to-blue-600 p-4 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 blur-xl rounded-full" />
                            <div className="relative z-10 flex items-center gap-2.5">
                                <Crown size={16} className="text-white" />
                                <div>
                                    <h3 className="text-xs font-bold text-white leading-tight">Plan {planName || 'Premium'}</h3>
                                    <p className="text-[9px] text-green-100 font-medium mt-0.5">{daysLeft} {daysLeft === 1 ? 'día restante' : 'días restantes'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            {[
                                { icon: Star, text: "Mayor visibilidad" },
                                { icon: Sparkles, text: "Postulaciones ilimitadas" },
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                                    <div className="w-5.5 h-5.5 rounded-lg bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center shrink-0 border border-green-200/50">
                                        <benefit.icon size={10} className="text-green-600" />
                                    </div>
                                    <span>{benefit.text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="px-4 pb-4">
                            <Link 
                                href="/estudiante/suscripcion"
                                className="w-full flex items-center justify-center gap-1 px-4 py-2 rounded-xl font-bold text-xs bg-linear-to-r from-blue-800 via-indigo-500 to-blue-600 text-white shadow-xs"
                            >
                                <Sparkles size={12} />
                                <span>Gestionar Suscripción</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-100 rounded-xl p-5 text-slate-800 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                                <Crown size={16} />
                            </div>
                            <h3 className="text-sm font-bold text-gray-800">Suscripción Premium</h3>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">
                            Destaca ante las empresas, obtén postulaciones ilimitadas y potencia tu búsqueda de empleo.
                        </p>
                        <Link href="/estudiante/suscripcion" className="w-full block py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-xs">
                            Ver Planes
                        </Link>
                    </div>
                )}
            </motion.div>

            {/* Profile Completion & Status Card */}
            <motion.div 
                variants={variants}
                className={`rounded-xl p-5 shadow-sm border ${
                    isPremium
                        ? 'bg-white/70 backdrop-blur-xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                        : 'bg-white border-gray-100'
                }`}
            >
                <h3 className="text-sm font-bold text-gray-800 mb-4">Estado del Perfil</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full animate-pulse bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]`}></div>
                        <span className="text-xs font-semibold text-gray-600">Perfil Visible</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                            profile.verificationStatus
                                ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                                : 'bg-gray-400'
                        }`}></div>
                        <span className="text-xs font-semibold text-gray-600">
                            {profile.verificationStatus ? "Cuenta Verificada" : "Verificación Pendiente"}
                        </span>
                    </div>

                    {isPremium && (
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]"></div>
                            <span className="text-xs font-semibold text-gray-600">Suscripción Premium Activa</span>
                        </div>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Completitud del Perfil</p>
                            <span className="text-xs font-bold text-slate-700">{profileCompletion}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                style={{ width: `${profileCompletion}%` }}
                                className={`h-full rounded-full transition-all duration-500 ${
                                    isPremium
                                        ? 'bg-linear-to-r from-blue-800 via-indigo-500 to-blue-600'
                                        : 'bg-blue-500'
                                }`}
                            ></div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Postulaciones recientes */}
            <motion.div variants={variants} className="flex flex-col gap-3 pt-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-700 tracking-tight">
                        Postulaciones Recientes
                    </h3>
                    <Link href="/estudiante/misPostulaciones" className="text-xs font-bold text-blue-600 uppercase tracking-wider">Ver todas</Link>
                </div>
                
                <div className="flex flex-col gap-3">
                    {postulaciones.length > 0 ? (
                        postulaciones.map((app) => (
                            <div key={app.jobOffer.jobOfferId} className="relative flex flex-col gap-2 p-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="absolute flex items-center gap-1.5 top-0 right-0 bg-linear-to-r from-blue-800 via-indigo-500 to-blue-600 text-white px-2.5 py-1 text-[10px] font-bold rounded-bl-xl border-b border-l border-white/20 shadow-sm tracking-wider">
                                    <Calendar className="h-3 w-3" />
                                    {app.applicationDate}
                                </div>

                                <div className="flex items-start gap-3 pt-3">
                                    {app.jobOffer.imageUrl ? (
                                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 shrink-0 flex border border-gray-100">
                                            <Image
                                                width={48}
                                                height={48}
                                                src={app.jobOffer.imageUrl || '/placeholder-job.png'}
                                                alt={app.jobOffer.title}
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center font-bold text-indigo-600 text-lg uppercase shrink-0">
                                            {app.jobOffer?.title?.charAt(0) || "P"}
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 truncate text-sm leading-tight mb-1 capitalize">{app.jobOffer.title}</p>
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <Briefcase className="h-3 w-3 text-blue-600 shrink-0" />
                                            <p className="text-[10px] font-semibold truncate capitalize">{app.jobOffer.businessName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-50 mt-1">
                                    <div className="flex items-center gap-1.5 text-gray-500">
                                        <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                                        <span className="text-[11px] font-medium capitalize truncate max-w-[120px]">{app.jobOffer.establishmentAddress}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-green-100/30">
                                        <CircleDollarSign className="h-3.5 w-3.5 text-blue-600" />
                                        <span className="text-[11px] font-bold">${app.jobOffer.salary?.toLocaleString("es-CO")}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400 italic text-center py-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">No hay postulaciones recientes</p>
                    )}
                </div>
            </motion.div>
        </div>
    )
}