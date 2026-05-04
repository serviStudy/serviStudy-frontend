import { CircleDollarSign, MapPin } from 'lucide-react'
import React from 'react'
import { Offer } from '@/features/restricted/estudiante/postPostularse/types/offer'
import { ConvertWorkDayTags } from '../hooks/ConvertWorkDayTags'
import { ConvertJornadaTags } from '../hooks/ConvertJornadaTags'
import Image from "next/image";

type Props = {
    offer: Offer
    isSelected: boolean
}

const ResultCrad = ({ offer, isSelected }: Props) => {
    if (!offer) return null;

    const dayTags = ConvertWorkDayTags(offer.workDays)
    const jornadaTags = ConvertJornadaTags(offer.workSchedule)

    return (
        <div className={`w-full rounded-xl bg-white p-4 md:p-5 transition-all duration-300 border cursor-pointer group ${isSelected ? 'border-blue-600 shadow-md ring-4 ring-blue-600/5' : 'border-gray-100 hover:border-blue-200 shadow-sm'}`}>
            <div className='flex gap-5 items-start'>
                {/* foto de la oferta */}
                <div className='w-16 h-16 md:w-20 md:h-20 shrink-0 bg-white border border-gray-100 rounded-xl overflow-hidden flex shadow-sm group-hover:scale-105 transition-transform duration-300 p-2'>
                    <Image
                        width={80}
                        height={80}
                        src={offer.imageUrl || "/placeholder-job.png"}
                        alt={offer.title}
                        className='object-contain w-full h-full'
                    />
                </div>

                <div className='flex flex-col gap-3 flex-1 min-w-0'>
                    <div className='flex flex-col gap-1'>
                        <p className={`font-semibold text-base md:text-lg truncate transition-colors ${isSelected ? 'text-blue-900' : 'text-gray-700 group-hover:text-blue-900'}`}>
                            {offer.title}
                        </p>

                        <div className='flex gap-4 flex-wrap mt-0.5'>
                            <div className='flex gap-1.5 items-center bg-green-50 px-2.5 py-1 rounded-lg border border-green-100'>
                                <MapPin className='text-green-600 h-3.5 w-3.5' />
                                <p className='text-green-700 text-xs font-medium capitalize tracking-wide'>{offer.address}</p>
                            </div>

                            <div className='flex gap-1.5 items-center bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100'>
                                <CircleDollarSign className='text-blue-600 h-3.5 w-3.5' />
                                <p className='text-blue-700 text-xs font-medium uppercase tracking-wide'>${Number(offer.salary).toLocaleString('es-CO')}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-2 flex-wrap'>
                        <span className='px-2.5 py-1.5 border-orange-600 text-orange-700 bg-orange-100 rounded-lg text-xs font-medium border border-amber-100 flex items-center gap-1.5'>
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                            {jornadaTags}
                        </span>

                        {dayTags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1.5 border-green-600 bg-green-100 text-green-700 rounded-lg text-xs font-medium border border-emerald-100 flex items-center gap-1.5"
                            >
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultCrad