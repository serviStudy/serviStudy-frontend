"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import Link from 'next/link'

interface Skill {
    skillName: string;
}

interface SkillsCardProps {
    variants: any;
    skills: Skill[] | null;
}

export const SkillsCard = ({ variants, skills }: SkillsCardProps) => {
    return (
        <motion.div variants={variants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
                <div className="bg-blue-600 p-2 rounded-lg shadow-sm text-white">
                    <Zap className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Cualidades destacadas</h3>
            </div>
            {skills && skills.length > 0 ? (
                <div className="flex flex-wrap font-semibold gap-3">
                    {skills.map((s, idx) => (
                        <div key={idx} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100 shadow-sm flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                            {s.skillName}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 rounded-xl p-6 border border-dashed border-gray-200 text-center">
                    <p className="text-sm text-gray-500 font-medium">No has añadido cualidades aún.</p>
                    <Link href="/estudiante/perfil/editar-perfil" className="text-blue-600 font-bold text-sm hover:underline mt-2 inline-block">
                        Añadir cualidades
                    </Link>
                </div>
            )}
        </motion.div>
    )
}
