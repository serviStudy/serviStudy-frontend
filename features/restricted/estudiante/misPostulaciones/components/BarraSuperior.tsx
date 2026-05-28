import { routes } from '@/type/routes'
import { ArrowRight, Briefcase } from 'lucide-react'
import Link from 'next/link'

export const BarraSuperior = () => {
    return (
        <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 rounded-xl py-8 px-5 md:py-10 md:px-8 mb-4 md:mb-8 overflow-hidden relative shadow-sm">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                    Mis <span className="text-blue-300">Postulaciones</span>
                </h2>
                <p className="text-white/80 font-medium text-sm md:text-base max-w-xl mb-8 leading-relaxed">
                    Gestiona tus procesos de selección y realiza el seguimiento de tus candidaturas de manera eficiente.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col items-center gap-4 w-full justify-center">
                    <p className="text-white text-sm md:text-base font-semibold">
                        ¿Te gustaría explorar más ofertas?
                    </p>
                    <Link
                        href={routes.estudiante.ofertas}
                        className="flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-white/20 text-white px-7 py-3 rounded-xl text-sm font-bold transition-all hover:bg-white/20 active:scale-95 group"
                    >
                        <div className="bg-blue-600 p-1.5 rounded-lg text-white transition-transform duration-500">
                            <Briefcase size={18} strokeWidth={3} />
                        </div>
                        Ir a ofertas activas
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
