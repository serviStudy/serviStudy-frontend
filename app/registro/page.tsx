import React from 'react'

const page = () => {
    return (
        <div className='bg-gray-200 min-h-screen min-w-screen flex items-center justify-center '>

            <div className='w-73.75 h-111.75 rounded-md bg-white text-center'>
                <h2 className='text-[#1e40af] text-[24px] font-bold'>Registrarse</h2>
                <p className='text-[#656565] text-[12px]'>Ingresa tus credenciales para crear tu cuenta.</p>
                
                <form className='flex flex-col text-left pt-4 '>
                    <label htmlFor="correo" className='text-[#656565] text-[12px]'>Correo Electónico</label>
                    <input className='border border-[#A6A6A6] rounded-lg w-45 h-8 px-3 text-[12px]'
                    type="text" id='correo' name='correo electronico' placeholder='ejemplo@gmail.com'/>

                    <label htmlFor="correo" className='text-[#656565] text-[12px] pt-2'>Contraseña</label>
                    <input className='border border-[#A6A6A6] rounded-lg w-45 h-8 px-3 text-[12px]'
                    type="password" placeholder='●●●●●●●'/>
                </form>

                <div className='flex pt-3.5'>
                    <input type="checkbox" /> 
                    <p className='text-[#656565] text-[9px]'>Aceptar términos y condiciones</p>
                </div>
            </div>

        </div>
    )
}

export default page