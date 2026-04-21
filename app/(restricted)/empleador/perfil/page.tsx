"use client"
import { LoadingScreen } from '@/components/shared/LoadingScreen'
import { useEmployerProfile } from '@/features/profile/employer/hooks/useEmployerProfile'
import { ProfileInfo } from '@/features/profile/employer/components/ProfileInfo'
import { HeaderEmployer } from '@/components/shared/HeaderEmployer'
import { motion } from 'framer-motion'

const ProfilePage = () => {
  const { loading, profile, email, inicial } = useEmployerProfile()

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-white w-full relative overflow-hidden">
      
      {/* --- PREMIUM BACKGROUND LAYER --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Animated Blobs */}
         <motion.div 
            animate={{ 
              x: [0, 100, 0], 
              y: [0, 50, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#dcedc1]/30 rounded-full blur-[120px]"
         />
         <motion.div 
            animate={{ 
              x: [0, -100, 0], 
              y: [0, 100, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] -right-20 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px]"
         />
         <motion.div 
            animate={{ 
              y: [0, -50, 0],
              scale: [1, 1.3, 1] 
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-[20%] w-[700px] h-[400px] bg-[#eaffe9]/40 rounded-full blur-[130px]"
         />
         
         {/* Grid Pattern Overlay */}
         <div className="absolute inset-0 bg-dot-pattern opacity-[0.4] mix-blend-multiply" />
         
         {/* Subtle Vertical Gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>
      {/* ------------------------------- */}

      <HeaderEmployer name={''}/>

      <div className="w-full px-4 lg:px-0 flex justify-center mt-12 mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex justify-center"
        >
          <ProfileInfo 
            profile={profile}
            email={email}
            inicial={inicial}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage