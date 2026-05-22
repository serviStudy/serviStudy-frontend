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
        <motion.div variants={variants} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className={`p-6 flex items-center gap-3 ${isPremium ? 'bg-linear-to-r from-[#00d15a] via-[#0088ff] to-[#004ee0] text-white' : 'border-b border-gray-100'}`}>
                <div className={isPremium ? 'bg-white/20 p-2 rounded-lg text-white' : 'bg-blue-600 p-2 rounded-lg text-white'}>
                    <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className={`text-xl font-bold ${isPremium ? 'text-white' : 'text-blue-900'}`}>Disponibilidad</h3>
            </div>
            
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <span className="text-sm font-semibold text-gray-400 capitalize tracking-[0.5px] block mb-2">
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
                    <span className="text-sm font-semibold text-gray-400 capitalize tracking-[0.5px] block mb-2">
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
