"use client"
import React, { useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'

// Perfil Features & Modular Components
import { useStudentProfile } from '@/features/restricted/estudiante/perfil/hooks/useStudentProfile'
import { normalizeDays, isWeekDays, isWeekend, isSpecificDays } from '@/features/restricted/estudiante/perfil/utils/workDays.utils'
import { WorkDaysModal } from '@/features/restricted/estudiante/perfil/components/modals/WorkDaysModal'
import { ProfileLoading } from '@/features/restricted/estudiante/perfil/components/ProfileLoading'
import { AvatarCard } from '@/features/restricted/estudiante/perfil/components/AvatarCard'
import { AvailabilityCard } from '@/features/restricted/estudiante/perfil/components/AvailabilityCard'
import { AboutMeCard } from '@/features/restricted/estudiante/perfil/components/AboutMeCard'
import { SkillsCard } from '@/features/restricted/estudiante/perfil/components/SkillsCard'
import { RecentApplicationsCard } from '@/features/restricted/estudiante/perfil/components/RecentApplicationsCard'
import { MobileProfileView } from '@/features/restricted/estudiante/perfil/components/MobileProfileView'
import { ProfileInteractions } from '@/features/restricted/interactions/components/ProfileInteractions'

// External Services & Types
import { getApplications } from '@/features/restricted/estudiante/misPostulaciones/services/applicationService'
import { getReceivedLikes } from '@/features/restricted/interactions/services/interactionService'

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
    const [isDaysModalOpen, setIsDaysModalOpen] = useState(false);
    const [postulaciones, setPostulaciones] = useState<any>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [receivedLikesCount, setReceivedLikesCount] = useState<number>(0);

    const isPremium = subscriptionStatus === "ACTIVE";

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
            .catch(() => {})
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
        FULL_TIME: 'Jornada completa',
        PART_TIME: 'Media jornada',
        FLEXIBLE: 'Flexible'
    };

    const scheduleLabel = profile.workSchedule 
        ? scheduleMap[profile.workSchedule] || profile.workSchedule 
        : null;

    return (
        // w-[cal()] w- de sidebar y 1005 total de pantalla
        <div className="flex flex-col min-h-screen relative z-0 sm:min-w-[40vw] md:min-w-[60vw]">
            {isPremium && (
                <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-slate-50/50">
                    {/* Glowing orbs for soft background gradient */}
                    <div className="absolute top-[-5%] left-[-5%] w-125 h-125 bg-green-400/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70"></div>
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
                        <div className="w-full lg:w-72 flex flex-col gap-6">
                            <AvailabilityCard 
                                variants={itemVariants}
                                normalizedDays={normalizedDays}
                                isEntreSemana={isEntreSemana}
                                isFinesDeSemana={isFinesDeSemana}
                                isEspecificos={isEspecificos}
                                scheduleLabel={scheduleLabel}
                                onOpenDaysModal={() => setIsDaysModalOpen(true)}
                                isPremium={isPremium}
                            />
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
                    receivedLikesCount={receivedLikesCount}
                />
                {/* Interactions Section - Mobile */}
                <motion.div variants={itemVariants} className="w-[92vw]">
                    <ProfileInteractions isPremium={isPremium} />
                </motion.div>
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
