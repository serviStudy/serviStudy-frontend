import React from 'react'
import { HeaderInfoCard } from './ui/HeaderInfoCard'
import { TagsInfoCard } from './ui/TagsInfoCard'
import { InformationOffer } from './ui/InformationOffer'
import { Offer } from '@/features/restricted/estudiante/postPostularse/types/offer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface InfoCardProps {
    offer: Offer | null;
}

export const InfoCard = ({ offer }: InfoCardProps) => {
    if (!offer) {
        return (
            <div className='w-full rounded-[18px] bg-white p-8 text-center border border-gray-100 shadow-sm'>
                <p className="text-gray-400 font-medium italic">Selecciona una oferta para ver los detalles.</p>
            </div>
        )
    }

    return (
        <div className='w-full rounded-[40px] bg-white border border-gray-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] overflow-hidden'>
            <HeaderInfoCard offer={offer}/>
            
            <div className='p-6 md:p-8 pt-4'>
                <TagsInfoCard offer={offer}/>
                
                <div className='mt-8'>
                    <InformationOffer offer={offer}/>
                </div>

                <div className='mt-8 sticky bottom-0 bg-white/80 backdrop-blur-md pt-4 pb-2'>
                    <Link 
                        className='group flex items-center justify-center gap-2 bg-[#2552d0] hover:bg-[#1e44af] text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg active:scale-[0.98]' 
                        href={`/estudiante/postulacion/${offer.id}`}
                    >
                        <span className="text-base">Ver más detalles</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    )
}