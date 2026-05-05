"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Briefcase, Loader2, MapPin, CircleDollarSign, Calendar } from 'lucide-react'
import { ApplicationItem } from '@/features/restricted/estudiante/misPostulaciones/types/applicationTypes'

interface RecentApplicationsCardProps {
    variants: any;
    loading: boolean;
    applications: ApplicationItem[];
}

export const RecentApplicationsCard = ({ variants, loading, applications }: RecentApplicationsCardProps) => {
    return (
        <motion.div variants={variants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            {/* Header matches H3 style: lg/xl font-semibold */}
            <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <Briefcase className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900">Mis Postulaciones</h3>
                </div>
                <Link href="/estudiante/misPostulaciones" className="text-xs font-semibold text-blue-600 hover:underline uppercase tracking-wider">
                    Ver todas
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            ) : applications.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-8 border border-dashed border-gray-200 text-center">
                    <p className="text-base text-gray-500 font-medium">No tienes postulaciones aún.</p>
                    <Link href="/estudiante/ofertasActivas" className="text-blue-600 font-bold text-sm hover:underline mt-2 inline-block">Buscar ofertas</Link>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {applications.map((app) => (
                        <div key={app.jobOffer.jobOfferId} className="group relative bg-white border border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all">
                            {/* New Organization Proposal: "Balanced Split" */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                                {/* Left: Logo container (larger and clean) */}
                                <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                                    <Image
                                        width={64}
                                        height={64}
                                        src={app.jobOffer.imageUrl || '/placeholder-job.png'}
                                        alt={app.jobOffer.title}
                                        className="object-contain w-full h-full p-1.5 group-hover:scale-105 transition-transform"
                                    />
                                </div>

                                {/* Right: Consolidated Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                                        <div>
                                            <h4 className="text-base font-bold text-blue-900 leading-tight mb-0.5 group-hover:text-blue-600 transition-colors">
                                                {app.jobOffer.title}
                                            </h4>
                                            <div className="flex items-center gap-1.5 text-blue-600">
                                                <Briefcase className="h-3 w-3" />
                                                <span className="text-xs font-semibold">{app.jobOffer.businessName}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-blue-50/50 px-2 py-0.5 rounded-md border border-blue-100">
                                            <Calendar className="h-3 w-3 text-blue-500" />
                                            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">{app.applicationDate}</span>
                                        </div>
                                    </div>

                                    {/* Details row: sm typography */}
                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-3">
                                        <div className="flex items-center gap-1.5 text-gray-700">
                                            <MapPin className="h-4 w-4 text-green-500" />
                                            <span className="text-sm font-medium">{app.jobOffer.establishmentAddress}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-blue-900">
                                            <CircleDollarSign className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm font-bold tracking-tight">
                                                ${app.jobOffer.salary}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Badges: text-xs medium */}
                                    <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-gray-50">
                                        <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-md text-xs font-medium border border-orange-100 uppercase tracking-wide">
                                            {app.jobOffer.workSchedule === 'FULL_TIME' ? 'Tiempo Completo' : 'Medio Tiempo'}
                                        </span>
                                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-md text-xs font-medium border border-green-100 uppercase tracking-wide">
                                            Activa
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    )
}
