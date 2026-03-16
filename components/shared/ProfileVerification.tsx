import { ShieldCheck } from 'lucide-react'
import React from 'react'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '../ui/item'
import { Button } from '../ui/button'

export const ProfileVerification = () => {
    return (
        <div className='flex tems-center justify-center'>
            <Item  className='h-29 bg-linear-to-r from-chart-1 to-chart-2 w-240.5 rounded-[14px] py-3 px-8 flex items-center justify-between'>
                <ItemContent>
                    <div className='flex'>
                        <ItemTitle className='font-bold text-[32px]'>Verfica tu perfil</ItemTitle>
                        <ItemDescription className='text-[20px'>Adjunta tu documento para obtener la etiqueta de verificación</ItemDescription>
                        <div></div>
                        <ShieldCheck className='h-17.5 w-17.5 text-white justify-center' strokeWidth={1}/>
                    </div>
                </ItemContent>
                <ItemActions>
                    <Button  className='w-[197] h-14.5 rounded-[19px] bg-white text-[20px] text-primary font-bold'>Verificar</Button>
                </ItemActions>
            </Item>
        </div>
    )
}
