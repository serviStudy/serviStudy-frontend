import { ShieldCheck } from 'lucide-react'
import React from 'react'

export const VerifiedUser = () => {
    return (
        <>
            <div className='mt-2 w-41.5 border-dotted border-2 border-spacing-28 border-[#818181] lg:mt-3 lg:w-54.5 lg:h-6.5 rounded-[42px] gap-1.5 flex items-center justify-center'>
                <ShieldCheck className='h-3.75 w-3.75 lg:h-5 lg:w-5 text-[#818181] justify-center' strokeWidth={2}/>
                <p className='text-[#818181] text-[11px] lg:text-[15px]'>Estudiante no verificado</p>
            </div>
        </>
    )
}
