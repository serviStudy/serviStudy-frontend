"use client"

import React from "react"
import { motion } from "framer-motion"
import { Briefcase, Building2, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MOCK_JOBS = [
  {
    role: "Mesero",
    company: "Turnito",
    location: "Crra 14",
    salary: "$3.500.000 COP",
    type: "Medio tiempo",
    tags: ["Puntualidad", "Atención al cliente"]
  },
  {
    role: "Paseador de perros",
    company: "Benefict",
    location: "Laureles",
    salary: "$2.800.000 COP",
    type: "Medio Tiempo",
    tags: ["Puntualidad", "Buen estado físico"]
  },
  {
    role: "Moderador de contenido",
    company: "RemoteService",
    location: "La castellana",
    salary: "$3.200.000 COP",
    type: "Tiempo Completo",
    tags: ["Comunicación afectiva", "Responsable"]
  }
]

export default function JobBoardSimulation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -30 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-left"
    >
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <span className="font-extrabold text-sm uppercase tracking-wider text-blue-100 flex items-center gap-2">
          <Briefcase size={16} /> Ofertas Destacadas
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping" />
      </div>

      <div className="flex flex-col gap-3.5">
        {MOCK_JOBS.map((job, idx) => (
          <motion.div
            key={idx}
            whileHover={{ x: 6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white text-slate-900 rounded-2xl p-4 shadow-md border border-slate-100 flex flex-col gap-3 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-slate-950 transition-colors group-hover:text-blue-700">
                  {job.role}
                </h4>
                <p className="text-xs text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                  <Building2 size={12} /> {job.company}
                </p>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-extrabold text-[10px]">
                {job.salary}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1 text-emerald-600">
                <MapPin size={12} /> {job.location}
              </span>
              <span className="text-slate-400">
                {job.type}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {job.tags.slice(0, 2).map((tag, tIdx) => (
                <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
