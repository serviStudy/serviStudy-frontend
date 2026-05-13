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
            <div className="flex flex-col gap-3">
                {/* Search Bar Container - Transparent as parent has blur */}
                <div className="flex flex-row items-center gap-2 md:gap-4">
                    {/* Search Input Container with Internal Button */}
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5 group-focus-within:text-blue-600 transition-colors" />
                        <input 
                            value={inputValue}
                            onChange={(e) => onInputChange(e.target.value)}
                            onKeyDown={(e) => {if (e.key === "Enter") onSearch()}}
                            className="w-full h-11 md:h-14 bg-white/80 border border-gray-200 rounded-xl pl-10 md:pl-12 pr-12 text-gray-700 placeholder:text-gray-400 focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 focus:bg-white transition-all text-sm md:text-base font-medium shadow-sm"
                            placeholder="Puesto, empresa o palabra clave..."
                        />
                        {/* Inner Search Button (Blue Circle) */}
                        <button 
                            onClick={onSearch}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 md:w-11 md:h-11 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-all shadow-md z-10"
                        >
                            <Search size={18} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Filter Button - Always next to search bar */}
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center justify-center h-11 w-11 md:h-14 md:px-5 md:w-auto bg-white/80 rounded-xl text-blue-600 font-semibold border transition-all active:scale-95 shadow-sm ${showFilters ? 'border-blue-600 ring-2 ring-blue-600/5 bg-white' : 'border-gray-200 hover:bg-white'}`}
                    >
                        <Filter size={20} />
                        <span className="hidden md:block ml-2 text-sm">Filtros</span>
                        <ChevronDown size={14} className={`hidden md:block ml-1 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Desktop Mis Postulaciones Button */}
                    <Link 
                        href={routes.estudiante.postulaciones}
                        className="hidden lg:flex items-center gap-2 h-14 px-6 bg-white/80 text-blue-600 rounded-xl font-bold hover:bg-white transition-all border border-gray-200 shadow-sm"
                    >
                        <BriefcaseBusiness size={20} />
                        <span className="whitespace-nowrap text-sm font-bold">Mis postulaciones</span>
                    </Link>
                </div>

                {/* Collapsible Filters Content (Desktop & Mobile) */}
                {showFilters && (
                    <div className="flex flex-col gap-4 p-4 md:p-6 bg-white/90 backdrop-blur-md rounded-xl border border-blue-100 shadow-xl animate-in fade-in slide-in-from-top-2">
                        {/* Quick Desktop Filter Dropdowns (inside the collapsible section for consistency) */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex flex-col gap-3 flex-1">
                                <p className="font-bold text-blue-900 text-[10px] uppercase tracking-wider flex items-center gap-2">
                                    <Calendar size={14} /> Días laborales
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {filterDays.map(day => (
                                        <button 
                                            key={day}
                                            onClick={() => toggleDay(day)}
                                            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
                                                selectedDays.includes(day) 
                                                ? 'bg-blue-600 text-white border-blue-600' 
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 flex-1">
                                <p className="font-bold text-blue-900 text-[10px] uppercase tracking-wider flex items-center gap-2">
                                    <Clock size={14} /> Jornada
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {filterJornadas.map(jornada => (
                                        <button 
                                            key={jornada}
                                            onClick={() => toggleJornada(jornada)}
                                            className={`px-4 py-2 rounded-lg text-xs capitalize tracking-wide font-medium transition-all border ${
                                                selectedJornada.includes(jornada) 
                                                ? 'bg-blue-600 text-white border-blue-600' 
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                                            }`}
                                        >
                                            {jornada}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Selected Chips */}
                        {(selectedDays.length > 0 || selectedJornada.length > 0) && (
                            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                                {[...selectedDays, ...selectedJornada].map(item => (
                                    <span key={item} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-medium uppercase tracking-wide flex items-center gap-2 border border-blue-100">
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
                                    className="text-xs text-gray-400 font-bold hover:text-red-600 ml-2 transition-colors px-2 py-1"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchCard
