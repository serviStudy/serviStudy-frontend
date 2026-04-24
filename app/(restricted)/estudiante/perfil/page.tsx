"use client"
import React from 'react'
import { HeaderStudent } from '@/components/shared/HeaderStudent'
import { HeaderLR } from '@/components/shared/HeaderLR'
import { Loader2 } from 'lucide-react'
import { useStudentProfile } from '@/features/profile/student/hooks/useStudentProfile'
import { ProfileInfo } from '@/features/profile/student/components/ProfileInfo'

const ProfilePage = () => {
    const { loading, profile, email, inicial } = useStudentProfile()

    if (loading || !profile) {
        return (
            <div className="flex min-h-[90vh] items-center justify-center bg-gray-200">
                <HeaderLR />
                <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-9 min-h-[90vh] items-center bg-gray-200 pt-16 md:pt-10 lg:pt-18 pb-12 px-4 lg:px-0 w-full">
            <HeaderStudent name={profile.name || email} />

            <ProfileInfo
                profile={profile}
                email={email}
                inicial={inicial}
            />
        </div>
    )
}

export default ProfilePage