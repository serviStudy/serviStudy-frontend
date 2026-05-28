import { CircleDollarSign, MapPin, ArrowRight, Briefcase } from 'lucide-react'
import React from 'react'
import { Offer } from '@/features/restricted/estudiante/postPostularse/types/offer'
import { ConvertWorkDayTags } from '../hooks/ConvertWorkDayTags'
import { ConvertJornadaTags } from '../hooks/ConvertJornadaTags'
import Image from "next/image";
import Link from 'next/link';

type Props = {
    offer: Offer
}

const cleanDescription = (raw: string): string => {
    return raw ? raw.split('|||')[0].trim() : '';
};


const ResultCrad = ({ offer }: Props) => {
    if (!offer) return null;

    const dayTags = ConvertWorkDayTags(offer.workDays)
    const jornadaTags = ConvertJornadaTags(offer.workSchedule)
    const description = cleanDescription(offer.description);


    return (
        <Link 
            href={`/estudiante/postulacion/${offer.id}`}
            className="group block w-full rounded-xl bg-white border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
        >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="p-4 md:p-6 flex flex-col md:flex-row gap-5 md:gap-6 md:items-center">
                <div className='flex gap-5 items-start flex-1 min-w-0'>
                    {/* foto de la oferta */}
                    <div className='flex flex-col gap-4'>
                        
                        {offer.imageUrl ? (
                            <div className='w-16 h-16 md:w-28 md:h-28 shrink-0 bg-white border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 p-2'>
                                <Image
                                    width={80}
                                    height={80}
                                    src={offer.imageUrl || "/placeholder-job.png"}
                                    alt={offer.title}
                                    className='object-contain w-full h-full'
                                />
                            </div>
                        ) : (
                            <div className="w-16 h-16 md:w-28 md:h-28 bg-emerald-50 rounded-xl flex items-center justify-center font-bold text-emerald-600 text-3xl uppercase">
                                {offer?.title?.charAt(0) || "P"}
                            </div>
                        )
                        }

                        <div className='flex gap-1.5 items-center bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100'>
                            <CircleDollarSign className='text-blue-600 h-3.5 w-3.5' />
                            <p className='text-blue-700 text-xs font-medium uppercase tracking-wide'>${Number(offer.salary).toLocaleString('es-CO')}</p>
                        </div>
                    </div>
    

                    <div className='flex flex-col pl-4 gap-3 flex-1 min-w-0'>

                        <div className='flex flex-col gap-1'>
                            <h3 className="text-lg md:text-xl capitalize font-bold text-blue-900 truncate transition-colors duration-300 pr-32">
                                {offer.title}
                            </h3>

                            <div className='flex gap-4 flex-wrap mt-0.5'>
                                <div className='flex gap-1.5 items-center bg-green-100 px-2.5 py-1 rounded-lg border-none'>
                                    <MapPin className='text-green-500 h-3.5 w-3.5' strokeWidth={2.5} />
                                    <p className='text-green-700 text-xs font-medium capitalize tracking-wide truncate max-w-37.5 md:max-w-xs'>{offer.address}</p>
                                </div>

                                <span className='px-2.5 py-1.5 border-none text-orange-700 bg-orange-100 rounded-lg text-xs font-medium border flex items-center gap-1.5'>
                                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                    {jornadaTags}
                                </span>

                                {dayTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1.5  bg-green-100 text-green-700 rounded-lg text-xs font-medium border-no flex items-center gap-1.5"
                                    >
                                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {description && (
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2">
                                <p className="text-sm text-gray-600 italic leading-relaxed line-clamp-2 capitalize">
                                    "{description}"
                                </p>
                            </div>
                        ) || (
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2">
                                <p className="text-sm text-gray-400 italic">Sin descripción proporcionada</p>
                            </div>
                        )}

                    </div>
                </div>

                {/* Right Area: View details button */}
                <div className="shrink-0 flex items-center justify-end border-t border-gray-50 md:border-t-0 md:border-l md:border-gray-100 pt-3 md:pt-0 md:pl-6 mt-2 md:mt-0">
                    <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white px-5 py-2.5 rounded-xl transition-all duration-300">
                        Ver más detalles
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ResultCrad