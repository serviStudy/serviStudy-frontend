import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Check, CircleCheck, User } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

export const SuscriptionCard = () => {
    return (
        <div className='flex min-h-60 pt-10 items-center justify-center'>
            <Card className='w-full h-64 mx-6 md:mx-10 md:h-82 bg-blue-600 pt-4 py-4'>
                <div className='px-5 flex flex-col gap-4'>
                    <div className='flex gap-3 md:items-center'>
                        <div className='flex items-center justify-center h-8 w-11 bg-blue-500 rounded-[6px] md:h-11 md:w-12 md:rounded-[14px]'> 
                            <User className='text-white h-5 md:h-6.5 md:w-7'/>
                        </div>
                        <CardTitle className='font-semibold text-white text-[13px] leading-4 md:text-[19px]'> Plan Estudiante Trimestral</CardTitle>
                    </div>

                    <CardDescription className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-1'>
                            <p className='font-extrabold text-white text-[16px] md:text-[24px]'>$19.000 <span className='text-blue-300 font-medium text-[12px] md:text-[16px]'>/ 3 meses</span></p>
                            <p className='text-blue-100 text-[11px] leading-3 md:text-[17px] md:leading-6'>La opción recomendada para asegurar tu futuro</p>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <div className='flex gap-2'>
                                <div className='h-4 w-5 md:h-7 md:w-7 bg-blue-500 rounded-full flex items-center justify-center'>
                                    <Check className="text-blue-200 h-3 w-2.5 md:w-5 md:h-7" />
                                </div>
                                <p className='text-blue-100 text-[11px] leading-3 md:text-[17px] md:leading-6'>Notificaciones de ofertas compatibles</p>
                            </div>

                            <div className='flex gap-2'>
                                <div className='h-4 w-4 md:h-7 md:w-7 bg-blue-500 rounded-full flex items-center justify-center'>
                                    <Check className="text-blue-200 h-3 w-2.5 md:w-5 md:h-7" />
                                </div>
                                <p className='text-blue-100 text-[11px] leading-3 md:text-[17px] md:leading-6'>Mayor visibilidad de perfil</p>
                            </div>
                        </div>
                    </CardDescription>
                    <Button className='text-white rounded-[10px] text-[11px] h-7 md:h-10 md:text-[17px]'>
                        <Link href='/'/>
                        Más información
                    </Button>
                </div>
            </Card>
        </div>
    )
}
