import { HeaderStudent } from '@/components/shared/HeaderStudent'
import { BarraSuperior } from '@/features/misPostulaciones/components/BarraSuperior'
import { ListPostulacionesClient } from '@/features/misPostulaciones/hooks/ListPostulationClient'
import React from 'react'

const page = () => {
    return (
        <div className='flex min-h-screen  items-center justify-center py-8'>
            <div className='flex flex-col gap-10'>
                <BarraSuperior/>
                <ListPostulacionesClient/>
            </div>
        </div>
    )
}

export default page