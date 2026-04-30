"use client"
import React from 'react'
import { Loader2 } from 'lucide-react'

export const ProfileLoading = () => {
    return (
        <div className="flex min-h-[90vh] items-center justify-center ">
            <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
        </div>
    )
}
