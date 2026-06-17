import React from 'react';
import { Bot, User, Sparkles } from 'lucide-react';
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 w-full ${isAgent ? 'justify-start' : 'justify-end'} mb-6`}
    >
      {/* Agent Avatar */}
      {isAgent && (
        <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
          <Sparkles size={20} />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`relative max-w-[80%] md:max-w-[70%] px-5 py-4 rounded-3xl ${
          isAgent
            ? 'bg-white/80 backdrop-blur-md border border-gray-100 text-gray-800 rounded-tl-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-[0_8px_30px_rgb(79,70,229,0.2)]'
        }`}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>

      {/* User Avatar */}
      {!isAgent && (
        <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500">
          <User size={20} />
        </div>
      )}
    </motion.div>
  );
};
