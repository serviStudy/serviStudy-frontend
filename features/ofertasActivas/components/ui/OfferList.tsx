
import React from 'react'
import { Offer } from '@/features/postPostularse/types/offer';
import ResultCrad from '../ResultCrad';

interface ResultCardProps {
    offers: Offer[];
    selectedOffer: Offer | null;
    onSelectOffer: (offer: Offer) => void
}

export const OfferList = ({offers, selectedOffer, onSelectOffer}: ResultCardProps) => {
    return (
        <div className='flex flex-col gap-4 w-auto'>
            {offers.length === 0 ? (
                <div className='flex items-center justify-center rounded-[21px] min-w-138 bg-white/30 backdrop-blur-md min-h-75'>
                    <div className='text-center px-6'>
                        <h3 className='text-lg font-semibold text-gray-500'>
                            No se encontraron ofertas
                        </h3>
                        <p className='text-sm text-gray-400 mt-2'>
                            No encontramos resultados para esos filtros
                        </p>
                    </div>
                </div>
            ) : (

                offers.map((offer) => {
                    const isSelected = selectedOffer?.id === offer.id;
                    return (
                        <div 
                            key={offer.id}
                            onClick={() => onSelectOffer(offer)}
                            
                            className={`cursor-pointer rounded-[21px] border-2 transition-all ${
                                isSelected ? "border-green-600/35" : "border-transparent"
                            }`}
                        >
                            <ResultCrad offer={offer} isSelected={isSelected}/>
                        </div>
                    )
                })
            )}
        </div>
    )
}