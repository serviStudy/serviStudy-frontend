"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, Phone, MapPin, SquarePen } from 'lucide-react'

interface AvatarCardProps {
    variants: any;
    profile: any;
    email: string;
    inicial: string;
}

export const AvatarCard = ({ variants, profile, email, inicial }: AvatarCardProps) => {
    return (
        <motion.div variants={variants} className="bg-linear-to-r from-chart-1 to-blue-600 rounded-lg p-8 shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-8 relative">
            {/* Left: Avatar with Badge */}
            <div className="relative shrink-0">
                <div className="h-32 w-32 overflow-hidden rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold shadow-md">
                    {profile.imgUrl ? (
                        <img src={profile.imgUrl} alt="Perfil" className="h-full w-full object-cover" />
                    ) : (
                        inicial
                    )}
                </div>
                {profile.verificationStatus && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1 border-4 border-white shadow-sm">
                        <CheckCircle2 className="h-5 w-5 text-white fill-current" />
                    </div>
                )}
            </div>
            
            {/* Center: Info */}
            <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">
                    {profile.name || <span className="text-gray-400 italic">Sin nombre</span>}
                </h1>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-400" />
                        <span className='text-white'>{email || "—"}</span>
                    </div>
                    {profile.contactNumber && (
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-400" />
                            <span className='text-white'>{profile.contactNumber}</span>
                        </div>
                    )}
                </div>

                <button className="flex items-center gap-1.5 mt-4 rounded-full px-3.5 py-1 text-xs font-semibold bg-white text-blue-700 border border-blue-100">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {profile.verificationStatus ? "Perfil verificado" : "No verificado"}
                </button>
            </div>

            {/* Right: Action */}
            <div className="shrink-0">
                <Link
                    href="/estudiante/perfil/editar-perfil"
                    className="flex items-center gap-2 bg-white hover:bg-blue-200 text-blue-900 px-6 py-2.5 rounded-lg font-bold transition-all shadow-md shadow-blue-600/20 active:scale-95"
                >
                    <SquarePen className="text-blue-900 h-4.5 w-4.5" />
                    Editar Perfil
                </Link>
            </div>
        </motion.div>
    )
}
