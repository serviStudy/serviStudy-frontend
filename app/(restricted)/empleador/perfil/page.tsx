"use client"
import { useEmployerProfile } from '@/features/profile/employer/hooks/useEmployerProfile'
import { ProfileInfo } from '@/features/profile/employer/components/ProfileInfo'
import { motion } from 'framer-motion'
import { ProfileInfoSkeleton } from '@/features/profile/employer/components/ProfileSkeletons'

const ProfilePage = () => {
  const { loading, profile, email, inicial } = useEmployerProfile()

  return (
    <div className="flex min-h-screen flex-col items-center w-full">


      <div className="w-full px-4 lg:px-0 flex justify-center mt-4 mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex justify-center min-h-[600px]"
        >
          {loading && !profile.id && !profile.employerId ? (
            <ProfileInfoSkeleton />
          ) : (
            <ProfileInfo 
              profile={profile}
              email={email}
              inicial={inicial}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage