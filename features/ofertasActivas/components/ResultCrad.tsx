import { CircleDollarSign, LocationEditIcon } from 'lucide-react'
import React from 'react'
import { ActiveOffer } from '../types/ofertasActivas.types'
import { ConvertWorkDayTags } from '../hooks/ConvertWorkDayTags'
import { ConvertJornadaTags } from '../hooks/ConvertJornadaTags'
import Image from "next/image";

type Props = {
    offer: ActiveOffer
    isSelected: boolean
}

const ResultCrad = ({ offer }: Props) => {
    if (!offer) return null; 

    const dayTags = ConvertWorkDayTags(offer.workDays)
    const jornadaTags = ConvertJornadaTags(offer.workSchedule)

    return (
        <div className='lg:w-138 lg:h-34 w-100 h-28 rounded-[21px] bg-white'>
            <div className='flex h-full gap-8 pl-10 items-center'>
                {/* foto de la oferta */}
                <div className='w-21.25 h-21.25 bg-gray-200 rounded-[10px]'>
                    <Image
                        src={offer.imageUrl}
                        alt={offer.title}
                        className='object-cover'                 
                    />
                </div>

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                            <p className='text-primary font-bold text-[18px]'>{offer.title}</p>

                        <div className='flex gap-5'>
                            <div className='flex gap-1 items-center'>
                                <LocationEditIcon className='text-green-700 h-4 w-4'/>
                                <p className='text-green-700 text-[12px] font-medium'>{offer.establishmentAddress}</p>
                            </div>

                            <div className='flex gap-1 items-center'>
                                <CircleDollarSign className='text-primary h-5 w-5'/>
                                <p className='text-primary text-[12px] font-semibold'>{offer.salary}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4 flex-wrap'>
                        <span className='border rounded-2xl border-orange-600 bg-orange-100 text-orange-700 px-3 py-1 text-xs font-semibold'>
                            {jornadaTags}
                        </span>

                        {dayTags.map((tag) => (
                            <span
                                key={tag}
                                className="border rounded-2xl border-green-700 bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold"
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