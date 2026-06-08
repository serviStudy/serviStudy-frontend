"use client"
import { useEmployerProfile } from '@/features/restricted/empleador/perfil/hooks/useEmployerProfile'
import { ProfileInfo } from '@/features/restricted/empleador/perfil/components/ProfileInfo'
import { motion } from 'framer-motion'
import { ProfileInfoSkeleton } from '@/features/restricted/empleador/perfil/components/ProfileSkeletons'
import { useSubscriptionStatus } from '@/features/suscripcion/hooks/useSubscriptionStatus'
import { getReceivedLikes } from '@/features/restricted/interactions/services/interactionService'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const { loading, profile, email, inicial } = useEmployerProfile()
  const { status: subStatus, loading: loadingSub } = useSubscriptionStatus()
  const [receivedLikesCount, setReceivedLikesCount] = useState<number>(0)

  useEffect(() => {
    getReceivedLikes(0, 1, "EMPLOYER")
      .then(data => {
        if (data) {
          setReceivedLikesCount(data.totalElements || 0)
        }
      })
      .catch(err => console.error("Error fetching received likes count:", err))
  }, [])

  const currentSub = subStatus?.currentSubscription;
  const hasSubscription = subStatus?.status === "ACTIVE" && !!currentSub;

  let daysLeft = 0;
  let planName = '';
  if (hasSubscription && currentSub) {
    daysLeft = Math.ceil(
      (new Date(currentSub.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysLeft < 0) daysLeft = 0;
    planName = currentSub.plan?.name || 'Premium';
  }

  return (
    <div className="flex min-h-screen flex-col items-center w-full">
      <div className="w-full px-4 lg:px-0 flex justify-center mt-4 mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex justify-center min-h-150"
        >
          {loading || loadingSub ? (
            <ProfileInfoSkeleton />
          ) : (
            <ProfileInfo 
              profile={profile}
              email={email}
              inicial={inicial}
              isPremium={hasSubscription}
              planName={planName}
              daysLeft={daysLeft}
              receivedLikesCount={receivedLikesCount}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage