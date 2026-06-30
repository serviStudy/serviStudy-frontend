"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { Tag } from './ui/Tag'

interface AvailabilityCardProps {
    variants: any;
    normalizedDays: string[];
    isEntreSemana: boolean;
    isFinesDeSemana: boolean;
    isEspecificos: boolean;
    scheduleLabel: string | null;
    onOpenDaysModal: () => void;
    isPremium?: boolean;
}

export const AvailabilityCard = ({ 
    variants, 
    normalizedDays, 
    isEntreSemana, 
    isFinesDeSemana, 
    isEspecificos, 
    scheduleLabel,
    onOpenDaysModal,
    isPremium
}: AvailabilityCardProps) => {
    return (
        <motion.div variants={variants} className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
            isPremium
                ? 'bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
        }`}>
            {isPremium && (
                <div className="h-1 w-full bg-linear-to-r from-blue-400 via-lime-500 to-green-600" />
            )}
            
            <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 hover:scale-105 ${
                        isPremium
                            ? 'bg-linear-to-br from-green-50 to-blue-50 text-blue-600 border-blue-200/50'
                            : 'bg-green-100 text-green-600 border-green-200'
                    }`}>
                        <CalendarDays className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 tracking-tight">Disponibilidad</h3>
                </div>
                
                <div className="flex flex-col gap-6">
                    <div>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                            Días laborales
                        </span>
                        {normalizedDays.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {isEntreSemana && <Tag variant="day" label="Entre semana" />}
                                {isFinesDeSemana && <Tag variant="day" label="Fines de semana" />}
                                {isEspecificos && (
                                    <button
                                        type="button"
                                        onClick={onOpenDaysModal}
                                        className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-3 py-1 text-sm font-semibold hover:bg-green-100 transition-colors"
                                    >
                                        Ver días
                                    </button>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400 italic">No especificado</p>
                        )}
                    </div>

                    <div className="pt-4 border-t border-gray-50">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                            Jornada
                        </span>
                        {scheduleLabel ? (
                            <Tag variant="schedule" label={scheduleLabel} />
                        ) : (
                            <p className="text-sm text-gray-400 italic">No especificado</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
