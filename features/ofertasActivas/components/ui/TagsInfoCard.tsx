import { Calendar, CircleDollarSign, Clock, MapPin } from 'lucide-react'
import React from 'react'
import { ActiveOffer } from '../../types/ofertasActivas.types';
import { formatLabel } from '../../hooks/FormatLabel';
import { spawn } from 'child_process';
import { ConvertWorkDayTags } from '../../hooks/ConvertWorkDayTags';
import { ConvertJornadaTags } from '../../hooks/ConvertJornadaTags';

interface TagsCardProps {
    offer: ActiveOffer;
}

export const TagsInfoCard = ({ offer }: TagsCardProps) => {
    if (!offer) return null
    
    const dayTags = ConvertWorkDayTags(offer.workDays)
    const jornadaTags = ConvertJornadaTags(offer.workSchedule)

    return (
        <div className='w-full md:pt-12 pt-10 flex flex-wrap gap-2 md:gap-3'>
            
            <div className='bg-sky-100 w-auto px-3 lg:px-5 py-2 rounded-[7px]'>
                <div className='flex lg:-mb-0.5 -mb-1 gap-1.5 items-center text-primary'>
                    <CircleDollarSign className='h-5 w-5'/>
                    <p className='font-medium'>Salario</p>
                </div>
                <p className='text-gray-500 font-semibold text-[13px] pl-7'>{offer.salary}</p>
            </div>

            <div className='bg-emerald-100 space-x-0 w-auto px-3 lg:px-5 py-2 rounded-[7px]'>
                <div className='flex lg:-mb-0.5 -mb-1 gap-1.5 items-center text-green-700'>
                    <MapPin className='h-5 w-5'/>
                    <p className='font-medium'>Dirección</p>
                </div>
                <p className='text-gray-500 font-semibold text-[13px] pl-7'>{offer.establishmentAddress}</p>
            </div>

            <div className='bg-amber-100 space-x-0 w-auto px-3 lg:px-5 py-2 rounded-[7px]'>
                <div className='flex lg:-mb-0.5 -mb-1 gap-1.5 items-center text-orange-700'>
                    <Clock className='h-5 w-5'/>
                    <p className='font-medium'>Jornada</p>
                </div>
                <span className='text-gray-500 font-semibold text-[13px] pl-7'>
                    {jornadaTags}
                </span>
            </div>

            <div className='bg-emerald-100 space-x-0 w-auto px-3 lg:px-5 py-2 rounded-[7px]'>
                <div className='flex gap-1.5 lg:-mb-0.5 -mb-1 items-center text-green-700'>
                    <Calendar className='h-5 w-5'/>
                    <p className='font-medium'>Días laborales</p>
                </div>
                {dayTags.map((tag) => (
                    <span
                        key={tag}
                        className='text-gray-500 font-semibold text-[13px] pl-7'
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}
