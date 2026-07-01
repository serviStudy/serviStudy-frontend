"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lock } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionGateProps {
  userType: 'student' | 'employer';
}

export const SubscriptionGate = ({ userType }: SubscriptionGateProps) => {
  const href = userType === 'student' ? '/estudiante/suscripcion' : '/empleador/suscripcion';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 flex items-start gap-3"
    >
      <div className="shrink-0 w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
        <Lock className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-blue-900">Función Premium</p>
        <p className="text-xs text-blue-600 mt-0.5">
          Esta función está disponible con ServiStudy Premium. ¡Actívalo y desbloquea todas las capacidades de Turnito!
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Ver planes Premium
        </Link>
      </div>
    </motion.div>
  );
};
