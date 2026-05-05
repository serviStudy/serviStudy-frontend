import React from 'react'
import { Offer } from '@/features/restricted/estudiante/postPostularse/types/offer'
import Image from "next/image";
import { formatDaysAgo } from '../../hooks/FormatsDaysAgo';
import { MapPin } from 'lucide-react';

interface HeaderInfoProps {
    offer: Offer;
}

export const HeaderInfoCard = ({ offer }: HeaderInfoProps) => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-[#1e4eb9] to-[#3b82f6] min-h-[160px] flex items-center">
            {/* Subtle background overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="pt-6 pb-2 md:p-8  md:pt-6  md:pb-2 flex items-center gap-6 relative z-10 w-full">
                {/* Logo container */}
                <div className="h-20 w-20 md:h-24 md:w-24 shrink-0 bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden p-2">
                    {offer.imageUrl ? (
                        <Image
                            width={96}
                            height={96}
                            src={offer.imageUrl}
                            alt={offer.title}
                            className='object-contain w-full h-full'                 
                        />
                    ) : (
                        <div className='w-full h-full bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-bold text-center'>
                            Logo
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-1 flex-1 min-w-0 text-white">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight capitalize">
                        {offer.title}
                    </h2>
                    <p className="text-lg md:text-xl font-semibold opacity-90">
                        {offer.businessName}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 opacity-80">
                        <MapPin size={14} fill="white" className="text-transparent" />
                        <span className="text-sm font-medium capitalize">
                            {offer.address}
                        </span>
                    </div>
                </div>
                
                <div className="absolute top-4 right-8">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                        Hace {formatDaysAgo(offer.createdAt)}
                    </span>
                </div>
            </div>
        </div>
    )
}
