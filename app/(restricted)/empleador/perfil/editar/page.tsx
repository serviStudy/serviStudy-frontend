"use client"

import { LoadingScreen } from '@/components/shared/LoadingScreen'
import { useEditEmployerProfile } from '@/features/restricted/empleador/perfil/hooks/useEditEmployerProfile'
import { EditProfileForm } from '@/features/restricted/empleador/perfil/components/EditProfileForm'
import { motion } from 'framer-motion'

export default function EditProfilePage() {
  const { 
    loading, 
    saving, 
    formData, 
    setters, 
    actions, 
    refs, 
    inicial 
  } = useEditEmployerProfile()

  if (loading) {
    return <LoadingScreen background="bg-gray-50" />
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-white w-full relative overflow-hidden">
      
      {/* --- PREMIUM BACKGROUND LAYER --- */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
            animate={{ 
              x: [0, 80, 0], 
              y: [0, 40, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 -left-20 w-[500px] h-[500px] bg-[#dcedc1]/20 rounded-full blur-[100px]"
         />
         <motion.div 
            animate={{ 
              x: [0, -60, 0], 
              y: [0, 80, 0],
            }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[120px]"
         />
         <div className="absolute inset-0 bg-dot-pattern opacity-[0.3]" />
      </div>


      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full px-4 lg:px-0 flex justify-center mt-4 mb-20 relative z-10"
      >
        <EditProfileForm 
          formData={formData}
          setters={setters}
          actions={actions}
          refs={refs}
          saving={saving}
          inicial={inicial}
        />
      </motion.div>
    </div>
  )
}
