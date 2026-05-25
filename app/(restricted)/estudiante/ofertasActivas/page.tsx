"use client"
import { HeaderOfertas } from '@/features/restricted/estudiante/ofertasActivas/components/HeaderOfertas'
import { OfferList } from '@/features/restricted/estudiante/ofertasActivas/components/ui/OfferList'
import { useActiveOffers } from '@/features/restricted/estudiante/ofertasActivas/hooks/useActiveOffers'
import { useOfferFilter } from '@/features/restricted/estudiante/ofertasActivas/hooks/useOfferFilter'
import { Loader2, Inbox, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { offers, loading } = useActiveOffers();
    const { 
        setSearchTerm, 
        setSelectedDays, 
        setSelectedJornada, 
        filteredOffers,
        selectedDays,
        selectedJornada
    } = useOfferFilter(offers)
    
    const [inputValue, setInputValue] = useState("")

    const handleClearAll = () => {
        setInputValue("")
        setSearchTerm("")
        setSelectedDays([])
        setSelectedJornada([])
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




    if (loading) {
        return (
            <div className="flex flex-col h-[80vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                <p className="text-gray-500 font-bold animate-pulse">Cargando las mejores ofertas...</p>
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-8 pb-14 w-full">
            <HeaderOfertas 
                inputValue={inputValue} 
                onInputChange={handleInputChange} 
                onSearch={handleSearch}
                selectedDays={selectedDays}
                toggleDay={toggleDay}
                selectedJornada={selectedJornada}
                toggleJornada={toggleJornada}
                onClearAll={handleClearAll}
            />


                {/* Content Layout */}
                <div className="flex flex-col gap-8 items-start w-full">
                    
                    {/* Results Column */}
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center-safe">
                            <h3 className="text-xl font-bold text-blue-900">
                                Resultados <span className="text-gray-700 ml-1 rounded-lg text-sm">({filteredOffers.length})</span>
                            </h3>
                        </div>

                        {filteredOffers.length > 0 ? (
                            <OfferList offers={filteredOffers} />
                        ) : (
                            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[32px] border border-dashed border-gray-200 shadow-sm w-full">
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
                </div>
        </div>
    )
}

export default Page
