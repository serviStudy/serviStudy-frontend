"use client"
import React from 'react'
import { HeaderLR } from '@/components/shared/HeaderLR'
import { Loader2 } from 'lucide-react'
import { useEditStudentProfile } from '@/features/profile/student/hooks/useEditStudentProfile'
import { EditProfileForm } from '@/features/profile/student/components/EditProfileForm'
import { HeaderStudent } from '@/components/shared/HeaderStudent'

const EditProfilePage = () => {
    const {
        formData,
        setters,
        actions,
        refs,
        errors,
        saving,
        loading,
        inicial
    } = useEditStudentProfile()

    if (loading) {
        return (
        <div className="flex min-h-[90vh] items-center justify-center bg-gray-200">
            <HeaderLR />
            <Loader2 className="h-10 w-10 animate-spin text-[#2552d0]" />
        </div>
        )
    }

    return (
        <div className="flex flex-col gap-9 min-h-[90vh] items-center bg-gray-200 pt-14 md:pt-18 lg:pt-18 lg:pb-12 w-full">
        <HeaderStudent name={''} />

        <div className="w-full max-w-4xl">
            <EditProfileForm 
            formData={formData}
            setters={setters}
            actions={actions}
            refs={refs}
            errors={errors}
            saving={saving}
            inicial={inicial}
            />
        </div>
        </div>
    )
}

export default EditProfilePage