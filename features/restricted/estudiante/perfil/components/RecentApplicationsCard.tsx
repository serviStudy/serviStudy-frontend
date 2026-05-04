"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Briefcase, Loader2, MapPin } from 'lucide-react'
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
        <motion.div variants={variants} className="w-full">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {applications.map((app) => {
                        return (
                            <div key={app.jobOffer.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                                {/* Logo & Basic Info */}
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                                        <Image
                                            width={48}
                                            height={48}
                                            src={app.jobOffer.imageUrl || '/placeholder-job.png'}
                                            alt={app.jobOffer.title}
                                            className="object-contain w-full h-full p-1"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-sm font-bold text-blue-900 truncate mb-0.5">
                                            {app.jobOffer.title}
                                        </h4>
                                        <div className="flex flex-col gap-0.5">
                                            <div className="flex items-center gap-1 text-blue-600">
                                                <Briefcase className="h-3 w-3" />
                                                <span className="text-[11px] font-semibold truncate">{app.jobOffer.businessName}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <MapPin className="h-3 w-3 text-green-500" />
                                                <span className="text-[11px] font-medium truncate">{app.jobOffer.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Row */}
                                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                                    <div>
                                        <span className="text-gray-400 block mb-0.5">Salario:</span>
                                        <span className="text-blue-600 font-bold">
                                            ${Number(app.jobOffer.salary || 0).toLocaleString("es-CO")}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-gray-400 block mb-0.5">Fecha:</span>
                                        <span className="text-gray-600 font-medium">{app.applicationDate}</span>
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
