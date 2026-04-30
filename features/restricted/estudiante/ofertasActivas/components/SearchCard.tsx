import { Button } from '@/components/ui/button'
import { routes } from '@/type/routes';
import { BriefcaseBusiness, Search, Calendar, Clock, Filter, ChevronDown, X } from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'

interface Props {
    inputValue: string;
    onInputChange: (value: string) => void
    onSearch: () => void
    selectedDays: string[];
    toggleDay: (day: string) => void;
    selectedJornada: string[];
    toggleJornada: (jornada: string) => void;
    onClearAll: () => void;
}

const SearchCard = ({ 
    inputValue, 
    onInputChange, 
    onSearch,
    selectedDays,
    toggleDay,
    selectedJornada,
    toggleJornada,
    onClearAll
}: Props) => {
    const [showFilters, setShowFilters] = useState(false);
    const [isDaysOpen, setIsDaysOpen] = useState(false);
    const [isJornadaOpen, setIsJornadaOpen] = useState(false);

    const filterDays = ["Entre semana", "Fines de semana", "Específicos"];
    const filterJornadas = ["Tiempo completo", "Medio tiempo", "flexible"];

    return (
        <div className="w-full">
            <div className="flex flex-col gap-6">
                {/* Search Bar & Filters Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                            <input 
                                value={inputValue}
                                onChange={(e) => onInputChange(e.target.value)}
                                onKeyDown={(e) => {if (e.key === "Enter") onSearch()}}
                                className="w-full h-12 md:h-14 bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white transition-all text-sm font-medium"
                                placeholder="Puesto, empresa o palabra clave..."
                            />
                        </div>

                        {/* Desktop Quick Filters */}
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="h-10 w-px bg-gray-200 mx-2" />
                            
                            {/* Days Filter */}
                            <div className="relative">
                                <button 
                                    onClick={() => {
                                        setIsDaysOpen(!isDaysOpen);
                                        setIsJornadaOpen(false);
                                    }}
                                    className={`flex items-center gap-2 px-4 py-3 bg-gray-50 border rounded-xl font-semibold transition-all ${isDaysOpen ? 'border-blue-600 ring-2 ring-blue-600/10' : 'border-gray-200 hover:bg-gray-100'}`}
                                >
                                    <Calendar size={18} className="text-blue-600" />
                                    <span className="text-gray-700 text-sm">Días</span>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDaysOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isDaysOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsDaysOpen(false)} />
                                        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-3 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2">
                                            {filterDays.map(day => (
                                                <label key={day} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-all">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={selectedDays.includes(day)}
                                                        onChange={() => toggleDay(day)}
                                                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 border-gray-300"
                                                    />
                                                    <span className="text-sm font-medium text-gray-700">{day}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Jornada Filter */}
                            <div className="relative">
                                <button 
                                    onClick={() => {
                                        setIsJornadaOpen(!isJornadaOpen);
                                        setIsDaysOpen(false);
                                    }}
                                    className={`flex items-center gap-2 px-4 py-3 bg-gray-50 border rounded-xl font-semibold transition-all ${isJornadaOpen ? 'border-blue-600 ring-2 ring-blue-600/10' : 'border-gray-200 hover:bg-gray-100'}`}
                                >
                                    <Clock size={18} className="text-blue-600" />
                                    <span className="text-gray-700 text-sm">Jornada</span>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isJornadaOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isJornadaOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsJornadaOpen(false)} />
                                        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-3 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2">
                                            {filterJornadas.map(jornada => (
                                                <label key={jornada} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-all">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={selectedJornada.includes(jornada)}
                                                        onChange={() => toggleJornada(jornada)}
                                                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 border-gray-300"
                                                    />
                                                    <span className="text-sm font-medium text-gray-700 uppercase tracking-wide text-[10px]">{jornada}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex w-full lg:w-auto gap-2">
                            {/* Mobile Toggle Filters */}
                            <button 
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-semibold border border-gray-200 text-sm"
                            >
                                <Filter size={18} className="text-blue-600" />
                                Filtros
                            </button>

                            {/* Search Button */}
                            <button 
                                onClick={onSearch}
                                className="flex-1 lg:w-auto px-8 h-12 md:h-14 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                <Search size={18} strokeWidth={2.5} />
                                Buscar
                            </button>

                            {/* Desktop Mis Postulaciones Button */}
                            <Link 
                                href={routes.estudiante.postulaciones}
                                className="hidden lg:flex items-center gap-2 h-12 md:h-14 px-6 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-50 transition-all border border-gray-200 shadow-sm"
                            >
                                <BriefcaseBusiness size={20} className="text-blue-600" />
                                <span className="whitespace-nowrap">Mis postulaciones</span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Filters Content */}
                    {showFilters && (
                        <div className="lg:hidden flex flex-col gap-6 p-6 bg-gray-50 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-2">
                            <div className="flex flex-col gap-3">
                                <p className="font-bold text-blue-900 text-[11px] uppercase tracking-wider">Días laborales</p>
                                <div className="flex flex-wrap gap-2">
                                    {filterDays.map(day => (
                                        <button 
                                            key={day}
                                            onClick={() => toggleDay(day)}
                                            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
                                                selectedDays.includes(day) 
                                                ? 'bg-blue-600 text-white border-blue-600' 
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="font-bold text-blue-900 text-[11px] uppercase tracking-wider">Jornada</p>
                                <div className="flex flex-wrap gap-2">
                                    {filterJornadas.map(jornada => (
                                        <button 
                                            key={jornada}
                                            onClick={() => toggleJornada(jornada)}
                                            className={`px-4 py-2 rounded-lg text-[11px] uppercase tracking-wide font-medium transition-all border ${
                                                selectedJornada.includes(jornada) 
                                                ? 'bg-blue-600 text-white border-blue-600' 
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            {jornada}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Selected Chips */}
                    {(selectedDays.length > 0 || selectedJornada.length > 0) && (
                        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                            {[...selectedDays, ...selectedJornada].map(item => (
                                <span key={item} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-2 border border-blue-200">
                                    {item}
                                    <button 
                                        onClick={() => {
                                            if (selectedDays.includes(item)) toggleDay(item);
                                            else toggleJornada(item);
                                        }}
                                        className="hover:text-blue-900 transition-colors"
                                    >
                                        <X size={10} strokeWidth={3} />
                                    </button>
                                </span>
                            ))}
                            <button 
                                onClick={onClearAll}
                                className="text-xs text-gray-500 font-semibold hover:text-red-600 ml-2 transition-colors"
                            >
                                Limpiar todo
                            </button>
                        </div>
                    )}

                    {/* Mobile Mis Postulaciones Button - Inside the card for stickiness */}
                    <Link 
                        href={routes.estudiante.postulaciones}
                        className="flex md:hidden w-full items-center justify-center gap-2 bg-blue-100 text-blue-700 py-4 rounded-xl font-bold hover:bg-blue-200 transition-all border border-blue-200 text-[11px] uppercase tracking-widest shadow-sm"
                    >
                        <BriefcaseBusiness size={16} className="text-blue-600" />
                        Mis postulaciones
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchCard
