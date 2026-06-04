"use client"

import React from "react"
import { usePersistentRole } from "@/hooks/usePersistentRole"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import JobBoardSimulation from "./JobBoardSimulation"
import CandidatesSimulation from "./CandidatesSimulation"

export default function Hero() {
  const { tipoUsuario } = usePersistentRole()
  const isEstudiante = tipoUsuario === "estudiante"

  const heroContent = isEstudiante
    ? {
        title: "Donde tu carrera despega antes de graduarte",
        description: "Conectamos a estudiantes talentosos con empresas líderes para trabajos de medio tiempo, prácticas y proyectos que impulsan tu futuro profesional.",
        primaryBtn: "¡Registrate Ya!",
        primaryUrl: "/registro",
        secondaryBtn: "Ver ofertas",
        secondaryUrl: "#ofertas"
      }
    : {
        title: "Donde puedes encontrar estudiantes y postulaciones a tus ofertas",
        description: "Publica tus ofertas, evalúa candidatos mediante compatibilidad asistida por IA y contrata al talento universitario más calificado de forma ágil.",
        primaryBtn: "Publicar Oferta",
        primaryUrl: "/registro-empresa",
        secondaryBtn: "Ver Planes",
        secondaryUrl: "#precios"
      }

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative w-full py-10 lg:py-16 md:py-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[85vh]">
      {/* Animated Glow Elements */}
      <div className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none opacity-40 animate-float-slow-1 transition-colors duration-1000 ${
        isEstudiante ? "bg-blue-300" : "bg-green-300"
      }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-30 animate-float-slow-2 transition-colors duration-1000 ${
        isEstudiante ? "bg-indigo-300" : "bg-emerald-300"
      }`} />

      {/* Hero Card Container */}
      <div className={`relative w-full rounded-[2.5rem] p-8 md:p-14 lg:p-16 flex flex-col lg:flex-row gap-12 items-center shadow-2xl transition-all duration-1000 overflow-hidden border border-white/50 backdrop-blur-md ${
        isEstudiante
          ? "bg-gradient-to-br from-blue-600/90 via-indigo-600/95 to-blue-700/90 text-white shadow-blue-500/10"
          : "bg-gradient-to-br from-green-700/90 via-emerald-700/95 to-green-800/90 text-white shadow-green-500/10"
      }`}>
        {/* Internal Glowing Orb */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

        {/* Left Column: Title & Action buttons */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 text-left relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={tipoUsuario}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-white/10 border border-white/15 mb-4 backdrop-blur-sm ${
                isEstudiante ? "text-blue-100" : "text-green-100"
              }`}>
                <Sparkles size={14} className="animate-spin-slow" />
                {isEstudiante ? "Talento Universitario" : "Búsqueda de Talento"}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-sm">
                {heroContent.title}
              </h1>

              <p className="text-white/80 text-base md:text-lg max-w-xl font-medium mt-6 leading-relaxed">
                {heroContent.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href={isEstudiante ? "/registro" : "/login"} className="w-full sm:w-auto">
              <Button
                className={`w-full sm:w-auto bg-white hover:bg-white/95 py-6 px-10 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95 border-none flex items-center justify-center gap-2 ${
                  isEstudiante ? "text-blue-800" : "text-green-800"
                }`}
              >
                {heroContent.primaryBtn}
                <ArrowRight size={20} />
              </Button>
            </Link>
            
            <a
              href={heroContent.secondaryUrl}
              onClick={(e) => {
                if (heroContent.secondaryUrl.startsWith("#")) {
                  handleScrollTo(e, heroContent.secondaryUrl.substring(1))
                }
              }}
              className="w-full sm:w-auto"
            >
            </a>
          </div>
        </div>

        {/* Right Column: Dynamic Interactive Simulation Container */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10">
          <AnimatePresence mode="wait">
            {isEstudiante ? (
              <JobBoardSimulation key="student-sim" />
            ) : (
              <CandidatesSimulation key="employer-sim" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
