"use client"
import { HeaderLR } from '@/components/shared/HeaderLR'
import { InfoCard} from '@/features/ofertasActivas/components/InfoCard'
import MenuDays from '@/features/ofertasActivas/components/MenuDays'
import SearchCard from '@/features/ofertasActivas/components/SearchCard'
import { OfferList } from '@/features/ofertasActivas/components/ui/OfferList'
import { useActiveOffers } from '@/features/ofertasActivas/hooks/useActiveOffers'
import { useOfferFilter } from '@/features/ofertasActivas/hooks/useOfferFilter'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const page = () => {
    const {offers, selectedOffer, setSelectedOffer, loading} = useActiveOffers();
    const {setSearchTerm, setSelectedDays, setSelectedJornada, filteredOffers} = useOfferFilter(offers)
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (value: string) => {
        setInputValue(value);

        if (value.trim() === "") {
            setSearchTerm("")
        }
    }

    const toggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day)
                : [...prev, day]
        )
    }

    const toggleJornada = (jornada: string) => {
        setSelectedJornada((prev) =>
            prev.includes(jornada)
                ? prev.filter((j) => j !== jornada)
                : [...prev, jornada]
        )
    }

    const handleSearch = () => {
        setSearchTerm(inputValue)
    }

    useEffect(() => {
        if (filteredOffers.length === 0) {
            setSelectedOffer(null);
        } else if (
            !selectedOffer ||
            !filteredOffers.some(
                (offer) =>
                    offer.id === selectedOffer.id
            )
        ) {
            setSelectedOffer(filteredOffers[0]);
        }
    }, [filteredOffers, selectedOffer, setSelectedOffer]);

    if (loading) {
        return (
            <div className="flex min-h-[90vh] items-center justify-center">
                <HeaderLR />
                <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex-col gap-7 min-h-[80vh] py-3 lg:py-14">
                <SearchCard inputValue={inputValue} onInputChange={handleInputChange} onSearch={handleSearch}/>

                <div className='flex w-full items-center pt-8 flex-col-reverse lg:flex-row gap-9 lg:items-start lg:pt-12'>
                    <MenuDays onToggleDay={toggleDay} onToggleJornada={toggleJornada}/>
                    
                    <div className='flex flex-col w-auto gap-3'>
                        <p className='text-[22px] text-primary font-bold pl-1'>
                            {filteredOffers.length} Resultados
                        </p>
                        <OfferList offers={filteredOffers} onSelectOffer={setSelectedOffer} selectedOffer={selectedOffer}/>
                    </div>
                    
                    {filteredOffers.length > 0 && selectedOffer ? (
                        <InfoCard offer={selectedOffer} />
                    ) : (
                        <div className='flex items-center justify-center rounded-[21px] lg:max-w-108 w-[85vw] bg-white/30 backdrop-blur-md min-h-7'>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default page