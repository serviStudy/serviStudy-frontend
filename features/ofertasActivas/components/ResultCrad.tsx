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

const ResultCrad = ({ offer }: Props) => {
    if (!offer) return null; 

    const dayTags = ConvertWorkDayTags(offer.workDays)
    const jornadaTags = ConvertJornadaTags(offer.workSchedule)

    return (
        <div className='w-full rounded-[24px] bg-white p-4 md:p-6 transition-all border border-gray-100 shadow-sm hover:shadow-md'>
            <div className='flex gap-4 md:gap-6 items-center'>
                {/* foto de la oferta */}
                <div className='w-16 h-16 md:w-20 md:h-20 shrink-0 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center'>
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
                            <p className='text-blue-900 font-bold text-lg md:text-xl truncate'>{offer.title}</p>

                        <div className='flex gap-5'>
                            <div className='flex gap-1 items-center'>
                                <LocationEditIcon className='text-green-700 h-4 w-4'/>
                                <p className='text-green-700 text-[12px] font-medium'>{offer.address}</p>
                            </div>

                            <div className='flex gap-1 items-center'>
                                <CircleDollarSign className='text-primary h-5 w-5'/>
                                <p className='text-primary text-[12px] font-semibold'>{offer.salary}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-2 flex-wrap'>
                        <span className='px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold uppercase tracking-wider border border-amber-100'>
                            {jornadaTags}
                        </span>

                        {dayTags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100"
                            >
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