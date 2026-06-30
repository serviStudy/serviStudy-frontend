"use client";
import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ChatMessageProps {
  id: string;
  type: 'user' | 'agent';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => {
  const isAgent = type === 'agent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3 w-full ${isAgent ? 'justify-start' : 'justify-end'} mb-4`}
    >
      {/* Indicador agente */}
      {isAgent && (
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-4 self-start" />
      )}

      {/* Bubble */}
      <div
        className={`relative max-w-[80%] md:max-w-[72%] px-4 py-3 rounded-xl text-[14px] leading-relaxed whitespace-pre-wrap shadow-sm ${
          isAgent
            ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-blue-500/20'
        }`}
      >
        {content}
      </div>

      {/* User Avatar */}
      {!isAgent && (
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
          <User size={18} />
        </div>
      )}
    </motion.div>
  );
};
