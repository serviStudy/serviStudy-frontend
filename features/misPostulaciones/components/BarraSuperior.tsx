import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export const BarraSuperior = () => {
    return (
        <div className='py-3 px-14 pt-11 flex align-middle  justify-between h-auto w-[85vw] lg:w-[85vw] lg:h-44 rounded-[21px] bg-white'>
            <h3 className='text-primary text-[31px] font-bold'>Mis postulaciones</h3>
            <Button className='flex gap-3 px-5! py-6 text-[20px] text-primary bg-blue-200'>Buscar más ofertas 
            <ChevronRight className='text-primary font-bold h-7! w-7!'/>
            </Button>
        </div>
    )
}
