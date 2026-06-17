"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TaskProgress } from './TaskProgress';
import { ChatSuggestions } from './ChatSuggestions';
import { Sparkles, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  progress?: number;
  suggestions?: { type: string, list: string[] };
}

interface AgentChatProps {
  userType: 'student' | 'employer';
}

export const AgentChat: React.FC<AgentChatProps> = ({ userType }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: `¡Hola! Soy tu Agente IA exclusivo de ServiStudy Premium. ¿En qué te puedo ayudar hoy?`,
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    // Add user message
    const newUserMsg: Message = { id: Date.now().toString(), type: 'user', content: text };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const endpoint = userType === 'student' ? '/api/proxy/agent/student/' : '/api/proxy/agent/employer/';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const newAgentMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: data.message || "Lo siento, no entendí la respuesta.",
        progress: data.data?.progress,
        suggestions: data.data?.suggestions
      };

      setMessages(prev => [...prev, newAgentMsg]);
    } catch (error) {
      console.error('Error communicating with agent:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: "Ha ocurrido un error de conexión. Por favor, intenta de nuevo más tarde."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-4rem)] max-w-5xl mx-auto rounded-3xl overflow-hidden bg-[#fafcff] shadow-[0_0_50px_rgba(0,0,0,0.03)] border border-gray-100 relative">
      
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-xl px-8 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-indigo-700 flex items-center gap-2">
              Agente IA Premium
              <Sparkles size={16} className="text-indigo-500" />
            </h1>
            <p className="text-sm text-gray-500 font-medium">Siempre en línea y listo para ayudar</p>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-2 scroll-smooth">
        {messages.map((msg, index) => (
          <div key={msg.id}>
            <ChatMessage type={msg.type} content={msg.content} id={msg.id} />
            
            {/* Show progress bar if exists */}
            {msg.progress !== undefined && msg.progress !== null && (
              <div className="ml-14">
                <TaskProgress progress={msg.progress} />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-center gap-3 ml-14 mb-6"
          >
            <div className="flex gap-1.5 p-4 bg-white rounded-3xl rounded-tl-sm border border-gray-100 shadow-sm w-fit">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Suggestions */}
      {messages.length > 0 && messages[messages.length - 1].suggestions?.list && !isLoading && (
        <div className="absolute bottom-[90px] w-full px-4 flex justify-center z-20 pointer-events-none">
          <div className="pointer-events-auto">
            <ChatSuggestions 
              suggestions={messages[messages.length - 1].suggestions!.list} 
              type={messages[messages.length - 1].suggestions!.type as any}
              onSelect={handleSendMessage}
              className="justify-center bg-white/60 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/40"
            />
          </div>
        </div>
      )}

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};
