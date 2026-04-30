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
        <div className='flex flex-col w-full gap-8 mt-4'>
            {/* Detalles de contratación */}
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 items-center'>
                    <div className='p-2 bg-[#2552d0] rounded-xl text-white shadow-md'>
                        <Scroll size={22} strokeWidth={2.5}/>
                    </div>
                    <h3 className='font-black text-xl text-[#0f172a] tracking-tight'>Detalles de Contratación</h3>
                </div>
                <div className='p-6 rounded-[32px] bg-[#f1f5f9]/50 border border-[#e2e8f0]/60 min-h-[80px] flex items-center'>
                    <p className='text-[#475569] text-sm md:text-base font-medium leading-relaxed'>
                        {offer.salaryDescription || offer.salary}
                    </p>
                </div>
            </div>

            {/* Descripción del puesto */}
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 items-center'>
                    <div className='p-2 bg-[#f97316] rounded-xl text-white shadow-md'>
                        <Briefcase size={22} strokeWidth={2.5}/>
                    </div>
                    <h3 className='font-black text-xl text-[#0f172a] tracking-tight'>Descripción del Puesto</h3>
                </div>
                <div className='p-6 rounded-[32px] bg-[#f1f5f9]/50 border border-[#e2e8f0]/60'>
                    <p className='text-[#475569] text-sm md:text-base font-medium leading-relaxed'>
                        {cleanDescription}
                    </p>
                </div>
            </div>

            {/* Habilidades y Requisitos */}
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 items-center'>
                    <div className='p-2 bg-[#0f172a] rounded-xl text-white shadow-md'>
                        <CheckCircle2 size={22} strokeWidth={2.5}/>
                    </div>
                    <h3 className='font-black text-xl text-[#0f172a] tracking-tight'>Habilidades y Requisitos</h3>
                </div>
                <div className='flex flex-wrap gap-2 px-1'>
                    {offer.requirements && offer.requirements.length > 0 ? (
                        offer.requirements.map((req: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-[#dbeafe] text-[#1e40af] rounded-full text-sm font-bold border border-[#bfdbfe]">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
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