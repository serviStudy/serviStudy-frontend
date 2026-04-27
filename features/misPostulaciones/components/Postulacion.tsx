import { CircleDollarSign, MapPin, Scroll } from 'lucide-react'
import React from 'react'
import { ApplicationItem} from '../types/applicationTypes'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ApplyButtonDelete } from '../hooks/ApplyButtonDelete';


interface Props {
    data: ApplicationItem
}

export const Postulacion = ({data}: Props) => {
    return (
        <div className='flex px-10 py-5 gap-14 align-middle h-auto w-[85vw] lg:w-[85vw] lg:h-auto rounded-[21px] bg-white'>
            {/* foto de la oferta */}
            <div className='w-28 h-28 bg-transparent'>
                <Image
                    width={123}
                    height={30}
                    src={data.jobOffer.imageUrl || "/placeholder-job.png"}
                    alt={data.jobOffer.title}
                    className='object-cover rounded-[10px]'                 
                />
            </div>

            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <h4 className='text-primary text-[22px] font-bold'>{data.jobOffer.title}</h4>
                            <p className='text-primary text-[15px] font-semibold'>{data.jobOffer.businessName}</p>
                        </div>
                        <Button className='text-blue-500 border bg-blue-100 rounded-full h-7 px-4 text-[13px]'>{data.applicationDate}</Button>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex gap-1 items-center'>
                            <MapPin className='text-gray-500 w-4.5 h-4.5'/>
                            <p className='text-gray-500 text-[12px] font-semibold'>{data.jobOffer.establishmentAddress}</p>
                        </div>
                        <div className='flex gap-1 align-middle items-center'>
                            <CircleDollarSign className='text-gray-500 h-4.5 w-4.5'/>
                            <p className='text-gray-500'>{data.jobOffer.salary}</p>
                        </div>
                    </div>
                    <div className='w-[90%]'>
                        <p className='text-gray-500 text-[14px] leading-4.5'>{data.jobOffer.description}</p>
                    </div>
                </div>

                <hr className='w-auto border text-gray-200'/>

                <div className='flex w-[70vw] justify-between'>
                    {/* salary description */}
                    <div className='flex flex-col'>
                        <div className='flex gap-2 items-center'>
                            <Scroll className='text-primary h-6 w-6'/>
                            <p className='text-primary font-bold text-[15px]'>Detalles de contratacion</p>
                        </div>
                        <p className='text-gray-500 px-1 text-[13px]'>{data.jobOffer.salaryDescription}</p>
                    </div>
                    <div className='flex gap-4'>
                        
                        <ApplyButtonDelete postulationId={data.applicantId}></ApplyButtonDelete>
                        <Link className='bg-primary text-white rounded-full h-9 py-1 w-auto px-12 font-semibold' href={`/estudiante/postulacion/${data.jobOffer.jobOfferId}`}>Ver oferta</Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}