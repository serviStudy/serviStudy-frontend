"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Briefcase, CalendarDays, CircleDollarSign, Loader2, MapPin } from 'lucide-react'
import { Offer } from '@/features/restricted/estudiante/postPostularse/types/offer'

interface ApplicationItem {
    applicationDate: string;
    jobOffer: Offer;
}

type Props = {
    loading: boolean;
    applications: ApplicationItem[];
    variants?: any;
}

export const RecentApplicationsCard = ({ loading, applications, variants }: Props) => {


    return (
        <motion.div variants={variants} className="w-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-blue-900">Postulaciones Recientes</h3>
                <Link href="/estudiante/misPostulaciones" className="text-sm font-bold text-blue-600 hover:underline">
                    Ver todas
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-10 bg-white rounded-xl border border-gray-200">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            ) : !applications || applications.length === 0 ? (
                <div className="bg-white rounded-xl p-8 border border-dashed border-gray-200 text-center">
                    <p className="text-base text-gray-500 font-medium">No tienes postulaciones aún.</p>
                    <Link href="/estudiante/ofertasActivas" className="text-blue-600 font-bold text-sm hover:underline mt-2 inline-block">Buscar ofertas</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-between">
                    {applications.map((app) => {
                        return (
                            <div key={app.jobOffer.id} className="relative bg-white border border-gray-100 rounded-xl px-5 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                                {/* Logo & Basic Info */}

                                <div className="absolute flex gap-1.5 items-center top-0 right-0 bg-linear-to-r from-[#00d15a] to-[#0088ff] text-white px-3 py-1 text-[10px] font-bold rounded-bl-xl rounded-tr-xl border-b border-l border-white/40 shadow-sm tracking-wider">
                                    <CalendarDays className="h-3 w-3" />
                                    {app.applicationDate}
                                </div>

                                <div className="flex items-start gap-3 mb-4 pt-8">
                                    {app.jobOffer.imageUrl ? (
                                        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                                            <Image
                                                width={48}
                                                height={48}
                                                src={app.jobOffer.imageUrl || '/placeholder-job.png'}
                                                alt={app.jobOffer.title}
                                                className="object-contain w-full h-full p-1"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center font-bold text-emerald-600 text-xl uppercase">
                                            {app.jobOffer?.title?.charAt(0) || "P"}
                                        </div>
                                    )
                                    }
                                    
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-sm font-bold text-blue-900 capitalize truncate mb-0.5">
                                            {app.jobOffer.title}
                                        </h4>
                                        <div className="flex flex-col gap-0.5">
                                            <div className="flex items-center gap-1 text-blue-600">
                                                <Briefcase className="h-3 w-3" />
                                                <span className="text-[11px] font-semibold capitalize truncate">{app.jobOffer.businessName}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Details Row */}
                                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 pb-4 border-t border-gray-50">
                                    <div className="flex items-center gap-1.5 text-gray-600">
                                        <MapPin className="h-3.5 w-3.5 text-green-500" />
                                        <span className="text-xs capitalize font-medium">{app.jobOffer.address}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-blue-900 bg-blue-50/50 px-2 py-0.5 rounded-lg">
                                        <CircleDollarSign className="h-3.5 w-3.5 text-blue-500" />
                                        <span className="text-xs font-bold">${app.jobOffer.salary?.toLocaleString("es-CO")}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </motion.div>
    )
}
