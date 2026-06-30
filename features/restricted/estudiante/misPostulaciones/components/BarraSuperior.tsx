import { Button } from '@/components/ui/button'
import { routes } from '@/type/routes'
import { ArrowRight, Briefcase, CircleCheckBig } from 'lucide-react'
import Link from 'next/link'

export const BarraSuperior = () => {
    return (
        <div className="md:bg-linear-to-r from-blue-800 via-indigo-500 to-blue-600 rounded-xl py-2 px-5 md:py-6 md:mb-8 overflow-hidden relative md:shadow-sm">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 md:bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 md:bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

            {/* Content */}
            <div className="relative z-10 font-bold text-white mb-3 flex justify-between">
                <div className='flex gap-2 items-start'>
                    <div className="md:bg-blue-100/40 bg-blue-100 p-3.5 rounded-lg md:text-blue-200 text-blue-600 transition-transform duration-500">
                        <CircleCheckBig size={24}/>
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <h2 className="text-3xl md:text-3xl tracking-tight md:text-white text-blue-300">
                            Mis <span className="md:text-blue-300 text-blue-700">Postulaciones</span>
                        </h2>
                        <p className="hidden md:block text-white/90 font-medium text-sm md:text-base max-w-xl mb-6 leading-relaxed">
                            Gestiona tus procesos de selección y realiza el seguimiento de tus candidaturas de manera eficiente.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex-col hidden md:block">
                    <Link
                        href={routes.estudiante.ofertas}
                    >
                        <Button className="flex items-center mt-2 gap-2 bg-blue-100/40 backdrop-blur-xl py-5 border border-white/20 text-white px-7 rounded-xl text-sm font-bold transition-all hover:bg-white/20 active:scale-95 group">
                            <Briefcase size={24}/>
                            Ir a ofertas activas
                            <ArrowRight size={16} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
