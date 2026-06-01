"use client";

import { Pencil, Trash2, MapPin, Sparkles, Clock, Calendar, Users, CircleDollarSign } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { JobOfferDTO } from "../../jobOffer/types/jobOffer.types";

    interface Props {
    offer: JobOfferDTO;
    imageUrl?: string;
    onRefresh?: () => void;
    showActions?: boolean;
    }

    export const Offer = ({ offer, imageUrl, showActions = true }: Props) => {
    const offerId = offer.jobOfferId || offer.id || (offer as any).idJobOffer;

    const isActive = offer.status === "ACTIVE";



    return (
        <div className="w-full">
        {/* MOBILE VERSION (lg:hidden) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden group bg-linear-to-br from-blue-100 to-green-100 rounded-[24px] border border-gray-200 p-4 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col"
        >
            <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-700 ${isActive ? 'bg-linear-to-r from-green-300 to-blue-500' : 'bg-linear-to-r from-yellow-200 to-orange-500'}`} />
            
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner shrink-0 overflow-hidden">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-3xl font-black">
                                {offer.title?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex flex-col pt-1">
                        <h3 className="text-base md:text-lg font-black text-gray-900 truncate leading-tight mb-1">{offer.title}</h3>
                        <div className="flex items-center gap-1 text-gray-500 text-[11px] md:text-xs font-bold uppercase tracking-wider mb-2">
                            <MapPin size={12} className="text-green-500" />
                            <span className="truncate">{offer.establishment_address || offer.establishmentAddress}</span>
                        </div>
                        <div className="hidden md:flex flex-wrap gap-2 mb-2">
                            <div className="px-2.5 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-xs font-medium border border-orange-100 flex items-center gap-1.5 shadow-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                                {(offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Jornada Completa" : (offer.work_schedule || offer.workSchedule) === "PART_TIME" ? "Media Jornada" : "Flexible"}
                            </div>
                            <div className="px-2.5 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium border border-green-100 flex items-center gap-1.5 shadow-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                {(offer.work_days || offer.workDays)?.length > 2 ? "Entre semana" : "Fines de semana"}
                            </div>
                        </div>
                    </div>
                </div>
                {showActions && (
                    <div className="flex flex-col items-center gap-2 ml-2 shrink-0">
                        <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-2 rounded-lg bg-white/50 text-gray-500 hover:bg-white transition-colors">
                            <Pencil size={16} />
                        </Link>
                    </div>
                )}
            </div>

            <div className="mb-4">
                <div className="bg-white/40 p-2.5 rounded-lg border border-white/50">
                    <p className="text-[13px] md:text-sm text-gray-600 line-clamp-3 leading-relaxed">{offer.description}</p>
                </div>
            </div>

            <div className="flex justify-between items-center border-t pt-3 border-gray-200 mt-auto">
                <div className="flex flex-wrap gap-1.5 flex-1 pr-4">
                    {offer.requirements?.slice(0, 3).map((req: any, index: number) => (
                        <span key={index} className="bg-white border border-gray-100 text-gray-500 px-2 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            {typeof req === 'string' ? req : (req.requirementName || req.name || "Requisito")}
                        </span>
                    ))}
                </div>
                <div className='flex gap-1.5 items-center bg-green-50 px-2.5 py-1 rounded-lg border border-green-100 shadow-sm'>
                    <CircleDollarSign className='text-green-600 h-3.5 w-3.5' />
                    <p className='text-green-700 text-xs font-medium uppercase tracking-wide'>${Number(offer.salary).toLocaleString('es-CO')}</p>
                </div>
            </div>

            {showActions && (
                <div className="flex gap-2 mt-4">
                    <Link 
                        href={`/empleador/applicants/${offerId}`} 
                        className="flex-1 bg-white border-2  border-green-600 text-green-600 h-10 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        Postulantes <Users size={12} />
                    </Link>
                    <Link 
                        href={`/empleador/ofertas/${offerId}`} 
                        className="flex-1 bg-green-600 text-white h-10 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-95"
                    >
                        Ver Detalle <Sparkles size={12} />
                    </Link>
                </div>
            )}
        </motion.div>

        {/* DESKTOP VERSION (hidden lg:flex) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:flex group bg-white p-6 gap-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden w-full"
        >
            <div className={`absolute left-0 top-0 bottom-0 w-3 transition-all duration-700 ${isActive ? 'bg-linear-to-r from-green-500 to-emerald-300' : 'bg-linear-to-b from-orange-500 to-amber-300'}`} />
            <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-green-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>

            <div className="relative shrink-0">
            <div className="w-36  h-36 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner group-hover:rotate-2 transition-all duration-700">
                {imageUrl ? (
                <img src={imageUrl} alt="Establecimiento" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                ) : (
                <div className="w-full h-full bg-linear-to-br from-green-600 via-green-500 to-green-400 flex items-center justify-center text-white text-8xl font-black shadow-lg">
                    {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
                </div>
                )}
            </div>
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start gap-6">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 tracking-tight mb-3 truncate group-hover:text-green-600 transition-colors duration-300">
                            {offer.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 my-6">
                            {[
                            { label: (offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Jornada Completa" : (offer.work_schedule || offer.workSchedule) === "PART_TIME" ? "Media Jornada" : "Flexible", color: "text-orange-700 bg-orange-50 border-orange-100", dot: "bg-orange-500" },
                            { label: (offer.work_days || offer.workDays)?.length > 2 ? "Entre semana" : "Fines de semana", color: "text-green-700 bg-green-50 border-green-100", dot: "bg-green-500" }
                            ].map((tag, i) => (
                            <div key={i} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border shadow-sm ${tag.color}`}>
                                <div className={`h-1.5 w-1.5 rounded-full ${tag.dot}`}></div>
                                {tag.label}
                            </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-1 pb-4.5">
                    <p className="text-sm text-gray-500 capitalize">{offer.description}</p>
                </div>

                <div className="flex justify-between items-center border-t pt-2 border-gray-100">
                    <div className="flex justify-between">
                        <div className="flex gap-2 flex-wrap justify-start">
                        {offer.requirements?.slice(0, 4).map((req: any, index: number) => (
                            <span key={index} className="bg-white border border-gray-100 text-gray-500 px-3 py-1 rounded-lg text-[10px] font-medium uppercase tracking-wider shadow-sm group-hover:border-green-100 transition-colors">
                            {typeof req === 'string' ? req : (req.requirementName || req.name || "Requisito")}
                            </span>
                        ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-500 font-medium shadow-sm group-hover:bg-white transition-colors">
                            <MapPin size={16} className="shrink-0 text-green-500" />
                            <span className="truncate max-w-37.5 tracking-tight text-xs">{offer.establishment_address || offer.establishmentAddress}</span>
                        </div>
                        <div className='flex gap-1.5 items-center bg-green-50 px-2.5 py-1 rounded-lg border border-green-100 shadow-sm'>
                            <CircleDollarSign className='text-green-600 h-3.5 w-3.5' />
                            <p className='text-green-700 text-xs font-medium uppercase tracking-wide'>${Number(offer.salary).toLocaleString('es-CO')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
        </div>
    );
};