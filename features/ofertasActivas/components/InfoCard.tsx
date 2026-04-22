import React from 'react'
import { HeaderInfoCard } from './ui/HeaderInfoCard'
import { TagsInfoCard } from './ui/TagsInfoCard'
import { InformationOffer } from './ui/InformationOffer'
import { ActiveOffer } from '../types/ofertasActivas.types';
import Link from 'next/link';
import { routes } from '@/type/routes';

interface InfoCardProps {
    offer: ActiveOffer | null;
}

export const InfoCard = ({ offer }: InfoCardProps) => {
    if (!offer) return 
    <div className='lg:max-w-100 w-[85vw] rounded-[21px] bg-white p-6'>
        <p>No hay ofertas selecciona</p>
    </div>

    return (
        <div className='lg:max-w-108 w-[85vw] lg:sticky lg:top-28 overflow-hidden items-center h-auto rounded-[21px] bg-white'>
            <HeaderInfoCard offer={offer}/>
            <div className='px-8'>
                <TagsInfoCard offer={offer}/>
                <hr className='my-6 h-0.5 bg-gray-200'/>
                <InformationOffer offer={offer}/>

                <div className='flex my-6 w-full justify-center'>
                    <Link className='bg-green-700 rounded-2xl text-white font-bold text-center p-1.5 w-full items-center' href={`/estudiante/postulacion/${offer.jobOfferId}`}>Ver más detalles</Link>
                </div>
            </div>
        </div>
    )
}