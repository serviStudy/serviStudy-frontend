"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Link from 'next/link'

interface AboutMeCardProps {
    variants: any;
    description: string | null;
}

export const AboutMeCard = ({ variants, description }: AboutMeCardProps) => {
    return (
        <motion.div variants={variants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
                <div className="bg-blue-600 p-2 rounded-lg shadow-sm text-white">
                    <User className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <h3 className="text-base font-bold text-gray-900">Sobre mí</h3>
            </div>
            {description ? (
                <p className="text-sm leading-relaxed text-gray-600 font-medium">
                    {description}
                </p>
            ) : (
                <div className="bg-gray-50 rounded-xl p-6 border border-dashed border-gray-200 text-center">
                    <p className="text-sm text-gray-500 font-medium">No has añadido un resumen profesional.</p>
                    <Link href="/estudiante/perfil/editar-perfil" className="text-blue-600 font-bold text-sm hover:underline mt-2 inline-block">
                        Añadir resumen
                    </Link>
                </div>
            )}
        </motion.div>
    )
}
