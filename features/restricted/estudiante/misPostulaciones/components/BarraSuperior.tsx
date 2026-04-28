import { routes } from '@/type/routes'
import { ArrowRight, Briefcase } from 'lucide-react'
import Link from 'next/link'

export const BarraSuperior = () => {
    return (
        <div className='flex md:flex-row  gap-4 flex-col items-center justify-between w-full bg-white rounded-3xl px-8 py-7 shadow-sm border border-gray-100'>
            <div className='flex flex-col md:gap-1'>
                <div className='flex items-center gap-3'>
                    <div className='bg-blue-50 p-2.5 rounded-xl flex items-center justify-center'>
                        <Briefcase className='h-5 w-5 text-[#2552d0]' strokeWidth={2} />
                    </div>
                    <h2 className='text-2xl font-extrabold text-gray-900 leading-none'>Mis Postulaciones</h2>
                </div>
                <p className='text-sm text-gray-500 pl-[52px]'>Revisa y gestiona las ofertas a las que te has postulado</p>
            </div>
            <Link
                href={routes.estudiante.ofertas}
                className='flex items-center gap-2.5 px-6 py-3 bg-[#2552d0] hover:bg-blue-800 text-white text-sm font-semibold rounded-2xl transition-all shadow-md shadow-blue-900/20'
            >
                Buscar más ofertas
                <ArrowRight className='h-4 w-4' />
            </Link>
        </div>
    )
}
