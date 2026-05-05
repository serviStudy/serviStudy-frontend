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
}

export const AvailabilityCard = ({ 
    variants, 
    normalizedDays, 
    isEntreSemana, 
    isFinesDeSemana, 
    isEspecificos, 
    scheduleLabel,
    onOpenDaysModal
}: AvailabilityCardProps) => {
    return (
        <motion.div variants={variants} className="bg-white rounded-xl p-6 shadow-sm border-2">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">Disponibilidad</h3>
            </div>
            
            <div className="flex flex-col gap-6">
                <div>
                    <span className="text-sm font-semibold text-gray-400 capitalize tracking-[0.1em] block mb-2">
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

                <div>
                    <span className="text-sm font-semibold text-gray-400 capitalize tracking-[0.1em] block mb-2">
                        Jornada
                    </span>
                    {scheduleLabel ? (
                        <Tag variant="schedule" label={scheduleLabel} />
                    ) : (
                        <p className="text-sm text-gray-400 italic">No especificado</p>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
