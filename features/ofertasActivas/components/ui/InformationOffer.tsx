import { Briefcase, Scroll, Info } from 'lucide-react'
import React from 'react'
import { Offer } from '@/features/postPostularse/types/offer';

interface InformationProps {
    offer: Offer;
}

export const InformationOffer = ({ offer }: InformationProps) => {
    if (!offer) return null 

    // Intentamos limpiar la descripción si viene con el formato hackeado anterior
    const cleanDescription = offer.description.includes("|||") 
        ? offer.description.split("|||")[0].trim() 
        : offer.description;

    const contractInfo = offer.description.includes("CONTRACT:")
        ? offer.description.split("CONTRACT:")[1].trim()
        : null;

    return (
        <div className='flex flex-col w-full gap-8 py-6'>
            {/* Descripción del puesto */}
            <div className='flex flex-col gap-4'>
                <div className='flex gap-2 items-center text-blue-900'>
                    <div className='p-2 bg-blue-50 rounded-xl'>
                        <Briefcase size={20} className='text-blue-600'/>
                    </div>
                    <h5 className='font-black text-lg'>Descripción del puesto</h5>
                </div>
                <div className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm">
                    <p className='text-gray-600 leading-relaxed text-[15px]'>
                        {cleanDescription}
                    </p>
                    {contractInfo && (
                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-start gap-3">
                            <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-[13px] font-medium text-blue-600/80">
                                <span className="font-bold">Nota de contrato:</span> {contractInfo}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Detalles de contratación */}
            <div className='flex flex-col gap-4'>
                <div className='flex gap-2 items-center text-blue-900'>
                    <div className='p-2 bg-indigo-50 rounded-xl'>
                        <Scroll size={20} className='text-indigo-600'/>
                    </div>
                    <h5 className='font-black text-lg'>Detalles de contratación</h5>
                </div>
                <div className='bg-gradient-to-br from-indigo-50/50 to-blue-50/50 rounded-[24px] p-6 border border-indigo-100/50'>
                    <p className='text-blue-900 font-bold text-base leading-relaxed'>
                        {offer.salaryDescription}
                    </p>
                </div>
            </div>
        </div>
    )
}