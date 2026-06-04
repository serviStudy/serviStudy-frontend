"use client"
import { Briefcase, Calendar, Mail, MessageSquareText, ReceiptText, Zap } from "lucide-react"
import { usePersistentRole } from "@/hooks/usePersistentRole"
import { motion } from "framer-motion"
import { BenefitStudent } from "./benefits/BenefitStudent"
import { BenefitsEmployer } from "./benefits/BenefitsEmployer"

export default function Benefits() {
  const { tipoUsuario } = usePersistentRole()
  const isEstudiante = tipoUsuario === "estudiante"
  const themeColor = isEstudiante ? "blue" : "green"

  return (
    <section className="w-full py-24 px-6 flex flex-col items-center gap-12 bg-white/30 relative overflow-hidden">
      {/* BACKGROUND DECORATIVE GLOWS */}
      <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${
        isEstudiante ? "bg-blue-100/40" : "bg-green-100/40"
      }`} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-950">
          ¿Por qué <span className={`text-transparent bg-clip-text bg-linear-to-r transition-all duration-1000 ${
            isEstudiante ? "from-blue-700 to-blue-500" : "from-green-700 to-green-500"
          }`}>ServiStudy</span>?
        </h2>
        <p className="text-gray-500 font-bold text-lg max-w-2xl mx-auto opacity-80">
          Diseñamos el camino perfecto para que tu talento encuentre su lugar ideal.
        </p>
      </motion.div>

      <div>
        {isEstudiante ? (
          <BenefitStudent></BenefitStudent>
        ) : (
          <BenefitsEmployer></BenefitsEmployer>
        )}
      </div>
    </section>
  )
}
