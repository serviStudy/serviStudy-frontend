import { routes } from '@/type/routes'
import { ArrowRight, Briefcase } from 'lucide-react'
import Link from 'next/link'

export const BarraSuperior = () => {
    return (
        <div className='bg-linear-to-r from-chart-1 to-blue-600 text-center p-9 flex flex-col w-[60vw] md:w-full gap-6 md:gap-9 items-center justify-between w-full rounded-3xl shadow-sm border border-gray-100'>
            <div className='flex flex-col gap-2 md:gap-1'>
                <h2 className='text-xl font-bold text-white'>Mis <span className='text-blue-300'>Postulaciones</span></h2>
                <p className='text-sm text-white/80 font-bold'>Revisa y gestiona las ofertas a las que te has postulado</p>
            </div>
            <Link
                href={routes.estudiante.ofertas}
                className='flex items-center gap-2.5 px-6 py-3 bg-white text-blue-900 items-center justify-center text-sm font-semibold rounded-lg transition-all shadow-md shadow-blue-900/20'
            >
                Buscar más ofertas
                <ArrowRight className='h-4 w-4' />
            </Link>
        </div>
    )
}
