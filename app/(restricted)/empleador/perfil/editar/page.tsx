"use client"

import { useRouter } from 'next/navigation'
import { LoadingScreen } from '@/components/shared/LoadingScreen'
import { useEditEmployerProfile } from '@/features/restricted/empleador/perfil/hooks/useEditEmployerProfile'
import { EditProfileForm } from '@/features/restricted/empleador/perfil/components/EditProfileForm'
import { motion } from 'framer-motion'
import { useSubscriptionStatus } from '@/features/suscripcion/hooks/useSubscriptionStatus'
import { SuccessModal } from '@/components/shared/SuccessModal'

export default function EditProfilePage() {
  const { 
    loading, 
    saving, 
    showSuccess,
    setShowSuccess,
    formData, 
    setters, 
    actions, 
    refs, 
    inicial 
  } = useEditEmployerProfile()

  const { status: subStatus, loading: loadingSub } = useSubscriptionStatus()
  const router = useRouter()

  if (loading || loadingSub) {
    return <LoadingScreen background="bg-gray-50" />
  }

  const currentSub = subStatus?.currentSubscription;
  const isPremium = subStatus?.status === "ACTIVE" && !!currentSub;

  return (
    <div className={`flex min-h-screen flex-col items-center w-full relative overflow-hidden ${isPremium ? 'bg-none' : 'bg-none'}`}>
      
      {/* --- PREMIUM BACKGROUND LAYER --- */}
      {/* {isPremium && (
        <div className="absolute inset-0 pointer-events-none p-0">
          <motion.div 
              animate={{ 
                x: [0, 80, 0], 
                y: [0, 40, 0],
                scale: [1, 1.1, 1] 
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 -left-20 w-full max-w-4xl h-full bg-blue-300/15 rounded-full blur-[100px]"
          />
          <motion.div 
              animate={{ 
                x: [0, -60, 0], 
                y: [0, 80, 0],
              }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 -right-20 w-full max-w-4xl h-full bg-green-300/15 rounded-full blur-[120px]"
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
        </div>
      )} */}


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
          isPremium={isPremium}
        />
      </motion.div>

      <SuccessModal 
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          router.push("/empleador/perfil");
        }}
        title="Cambios guardados"
        message="Cambios guardados exitosamente"
      />
    </div>
  )
}
