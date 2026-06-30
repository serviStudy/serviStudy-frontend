"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface TaskProgressProps {
  progress: number;
  label?: string;
}

export const TaskProgress: React.FC<TaskProgressProps> = ({ progress, label = 'Procesando...' }) => {
  const isDone = progress >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`border rounded-xl p-3.5 mb-4 max-w-xs transition-colors duration-500 ${
        isDone ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100'
      }`}
    >
      <div className={`flex items-center gap-2 mb-2 ${isDone ? 'text-green-700' : 'text-blue-700'}`}>
        {isDone ? (
          <CheckCircle2 size={14} className="shrink-0 text-green-500" />
        ) : (
          <Loader2 size={14} className="animate-spin shrink-0" />
        )}
        <span className="text-xs font-semibold">
          {isDone ? '¡Completado!' : label}
        </span>
        <span className="ml-auto text-xs font-bold">{Math.min(progress, 100)}%</span>
      </div>
      <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDone ? 'bg-green-100' : 'bg-blue-100'}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            isDone
              ? 'bg-gradient-to-r from-green-400 to-emerald-500'
              : 'bg-gradient-to-r from-blue-500 to-indigo-500'
          }`}
        />
      </div>
    </motion.div>
  );
};
