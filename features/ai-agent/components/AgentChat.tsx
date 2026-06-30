"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutPanelLeft, X } from 'lucide-react';

import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TaskProgress } from './TaskProgress';
import { ChatSuggestions } from './ChatSuggestions';
import { TaskPanel } from './TaskPanel';
import { SubscriptionGate } from './SubscriptionGate';
import { TurnitoAvatar } from './TurnitoAvatar';
import type { AgentMessage, ActiveTask, TurnitoState } from '../types/agent.types';

// ─── Mensajes de bienvenida ──────────────────────────────────────────────────
const ONBOARDING_MSG = `¡Hola! 🐾 Soy Turnito, tu asistente de ServiStudy.

Veo que eres nuevo/a aquí. ¡Me alegra conocerte!

Puedo ayudarte a **crear tu perfil completo** desde cero para que empleadores puedan encontrarte más fácilmente. También te explicaré cómo funciona la plataforma.

¿Empezamos creando tu perfil?`;

const WELCOME_MSG = (isStudent: boolean) =>
  isStudent
    ? `¡Hola! 🐾 Soy Turnito, tu agente IA de ServiStudy Premium.\n\nPuedo ayudarte a:\n• Mejorar tu perfil estudiantil\n• Analizar compatibilidad con ofertas\n• Prepararte para entrevistas\n• Y mucho más...\n\n¿En qué te ayudo hoy?`
    : `¡Hola! 🐾 Soy Turnito, tu agente IA de ServiStudy Premium.\n\nPuedo ayudarte a:\n• Crear y optimizar ofertas de trabajo\n• Analizar candidatos estudiantes\n• Gestionar procesos de selección\n• Y mucho más...\n\n¿En qué te ayudo hoy?`;

const BLOCKED_MSG = `Para usar esta función necesitas **ServiStudy Premium**. 🌟\n\nComo usuario nuevo, solo tengo habilitada la creación de perfil de forma gratuita.\n\n¿Te ayudo a crear tu perfil ahora? ¡Es gratis y solo toma unos minutos!`;

// ─── Tipos internos ──────────────────────────────────────────────────────────
interface AgentChatProps {
  userType: 'student' | 'employer';
  subscriptionStatus?: 'ACTIVE' | 'INACTIVE';
  isNewUser?: boolean;
}

// ─── Componente ──────────────────────────────────────────────────────────────
export const AgentChat: React.FC<AgentChatProps> = ({
  userType,
  subscriptionStatus,
  isNewUser = false,
}) => {
  const isPremium = subscriptionStatus === 'ACTIVE';
  const isStudent = userType === 'student';

  const initMsg: AgentMessage = {
    id: '0',
    type: 'agent',
    content: isNewUser ? ONBOARDING_MSG : WELCOME_MSG(isStudent),
    suggestions: isNewUser
      ? { type: 'single-choice', list: ['Sí, crear mi perfil', 'Explícame la plataforma primero'] }
      : undefined,
  };

  const [messages, setMessages] = useState<AgentMessage[]>([initMsg]);
  const [isLoading, setIsLoading] = useState(false);
  const [turnitoState, setTurnitoState] = useState<TurnitoState>('idle');
  const [activeTask, setActiveTask] = useState<ActiveTask | null>(null);
  const [showTaskPanel, setShowTaskPanel] = useState(false); // mobile toggle
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Detect task from API response data
  const mergeTaskUpdate = useCallback((data: any, prev: ActiveTask | null): ActiveTask | null => {
    if (!data?.taskType && !prev) return null;
    const taskType = data?.taskType || prev?.taskType;
    if (!taskType) return null;
    return {
      taskType,
      progress: data?.progress ?? prev?.progress ?? 0,
      steps: data?.steps ?? prev?.steps ?? [],
      preview: { ...prev?.preview, ...data?.preview },
    };
  }, []);

  const handleSendMessage = async (text: string) => {
    const userMsg: AgentMessage = { id: Date.now().toString(), type: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setTurnitoState('thinking');

    // Guard: non-premium user trying non-onboarding actions
    if (!isPremium && !isNewUser) {
      await new Promise(r => setTimeout(r, 700));
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: BLOCKED_MSG,
      }]);
      setIsLoading(false);
      setTurnitoState('idle');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const endpoint = isStudent ? '/api/proxy/agent/student/' : '/api/proxy/agent/employer/';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ text, isNewUser }),
      });

      if (!response.ok) throw new Error('Error en la respuesta del servidor');

      const data = await response.json();

      const agentMsg: AgentMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: data.message || 'Lo siento, no entendí la respuesta.',
        suggestions: data.data?.suggestions,
        taskUpdate: data.data,
      };

      setMessages(prev => [...prev, agentMsg]);
      setActiveTask(prev => mergeTaskUpdate(data.data, prev));
      if (data.data?.taskType) setShowTaskPanel(true);

      setTurnitoState(data.data?.progress === 100 ? 'happy' : 'speaking');
      setTimeout(() => setTurnitoState('idle'), 3000);

    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: 'Hubo un error de conexión. Por favor intenta de nuevo.',
      }]);
      setTurnitoState('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const lastMsg = messages[messages.length - 1];
  const hasSuggestions = !!lastMsg?.suggestions?.list?.length && !isLoading;
  const showPanel = !!activeTask;

  return (
    <div className={`flex h-[calc(100svh-5rem)] md:h-[calc(100svh-3rem)] rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm transition-all duration-300`}>

      {/* ── Chat Column ─────────────────────────────────────────────── */}
      <div className={`flex flex-col min-w-0 transition-all duration-300 ${showPanel ? 'w-full md:w-[55%] lg:w-[58%]' : 'w-full'}`}>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white shrink-0">
          <TurnitoAvatar state={isLoading ? 'thinking' : turnitoState} size={40} showRing={isLoading} />
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              Turnito
              {isPremium && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md">
                  Premium
                </span>
              )}
              {isNewUser && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-100 text-green-700 rounded-md">
                  Onboarding
                </span>
              )}
            </h1>
            <p className="text-xs text-gray-400 truncate">
              {isLoading ? 'Escribiendo...' : 'Siempre en línea'}
            </p>
          </div>

          {/* Mobile: toggle task panel */}
          {showPanel && (
            <button
              onClick={() => setShowTaskPanel(v => !v)}
              className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100"
            >
              <LayoutPanelLeft className="w-3.5 h-3.5" />
              {showTaskPanel ? 'Chat' : 'Progreso'}
            </button>
          )}
        </div>

        {/* Mobile Task Panel toggle view */}
        <AnimatePresence>
          {showPanel && showTaskPanel && (
            <motion.div
              className="md:hidden flex-1 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="h-full max-h-[60vh] overflow-y-auto">
                <TaskPanel task={activeTask!} userType={userType} />
              </div>
              <button
                onClick={() => setShowTaskPanel(false)}
                className="w-full py-2 text-xs font-bold text-gray-500 border-t border-gray-100 flex items-center justify-center gap-1 hover:bg-gray-50"
              >
                <X className="w-3.5 h-3.5" /> Volver al chat
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-4 md:p-5 space-y-1 scroll-smooth ${showTaskPanel ? 'hidden md:block' : 'block'}`}>
          {messages.map((msg) => (
            <div key={msg.id}>
              <ChatMessage type={msg.type} content={msg.content} id={msg.id} />
              {msg.taskUpdate?.progress !== undefined && msg.taskUpdate.progress > 0 && (
                <div className="ml-11">
                  <TaskProgress progress={msg.taskUpdate.progress} />
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 mb-2"
            >
              <TurnitoAvatar state="thinking" size={36} />
              <div className="flex gap-1.5 p-3 bg-white border border-gray-100 rounded-xl rounded-tl-sm shadow-sm w-fit">
                {[0, 150, 300].map(d => (
                  <span key={d} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions (floating above input) */}
        {hasSuggestions && !showTaskPanel && (
          <div className="px-4 pb-2">
            <ChatSuggestions
              suggestions={lastMsg.suggestions!.list}
              type={lastMsg.suggestions!.type as any}
              onSelect={handleSendMessage}
            />
          </div>
        )}

        {/* Subscription gate for non-premium non-new users */}
        {!isPremium && !isNewUser && <SubscriptionGate userType={userType} />}

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>

      {/* ── Task Panel (desktop) ─────────────────────────────────────── */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '42%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="hidden md:flex flex-col min-w-0 max-w-[45%]"
          >
            <TaskPanel task={activeTask!} userType={userType} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
