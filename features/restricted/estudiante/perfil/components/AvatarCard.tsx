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
    isPremium?: boolean;
}

export const AvatarCard = ({ variants, profile, email, inicial, isPremium }: AvatarCardProps) => {
    return (
        <motion.div variants={variants} className={`rounded-lg p-8 shadow-sm border flex flex-col md:flex-row items-center gap-8 relative overflow-hidden ${
            isPremium 
                ? "bg-linear-to-r from-[#00d15a] via-[#0088ff] to-[#004ee0] border-transparent shadow-[0_8px_30px_rgb(0,78,224,0.2)]" 
                : "bg-linear-to-r from-chart-1 to-blue-600 border-gray-200"
        }`}>
            {isPremium && (
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>
            )}
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
                <h1 className="text-3xl font-bold text-white mb-2 capitalize">
                    {profile.name || <span className="text-gray-400 italic">Sin nombre</span>}
                </h1>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-50" />
                        <span className='text-white'>{email || "—"}</span>
                    </div>
                    {profile.contactNumber && (
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-green-200" />
                            <span className='text-white'>{profile.contactNumber}</span>
                        </div>
                    )}
                </div>

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
