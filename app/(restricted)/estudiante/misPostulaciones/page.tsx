import { BarraSuperior } from '@/features/restricted/estudiante/misPostulaciones/components/BarraSuperior'
import { ListPostulacionesClient } from '@/features/restricted/estudiante/misPostulaciones/hooks/ListPostulationClient'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col w-[92vw] lg:w-[70vw] xl:w-auto pb-16'>
            <div className='flex flex-col gap-6 w-full'>
                <BarraSuperior/>
                <ListPostulacionesClient/>
            </div>
        </div>
    )
}

export default page