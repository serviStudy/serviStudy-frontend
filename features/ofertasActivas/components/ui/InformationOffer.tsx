import { Briefcase, Scroll } from 'lucide-react'
import React from 'react'
import { ActiveOffer } from '../../types/ofertasActivas.types';

interface InformationProps {
    offer: ActiveOffer;
}

export const InformationOffer = ({ offer }: InformationProps) => {
    if (!offer) return null 

    return (
        <div className='flex flex-col w-full gap-6'>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-3 items-center'>
                    <div className='bg-blue-100 rounded-2xl p-3'>
                        <Briefcase className='text-primary h-5 w-5'/>
                    </div>
                    <p className='text-primary font-bold text-[18px]'>Labores y descripción del puesto</p>
                </div>
                <div className='flex gap-2'> {/* quiatr || y contract de infor card offer */}
                    <p className='text-gray-500 px-1 text-[15px]'>{offer.description.split("|||")[0].trim()}</p>
                    <p className='text-gray-500 px-1 text-[15px]'>{offer.description.split("CONTRACT:")[1].trim()}</p>
                </div>
                
            </div>

            <div className='border flex flex-col gap-2 rounded-xl border-blue-700 bg-blue-50 p-4'>
                <div className='flex gap-2 items-center'>
                    <Scroll className='text-primary h-6 w-6'/>
                    <p className='text-primary font-bold text-[18px]'>Detalles de contratacion</p>
                </div>
                <p className='text-gray-500 px-1 text-[15px]'>{offer.salaryDescription}</p>
            </div>
        </div>
    )
}