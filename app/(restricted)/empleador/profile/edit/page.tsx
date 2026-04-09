"use client"

import React from 'react'
import { HeaderLR } from '@/components/shared/HeaderLR'
import { Loader2 } from "lucide-react"
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <HeaderLR />
        <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-20">
      <HeaderEmployer />

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
