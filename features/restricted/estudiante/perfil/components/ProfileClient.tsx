"use client"
import React, { useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { Mail, Clock, Calendar, Crown, Sparkles, Star, CheckCircle2 } from 'lucide-react'

// Perfil Features & Modular Components
import { useStudentProfile } from '@/features/restricted/estudiante/perfil/hooks/useStudentProfile'
import { normalizeDays, isWeekDays, isWeekend, isSpecificDays, translateDay } from '@/features/restricted/estudiante/perfil/utils/workDays.utils'
import { ProfileLoading } from '@/features/restricted/estudiante/perfil/components/ProfileLoading'
import { AvatarCard } from '@/features/restricted/estudiante/perfil/components/AvatarCard'
import { AboutMeCard } from '@/features/restricted/estudiante/perfil/components/AboutMeCard'
import { SkillsCard } from '@/features/restricted/estudiante/perfil/components/SkillsCard'
import { RecentApplicationsCard } from '@/features/restricted/estudiante/perfil/components/RecentApplicationsCard'
import { MobileProfileView } from '@/features/restricted/estudiante/perfil/components/MobileProfileView'
import { ProfileInteractions } from '@/features/restricted/interactions/components/ProfileInteractions'

// External Services & Hooks
import { getApplications } from '@/features/restricted/estudiante/misPostulaciones/services/applicationService'
import { getReceivedLikes } from '@/features/restricted/interactions/services/interactionService'
import { useSubscriptionStatus } from '@/features/suscripcion/hooks/useSubscriptionStatus'

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

interface ProfileClientProps {
    subscriptionStatus: "ACTIVE" | "INACTIVE";
}

export const ProfileClient = ({ subscriptionStatus }: ProfileClientProps) => {
    const { loading, profile, email, inicial } = useStudentProfile()
    const { status: subStatus, loading: subLoading } = useSubscriptionStatus()
    const [isDaysModalOpen, setIsDaysModalOpen] = useState(false);
    const [postulaciones, setPostulaciones] = useState<any>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [receivedLikesCount, setReceivedLikesCount] = useState<number>(0);

    const plan = subStatus?.currentSubscription?.plan;
    const hasActiveSubscription = !!subStatus?.currentSubscription;

    const daysLeft = subStatus?.currentSubscription ? Math.ceil(
        (new Date(subStatus.currentSubscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    ) : 0;

    const isPremium = hasActiveSubscription || subscriptionStatus === "ACTIVE";

    useEffect(() => {
        // Fetch received likes count for student
        getReceivedLikes(0, 1, "STUDENT")
            .then(data => {
                if (data) {
                    setReceivedLikesCount(data.totalElements || 0);
                }
            })
            .catch(err => console.error("Error fetching received likes count:", err));

        getApplications()
            .then(data => {
                if (data && data.content) {
                    // Map JobOffer to unified Offer format for RecentApplicationsCard
                    const mappedApplications = data.content.slice(0, 3).map((app: any) => ({
                        ...app,
                        jobOffer: {
                            ...app.jobOffer,
                            id: app.jobOffer.jobOfferId,
                            address: app.jobOffer.establishmentAddress,
                            workSchedule: app.jobOffer.workSchedule
                        }
                    }));
                    setPostulaciones(mappedApplications);
                }
            })
            .catch(() => { })
            .finally(() => setLoadingPosts(false));
    }, []);

    if (loading || !profile) {
        return <ProfileLoading />
    }

    const normalizedDays = normalizeDays(profile.workDays || []);
    const isEntreSemana = isWeekDays(normalizedDays);
    const isFinesDeSemana = isWeekend(normalizedDays);
    const isEspecificos = isSpecificDays(normalizedDays);

    const scheduleMap: Record<string, string> = {
        FULL_TIME: 'Tiempo Completo',
        PART_TIME: 'Medio tiempo',
        FLEXIBLE: 'Flexible'
    };

    const scheduleLabel = profile.workSchedule
        ? scheduleMap[profile.workSchedule] || profile.workSchedule
        : null;

    // Calculate profile completion percentage
    const calculateProfileCompletion = () => {
        let score = 0;
        if (profile.name) score += 15;
        if (profile.contactNumber) score += 15;
        if (profile.description) score += 20;
        if (profile.imgUrl) score += 10;
        if (profile.workDays && profile.workDays.length > 0) score += 15;
        if (profile.workSchedule) score += 10;
        if (profile.studentSkills && profile.studentSkills.length > 0) score += 15;
        return score;
    };
    const profileCompletion = calculateProfileCompletion();

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
        // w-[cal()] w- de sidebar y 1005 total de pantalla
        <div className="flex flex-col min-h-screen relative z-0 sm:min-w-[40vw] md:min-w-[60vw]">
            {isPremium && (
                <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-slate-50/50">
                    {/* Glowing orbs for soft background gradient */}
                    <div className="absolute top-[-5%] left-[-5%] w-125 h-125 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-150 h-150 bg-blue-500/15 rounded-full mix-blend-multiply filter blur-[120px] opacity-70"></div>
                    <div className="absolute top-[30%] left-[20%] w-100 h-100 bg-cyan-300/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>
                </div>
            )}

            {/* DESKTOP VIEW - REDESIGNED */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="hidden md:flex w-full flex-col mt-4"
            >
                <div className="w-full flex flex-col gap-8">
                    {/* Unified Header Card */}
                    <AvatarCard
                        variants={itemVariants}
                        profile={profile}
                        email={email || ''}
                        inicial={inicial || ''}
                        isPremium={isPremium}
                        receivedLikesCount={receivedLikesCount}
                    />

                    <div className="flex flex-col xl:flex-row gap-8">
                        {/* Left Column - Main Content (Wide) */}
                        <div className="flex-1 flex flex-col gap-6">
                            {/* Contact & Availability Details Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {infoCards.map((item) => (
                                    <div
                                        key={item.label}
                                        onClick={item.onClick}
                                        className={`group relative p-5 sm:p-6 rounded-2xl overflow-hidden transition-all duration-300 ${item.bgClass}`}
                                    >
                                        {/* Glow subtil en hover (solo premium) */}
                                        {isPremium && (
                                            <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-15 blur-2xl rounded-full transition-opacity duration-500`} />
                                        )}
                                        <div className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${isPremium
                                            ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-blue-500/10`
                                            : 'text-violet-600 bg-violet-50'
                                            }`}>
                                            <item.icon size={20} />
                                        </div>
                                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-1.5 text-gray-400">{item.label}</p>
                                        <p className="text-sm sm:text-base font-bold text-gray-800 break-words leading-snug">{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            <AboutMeCard variants={itemVariants} description={profile.description || null} isPremium={isPremium} />
                            <SkillsCard variants={itemVariants} skills={profile.studentSkills || []} isPremium={isPremium} />
                            <div className='pt-4 flex flex-wrap'>
                                <RecentApplicationsCard
                                    variants={itemVariants}
                                    loading={loadingPosts}
                                    applications={postulaciones}
                                />
                            </div>
                        </div>

                        {/* Right Column - Sidebar (Narrow) */}
                        <div className="w-full lg:w-[360px] flex flex-col gap-6">
                            {/* Subscription Card */}
                            {subLoading ? (
                                <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-100 flex items-center justify-center min-h-[140px]">
                                    <span className="text-xs text-gray-400 font-semibold">Cargando suscripción...</span>
                                </div>
                            ) : hasActiveSubscription ? (
                                <div className="relative rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(16,185,129,0.15)] bg-white/70 backdrop-blur-xl border border-white/60">
                                    <div className="bg-linear-to-r from-violet-700 via-blue-600 to-sky-400 p-6 text-white relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/15 blur-2xl rounded-xl -translate-y-1/2 translate-x-1/2" />
                                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-300/20 blur-xl rounded-xl translate-y-1/2 -translate-x-1/4" />
                                        <div className="relative z-10 items-center gap-3">
                                            <div className='flex gap-3 mb-3'>
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sky-200/40 backdrop-blur-md border border-white/30 shadow-inner">
                                                    <Crown size={20} className="text-sky-50" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white leading-tight">Plan {plan?.name || 'Premium'}</h3>
                                                    <p className="text-[11px] text-green-100 font-semibold mt-0.5">{daysLeft} {daysLeft === 1 ? 'día restante' : 'días restantes'}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-white relative z-10 leading-relaxed">
                                                Aprovecha tus beneficios premium para encontrar tu trabajo ideal.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-5 space-y-3">
                                        {[
                                            { icon: Star, text: "Mayor visibilidad" },
                                            { icon: Sparkles, text: "Postulaciones ilimitadas" },
                                            { icon: CheckCircle2, text: "Soporte prioritario" },
                                        ].map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                                <div className="w-7 h-7 rounded-lg bg-linear-to-br from-indigo-50 to-indigo-50 flex items-center justify-center shrink-0 border border-indigo-200/50">
                                                    <benefit.icon size={12} className="text-indigo-600" />
                                                </div>
                                                <span>{benefit.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-5 pb-5">
                                        <Link
                                            href="/estudiante/suscripcion"
                                            className="w-full relative overflow-hidden group flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 bg-blue-500 hover:bg-linear-to-r hover:from-violet-700 hover:via-blue-600 hover:to-sky-400 text-white shadow-md active:scale-95"
                                        >
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                            <Sparkles size={12} className="relative z-10" />
                                            <span className="relative z-10">Gestionar Suscripción</span>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-100 rounded-xl p-5 text-slate-800 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                                    <div className="flex items-center gap-3 mb-4 relative z-10">
                                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                                            <Crown size={18} />
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-800">Suscripción Premium</h3>
                                    </div>
                                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4 relative z-10">
                                        Destaca ante las empresas, obtén postulaciones ilimitadas y potencia tu búsqueda de empleo.
                                    </p>
                                    <div className="flex flex-col gap-3 relative z-10">
                                        <Link href="/estudiante/suscripcion" className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-xs transition-all active:scale-95 uppercase tracking-wider">
                                            Ver Planes
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Profile Completion & Status Card */}
                            <div className={`rounded-xl p-6 shadow-sm border ${isPremium
                                ? 'bg-white/70 backdrop-blur-xl border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                                : 'bg-white border-gray-100'
                                }`}>
                                <h3 className="text-lg font-semibold text-gray-800 mb-6">Estado del Perfil</h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full animate-pulse bg-violet-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]`}></div>
                                        <span className="text-sm font-semibold text-gray-600">Perfil Visible</span>
                                    </div>


                                    {isPremium && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(250,204,21,0.4)]"></div>
                                            <span className="text-sm font-semibold text-gray-600">Suscripción Premium Activa</span>
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
                                                className={`h-full rounded-full transition-all duration-500 ${isPremium
                                                    ? 'bg-linear-to-r from-violet-700 via-blue-600 to-sky-400'
                                                    : 'bg-violet-700'
                                                    }`}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactions Section - Desktop */}
                    <motion.div variants={itemVariants} className="w-full">
                        <ProfileInteractions isPremium={isPremium} />
                    </motion.div>
                </div>
            </motion.div>

            {/* MOBILE VIEW - REDESIGNED */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="block md:hidden mt-4"
            >
                <MobileProfileView
                    profile={profile}
                    email={email || ''}
                    inicial={inicial || ''}
                    postulaciones={postulaciones}
                    loadingPosts={loadingPosts}
                    normalizedDays={normalizedDays}
                    isEntreSemana={isEntreSemana}
                    isFinesDeSemana={isFinesDeSemana}
                    isEspecificos={isEspecificos}
                    scheduleLabel={scheduleLabel}
                    onOpenDaysModal={() => setIsDaysModalOpen(true)}
                    variants={itemVariants}
                    isPremium={isPremium}
                    subLoading={subLoading}
                    planName={plan?.name}
                    daysLeft={daysLeft}
                    hasActiveSubscription={hasActiveSubscription}
                    profileCompletion={profileCompletion}
                    receivedLikesCount={receivedLikesCount}
                />
                {/* Interactions Section - Mobile */}
                <motion.div variants={itemVariants} className="w-[92vw]">
                    <ProfileInteractions isPremium={isPremium} />
                </motion.div>
            </motion.div>
        </div>
    )
}
