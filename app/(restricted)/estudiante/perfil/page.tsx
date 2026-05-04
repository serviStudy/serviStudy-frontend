"use client"
import React, { useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'

// Shared UI Components
import { ProfileVerification } from '@/components/shared/ProfileVerification'

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

// External Services & Types
import { getApplications } from '@/features/restricted/estudiante/misPostulaciones/services/applicationService'
import { ApplicationItem } from '@/features/restricted/estudiante/misPostulaciones/types/applicationTypes'
 
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
    const [postulaciones, setPostulaciones] = useState<any>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
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
        <div className="flex flex-col min-h-screen pb-6">
            <div className="px-4 max-w-6xl mx-auto w-full">
                <ProfileVerification />
            </div>

            {/* DESKTOP VIEW - REDESIGNED */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="hidden md:flex w-full flex-col items-center mt-12"
            >
                <div className="w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col gap-8">
                    {/* Unified Header Card */}
                    <AvatarCard 
                        variants={itemVariants} 
                        profile={profile} 
                        email={email || ''} 
                        inicial={inicial || ''} 
                    />

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column - Main Content (Wide) */}
                        <div className="flex-1 flex flex-col gap-6">
                            <AboutMeCard variants={itemVariants} description={profile.description || null} />
                            <SkillsCard variants={itemVariants} skills={profile.studentSkills || []} />
                            <RecentApplicationsCard 
                                variants={itemVariants}
                                loading={loadingPosts} 
                                applications={postulaciones}                            
                            />
                        </div>

                        {/* Right Column - Sidebar (Narrow) */}
                        <div className="w-full lg:w-80 flex flex-col gap-6">
                            <AvailabilityCard 
                                variants={itemVariants}
                                normalizedDays={normalizedDays}
                                isEntreSemana={isEntreSemana}
                                isFinesDeSemana={isFinesDeSemana}
                                isEspecificos={isEspecificos}
                                scheduleLabel={scheduleLabel}
                                onOpenDaysModal={() => setIsDaysModalOpen(true)}
                            />
                        </div>
                    </div>
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
                />
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