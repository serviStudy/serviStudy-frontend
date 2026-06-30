"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Link from 'next/link'

interface Skill {
    skillName: string;
}

interface SkillsCardProps {
    variants: any;
    skills: Skill[] | null;
    isPremium?: boolean;
}

export const SkillsCard = ({ variants, skills, isPremium }: SkillsCardProps) => {
    return (
        <motion.div variants={variants} className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
            isPremium
                ? 'bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
        }`}>
            {isPremium && (
                <div className="h-1 w-full bg-linear-to-r from-violet-900 via-indigo-600 to-blue-400" />
            )}
            <div className="p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 hover:scale-105 bg-blue-50 text-blue-600 border-blue-200`}>
                        <Star size={22} />
                    </div>
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-gray-700 tracking-tight">Cualidades</h3>
                        {isPremium && (
                            <p className="text-[11px] font-medium text-gray-400 mt-0.5">Habilidades y aptitudes que te destacan</p>
                        )}
                    </div>
                </div>

                {skills && skills.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                        {skills.map((s, idx) => (
                            <div 
                                key={idx} 
                                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:-translate-y-0.5 capitalize shadow-xs ${
                                    isPremium
                                        ? 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100'
                                        : 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100'
                                }`}
                            >
                                {s.skillName}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50/50 rounded-xl p-6 border border-dashed border-gray-200 text-center">
                        <p className="text-sm text-gray-500 font-medium">No has añadido cualidades aún.</p>
                        <Link href="/estudiante/perfil/editar-perfil" className="text-blue-600 font-bold text-sm hover:underline mt-2 inline-block">
                            Añadir cualidades
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
