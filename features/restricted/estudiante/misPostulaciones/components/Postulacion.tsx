"use client"
import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import { CircleDollarSign, MapPin, CalendarDays, ArrowUpRight, Clock, Briefcase, FileText } from 'lucide-react'
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

    return (
        <div className="group bg-white border border-gray-100 border-l-4 border-l-[#2552d0] rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden relative">
            
            {/* DATE TAG - Top Right (Consistently applied but responsive) */}
            <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 px-3 py-1 text-[10px] font-bold rounded-bl-xl border-b border-l border-blue-100 uppercase tracking-wider z-10 md:hidden">
                {data.applicationDate}
            </div>

            <div className="flex flex-col md:flex-row p-4 md:py-4 md:px-6 gap-4 md:gap-6">
                
                {/* Logo & Header Info Row (Combined for Mobile) */}
                <div className="flex items-start gap-4 md:gap-6 w-full md:w-auto">
                    {/* Visual Anchor: Company Logo */}
                    <div className="shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                        <Image
                            width={96}
                            height={96}
                            src={data.jobOffer.imageUrl || "/placeholder-job.png"}
                            alt={data.jobOffer.title}
                            className="object-contain w-full h-full p-2 md:p-3 group-hover:scale-105 transition-transform"
                        />
                    </div>

                    {/* Mobile Only: Title & Company next to logo */}
                    <div className="flex-1 min-w-0 md:hidden">
                        <h3 className="text-lg font-bold text-blue-900 leading-tight mb-1 truncate group-hover:text-blue-600 transition-colors">
                            {data.jobOffer.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-blue-600">
                            <Briefcase className="h-3.5 w-3.5" />
                            <span className="text-xs font-semibold truncate">{data.jobOffer.businessName}</span>
                        </div>
                    </div>
                </div>

                {/* Information Body */}
                <div className="flex-1 min-w-0 flex flex-col">
                    
                    {/* Desktop Header: Title & Application Date */}
                    <div className="hidden md:flex items-start justify-between gap-3 mb-2">
                        <div className="min-w-0">
                            <h3 className="text-xl font-bold text-blue-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                                {data.jobOffer.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-blue-600">
                                <Briefcase className="h-4 w-4" />
                                <span className="text-sm font-semibold">{data.jobOffer.businessName}</span>
                            </div>
                        </div>
                        
                        <div className="shrink-0 self-start flex items-center gap-1.5 text-[10px] text-blue-600 bg-blue-50/50 border border-blue-100 px-3 py-1 rounded-lg font-bold uppercase tracking-wider">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {data.applicationDate}
                        </div>
                    </div>

                    {/* Metadata Row: Location and Salary (Mobile: Split Left/Right) */}
                    <div className="flex items-center justify-between md:justify-start md:gap-x-6 gap-y-2 mb-3 md:mb-4">
                        <div className="flex items-center gap-1.5 text-gray-700">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">{data.jobOffer.establishmentAddress}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-blue-900 bg-blue-50/50 md:bg-transparent px-2 py-0.5 md:p-0 rounded-lg md:rounded-none">
                            <CircleDollarSign className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-bold">
                                ${Number(data.jobOffer.salary || 0).toLocaleString("es-CO")}
                            </span>
                        </div>
                    </div>

                    {/* Description: Visible on all screens */}
                    {description && (
                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed line-clamp-2 mb-4">
                            {description}
                        </p>
                    )}

                    {/* Footer: Details Chip and Actions */}
                    <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                        
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            {data.jobOffer.salaryDescription && (
                                <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                    <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                                    <span className="text-xs flex font-medium text-blue-900">
                                        <span className='font-semibold text-blue-600 pr-1'>Contrato:</span>
                                        {data.jobOffer.salaryDescription}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Actions: Reorganized for Mobile Balance */}
                        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
                            <div className="flex-1 md:flex-none">
                                <ApplyButtonDelete jobOfferId={data.jobOffer.jobOfferId} onDelete={onDelete} />
                            </div>
                            <Link
                                href={`/estudiante/postulacion/${data.jobOffer.jobOfferId}`}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-800 text-white text-sm font-semibold px-4 md:px-6 py-2 md:py-2.5 rounded-xl transition-all shadow-sm shadow-blue-200"
                            >
                                Ver detalles
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}