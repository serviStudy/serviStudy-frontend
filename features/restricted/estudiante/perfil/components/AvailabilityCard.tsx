"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Clock, Calendar } from 'lucide-react'
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
        <motion.div variants={variants} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                Disponibilidad
            </h3>
            
            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wider">
                        <Clock className="h-4 w-4" /> Días
                    </div>
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
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wider">
                        <Calendar className="h-4 w-4" /> Jornada
                    </div>
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
