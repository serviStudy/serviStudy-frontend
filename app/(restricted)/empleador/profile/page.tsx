"use client"
import React from 'react'
import { HeaderLR } from '@/components/shared/HeaderLR'
import { Loader2 } from 'lucide-react'
import { useEmployerProfile } from '@/features/profile/employer/hooks/useEmployerProfile'
import { ProfileInfo } from '@/features/profile/employer/components/ProfileInfo'
import { HeaderEmployer } from '@/components/shared/HeaderEmployer'

const ProfilePage = () => {
  const { loading, profile, email, inicial } = useEmployerProfile()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <HeaderLR />
        <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-9 bg-gray-50 pt-24 pb-12 w-full px-4 lg:px-0">
      <HeaderEmployer name={''}/>

      <ProfileInfo 
        profile={profile}
        email={email}
        inicial={inicial}
      />
    </div>
  )
}

export default ProfilePage