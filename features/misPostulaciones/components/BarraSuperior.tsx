import { routes } from '@/type/routes'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const BarraSuperior = () => {
    return (
        <div className='py-3 px-14 pt-11 flex align-middle  justify-between h-auto w-[85vw] border border-white lg:w-[70vw] lg:h-44 rounded-[21px] bg-gray-50'>
            <h3 className='text-primary text-[31px] font-bold'>Mis postulaciones</h3>
            <Link className='flex items-center gap-3 px-5! py-6 h-8 text-[20px] rounded-2xl text-white bg-linear-to-l from-blue-700 to-blue-900'href={routes.estudiante.ofertas}>Buscar más ofertas 
            <ChevronRight className='text-white font-bold h-7! w-7!'/>
            </Link>
        </div>
    )
}
