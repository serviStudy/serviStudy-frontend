"use client";

import { User } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  description?: string;
}

export const AboutMeCard = ({ description }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-linear-to-br from-green-500 to-emerald-600 p-2.5 rounded-2xl shadow-sm text-white">
          <User className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Sobre mí</h3>
      </div>

      {description ? (
        <div className="border-l-3 border-green-500/80 pl-4 py-1">
          <p className="text-[15px] leading-relaxed text-gray-600 font-medium whitespace-pre-line">
            {description}
          </p>
        </div>
      ) : (
        <div className="bg-gray-50/50 rounded-xl p-6 border border-dashed border-gray-200 flex flex-col items-center text-center">
          <p className="text-sm text-gray-400 font-medium italic">
            El estudiante no ha añadido una descripción de perfil aún.
          </p>
        </div>
      )}
    </motion.div>
  );
};
