"use client"
import { HeaderOfertas } from '@/features/restricted/estudiante/ofertasActivas/components/HeaderOfertas'
import { MobileHeaderOfertas } from '@/features/restricted/estudiante/ofertasActivas/components/MobileHeaderOfertas'
import { OfferList } from '@/features/restricted/estudiante/ofertasActivas/components/ui/OfferList'
import { useActiveOffers } from '@/features/restricted/estudiante/ofertasActivas/hooks/useActiveOffers'
import { useOfferFilter } from '@/features/restricted/estudiante/ofertasActivas/hooks/useOfferFilter'
import { Loader2, Inbox } from 'lucide-react'
import { useState } from 'react'

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
        setSearchTerm(value.trim());
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

    const selectDayMobile = (day: string) => {
        if (day === "Todos") {
            setSelectedDays([])
            return
        }
        setSelectedDays([day])
    }

    const selectJornadaMobile = (jornada: string) => {
        if (jornada === "Todas") {
            setSelectedJornada([])
            return
        }
        setSelectedJornada([jornada])
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
        <div className="flex flex-col w-full pb-14 md:gap-8 md:bg-transparent min-w-[20vw]">
            <div>
                <MobileHeaderOfertas
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onSearch={handleSearch}
                selectedDays={selectedDays}
                onSelectDay={selectDayMobile}
                selectedJornada={selectedJornada}
                onSelectJornada={selectJornadaMobile}
                onClearAll={handleClearAll}
            />                
            </div>


            <div className="hidden md:block">
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
            </div>

            <div className="mt-7 flex flex-col gap-4 w-full md:mt-0">
                <div className="flex items-center">
                    <h3 className="text-lg font-bold text-blue-900 md:text-xl">
                        Resultados{" "}
                        <span className="text-sm font-semibold text-gray-500 md:text-base">
                            ({filteredOffers.length})
                        </span>
                    </h3>
                </div>

                {filteredOffers.length > 0 ? (
                    <OfferList offers={filteredOffers} />
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 md:p-20 bg-white rounded-2xl md:rounded-[32px] border border-dashed border-gray-200 shadow-sm w-full">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Inbox className="text-gray-300 w-10 h-10" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-700">No hay ofertas</h4>
                        <p className="text-gray-500 max-w-xs text-center mt-2 font-medium text-sm">
                            Intenta ajustar tus filtros o buscar con otras palabras clave.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
