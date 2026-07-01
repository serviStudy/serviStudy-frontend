"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Loader2, User, Briefcase, MapPin, Phone, Star, CalendarDays, DollarSign, FileText, Building2 } from 'lucide-react';
import type { ActiveTask } from '../types/agent.types';

interface TaskPanelProps {
  task: ActiveTask;
  userType: 'student' | 'employer';
}

const PROFILE_STEPS = [
  'Nombre completo',
  'Número de contacto',
  'Descripción personal',
  'Habilidades',
  'Días laborales',
  'Jornada de trabajo',
  'Finalizar perfil',
];

const OFFER_STEPS = [
  'Título del puesto',
  'Descripción',
  'Salario',
  'Ubicación',
  'Requisitos',
  'Publicar oferta',
];

function PreviewField({ label, value, icon: Icon, pulse }: {
  label: string;
  value?: string | string[] | number;
  icon: React.ElementType;
  pulse?: boolean;
}) {
  const isEmpty = value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
  const displayValue = Array.isArray(value) ? value.join(', ') : value;

  return (
    <div className={`flex items-start gap-2 p-2 rounded-lg transition-all duration-300 ${isEmpty ? 'opacity-40' : 'opacity-100'} ${pulse ? 'bg-blue-50 ring-1 ring-blue-200' : ''}`}>
      <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isEmpty ? 'text-gray-300' : 'text-blue-500'}`} />
      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        {isEmpty ? (
          <div className="h-3 bg-gray-100 rounded w-24 mt-1 animate-pulse" />
        ) : (
          <p className="text-xs text-gray-800 font-semibold truncate">{String(displayValue)}</p>
        )}
      </div>
    </div>
  );
}

function ProfilePreview({ preview }: { preview: ActiveTask['preview'] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
          {preview.name ? preview.name.charAt(0).toUpperCase() : '?'}
        </div>
        <div>
          <p className="text-white font-bold text-xs truncate">{preview.name || 'Tu nombre...'}</p>
          <p className="text-blue-200 text-[10px] truncate">{preview.email || 'tu@email.edu.co'}</p>
        </div>
      </div>
      <div className="p-2 grid grid-cols-1 gap-1">
        <PreviewField label="Teléfono" value={preview.phone} icon={Phone} />
        <PreviewField label="Descripción" value={preview.description} icon={FileText} />
        <PreviewField label="Habilidades" value={preview.skills} icon={Star} />
        <PreviewField label="Disponibilidad" value={preview.workDays} icon={CalendarDays} />
        <PreviewField label="Jornada" value={preview.schedule} icon={CalendarDays} />
      </div>
    </div>
  );
}

function OfferPreview({ preview }: { preview: ActiveTask['preview'] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
          <Briefcase className="w-4 h-4" />
        </div>
        <div>
          <p className="text-white font-bold text-xs truncate">{preview.title || 'Título del puesto...'}</p>
          <p className="text-green-200 text-[10px] truncate">{preview.company || 'Tu empresa'}</p>
        </div>
      </div>
      <div className="p-2 grid grid-cols-1 gap-1">
        <PreviewField label="Descripción" value={preview.offerDescription} icon={FileText} />
        <PreviewField label="Salario" value={preview.salary ? `$${preview.salary.toLocaleString('es-CO')}` : undefined} icon={DollarSign} />
        <PreviewField label="Ubicación" value={preview.location} icon={MapPin} />
        <PreviewField label="Requisitos" value={preview.requirements} icon={Star} />
      </div>
    </div>
  );
}

export const TaskPanel = ({ task, userType }: TaskPanelProps) => {
  const steps = task.steps.length > 0 ? task.steps : (task.taskType === 'CREATE_PROFILE' ? PROFILE_STEPS : OFFER_STEPS).map((label, i) => {
    const stepProgress = ((i + 1) / (task.taskType === 'CREATE_PROFILE' ? PROFILE_STEPS.length : OFFER_STEPS.length)) * 100;
    return {
      label,
      completed: task.progress >= stepProgress,
      current: task.progress < stepProgress && task.progress >= ((i) / (task.taskType === 'CREATE_PROFILE' ? PROFILE_STEPS.length : OFFER_STEPS.length)) * 100,
    };
  });

  const title = task.taskType === 'CREATE_PROFILE' ? 'Creando tu Perfil' : 'Creando Oferta de Trabajo';
  const Icon = task.taskType === 'CREATE_PROFILE' ? User : Building2;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-col h-full bg-gray-50 border-l border-gray-100 overflow-y-auto"
      >
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              <Icon className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">{title}</p>
              <p className="text-[10px] text-gray-400">Vista previa en tiempo real</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${task.progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1 text-right font-medium">{task.progress}% completado</p>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 space-y-4 overflow-y-auto">
          {/* Steps */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Pasos</p>
            <div className="space-y-1">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all ${
                    step.completed
                      ? 'bg-blue-50 text-blue-700'
                      : step.current
                      ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
                      : 'text-gray-400'
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  ) : step.current ? (
                    <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin shrink-0" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                  )}
                  <span className={`font-medium ${step.current ? 'font-bold' : ''}`}>{step.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Live preview */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Vista Previa</p>
            {task.taskType === 'CREATE_PROFILE' ? (
              <ProfilePreview preview={task.preview} />
            ) : (
              <OfferPreview preview={task.preview} />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
