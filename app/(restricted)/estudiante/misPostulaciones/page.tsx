import { BarraSuperior } from '@/features/restricted/estudiante/misPostulaciones/components/BarraSuperior'
import { ListPostulacionesClient } from '@/features/restricted/estudiante/misPostulaciones/hooks/ListPostulationClient'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col w-full pb-16'>
            <div className='flex flex-col gap-12 w-full'>
                <BarraSuperior/>
                <ListPostulacionesClient/>
            </div>
        </div>
    )
}

export default page