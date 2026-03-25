import { ShieldCheck } from 'lucide-react'
import React from 'react'
import { Item, ItemContent, ItemDescription, ItemTitle } from '../ui/item'
import { Button } from '../ui/button'
import VerifyProfileModal from "./VerifyProfileModal"
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

export const ProfileVerification = () => {
    return (
        <Dialog>
            <div className='flex tems-center'>  
                <Item className='lg:h-29 w-79 h-30 md:h-35 md:w-113 lg:w-242 bg-linear-to-r from-chart-1 to-chart-2 rounded-[14px] lg:py-3 lg:px-8 lg:items-center lg:justify-between'>
                    <ItemContent className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2'>
                        <div className='items-center flex gap-4 md:text-[16px] lg:text-[20px] lg:flex-row lg:gap-3'>
                            <ShieldCheck className='lg:h-17.5 lg:w-17.5 md:h-14 md:w-14 w-11 h-12 text-white justify-center' strokeWidth={1}/>
                            <div>
                                <ItemTitle className='font-bold lg:text-[27px] md:text-[22px] text-[17px]'>Verfica tu perfil</ItemTitle>
                                <ItemDescription className='lg:text-[17.5px] md:text-[14px] text-white text-[11px]'>Adjunta tu documento para obtener la etiqueta de verificación</ItemDescription>
                            </div>
                        </div>

                        <DialogTrigger asChild>
                            <Button variant={'verification'} className='lg:w-[197] lg:h-14.5 lg:text-[19px] md:h-7.25 h-6.25 rounded-[19px] cursor-pointer bg-white text-[15px] text-primary font-bold lg:hover:border-2 hover:border-white hover:text-white'>
                                Verificar
                            </Button>
                        </DialogTrigger>
                    </ItemContent>
                </Item>
            </div>

            <VerifyProfileModal/>
        </Dialog>
    )
}

export default ProfileVerification