import { BarraSuperior } from '@/features/restricted/estudiante/misPostulaciones/components/BarraSuperior'
import { ListPostulacionesClient } from '@/features/restricted/estudiante/misPostulaciones/hooks/ListPostulationClient'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col min-h-screen w-full items-center pb-16 px-4'>
            <div className='flex flex-col gap-12 w-full max-w-5xl'>
                <BarraSuperior/>
                <ListPostulacionesClient/>
            </div>
        </div>
    )
}

export default page