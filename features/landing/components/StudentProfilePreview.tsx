"use client"

import React from "react"
import { motion } from "framer-motion"
import { Award, CheckCircle2 } from "lucide-react"

export default function StudentProfilePreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full py-24 px-6 flex flex-col items-center gap-12 bg-linear-to-b from-white via-blue-50/20 to-white relative overflow-hidden"
    >
      {/* Animated Light Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[130px] pointer-events-none animate-pulse-slow" />

      <div className="text-center space-y-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">
          Personaliza <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-indigo-600">tu perfil</span>
        </h2>
        <p className="text-gray-500 font-bold text-lg max-w-2xl mx-auto opacity-80">
          Muestra tu potencial real a los reclutadores estructurando tu perfil de manera interactiva.
        </p>
      </div>

      {/* Overlapping Staggered 3D-like Cards Layout */}
      <div className="grid gap-8 lg:grid-cols-3 max-w-6xl w-full relative z-10 pt-8 px-4 items-center">
        {/* Card 1: Habilidades */}
        <motion.div
          whileHover={{ rotate: 0, scale: 1.03, y: -5 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 lg:rotate-[-2deg] flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
              <Award size={20} />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Habilidades</h3>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {[
              { name: "React / Next.js", progress: 90, color: "bg-blue-600" },
              { name: "TailwindCSS / Styling", progress: 95, color: "bg-cyan-500" },
              { name: "TypeScript / JS", progress: 85, color: "bg-indigo-600" },
              { name: "Figma / UI Design", progress: 75, color: "bg-purple-500" },
              { name: "Node.js / Express", progress: 70, color: "bg-emerald-500" }
            ].map((skill, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>{skill.name}</span>
                  <span>{skill.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: sIdx * 0.1 }}
                    className={`h-full rounded-full ${skill.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 2: Main Student Card (Highlighted center) */}
        <motion.div
          whileHover={{ rotate: 0, scale: 1.04, y: -8 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="bg-white border-2 border-blue-200 rounded-[2.5rem] p-8 md:p-10 shadow-2xl hover:shadow-blue-100 transition-all duration-300 lg:rotate-[1deg] flex flex-col gap-6 relative z-20"
        >
          <div className="absolute top-0 right-6 translate-y-[-50%] rounded-full bg-blue-600 px-4 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
            Perfil Estrella
          </div>

          <div className="flex flex-col items-center text-center gap-4 mt-2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg border-4 border-white">
              CR
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-900">Camila Restrepo</h3>
              <p className="text-xs text-blue-600 font-extrabold mt-0.5">camilaRestrepo@uni.edu.co</p>
              <p className="text-[11px] text-slate-400 font-semibold">Universidad del Valle</p>
            </div>
          </div>

          <p className="text-slate-500 text-xs font-medium text-center leading-relaxed italic px-2">
            &ldquo;Apasionada por crear interfaces de usuario hermosas, intuitivas y eficientes en Next.js. Busco realizar mis prácticas profesionales en desarrollo web.&rdquo;
          </p>

          <div className="border-t border-slate-100 pt-4 flex flex-col gap-2 text-xs font-bold text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-400">Email:</span>
              <span>camila.res@mail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Teléfono:</span>
              <span>+57 318 456 9012</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Disponibilidad:</span>
              <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-[10px]">Inmediata</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Postulaciones */}
        <motion.div
          whileHover={{ rotate: 0, scale: 1.03, y: -5 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 lg:rotate-[3deg] flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Postulaciones</h3>
          </div>

          <div className="flex flex-col gap-3.5 mt-2">
            {[
              { role: "Frontend Developer", company: "Vercel", status: "Entrevista", color: "text-blue-700 bg-blue-50 border-blue-200" },
              { role: "UX/UI Designer", company: "Stripe", status: "En revisión", color: "text-amber-700 bg-amber-50 border-amber-200" },
              { role: "Product Designer", company: "Linear", status: "Recibida", color: "text-slate-700 bg-slate-50 border-slate-200" }
            ].map((app, aIdx) => (
              <div key={aIdx} className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-xs flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900">{app.role}</h4>
                  <p className="text-[10px] text-slate-400 font-bold">{app.company}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black border uppercase tracking-wider ${app.color}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
