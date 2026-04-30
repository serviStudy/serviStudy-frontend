import { Briefcase, Scroll, CheckCircle2 } from 'lucide-react'
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

    return (
        <div className='flex flex-col w-full gap-6 mt-4'>
            {/* Detalles de contratación */}
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 items-center'>
                    <div className='p-2 bg-[#2552d0] rounded-xl text-white shadow-md'>
                        <Scroll size={20} strokeWidth={2.5}/>
                    </div>
                    <h3 className='font-semibold text-lg md:text-xl text-blue-900 tracking-tight'>Detalles de Contratación</h3>
                </div>
                <div className='p-4 md:p-6 rounded-xl bg-slate-50 border border-slate-200 min-h-[60px] flex items-center'>
                    <p className='text-gray-700 text-sm md:text-base font-normal leading-relaxed'>
                        {offer.salaryDescription || offer.salary}
                    </p>
                </div>
            </div>

            {/* Descripción del puesto */}
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 items-center'>
                    <div className='p-2 bg-[#f97316] rounded-xl text-white shadow-md'>
                        <Briefcase size={20} strokeWidth={2.5}/>
                    </div>
                    <h3 className='font-semibold text-lg md:text-xl text-blue-900 tracking-tight'>Descripción del Puesto</h3>
                </div>
                <div className='p-4 md:p-6 rounded-xl bg-slate-50 border border-slate-200'>
                    <p className='text-gray-700 text-sm md:text-base font-normal leading-relaxed'>
                        {cleanDescription}
                    </p>
                </div>
            </div>

            {/* Habilidades y Requisitos */}
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 items-center'>
                    <div className='p-2 bg-[#0f172a] rounded-xl text-white shadow-md'>
                        <CheckCircle2 size={20} strokeWidth={2.5}/>
                    </div>
                    <h3 className='font-semibold text-lg md:text-xl text-blue-900 tracking-tight'>Habilidades y Requisitos</h3>
                </div>
                <div className='flex flex-wrap gap-2 px-1'>
                    {offer.requirements && offer.requirements.length > 0 ? (
                        offer.requirements.map((req: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">
                                <div className="w-1 h-1 rounded-full bg-blue-500" />
                                {req.requirementName || req.name || req}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 italic text-sm">No se especificaron requisitos adicionales.</p>
                    )}
                </div>
            </div>
        </div>
    )
}