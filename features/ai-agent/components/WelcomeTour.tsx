"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { TurnitoAvatar } from './TurnitoAvatar';
import { useWelcomeTour } from '../hooks/useWelcomeTour';

interface WelcomeTourProps {
  role: 'STUDENT' | 'EMPLOYER';
  isPremium: boolean;
  onComplete: () => void;
}

export const WelcomeTour = ({ role, isPremium, onComplete }: WelcomeTourProps) => {
  const { steps, currentStep, next, prev, isLast, isFirst } = useWelcomeTour(role, isPremium);
  const step = steps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 overflow-hidden"
        >
          {/* Top decoration */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600" />

          {/* Close */}
          <button
            onClick={onComplete}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Turnito */}
          <div className="flex justify-center mb-4">
            <TurnitoAvatar state={isLast ? 'happy' : currentStep === 0 ? 'speaking' : 'idle'} size={80} showRing />
          </div>

          {/* Step indicator */}
          <div className="flex justify-center gap-1.5 mb-4">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-200'}`}
              />
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="text-center mb-6"
            >
              <div className="text-3xl mb-2">{step.icon}</div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                onClick={prev}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>
            )}
            <button
              onClick={isLast ? onComplete : next}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all"
            >
              {isLast ? '¡Listo, empecemos!' : (<>Siguiente <ChevronRight className="w-4 h-4" /></>)}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
