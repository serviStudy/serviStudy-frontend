"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStudentProfile } from '@/features/restricted/estudiante/perfil/hooks/useStudentProfile';
import { useSubscriptionStatus } from '@/features/suscripcion/hooks/useSubscriptionStatus';
import { getApplications } from '@/features/restricted/estudiante/misPostulaciones/services/applicationService';
import { ApplicationItem } from '@/features/restricted/estudiante/misPostulaciones/types/applicationTypes';

// Components
import { WelcomeBanner } from './WelcomeBanner';
import { DashboardStats } from './DashboardStats';
import { RecentActivity } from './RecentActivity';
import { PremiumPlanCard } from './PremiumPlanCard';

interface DashboardClientProps {
  userName: string;
}

export const DashboardClient = ({ userName }: DashboardClientProps) => {
  const { profile } = useStudentProfile();
  const { status: subStatus, loading: subLoading } = useSubscriptionStatus();
  
  const [postulacionesCount, setPostulacionesCount] = useState(0);
  const [recentApplications, setRecentApplications] = useState<ApplicationItem[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const plan = subStatus?.currentSubscription?.plan;
  const hasActiveSubscription = !!subStatus?.currentSubscription;

  const daysLeft = subStatus?.currentSubscription ? Math.ceil(
    (new Date(subStatus.currentSubscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  ) : 0;

  // Load applications count and recent
  useEffect(() => {
    getApplications()
      .then(data => {
        if (data && data.content) {
          setPostulacionesCount(data.content.length);
          const sorted = [...data.content].sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime());
          setRecentApplications(sorted.slice(0, 3));
        }
      })
      .catch(() => {})
      .finally(() => setLoadingPosts(false));
  }, []);

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!profile) return 0;
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen relative z-0 pb-10">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-slate-50/50">
        <div className="absolute top-[-5%] left-[-5%] w-125 h-125 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-150 h-150 bg-blue-500/15 rounded-full mix-blend-multiply filter blur-[120px] opacity-70"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col gap-6"
      >
        <WelcomeBanner userName={userName} itemVariants={itemVariants} />

        <DashboardStats 
          itemVariants={itemVariants}
          loadingPosts={loadingPosts}
          postulacionesCount={postulacionesCount}
          profileCompletion={profileCompletion}
          skillsCount={profile?.studentSkills?.length || 0}
          subLoading={subLoading}
          planName={plan?.name}
          daysLeft={daysLeft}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
          <RecentActivity 
            itemVariants={itemVariants}
            loadingPosts={loadingPosts}
            recentApplications={recentApplications}
          />

          <PremiumPlanCard 
            itemVariants={itemVariants}
            subLoading={subLoading}
            hasActiveSubscription={hasActiveSubscription}
            planName={plan?.name}
            daysLeft={daysLeft}
          />
        </div>
      </motion.div>
    </div>
  );
};
