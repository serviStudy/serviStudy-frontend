"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Loader2, MapPin, CircleDollarSign } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ApplicationItem } from '@/features/restricted/estudiante/misPostulaciones/types/applicationTypes'

interface RecentApplicationsCardProps {
    variants: any;
    loading: boolean;
    applications: ApplicationItem[];
}

export const RecentApplicationsCard = ({ variants, loading, applications }: RecentApplicationsCardProps) => {
    return (
        <motion.div variants={variants} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2.5 rounded-xl shadow-md shadow-blue-600/20 text-white">
                        <Briefcase className="h-5 w-5" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Mis Postulaciones</h3>
                </div>
                <Link href="/estudiante/misPostulaciones" className="text-sm font-bold text-blue-600 hover:underline">
                    Ver todas
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="h-7 w-7 animate-spin text-[#2552d0]" />
                </div>
            ) : applications.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center py-10">
                    <Briefcase className="h-8 w-8 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500 font-medium">No tienes postulaciones aún.</p>
                    <Link href="/estudiante/ofertasActivas" className="text-blue-600 font-bold text-sm hover:underline mt-2 inline-block">Buscar ofertas</Link>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {applications.map((app) => (
                        <div key={app.jobOffer.jobOfferId} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                                <Image
                                    width={56}
                                    height={56}
                                    src={app.jobOffer.imageUrl || '/placeholder-job.png'}
                                    alt={app.jobOffer.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 truncate text-sm">{app.jobOffer.title}</p>
                                <p className="text-xs text-[#2552d0] font-semibold truncate">{app.jobOffer.businessName}</p>
                                <div className="flex flex-wrap gap-3 mt-1">
                                    <span className="flex items-center gap-1 text-[11px] text-gray-500">
                                        <MapPin className="h-3 w-3" />{app.jobOffer.establishmentAddress}
                                    </span>
                                    <span className="flex items-center gap-1 text-[11px] text-orange-600 font-semibold">
                                        <CircleDollarSign className="h-3 w-3" />{app.jobOffer.salary}
                                    </span>
                                </div>
                            </div>
                            <span className="shrink-0 text-[11px] text-[#2552d0] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full font-medium">
                                {app.applicationDate}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    )
}
