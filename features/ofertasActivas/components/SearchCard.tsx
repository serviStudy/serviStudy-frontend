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
}

const SearchCard = ({ 
    inputValue, 
    onInputChange, 
    onSearch,
    selectedDays,
    toggleDay,
    selectedJornada,
    toggleJornada
}: Props) => {
    const [showFilters, setShowFilters] = useState(false);

    const filterDays = ["Entre semana", "Fines de semana", "Específicos"];
    const filterJornadas = ["Tiempo completo", "Medio tiempo", "flexible"];

    return (
        <div className="w-full mb-8">
            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight lg:text-4xl">
                            Encuentra nuevas ofertas
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg font-medium">
                            Explora cientos de oportunidades para estudiantes
                        </p>
                    </div>
                    <Link 
                        href={routes.estudiante.postulaciones}
                        className="hidden md:flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all border border-gray-200 shadow-sm"
                    >
                        <BriefcaseBusiness size={20} className="text-blue-600" />
                        Mis postulaciones
                    </Link>
                </div>

                {/* Search Bar & Filters Section */}
                <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col gap-4">
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                            <input 
                                value={inputValue}
                                onChange={(e) => onInputChange(e.target.value)}
                                onKeyDown={(e) => {if (e.key === "Enter") onSearch()}}
                                className="w-full h-14 bg-gray-50/80 border border-gray-100 rounded-2xl pl-12 pr-4 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all text-[15px] font-medium"
                                placeholder="Puesto, empresa o palabra clave..."
                            />
                        </div>

                        {/* Desktop Quick Filters */}
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="h-10 w-[1px] bg-gray-100 mx-2" />
                            
                            {/* Days Filter */}
                            <div className="relative group/day">
                                <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 font-bold hover:bg-gray-100 transition-all">
                                    <Calendar size={18} className="text-blue-600" />
                                    <span>Días</span>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </button>
                                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 pointer-events-none group-hover/day:opacity-100 group-hover/day:pointer-events-auto transition-all z-20 p-3 flex flex-col gap-1">
                                    {filterDays.map(day => (
                                        <label key={day} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-all">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedDays.includes(day)}
                                                onChange={() => toggleDay(day)}
                                                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="text-sm font-medium text-gray-700">{day}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Jornada Filter */}
                            <div className="relative group/time">
                                <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 font-bold hover:bg-gray-100 transition-all">
                                    <Clock size={18} className="text-blue-600" />
                                    <span>Jornada</span>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </button>
                                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 pointer-events-none group-hover/time:opacity-100 group-hover/time:pointer-events-auto transition-all z-20 p-3 flex flex-col gap-1">
                                    {filterJornadas.map(jornada => (
                                        <label key={jornada} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-all">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedJornada.includes(jornada)}
                                                onChange={() => toggleJornada(jornada)}
                                                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="text-sm font-medium text-gray-700 uppercase tracking-wide text-[11px]">{jornada}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Toggle Filters */}
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-50 rounded-2xl text-gray-700 font-bold border border-gray-200"
                        >
                            <Filter size={20} className="text-blue-600" />
                            Filtros
                        </button>

                        {/* Search Button */}
                        <button 
                            onClick={onSearch}
                            className="w-full lg:w-auto px-8 h-14 bg-[#2552d0] text-white rounded-2xl font-bold hover:bg-[#1a4b9e] active:scale-[0.98] transition-all shadow-md shadow-blue-900/20 flex items-center justify-center gap-2"
                        >
                            <Search size={20} strokeWidth={2.5} />
                            Buscar
                        </button>
                    </div>

                    {/* Mobile Filters Content */}
                    {showFilters && (
                        <div className="lg:hidden flex flex-col gap-5 p-5 bg-gray-50/80 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
                            <div className="flex flex-col gap-3">
                                <p className="font-extrabold text-gray-900 text-[13px] uppercase tracking-wider px-1">Días laborales</p>
                                <div className="flex flex-wrap gap-2">
                                    {filterDays.map(day => (
                                        <button 
                                            key={day}
                                            onClick={() => toggleDay(day)}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                                                selectedDays.includes(day) 
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' 
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="font-extrabold text-gray-900 text-[13px] uppercase tracking-wider px-1">Jornada</p>
                                <div className="flex flex-wrap gap-2">
                                    {filterJornadas.map(jornada => (
                                        <button 
                                            key={jornada}
                                            onClick={() => toggleJornada(jornada)}
                                            className={`px-4 py-2 rounded-xl text-[13px] uppercase tracking-wide font-bold transition-all border ${
                                                selectedJornada.includes(jornada) 
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' 
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
                        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                            {[...selectedDays, ...selectedJornada].map(item => (
                                <span key={item} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-[11px] font-extrabold uppercase tracking-wide flex items-center gap-2 border border-blue-100 shadow-sm">
                                    {item}
                                    <button 
                                        onClick={() => {
                                            if (selectedDays.includes(item)) toggleDay(item);
                                            else toggleJornada(item);
                                        }}
                                        className="hover:text-blue-900 bg-blue-100 p-0.5 rounded-md transition-colors"
                                    >
                                        <X size={12} strokeWidth={3} />
                                    </button>
                                </span>
                            ))}
                            <button 
                                onClick={() => {
                                    // Limpiar todo logic if needed
                                }}
                                className="text-[12px] text-gray-400 font-bold hover:text-red-500 ml-2 transition-colors"
                            >
                                Limpiar todo
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <Link 
                href={routes.estudiante.postulaciones}
                className="flex md:hidden mt-4 w-full items-center justify-center gap-2 bg-white text-blue-700 p-4 rounded-2xl font-bold hover:bg-gray-50 transition-all border border-gray-200 shadow-sm"
            >
                <BriefcaseBusiness size={20} className="text-blue-600" />
                Mis postulaciones
            </Link>
        </div>
    )
}

export default SearchCard