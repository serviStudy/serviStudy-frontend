import React from 'react'

export const Reviews = () => {
    return (
        <div className='flex bg-gray-100 w-full h-auto border-2 border-gray-300 rounded-[19px] lg:w-86'>
            <div className='flex gap-2.5 m-3.5'>
                <div>
                    <div className='h-9 w-9 bg-blue-300 rounded-full md:h-9.5 md:w-9.5 lg:w-11 lg:h-11'/>
                </div>

                <div className='flex gap-1 flex-col md:gap-0'>
                    <div  className='flex w-full justify-between '>
                        <h4 className='text-primary font-semibold text-[12px] lg:text-[17px]'>Nombre</h4>
                        <p className='text-primary font-semibold text-[11px] lg:text-[14px]'>14/03/2026</p>
                    </div>
                    <p className='text-gray-600 font-normal text-[11px] mr-4 leading-3.5 lg:text-[16px] lg:leading-5'>
                        Estudiante responsable y con buena actitud frente al trabajo. Demostró habilidades 
                        sólidas en atención al cliente y buena disposición para aprender y colaborar en equipo.
                    </p>
                </div>
            </div>
        </div>
    )
}
