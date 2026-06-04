import { motion } from 'framer-motion'
import { Briefcase, Calendar, Mail } from 'lucide-react'
import React from 'react'

export const BenefitStudent = () => {
    const benefitStudent = [
        {
        icon: <Briefcase size={24} />,
        title: "Gana Experiencia Real",
        description:
            "Aplica tus conocimientos en proyectos reales y desarrolla las habilidades que las empresas buscan.",
        },
        {
        icon: <Calendar size={24} />,
        title: "Flexibilidad Total",
        description:
            "Encuentra trabajos que se adaptan a tu horario de clases. Prioriza tus estudios sin sacrificar tu carrera.",
        },
        {
        icon: <Mail size={24}/>,
        title: "Postulación Rápida y Transparente",
        description: 
            "Gestiona tus postulaciones, revisa oportunidades compatibles y mantente informado sobre el estado de cada proceso de selección",
        }
    ]

    return (
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl w-full relative z-10">
            {benefitStudent.map((benefit, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-lg border border-white/80 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 flex flex-col gap-6 cursor-default hover:shadow-blue-200/40""
                }`}
            >
                {/* INTERNAL CARD GLOW */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 transition-all duration-700 group-hover:opacity-40 -mr-8 -mt-8 bg-blue-400"`} />

                <div className="relative">
                {/* ICON CONTAINER - LAYERED GLASS */}
                <div className={`absolute -inset-2 rounded-2xl blur-xl opacity-20 transition-opacity group-hover:opacity-40 bg-blue-600`} />
                <div className={`relative w-14 h-14 flex items-center justify-center rounded-2xl border border-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6bg-blue-500 text-white bg-blue-500`}>
                    {benefit.icon}
                </div>
                </div>

                <div className="space-y-3">
                <h3 className={`text-xl font-black transition-colors duration-500 text-blue-900 group-hover:text-blue-700`}>
                    {benefit.title}
                </h3>
                <p className="text-gray-500 font-bold text-sm leading-relaxed opacity-90 transition-colors group-hover:text-gray-800">
                    {benefit.description}
                </p>
                </div>

                {/* DECORATIVE LINE */}
                <div className={`w-12 h-1 rounded-full transition-all duration-500 group-hover:w-full bg-blue-600/20 group-hover:bg-blue-600/40`} />
            </motion.div>
            ))}
        </div>
    )
}
