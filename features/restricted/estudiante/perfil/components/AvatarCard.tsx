"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, Phone } from 'lucide-react'

interface AvatarCardProps {
    variants: any;
    profile: any;
    email: string;
    inicial: string;
}

export const AvatarCard = ({ variants, profile, email, inicial }: AvatarCardProps) => {
    return (
        <motion.div variants={variants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="h-32 w-32 -mt-16 overflow-hidden rounded-full bg-[#2552d0] border-4 border-white flex items-center justify-center text-white text-[56px] font-bold shadow-md ring-4 ring-blue-50">
                {profile.imgUrl ? (
                    <img src={profile.imgUrl} alt="Perfil" className="h-full w-full object-cover" />
                ) : (
                    inicial
                )}
            </div>
            
            <h1 className="text-xl font-bold text-gray-900 mt-5">
                {profile.name || <span className="text-gray-400 italic font-medium text-base">Sin nombre</span>}
            </h1>

            <div className="mt-4 flex w-full justify-center">
                <span className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-bold shadow-sm ${profile.verificationStatus ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                    <CheckCircle2 className="h-4 w-4" />
                    {profile.verificationStatus ? "Perfil verificado" : "No verificado"}
                </span>
            </div>

            <hr className="w-full border-gray-100 my-6" />

            <div className="flex flex-col gap-4 w-full text-left text-sm text-gray-600 font-medium">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                        <Mail className="h-4 w-4" />
                    </div>
                    <span className="truncate">{email || "—"}</span>
                </div>
                {profile.contactNumber && (
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                            <Phone className="h-4 w-4" />
                        </div>
                        <span>{profile.contactNumber}</span>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
