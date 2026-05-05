"use client"
import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import { MapPin, ArrowUpRight, Clock, Briefcase, Calendar, Sparkles, FileText } from 'lucide-react'
import { motion } from "framer-motion"
import { ApplicationItem } from '../types/applicationTypes'
import { ApplyButtonDelete } from '../hooks/ApplyButtonDelete'

interface Props {
    data: ApplicationItem;
    onDelete: (jobOfferId: string) => void;
}

const cleanDescription = (raw: string): string => {
    return raw ? raw.split('|||')[0].trim() : '';
};

export const Postulacion = ({ data, onDelete }: Props) => {
    const description = cleanDescription(data.jobOffer.description);
    const salary = Number(data.jobOffer.salary || 0);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className="group bg-white rounded-lg border border-gray-100 p-6  flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden w-full"
        >
            {/* LATERAL LINE */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-blue-600 shadow-[4px_0_20px_rgba(37,99,235,0.3)] transition-all duration-700" />
            
            {/* BACKGROUND DECORATION */}
            <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-blue-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />

            <div className='flex gap-2 md:hidden'>
                <div className="relative shrink-0 flex md:block">
                    <div className="w-26 h-26 md:w-36 md:h-36 bg-gray-50 rounded-[32px] overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner group-hover:rotate-2 transition-all duration-700 px-4">
                        <Image
                            width={160}
                            height={160}
                            src={data.jobOffer.imageUrl || "/placeholder-job.png"}
                            alt={data.jobOffer.title}
                            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-1000"
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-blue-900 tracking-tight mb-1 truncate group-hover:text-blue-600 transition-colors duration-300">
                        {data.jobOffer.title}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-600 mb-4">
                        <Briefcase className="h-4 w-4" />
                        <span className="text-sm font-bold capitalize">{data.jobOffer.businessName}</span>
                    </div>
                </div>
            </div>

            {/* LOGO SECTION  hidden section in md devices*/} 
            <div className="relative hidden md:block shrink-0 flex md:block">
                <div className="w-26 h-26 md:w-36 md:h-36 bg-gray-50 rounded-[32px] overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner group-hover:rotate-2 transition-all duration-700 px-4">
                    <Image
                        width={160}
                        height={160}
                        src={data.jobOffer.imageUrl || "/placeholder-job.png"}
                        alt={data.jobOffer.title}
                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-1000"
                    />
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">

                        {/* title and buisness name hidden in md devices */}
                        <div className='hidden md:block'>
                            <h3 className="text-xl md:text-2xl font-bold text-blue-900 tracking-tight mb-1 truncate group-hover:text-blue-600 transition-colors duration-300">
                                {data.jobOffer.title}
                            </h3>
                            <div className="flex items-center gap-2 text-blue-600 mb-4">
                                <Briefcase className="h-4 w-4" />
                                <span className="text-sm font-bold capitalize">{data.jobOffer.businessName}</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                            {/* LOCATION TAG */}
                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-500 font-medium shadow-sm group-hover:bg-white transition-colors">
                                <MapPin size={16} className="shrink-0 text-green-500" />
                                <span className="truncate max-w-[150px] md:max-w-[250px] tracking-tight text-xs">{data.jobOffer.establishmentAddress}</span>
                            </div>
                            
                            {/* SALARY TAG */}
                            <div className="text-green-600 flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-lg border border-green-100 shadow-sm hover:bg-green-100 transition-colors">
                                <span className="text-[10px] font-medium uppercase tracking-wider opacity-60">Sueldo</span>
                                <span className="text-base md:text-lg font-bold tracking-tight">${salary.toLocaleString("es-CO")}</span>
                            </div>
                        </div>
                    </div>

                    {/* TOP RIGHT ACTIONS */}
                    <div className="hidden md:flex gap-6 items-end gap-2">
                        <div className="flex items-center gap-1.5 text-[10px] text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg font-bold uppercase tracking-wider mb-2">
                            <Calendar className="h-3 w-3" />
                            Postulado: {data.applicationDate}
                        </div>
                        <ApplyButtonDelete jobOfferId={data.jobOffer.jobOfferId} onDelete={onDelete} variant="icon" />
                    </div>
                </div>

                {/* DESCRIPTION */}
                {description && (
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 pt-4 mb-6">
                        {description}
                    </p>
                )}

                {/* FOOTER ACTIONS */}
                <div className="mt-auto pt-2 flex flex-col md:flex-row justify-between items-center border-t border-gray-50 gap-4">
                    <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                        <span className="text-xs flex font-medium text-blue-900">
                            <span className='font-semibold text-blue-600 pr-1'>Contrato:</span>
                            {data.jobOffer.salaryDescription}
                        </span>
                    </div>
                    
                    <div className="flex justify-between md:items-center gap-3 w-full md:w-auto">
                        <Link 
                            href={`/estudiante/postulacion/${data.jobOffer.jobOfferId}`} 
                            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 text-center tracking-wider flex items-center justify-center gap-2 active:scale-95 group/btn"
                        >
                            Ver Detalle Completo 
                            <Sparkles size={16} className="group-hover:rotate-12 hidden md:block transition-transform" />
                        </Link>
                        <div className="md:hidden flex-1">
                            <ApplyButtonDelete jobOfferId={data.jobOffer.jobOfferId} onDelete={onDelete} variant="icon" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
