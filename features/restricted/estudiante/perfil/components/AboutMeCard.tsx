"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import Link from 'next/link'

interface AboutMeCardProps {
    variants: any;
    description: string | null;
    isPremium?: boolean;
}

export const AboutMeCard = ({ variants, description, isPremium }: AboutMeCardProps) => {
    return (
        <motion.div variants={variants} className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
            isPremium
                ? 'bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
        }`}>
            {isPremium && (
                <div className="h-1 w-full bg-linear-to-r from-violet-700 via-blue-600 to-sky-400" />
            )}
            <div className="p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 hover:scale-105 bg-blue-50 text-blue-600 border-blue-200`}>
                        <FileText size={22} />
                    </div>
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-gray-700 tracking-tight">Resumen profesional</h3>
                        {isPremium && (
                            <p className="text-[11px] font-medium text-gray-400 mt-0.5">Tu descripción personal e intereses profesionales</p>
                        )}
                    </div>
                </div>
                
                {description ? (
                    <p className={`leading-relaxed ${
                        isPremium
                            ? 'text-[15px] text-gray-600'
                            : 'text-base text-gray-500'
                    }`}>
                        {description}
                    </p>
                ) : (
                    <div className="bg-gray-50/50 rounded-xl p-6 border border-dashed border-gray-200 text-center">
                        <p className="text-sm text-gray-500 font-medium">Aún no has añadido un resumen profesional.</p>
                        <Link href="/estudiante/perfil/editar-perfil" className="text-green-600 font-bold text-sm hover:underline mt-2 inline-block">
                            Añadir resumen
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
