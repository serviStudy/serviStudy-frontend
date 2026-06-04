import { motion } from 'framer-motion'
import { MessageSquareText, ReceiptText, Zap } from 'lucide-react'
import React from 'react'

export const BenefitsEmployer = () => {
    const benefitsEmployer = [
    {
        icon: <Zap size={24} />,
        title: "Proceso Ágil y Eficiente",
        description:
            "Facilita la contratación con un sistema centralizado que optimiza el tiempo de todos.",
        },
        {
        icon: <ReceiptText size={24}/>,
        title: "Ofertas Personalizadas",
        description: 
            "Crea vacantes adaptadas a las necesidades de tu empresa, para atraer postulantes más compatibles con el puesto",
        },
        {
        icon: <MessageSquareText size={24}/>,
        title: "Contacto Directo y Agil",
        description: 
            "Accede a perfiles completos y establece contacto con estudiantes que cumplan los requisitos de tu oferta.",
        }
    ]

    return (
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl w-full relative z-10">
            {benefitsEmployer.map((benefit, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-lg border border-white/80 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 flex flex-col gap-6 cursor-default hover:shadow-green-200/40""
                }`}
            >
                {/* INTERNAL CARD GLOW */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 transition-all duration-700 group-hover:opacity-40 -mr-8 -mt-8 bg-green-400"`} />

                <div className="relative">
                {/* ICON CONTAINER - LAYERED GLASS */}
                <div className={`absolute -inset-2 rounded-2xl blur-xl opacity-20 transition-opacity group-hover:opacity-40 bg-green-600`} />
                <div className={`relative w-14 h-14 flex items-center justify-center rounded-2xl border border-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6bg-green-500 text-white bg-green-500`}>
                    {benefit.icon}
                </div>
                </div>

                <div className="space-y-3">
                <h3 className={`text-xl font-black transition-colors duration-500 text-green-900 group-hover:text-green-700`}>
                    {benefit.title}
                </h3>
                <p className="text-gray-500 font-bold text-sm leading-relaxed opacity-90 transition-colors group-hover:text-gray-800">
                    {benefit.description}
                </p>
                </div>

                {/* DECORATIVE LINE */}
                <div className={`w-12 h-1 rounded-full transition-all duration-500 group-hover:w-full bg-green-600/20 group-hover:bg-green-600/40`} />
            </motion.div>
            ))}
        </div>
    )
}
