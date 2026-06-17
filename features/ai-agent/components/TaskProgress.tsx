import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface TaskProgressProps {
  progress: number; // 0 to 100
  label?: string;
}

export const TaskProgress: React.FC<TaskProgressProps> = ({ progress, label = "Progreso de la tarea..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl p-5 mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] max-w-md"
    >
      <div className="flex items-center gap-3 mb-3 text-indigo-600 font-medium">
        <Activity size={18} className="animate-pulse" />
        <span className="text-sm">{label}</span>
        <span className="ml-auto text-sm font-bold">{progress}%</span>
      </div>

      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
        
        {/* Progress Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative"
        >
          {/* Shimmer Effect */}
          <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden rounded-full">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
