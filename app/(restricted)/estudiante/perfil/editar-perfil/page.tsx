"use client"
import React from 'react'
import { HeaderLR } from '@/components/shared/HeaderLR'
import { Loader2 } from 'lucide-react'
import { useEditStudentProfile } from '@/features/restricted/estudiante/perfil/hooks/useEditStudentProfile'
import { EditProfileForm } from '@/features/restricted/estudiante/perfil/components/EditProfileForm'

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
            <div className="flex min-h-[90vh] items-center justify-center ">
                <Loader2 className="h-10 w-10 animate-spin text-[#2552d0]" />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen items-center w-full">
            <div className="w-full max-w-6xl pb-12 px-0 md:px-6">
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