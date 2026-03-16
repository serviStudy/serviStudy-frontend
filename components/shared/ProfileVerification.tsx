import { ShieldCheck } from 'lucide-react'
import React from 'react'
import { Item, ItemContent, ItemDescription, ItemTitle } from '../ui/item'
import { Button } from '../ui/button'

export const ProfileVerification = () => {
    return (
        <div className='flex tems-center'>  
            <Item className='lg:h-29 w-79 h-30 lg:w-242 bg-linear-to-r from-chart-1 to-chart-2 rounded-[14px] lg:py-3 lg:px-8 lg:items-center lg:justify-between'>
                <ItemContent className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2'>
                    <div className='items-center flex gap-4 lg:text-[20px] lg:flex-row lg:gap-3'>
                        <div>
                            <ShieldCheck className='lg:h-17.5 lg:w-17.5 w-11 h-12 text-white justify-center' strokeWidth={1}/>
                        </div>
                        <div>
                            <ItemTitle className='font-bold lg:text-[32px] text-[17px]'>Verfica tu perfil</ItemTitle>
                            <ItemDescription className='lg:text-[20px] text-white text-[11px]'>Adjunta tu documento para obtener la etiqueta de verificación</ItemDescription>
                        </div>
                    </div>
                    <Button className='lg:w-[197] lg:h-14.5 lg:text-[20px] h-6.25 rounded-[19px] bg-white text-[15px] text-primary font-bold'>Verificar</Button>
                </ItemContent>
            </Item>
        </div>
    )
}
