"use client"
import { InfoCard } from '@/features/restricted/estudiante/ofertasActivas/components/InfoCard'
import SearchCard from '@/features/restricted/estudiante/ofertasActivas/components/SearchCard'
import { OfferList } from '@/features/restricted/estudiante/ofertasActivas/components/ui/OfferList'
import { useActiveOffers } from '@/features/restricted/estudiante/ofertasActivas/hooks/useActiveOffers'
import { useOfferFilter } from '@/features/restricted/estudiante/ofertasActivas/hooks/useOfferFilter'
import { Loader2, Inbox, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { offers, selectedOffer, setSelectedOffer, loading } = useActiveOffers();
    const { 
        setSearchTerm, 
        setSelectedDays, 
        setSelectedJornada, 
        filteredOffers,
        selectedDays,
        selectedJornada
    } = useOfferFilter(offers)
    
    const [inputValue, setInputValue] = useState("")
    const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false)

    const handleClearAll = () => {
        setInputValue("")
        setSearchTerm("")
        setSelectedDays([])
        setSelectedJornada([])
    }

    const handleSelectOffer = (offer: any) => {
        setSelectedOffer(offer)
        if (window.innerWidth < 1024) {
            setIsMobileDetailOpen(true)
        }
    }

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
            setIsMobileDetailOpen(false);
        } else if (window.innerWidth >= 1024) {
            if (
                !selectedOffer ||
                !filteredOffers.some((offer) => offer.id === selectedOffer.id)
            ) {
                setSelectedOffer(filteredOffers[0]);
            }
        }
    }, [filteredOffers, selectedOffer, setSelectedOffer]);


    if (loading) {
        return (
            <div className="flex flex-col h-[80vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                <p className="text-gray-500 font-bold animate-pulse">Cargando las mejores ofertas...</p>
            </div>
        )
    }


    return (
        <div className="flex flex-col  gap-8 pb-14 w-full">
            <div className="flex flex-col">
                {/* Title Section - Non-sticky */}
                <div className="pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-900 tracking-tight">
                        Encuentra nuevas ofertas
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base font-normal">
                        Explora cientos de oportunidades para estudiantes
                    </p>
                </div>

                {/* Search & Filters Header - Sticky with edge-to-edge blur */}
                <div className="sticky top-0 z-30 w-full transition-all">
                    {/* Full-width background layer - Safely extends without causing overflow */}
                    <div className="absolute inset-y-0 left-[-4vw] right-[-3vw] backdrop-blur-xl bg-white/15" />
                    
                    {/* Centered content layer */}
                    <div className="relative z-10 py-4 max-w-[1440px] mx-auto w-full px-4 md:px-0">
                        <SearchCard 
                            inputValue={inputValue} 
                            onInputChange={handleInputChange} 
                            onSearch={handleSearch}
                            selectedDays={selectedDays}
                            toggleDay={toggleDay}
                            selectedJornada={selectedJornada}
                            toggleJornada={toggleJornada}
                            onClearAll={handleClearAll}
                        />
                    </div>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 pt-7 lg:pt-10 lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px] gap-16 items-start">
                    
                    {/* Results Column */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center-safe">
                            <h3 className="text-xl font-bold text-blue-900">
                                Resultados <span className="text-gray-700 ml-1 rounded-lg text-sm">({filteredOffers.length})</span>
                            </h3>
                        </div>

                        {filteredOffers.length > 0 ? (
                            <OfferList 
                                offers={filteredOffers} 
                                onSelectOffer={handleSelectOffer} 
                                selectedOffer={selectedOffer}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[32px] border border-dashed border-gray-200 shadow-sm">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Inbox className="text-gray-300 w-10 h-10" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-700">No hay ofertas</h4>
                                <p className="text-gray-500 max-w-62.5 text-center mt-2 font-medium">
                                    Intenta ajustar tus filtros o buscar con otras palabras clave.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Preview Column (Sticky on Desktop) */}
                    <div className="hidden lg:block sticky top-32 self-start">
                        {selectedOffer ? (
                            <div className="h-[calc(100vh-150px)] rounded-32 overflow-y-auto no-scrollbar bg-transparent">
                                <InfoCard offer={selectedOffer} />
                            </div>
                        ) : (
                            <div className="h-100 flex items-center justify-center bg-gray-50/50 rounded-[32px] border border-dashed border-gray-200 p-10">
                                <p className="text-gray-400 font-medium text-center italic">
                                    Selecciona una oferta para ver los detalles completos aquí.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Mobile Preview Modal/Overlay */}
                    {isMobileDetailOpen && selectedOffer && (
                        <div className="fixed inset-0 z-50 bg-slate-50/50 backdrop-blur-md lg:hidden overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
                            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl py-4 px-6 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex flex-row-reverse justify-between w-full items-center gap-3 pl-16">
                                    <button 
                                        onClick={() => setIsMobileDetailOpen(false)}
                                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                    >
                                        <X className="w-6 h-6 text-slate-600" />
                                    </button>
                                    <h3 className="text-lg font-semibold text-blue-900 tracking-tight">Detalles de la oferta</h3>
                                </div>
                            </div>
                            <div className="p-12">
                                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-100 bg-white">
                                    <InfoCard offer={selectedOffer} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page
