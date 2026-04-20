"use client"

import { LoadingScreen } from '@/components/shared/LoadingScreen'
import { useEditEmployerProfile } from '@/features/profile/employer/hooks/useEditEmployerProfile'
import { EditProfileForm } from '@/features/profile/employer/components/EditProfileForm'
import { HeaderEmployer } from '@/components/shared/HeaderEmployer'

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
    <div className="min-h-screen bg-gray-50 pb-12 pt-20">
      <HeaderEmployer name={''} />

      <EditProfileForm 
        formData={formData}
        setters={setters}
        actions={actions}
        refs={refs}
        saving={saving}
        inicial={inicial}
      />
    </div>
  )
}
