import { Button } from '@/components/ui/button'
import { Calendar, CircleDollarSign, Clock, MapPin } from 'lucide-react'
import React from 'react'
import { ApplicationCard } from '../hooks/applicationCard'

interface Props {
    data: ApplicationCard
}

export const Postulacion = ({data}: Props) => {
    return (
        <div className='flex p-5 gap-10 align-middle h-auto w-[85vw] lg:w-[85vw] lg:h-auto rounded-[21px] bg-white'>
            <div className='flex flex-col justify-center gap-5'>
                <div className='h-32 w-32 bg-gray-200 rounded-2xl'></div>
                <div className='flex gap-1 items-center'>
                    <MapPin className='text-green-700 w-4 h-4'/>
                    <p className='text-green-700 text-[12px] font-semibold'>{data.establishmentAddress}</p>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <h4 className='text-primary text-[22px] font-semibold'>{data.title}</h4>
                    <div className='flex gap-4'>
                        <p className='text-primary text-[18px] font-semibold'>{data.businessName}</p>
                        <div className='flex gap-1 align-middle items-center'>
                            <CircleDollarSign className='text-green-700 h-4.5 w-4.5'/>
                            <p className='text-green-700'>{data.salary}</p>
                        </div>
                    </div>
                </div>
                <div className='w-[90%]'>
                    <p className='text-gray-500 text-[14px] leading-4.5'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit debitis quia quibusdam maxime natus ut delectus, obcaecati culpa alias, eveniet animi modi deleniti ad mollitia ea. A deleniti eius rerum?
                    </p>
                </div>
                <div className='flex gap-3'>
                    <Button className='border flex items-center gap-1 rounded-2xl border-blue-800 bg-blue-100 text-primary px-4 h-7 text-xs font-semibold'>
                        Inglés intermedio
                    </Button>
                    <Button className='border flex items-center gap-1 rounded-2xl border-blue-800 bg-blue-100 text-primary px-4 h-7 text-xs font-semibold'>
                        Comunicación intrapersonal
                    </Button>
                </div>
            </div>

            <div className='flex flex-col justify-between items-end'>
                <Button className='border flex items-center gap-4 text-[14px] rounded-2xl border-red-600 bg-red-100 text-red-700 px-2.5 h-7 w-26 font-semibold'>
                    <div className='rounded-full h-4 w-4 bg-red-700'/>
                    Status
                </Button>

                <button className='bg-primary py-1 w-52 rounded-2xl font-semibold'>Ver oferta</button>
            </div>
        </div>
    )
}

{/*

                <div className='flex gap-3'>
                    <span className='border flex items-center gap-1 rounded-2xl border-orange-600 bg-orange-100 text-orange-700 px-3 py-1 text-xs font-semibold'>
                        <Clock className='text-orange-700 w-3 h-3'/>
                        jornada
                    </span>
                    <span className='border flex items-center gap-1 rounded-2xl border-green-600 bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold'>
                        <Calendar className='text-green-700 w-3 h-3'/>
                        jornada
                    </span>
                </div>    
*/}