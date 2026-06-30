"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Crown } from 'lucide-react';

interface WelcomeBannerProps {
  userName: string;
  itemVariants: any;
}

export const WelcomeBanner = ({ userName, itemVariants }: WelcomeBannerProps) => {
  return (
    <motion.div variants={itemVariants} className="bg-linear-to-r from-violet-700 via-blue-600 to-sky-400 rounded-xl p-8 shadow-md flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
      <div className="flex items-center gap-6 z-10 w-full md:w-auto">
        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shrink-0">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col gap-1 text-white">
          <h1 className="text-3xl font-extrabold tracking-tight">
            ¡Hola, {userName}! 👋
          </h1>
          <p className="text-white/90 text-[15px] font-medium">
            Estás disfrutando de los beneficios premium de tu plan Premium Estudiante.
          </p>
        </div>
      </div>
      
      <Link href="/estudiante/ofertasActivas" className="z-10 w-full md:w-auto shrink-0">
        <button className="w-full md:w-auto px-6 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl font-semibold transition-all shadow-sm flex items-center justify-center gap-2">
          <span className="text-xl leading-none">+</span> Explorar Vacantes
        </button>
      </Link>
    </motion.div>
  );
};
