"use client";

import { Zap } from "lucide-react";
import { motion } from "framer-motion";
import { StudentSkill } from "../../types/applicants.types";

interface Props {
  skills?: StudentSkill[];
}

export const SkillsCard = ({ skills }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-linear-to-br from-green-500 to-emerald-600 p-2.5 rounded-2xl shadow-sm text-white">
          <Zap className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Cualidades y Habilidades</h3>
      </div>

      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2.5">
          {skills.map((s, idx) => (
            <motion.div
              key={s.id || idx}
              whileHover={{ scale: 1.03, y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-blue-50/45 hover:bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100/60 shadow-2xs flex items-center gap-2 transition-all cursor-default"
            >
              <div className="h-1.5 w-1.5 rounded-xl bg-blue-500" />
              <span>{s.skillName}</span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50/50 rounded-xl p-6 border border-dashed border-gray-200 flex flex-col items-center text-center">
          <p className="text-sm text-gray-400 font-medium italic">
            El estudiante no ha registrado habilidades destacadas.
          </p>
        </div>
      )}
    </motion.div>
  );
};
