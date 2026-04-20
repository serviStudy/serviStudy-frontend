import React from 'react'
import { ActiveOffer } from '../../types/ofertasActivas.types'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { formatDaysAgo } from '../../hooks/FormatsDaysAgo';

interface HeaderInfoProps {
    offer: ActiveOffer;
}

export const HeaderInfoCard = ({ offer }: HeaderInfoProps) => {

    return (
        <div className="relative rounded-t-2xl h-24 md:h-28 bg-[#E2FFE1] w-full flex lg:flex-row gap-6! md:gap-10! lg:gap-8 lg:items-end px-8">
            {/* foto de la oferta */}
            <div className="absolute lg:top-12 md:top-11 top-10 h-18 w-18 overflow-hidde bg-gray-200 rounded-[9px] flex items-center justify-center text-white text-[56px] md:h-20 md:w-20">
                {/*
                <Image
                    src={offer.imageUrl}
                    alt={offer.title}
                    className='object-cover'                 
                />
                */}
            </div>

            <div className="pt-10 px-4 flex flex-col pl-22 md:pl-24 leading-none space-y-0 lg:pb-2">
                <h4 className="text-2xl mb-0 leading-tight font-extrabold text-[#1a4b9e] lg:text-[25px]">{offer.title}</h4>
                <p className="text-lg mb-0 leading-none font-medium text-[#1a4b9e] lg:text-[15px]">{offer.businessName}</p>
            </div>

            <Button className="absolute lg:top-3 translate-x-2 right-9 text-lg mb-0 leading-none font-medium bg-green-200 rounded-2xl h-6 text-green-500 lg:text-[12px]">Hace {formatDaysAgo(offer.createdAt)}</Button>
        </div>
    )
}
