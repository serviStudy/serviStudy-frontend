import { Briefcase, Scroll, Info } from 'lucide-react'
import React from 'react'
import { Offer } from '@/features/restricted/estudiante/postPostularse/types/offer';

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
        <div className='flex flex-col w-full gap-6 py-4'>
            {/* Descripción del puesto */}
            <div className='flex flex-col gap-4 bg-gray-50/50 rounded-3xl p-6 md:p-8 border border-gray-100/80 hover:shadow-sm transition-shadow duration-300'>
                <div className='flex gap-3 items-center'>
                    <div className='p-2.5 bg-white rounded-xl shadow-sm border border-gray-100/80'>
                        <Briefcase size={20} className='text-blue-600' strokeWidth={2.5}/>
                    </div>
                    <h5 className='font-bold text-xl text-gray-900'>Descripción del puesto</h5>
                </div>
                <div>
                    <p className='text-gray-600 leading-relaxed text-[15px] font-medium'>
                        {cleanDescription}
                    </p>
                    {contractInfo && (
                        <div className="mt-5 pt-5 border-t border-gray-200/50 flex items-start gap-3">
                            <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-[13px] font-semibold text-blue-700/80">
                                <span className="font-extrabold text-blue-800">Nota de contrato:</span> {contractInfo}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Detalles de contratación */}
            <div className='flex flex-col gap-4 bg-gray-50/50 rounded-3xl p-6 md:p-8 border border-gray-100/80 hover:shadow-sm transition-shadow duration-300'>
                <div className='flex gap-3 items-center'>
                    <div className='p-2.5 bg-white rounded-xl shadow-sm border border-gray-100/80'>
                        <Scroll size={20} className='text-blue-600' strokeWidth={2.5}/>
                    </div>
                    <h5 className='font-bold text-xl text-gray-900'>Detalles de contratación</h5>
                </div>
                <div>
                    <p className='text-gray-600 font-medium text-[15px] leading-relaxed'>
                        {offer.salaryDescription}
                    </p>
                </div>
            </div>
        </div>
    )
}