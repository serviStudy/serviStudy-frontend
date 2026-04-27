import { CircleDollarSign, LocationEditIcon } from 'lucide-react'
import React from 'react'
import { Offer } from '@/features/postPostularse/types/offer'
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
        <div className={`w-full rounded-[24px] p-5 md:p-6 transition-all duration-300 border-[2px] cursor-pointer group ${isSelected ? 'bg-blue-50/50 border-blue-500 shadow-md' : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200'}`}>
            <div className='flex gap-4 md:gap-5 items-center'>
                {/* foto de la oferta */}
                <div className='w-16 h-16 md:w-20 md:h-20 shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300'>
                    <Image
                        width={80}
                        height={80}
                        src={offer.imageUrl || "/placeholder-job.png"}
                        alt={offer.title}
                        className='object-cover w-full h-full'                 
                    />
                </div>

                <div className='flex flex-col gap-3 flex-1 min-w-0'>
                    <div className='flex flex-col gap-1'>
                        <p className={`font-extrabold text-lg md:text-xl truncate transition-colors ${isSelected ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-600'}`}>
                            {offer.title}
                        </p>

                        <div className='flex gap-4 md:gap-6 mt-1 flex-wrap'>
                            <div className='flex gap-1.5 items-center bg-green-50 px-2 py-0.5 rounded-lg border border-green-100'>
                                <LocationEditIcon className='text-green-600 h-3.5 w-3.5'/>
                                <p className='text-green-700 text-[11px] font-bold uppercase tracking-wide'>{offer.address}</p>
                            </div>

                            <div className='flex gap-1.5 items-center bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100'>
                                <CircleDollarSign className='text-blue-600 h-3.5 w-3.5'/>
                                <p className='text-blue-700 text-[11px] font-bold uppercase tracking-wide'>{offer.salary}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-2 flex-wrap mt-1'>
                        <span className='px-3 py-1.5 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold border border-amber-100/50 flex items-center gap-1.5'>
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                            {jornadaTags}
                        </span>

                        {dayTags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-100/50 flex items-center gap-1.5"
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