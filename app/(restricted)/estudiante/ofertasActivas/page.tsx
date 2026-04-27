"use client"
import { InfoCard } from '@/features/ofertasActivas/components/InfoCard'
import SearchCard from '@/features/ofertasActivas/components/SearchCard'
import { OfferList } from '@/features/ofertasActivas/components/ui/OfferList'
import { useActiveOffers } from '@/features/ofertasActivas/hooks/useActiveOffers'
import { useOfferFilter } from '@/features/ofertasActivas/hooks/useOfferFilter'
import { Loader2, Inbox } from 'lucide-react'
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
            !filteredOffers.some((offer) => offer.id === selectedOffer.id)
        ) {
            setSelectedOffer(filteredOffers[0]);
        }
    }, [filteredOffers, selectedOffer, setSelectedOffer]);

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                    <p className="text-gray-500 font-bold animate-pulse">Cargando las mejores ofertas...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen pb-20 w-full px-4 md:px-8 pt-8">
            <div className="max-w-[1600px] mx-auto w-full">
                {/* Search & Filters Header */}
                <SearchCard 
                    inputValue={inputValue} 
                    onInputChange={handleInputChange} 
                    onSearch={handleSearch}
                    selectedDays={selectedDays}
                    toggleDay={toggleDay}
                    selectedJornada={selectedJornada}
                    toggleJornada={toggleJornada}
                />

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px] gap-8 items-start">
                    
                    {/* Results Column */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-bold text-gray-900">
                                Resultados <span className="text-blue-600 ml-1 bg-blue-50 px-2 py-0.5 rounded-lg text-lg">({filteredOffers.length})</span>
                            </h3>
                        </div>

                        {filteredOffers.length > 0 ? (
                            <OfferList 
                                offers={filteredOffers} 
                                onSelectOffer={setSelectedOffer} 
                                selectedOffer={selectedOffer}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-dashed border-gray-200 shadow-sm">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Inbox className="text-gray-300 w-10 h-10" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-700">No hay ofertas</h4>
                                <p className="text-gray-500 max-w-[250px] text-center mt-2 font-medium">
                                    Intenta ajustar tus filtros o buscar con otras palabras clave.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Preview Column (Sticky on Desktop) */}
                    <div className="hidden lg:block sticky top-8">
                        {selectedOffer ? (
                            <div className="h-[calc(100vh-100px)] overflow-y-auto no-scrollbar rounded-[32px] shadow-xl shadow-blue-900/5 border border-gray-100 bg-white">
                                <InfoCard offer={selectedOffer} />
                            </div>
                        ) : (
                            <div className="h-[400px] flex items-center justify-center bg-gray-50/50 rounded-[32px] border border-dashed border-gray-200 p-10">
                                <p className="text-gray-400 font-medium text-center italic">
                                    Selecciona una oferta para ver los detalles completos aquí.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Mobile Preview (Below results) */}
                    <div className="lg:hidden mt-8">
                        {selectedOffer && (
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-bold text-gray-900 px-2">Detalles de la oferta</h3>
                                <div className="rounded-[32px] overflow-hidden shadow-xl shadow-blue-900/5 border border-gray-100 bg-white">
                                    <InfoCard offer={selectedOffer} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
