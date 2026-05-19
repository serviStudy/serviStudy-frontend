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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden w-full"
        >
            {/* Indicator line */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Left: Avatar/Image */}
            <div className="shrink-0 flex items-center justify-center md:items-start">
                <div className="w-22 h-22 bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm transition-transform group-hover:scale-105 flex items-center justify-center">
                    <Image
                        width={80}
                        height={80}
                        src={data.jobOffer.imageUrl || "/placeholder-job.png"}
                        alt={data.jobOffer.title}
                        className="object-contain rounded-xl w-full h-full p-2"
                    />
                </div>
            </div>

            {/* Center: Info Section */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex flex-col gap-1 mb-3">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate group-hover:text-blue-800 transition-colors duration-300 pr-32">
                        {data.jobOffer.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-semibold capitalize">{data.jobOffer.businessName}</span>
                    </div>
                </div>

                {/* Location and Salary Grid */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 mt-3 mb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                            <MapPin size={14} className="text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-700 font-medium truncate max-w-[200px]" title={data.jobOffer.establishmentAddress}>
                            {data.jobOffer.establishmentAddress}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                            <Sparkles size={14} className="text-green-600" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-0.5">Sueldo</span>
                            <span className="text-sm text-green-700 font-bold">${salary.toLocaleString("es-CO")}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                            <FileText size={14} className="text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">
                            {data.jobOffer.salaryDescription}
                        </span>
                    </div>
                </div>

                {/* Description in Gray Box */}
                {description && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2">
                        <p className="text-sm text-gray-600 italic leading-relaxed line-clamp-2">
                            "{description}"
                        </p>
                    </div>
                ) || (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2">
                        <p className="text-sm text-gray-400 italic">Sin descripción proporcionada</p>
                    </div>
                )}
            </div>

            {/* Application Date stuck to the corner */}
            <div className="absolute top-0 right-0 hidden md:flex items-center gap-2.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-bl-2xl border-l border-b border-blue-100 shadow-sm z-20">
                <Calendar size={14} />
                {data.applicationDate}
            </div>

            {/* Right: Actions Area */}
            <div className="shrink-0 flex flex-col justify-around items-end md:mt-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-8}4 md:pl-6 min-w-[160px]">
                <Link 
                    href={`/estudiante/postulacion/${data.jobOffer.jobOfferId}`} 
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:shadow-md active:scale-95 text-center uppercase tracking-wider flex items-center justify-center gap-2"
                >
                    Ver Detalle
                    <ArrowUpRight size={14} />
                </Link>
                <div className="w-full flex justify-end">
                    <ApplyButtonDelete jobOfferId={data.jobOffer.jobOfferId} onDelete={onDelete} variant="icon" />
                </div>
            </div>
        </motion.div>
    )
}
