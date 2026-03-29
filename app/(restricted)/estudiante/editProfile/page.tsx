import { HeaderStudent } from '@/components/shared/HeaderStudent'
import { Input } from '@/components/ui/input'
import { Camera } from 'lucide-react'
import React from 'react'


const page = () => {
    return (
        <div className="flex flex-col gap-9 min-h-screen items-center bg-destructive pt-28 pb-13 lg:pt-36 lg:pb-12">
            <HeaderStudent/>
            
            <div className="bg-white w-77.5 h-154.25 rounded-[9px] md:w-124 lg:w-228 lg:h-234.5 lg:rounded-[14px">
                <div className="relative bg-popover w-77.5 h-20 rounded-t-[9px] p-8 md:w-124 md:h-28 lg:justify-start lg:w-228 lg:h-50 lg:rounded-t-[9px]">

                    {/* foto de perfil */}
                    <div className='absolute top-12 md:top-18 lg:top-36'>
                        <div className='relative'>
                            <div className='absolute'>
                                <div className='bg-primary flex items-center justify-center border-3 border-white rounded-full h-15 w-15 md:w-21 md:h-21 lg:w-28 lg:h-28'/>
                            </div>                        
                            <div className='absolute left-10 top-8 md:left-16 md:top-12 lg:left-20 lg:top-18'>
                                <button className='bg-white rounded-full border p-1 lg:p-2 border-gray-300'>
                                    <Camera className='text-gray-500 h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4'></Camera>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                    {/* información personal */}
                    <div className='px-8 py-10 flex flex-col gap-7 md:py-14 lg:px-12 lg:py-22 lg:gap-11'>
                        <form action="">
                            <div className='flex flex-col gap-2.5 md:gap-5 md:flex-row'>
                                <label className="text-[12px] md:text-[14px] lg:text-sm font-semibold text-gray-500">
                                    Nombre del estudiante
                                    <Input
                                    className="text-[12px] md:text-[14px] lg:text-sm lg:w-115 font-normal rounded-[15px] h-5 lg:h-9 border- border-gray-400"
                                    />
                                </label>

                                <label className="text-[12px] md:text-[14px] lg:text-sm font-semibold text-gray-500">
                                    Número de contacto
                                    <Input
                                    className="text-[12px] md:text-[14px] lg:text-sm lg:w-77.5 font-normal rounded-[15px] h-5 lg:h-9 border border-gray-400"
                                    />
                                </label>
                            </div>
                        </form>
                    </div>

            </div>
        </div>
    )
}

export default page