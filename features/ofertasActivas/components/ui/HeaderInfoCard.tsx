import React from 'react'
import { Offer } from '@/features/postPostularse/types/offer'
import Image from "next/image";
import { formatDaysAgo } from '../../hooks/FormatsDaysAgo';

interface HeaderInfoProps {
    offer: Offer;
}

export const HeaderInfoCard = ({ offer }: HeaderInfoProps) => {
    return (
        <div className="relative rounded-t-[32px] overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100/50">
            <div className="p-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* foto de la oferta */}
                    <div className="h-16 w-16 md:h-20 md:w-20 shrink-0 bg-white rounded-2xl shadow-sm border border-green-100 flex items-center justify-center overflow-hidden">
                        {offer.imageUrl ? (
                            <Image
                                width={80}
                                height={80}
                                src={offer.imageUrl}
                                alt={offer.title}
                                className='object-cover w-full h-full'                 
                            />
                        ) : (
                            <div className='w-full h-full bg-gray-50 flex items-center justify-center text-green-200 text-xs font-bold'>
                                No image
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-600 uppercase tracking-wider w-fit">
                            Hace {formatDaysAgo(offer.createdAt)}
                        </span>
                        <h4 className="text-xl md:text-2xl font-black text-blue-900 leading-tight">
                            {offer.title}
                        </h4>
                        <p className="text-sm md:text-base font-semibold text-blue-700/70">
                            {offer.businessName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}