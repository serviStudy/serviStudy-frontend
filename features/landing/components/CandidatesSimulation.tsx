"use client"

import React from "react"
import { motion } from "framer-motion"
import { Users, Mail, Phone } from "lucide-react"

const MOCK_CANDIDATES = [
  {
    name: "Mateo Rodríguez",
    email: "mateo.rod@university.edu.co",
    phone: "+57 315 289 4432",
    skills: ["React", "TypeScript", "Next.js"],
    type: "Medio Tiempo",
    match: "98% Match IA",
    avatarBg: "bg-emerald-500"
  },
  {
    name: "Valeria Santos",
    email: "val.santos@university.edu.co",
    phone: "+57 301 756 1234",
    skills: ["Figma", "Design Systems", "UX Research"],
    type: "Medio Tiempo",
    match: "94% Match IA",
    avatarBg: "bg-teal-500"
  },
  {
    name: "Lucas Silva",
    email: "lucas.silva@university.edu.co",
    phone: "+57 311 988 5431",
    skills: ["Python", "SQL", "Machine Learning"],
    type: "Tiempo Completo",
    match: "89% Match IA",
    avatarBg: "bg-green-600"
  }
]

export default function CandidatesSimulation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -30 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl flex flex-col gap-4 text-left"
    >
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <span className="font-extrabold text-sm uppercase tracking-wider text-green-100 flex items-center gap-2">
          <Users size={16} /> Postulantes Recibidos
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-green-500 text-white font-extrabold text-[10px] animate-pulse">
          +3 Nuevos
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        {MOCK_CANDIDATES.map((cand, idx) => (
          <motion.div
            key={idx}
            whileHover={{ x: 6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white text-slate-900 rounded-2xl p-4 shadow-md border border-slate-100 flex flex-col gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs ${cand.avatarBg} shadow-inner`}>
                {cand.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-950 truncate">
                    {cand.name}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-linear-to-r from-lime-100 to-green-200 border border-green-100 text-green-700 font-extrabold whitespace-nowrap">
                    {cand.match}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-[11px] font-bold text-slate-500 border-t border-slate-100 pt-2">
              <div className="flex items-center gap-1.5">
                <Mail size={11} className="text-slate-400" />
                <span className="truncate">{cand.email}</span>
              </div>
              <div className="flex items-center justify-between gap-1.5 mt-0.5">
                <span className="flex items-center gap-1.5">
                  <Phone size={11} className="text-slate-400" />
                  <span>{cand.phone}</span>
                </span>
                <span className="text-orange-700 bg-orange-50/50 px-1.5 py-0.5 rounded text-[10px]">
                  {cand.type}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
