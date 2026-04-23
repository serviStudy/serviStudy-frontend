import { CircleDollarSign, Clock, MapPin, Scroll } from 'lucide-react'
import React from 'react'
import { ApplicationItem, JobOffer } from '../types/applicationTypes'

interface Props {
    data: ApplicationItem
}

export const Postulacion = ({data}: Props) => {
    return (
        <div className='flex p-5 gap-10 align-middle h-auto w-[85vw] lg:w-[85vw] lg:h-auto rounded-[21px] bg-white'>
            <div className='flex flex-col justify-center gap-5'>
                <div className='h-32 w-32 bg-gray-200 rounded-2xl'></div>
                <div className='flex gap-1 items-center'>
                    <MapPin className='text-green-700 w-4 h-4'/>
                    <p className='text-green-700 text-[12px] font-semibold'>{data.jobOffer.establishmentAddress}</p>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <h4 className='text-primary text-[22px] font-semibold'>{data.jobOffer.title}</h4>
                    <div className='flex gap-4'>
                        <p className='text-primary text-[18px] font-semibold'>{data.jobOffer.businessName}</p>
                        <div className='flex gap-1 align-middle items-center'>
                            <CircleDollarSign className='text-green-700 h-4.5 w-4.5'/>
                            <p className='text-green-700'>{data.jobOffer.salary}</p>
                        </div>
                    </div>
                </div>
                <div className='w-[90%]'>
                    <p className='text-gray-500 text-[14px] leading-4.5'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit debitis quia quibusdam maxime natus ut delectus, obcaecati culpa alias, eveniet animi modi deleniti ad mollitia ea. A deleniti eius rerum?
                    </p>
                </div>
                {/* salary description */}
                <div className='border flex flex-col w-72 h-auto gap-1 rounded-2xl border-blue-700 bg-blue-50 p-2'>
                    <div className='flex gap-2 items-center'>
                        <Scroll className='text-primary h-6 w-6'/>
                        <p className='text-primary font-bold text-[15px]'>Detalles de contratacion</p>
                    </div>
                    <p className='text-gray-500 px-1 text-[13px]'>{data.jobOffer.salaryDescription}</p>
                </div>
            </div>

            <div className='items-start h-full'>
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