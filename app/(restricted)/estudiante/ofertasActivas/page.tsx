"use client"
import { HeaderLR } from '@/components/shared/HeaderLR'
import { HeaderStudent } from '@/components/shared/HeaderStudent'
import { InfoCard } from '@/features/ofertasActivas/components/InfoCard'
import MenuDays from '@/features/ofertasActivas/components/MenuDays'
import SearchCard from '@/features/ofertasActivas/components/SearchCard'
import { OfferList } from '@/features/ofertasActivas/components/ui/OfferList'
import { useActiveOffers } from '@/features/ofertasActivas/hooks/useActiveOffers'
import { useOfferFilter } from '@/features/ofertasActivas/hooks/useOfferFilter'
import { Loader2 } from 'lucide-react'
import { off } from 'node:process'
import React, { useEffect, useState } from 'react'

const page = () => {
    const { offers, selectedOffer, setSelectedOffer, loading } = useActiveOffers();
    const { searchTerm, setSearchTerm, setSelectedDays, setSelectedJornada, filteredOffers } = useOfferFilter(offers)
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
                    offer.jobOfferId === selectedOffer.jobOfferId
            )
        ) {
            setSelectedOffer(filteredOffers[0]);
        }
    }, [filteredOffers, selectedOffer, setSelectedOffer]);


    if (loading) {
        return (
            <div className="flex min-h-[90vh] items-center justify-center bg-gray-200">
                <HeaderLR />
                <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-green-100 via-white to-green-100"></div>
                <div className="absolute w-150 h-150 bg-green-300/30 rounded-full blur-[140px] -top-37.5 -left-37.5" />
                <div className="absolute w-125 h-125 bg-emerald-200/30 rounded-full blur-[140px] top-[20%] -right-25" />
                <div className="absolute w-150 h-150 bg-lime-000/30 rounded-full blur-[140px] -bottom-50 left-[20%]" />
                <div className="absolute w-100 h-100 bg-green-200/40 rounded-full blur-[120px] top-[40%] left-[10%]" />
                <div className="absolute w-87.5 h-87.5 bg-emerald-200/40 rounded-full blur-[120px] bottom-[10%] right-[20%]" />
                <div className="absolute w-62.5 h-62.5 bg-lime-400/50 rounded-full blur-[100px] top-[60%] left-[40%]" />
                <div className="absolute w-50 h-50 bg-green-100/60 rounded-full blur-[90px] top-[10%] left-[50%]" />
            </div>

            <HeaderStudent />

            <div className="flex-col gap-7 min-h-[80vh] py-14">
                <SearchCard inputValue={inputValue} onInputChange={handleInputChange} onSearch={handleSearch} />

                <div className='flex w-full items-center pt-8 flex-col-reverse lg:flex-row gap-9 lg:items-start lg:pt-12'>
                    <MenuDays onToggleDay={toggleDay} onToggleJornada={toggleJornada} />
                    <OfferList offers={filteredOffers} onSelectOffer={setSelectedOffer} selectedOffer={selectedOffer} />

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