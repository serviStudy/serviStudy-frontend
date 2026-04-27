import React from 'react'
import { HeaderInfoCard } from './ui/HeaderInfoCard'
import { TagsInfoCard } from './ui/TagsInfoCard'
import { InformationOffer } from './ui/InformationOffer'
import { Offer } from '@/features/postPostularse/types/offer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface InfoCardProps {
    offer: Offer | null;
}

export const InfoCard = ({ offer }: InfoCardProps) => {
    if (!offer) {
        return (
            <div className='w-full rounded-[32px] bg-white p-8 text-center border border-gray-100 shadow-sm'>
                <p className="text-gray-400 font-medium italic">Selecciona una oferta para ver los detalles.</p>
            </div>
        )
    }

    return (
        <div className='w-full lg:sticky lg:top-8 overflow-hidden rounded-[32px] bg-white shadow-sm border border-gray-100'>
            <HeaderInfoCard offer={offer}/>
            
            <div className='px-6 md:px-8 pb-8'>
                <TagsInfoCard offer={offer}/>
                
                <div className='mt-8 pt-2 border-t border-gray-50'>
                    <InformationOffer offer={offer}/>
                </div>

                <div className='mt-4 w-full'>
                    <Link 
                        className='group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]' 
                        href={`/estudiante/postulacion/${offer.id}`}
                    >
                        <span>Ver más detalles</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    )
}