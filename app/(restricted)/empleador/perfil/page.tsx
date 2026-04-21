"use client"
import { useEmployerProfile } from '@/features/profile/employer/hooks/useEmployerProfile'
import { ProfileInfo } from '@/features/profile/employer/components/ProfileInfo'
import { HeaderEmployer } from '@/components/shared/HeaderEmployer'
import { motion } from 'framer-motion'
import { ProfileInfoSkeleton } from '@/features/profile/employer/components/ProfileSkeletons'

const ProfilePage = () => {
  const { loading, profile, email, inicial } = useEmployerProfile()

  return (
    <div className="flex min-h-screen flex-col items-center bg-white w-full relative overflow-hidden">
      
      {/* --- PREMIUM BACKGROUND LAYER --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Animated Blobs */}
         <motion.div 
            animate={{ 
              x: [0, 80, 0], 
              y: [0, 50, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#dcedc1]/20 rounded-full blur-[120px]"
         />
         <motion.div 
            animate={{ 
              x: [0, -80, 0], 
              y: [0, 100, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] -right-20 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[100px]"
         />
         
         {/* Grid Pattern Overlay */}
         <div className="absolute inset-0 bg-dot-pattern opacity-[0.3]" />
      </div>
      {/* ------------------------------- */}

      <HeaderEmployer name={''}/>

      <div className="w-full px-4 lg:px-0 flex justify-center mt-12 mb-20 relative z-10">
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