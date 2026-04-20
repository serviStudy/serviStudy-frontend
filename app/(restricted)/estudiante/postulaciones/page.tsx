import { HeaderStudent } from '@/components/shared/HeaderStudent'
import { BarraSuperior } from '@/features/misPostulaciones/components/BarraSuperior'
import { ListPostulaciones } from '@/features/misPostulaciones/components/ListPostulaciones'
import { Postulacion } from '@/features/misPostulaciones/components/Postulacion'
import React from 'react'

const page = () => {
    return (
        <div className='flex min-h-screen items-center justify-center py-8'>
            <HeaderStudent name={''}/>
            <div className='flex flex-col gap-10'>
                <BarraSuperior/>
                <ListPostulaciones/>
            </div>
        </div>
    )
}

export default page