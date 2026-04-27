import React from 'react'
import { Offer } from '@/features/postPostularse/types/offer'
import Image from "next/image";
import { formatDaysAgo } from '../../hooks/FormatsDaysAgo';

interface HeaderInfoProps {
    offer: Offer;
}

export const HeaderInfoCard = ({ offer }: HeaderInfoProps) => {
    return (
        <div className="relative sticky top-0 z-20 rounded-t-[32px] overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-500 shadow-sm">
            {/* Subtle noise overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>

            <div className="p-6 flex items-start justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4 md:gap-5 w-full">
                    {/* foto de la oferta */}
                    <div className="h-16 w-16 md:h-20 md:w-20 shrink-0 bg-white rounded-2xl shadow-lg border-2 border-white/20 flex items-center justify-center overflow-hidden">
                        {offer.imageUrl ? (
                            <Image
                                width={80}
                                height={80}
                                src={offer.imageUrl}
                                alt={offer.title}
                                className='object-cover w-full h-full'                 
                            />
                        ) : (
                            <div className='w-full h-full bg-gray-50 flex items-center justify-center text-green-300 text-xs font-bold'>
                                No image
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white border border-white/20 backdrop-blur-sm uppercase tracking-wider w-fit">
                            Hace {formatDaysAgo(offer.createdAt)}
                        </span>
                        <h4 className="text-xl md:text-2xl font-black text-white leading-tight truncate">
                            {offer.title}
                        </h4>
                        <p className="text-sm md:text-[15px] font-semibold text-green-100 truncate">
                            {offer.businessName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}