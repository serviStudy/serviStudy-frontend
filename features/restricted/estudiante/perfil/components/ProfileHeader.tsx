"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SquarePen } from 'lucide-react'

interface ProfileHeaderProps {
    variants: any;
}

export const ProfileHeader = ({ variants }: ProfileHeaderProps) => {
    return (
        <motion.div 
            variants={variants}
            className="w-full max-w-6xl mx-auto h-48 md:h-56 rounded-3xl bg-linear-to-br from-blue-900 via-blue-700 to-blue-600 relative overflow-hidden shadow-lg"
        >
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>
            
            <Link
                href="/estudiante/perfil/editar-perfil"
                className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl hover:bg-white/30 transition-all shadow-md border border-white/20 z-10"
            >
                <SquarePen className="h-5 w-5 text-white" />
            </Link>
        </motion.div>
    )
}
