import React from 'react';
import { motion } from 'framer-motion';

interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  type: "single-choice" | "multiple-choice";
  className?: string;
}

export const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ suggestions, onSelect, type, className = "" }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 bg-indigo-50/50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 text-sm font-medium rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
};
