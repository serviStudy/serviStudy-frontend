"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, Phone, Pencil, ThumbsUpIcon } from 'lucide-react'

interface AvatarCardProps {
    variants: any;
    profile: any;
    email: string;
    inicial: string;
    isPremium?: boolean;
    receivedLikesCount?: number;
}

export const AvatarCard = ({ variants, profile, email, inicial, isPremium, receivedLikesCount }: AvatarCardProps) => {
    return (
        <motion.div variants={variants} className={`relative w-full rounded-xl overflow-hidden shadow-sm ${isPremium
                ? 'bg-white/50 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                : 'bg-white border border-gray-100'
            }`}>
            {/* Background Banner */}
            <div className="h-48 lg:h-56 w-full relative overflow-hidden bg-linear-to-r from-blue-800 via-indigo-500 to-blue-600">
                {/* Action Buttons in Banner */}
                <div className="absolute top-5 right-5 sm:top-8 sm:right-10 flex gap-4">
                    <Link
                        href="/estudiante/perfil/editar-perfil"
                        className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-[10px] sm:text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 ${isPremium
                                ? 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
                                : 'bg-white text-green-700 hover:bg-gray-50'
                            }`}
                    >
                        <Pencil size={14} className="sm:w-4 sm:h-4" strokeWidth={2} />
                        <span className="hidden md:block">Editar Perfil</span>
                    </Link>
                </div>
            </div>

            {/* Identity Section */}
            <div className="px-5 sm:px-10 lg:px-16 pb-10">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-center lg:items-end -mt-16 lg:-mt-20">
                    {/* Avatar with Badge */}
                    <div className="relative shrink-0">
                        <div className={`h-32 w-32 sm:h-36 sm:w-36 lg:h-40 lg:w-40 rounded-xl overflow-hidden flex items-center justify-center ${isPremium
                                ? 'bg-white/85 backdrop-blur-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-white/95'
                                : 'bg-white shadow-sm border-4 border-white'
                            }`}>
                            {profile.imgUrl ? (
                                <img src={profile.imgUrl} alt="Perfil" className="h-full w-full object-cover" />
                            ) : (
                                <span className={`text-[48px] sm:text-[60px] lg:text-[72px] font-black ${isPremium ? 'text-blue-600/20' : 'text-green-700/20'
                                    }`}>
                                    {inicial}
                                </span>
                            )}
                        </div>
                        {profile.verificationStatus && (
                            <div className="absolute bottom-1 right-1 bg-blue-600 rounded-full p-1 border-2 border-white shadow-sm">
                                <CheckCircle2 className="h-4.5 w-4.5 text-white fill-current" />
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 text-center lg:text-left lg:pb-4 min-w-0">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight capitalize mb-2">
                            {profile.name || <span className="text-gray-400 italic">Sin nombre</span>}
                        </h1>

                        {profile.contactNumber && (
                            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                                    <span>{profile.contactNumber}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
