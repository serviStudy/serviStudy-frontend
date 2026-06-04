"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Briefcase,
  Users,
  Sparkles,
  Search,
  Filter,
  ExternalLink,
  Star,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function EmployerDashboardPreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full py-24 px-6 flex flex-col items-center gap-12 bg-linear-to-b from-white via-green-50/20 to-white relative overflow-hidden"
    >
      {/* Animated Light Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-100/20 rounded-full blur-[130px] pointer-events-none animate-pulse-slow" />

      <div className="text-center space-y-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">
          Vista previa <span className="text-transparent bg-clip-text bg-linear-to-r from-green-700 to-emerald-600">de la plataforma</span>
        </h2>
        <p className="text-gray-500 font-bold text-lg max-w-2xl mx-auto opacity-80">
          Gestiona tus ofertas y evalúa candidatos de forma ágil desde nuestro panel inteligente para reclutadores.
        </p>
      </div>

      {/* simulated SaaS Dashboard container */}
      <div className="w-full max-w-5xl rounded-3xl bg-slate-950 text-slate-100 shadow-2xl border border-slate-800 overflow-hidden relative z-10 flex flex-col md:flex-row">
        {/* Mini Sidebar */}
        <div className="w-full md:w-56 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center font-black">SS</div>
            <span className="font-extrabold text-sm tracking-tight">ServiStudy Recruit</span>
          </div>

          <div className="flex flex-col gap-2 mt-4 text-xs font-bold text-slate-400">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-green-400 rounded-lg cursor-pointer">
              <BarChart3 size={15} /> Dashboard
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-all">
              <Briefcase size={15} /> Ofertas Activas
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-all">
              <Users size={15} /> Candidatos
            </div>
            <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-all">
              <Sparkles size={15} /> Compatibilidad IA
            </div>
          </div>
        </div>

        {/* Main Panel Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 bg-slate-950">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="font-extrabold text-lg text-white">¡Hola, Carlos! 👋</h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Estás disfrutando de los beneficios premium de tu plan Semestral Empleador.</p>
            </div>
            <Badge className="bg-green-600 text-white font-bold px-3 py-1">+ Crear nueva vacante</Badge>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Ofertas Activas", val: "5", sub: "+12 esta sem." },
              { label: "Perfil Completo", val: "88%", sub: "Match por IA" },
              { label: "Total Ofertas", val: "4", sub: "3 activas" }
            ].map((stat, sIdx) => (
              <div key={sIdx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{stat.label}</p>
                <h4 className="text-xl md:text-2xl font-black text-white mt-1">{stat.val}</h4>
                <p className="text-[9px] text-slate-500 font-semibold mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Simulated Content Area (Filters + Candidate Detail) */}
          <h4 className="font-bold">Actividad Reciente</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column: Candidates list */}
            <div className="border border-slate-800 bg-slate-900/50 rounded-xl p-4 flex flex-col gap-3">

              <div className="flex flex-col gap-2">
                {[
                  { name: "Mateo Rodríguez", role: "Cocinero", active: true },
                  { name: "Valeria Santos", role: "Profesora particular", active: false },
                  { name: "Lucas Silva", role: "Jardinero", active: false },
                  { name: "Sara Valencia", role: "Niñera", active: false }
                ].map((c, cIdx) => (
                  <div
                    key={cIdx}
                    className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      c.active
                        ? "bg-green-600/10 border-green-500/40 text-white"
                        : "bg-slate-950 border-slate-800/80 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    <div>
                      <h5 className="font-extrabold text-xs text-slate-100">{c.name}</h5>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">{c.role}</p>
                    </div>
                    <Badge className={c.active ? "bg-transparent text-white" : "bg-transparent text-slate-300"}>
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Highlighted Candidate Profile Analysis */}
            <div className="border border-slate-800 bg-slate-900 rounded-xl flex flex-col justify-between">
              <div className="bg-linear-to-r from-green-500 to-blue-500 p-4 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="border border-green-300 p-2 rounded-xl">
                    <Sparkles size={16}/>
                  </div>
                  <span className="text-sm font-extrabold tracking-wider text-white">Beneficios Activos</span>
                </div>
                  <p className="font-bold pt-1 text-[10px] text-gray-50 pl-11">Plan de subscripción</p>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                {[
                  { icon: Sparkles, text: "Búsqueda semántica con IA" },
                  { icon: Star, text: "Mayor visibilidad en la plataforma" },
                  { icon: CheckCircle2, text: "Soporte prioritario" },
                  { icon: Briefcase, text: "Búsqueda avanzada de candidatos" },
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-green-200/10 flex items-center justify-center shrink-0 border-none">
                      <benefit.icon size={14} className="text-green-600" />
                    </div>
                    <span className="font-medium text-gray-300">{benefit.text}</span>
                  </div>
                ))}
              </div>

                  <Button className="flex-1 w-full mt-4 bg-linear-to-r from-green-500 to-blue-500 text-white font-extrabold text-xs h-9 rounded-lg">
                    <Sparkles size={16}/>
                    Buscar talento con IA
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
