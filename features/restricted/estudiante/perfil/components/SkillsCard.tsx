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
        <motion.div variants={variants} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
                <div className={`${isPremium ? 'bg-linear-to-r from-[#00d15a] via-[#0088ff] to-[#004ee0]' : 'bg-blue-600'} p-2 rounded-lg text-white`}>
                    <Star className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">Cualidades</h3>
            </div>
            {skills && skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {skills.map((s, idx) => (
                        <div key={idx} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100 transition-colors hover:bg-blue-100 capitalize">
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
