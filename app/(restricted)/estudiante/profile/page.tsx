import { HeaderStudent } from '@/components/shared/HeaderStudent'
import { ProfileVerification } from '@/components/shared/ProfileVerification'
import { Reviews } from '@/components/shared/Reviews'
import { StudentSkill } from '@/features/restricted/estudiante/components/StudentSkill'
import { VerifiedUser } from '@/components/shared/VerifiedUser'
import { routes } from '@/type/routes'
import { AtSign, Calendar, Clock, LetterTextIcon, Mail, Phone, SquarePen, Star, User, Users, Zap } from 'lucide-react'
import Link from 'next/dist/client/link'
import React from 'react'

const page = () => {
    return (
        <div className="flex flex-col gap-9 min-h-screen items-center justify-center bg-gray-200 pt-16 md:pt-10 lg:pt-18 pb-12">
            <HeaderStudent/>
            <ProfileVerification/>

            <div className="bg-white w-77.5 h-full rounded-[9px] md:w-125 lg:w-228 lg:h-234.5 lg:rounded-[14px]">
                <div className="relative flex items-center justify-center bg-popover w-77.5 h-49 rounded-t-[9px] p-24 md:w-125 md:h-60 lg:justify-start lg:w-228 lg:h-62.25 lg:rounded-t-[14px]">

                    <Link href={routes.estudiante.edit}>
                        <button className="absolute top-3 right-3 lg:right-20 bg-none rounded-[13px] p-2 lg:bg-primary lg:w-13.5 lg:h-13.5 lg:top-10 flex items-center justify-center">
                        <SquarePen className="text-primary h-5 w-5 md:w-6 md:h-6 lg:h-9 lg:w-9 lg:text-popover"strokeWidth={1.5}/>
                        </button>
                    </Link>

                    <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-6">
                        <div className="bg-primary flex items-center justify-center rounded-full h-17 w-17 md:w-21 md:h-21 lg:w-28 lg:h-28" />
                        
                        <div className="flex gap-2 flex-col items-center lg:items-start">
                            <h3 className="text-primary font-bold text-[17px] md:text-[21px] lg:text-[36px]">Nombre de ejemplo</h3>
                            <div className="flex items-center flex-col-reverse gap-2 lg:gap-4 lg:flex-col lg:items-start">
                                
                                <div className="flex flex-col items-center lg:flex-row lg:gap-8">
                                    <div className="flex gap-2 items-center">
                                        <Phone className="text-primary h-3 w-3 lg:w-5 lg:h-5" />
                                        <p className="text-chart-4 text-[12px] md:text-[14px] lg:text-[16px]">315-887-9086</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Mail className="text-primary h-3 w-3 lg:w-5 lg:h-5"/>
                                        <p className="text-chart-4 text-[12px] md:text-[14px] lg:text-[16px]">ejemplo@.edu.co</p>
                                    </div>
                                </div>
                            </div>
                            <VerifiedUser />
                        </div>
                    </div>
                </div>

                {/* Contenido | cuadro II */}
                <div className='px-8 py-5 flex flex-col gap-4 lg:px-24 lg:py-10 lg:gap-8'>
                    <div className='flex flex-col'>
                        <div className='flex gap-1 items-center text-[14px] lg:gap-2 lg:text-[24px]'>
                            <User className='text-primary h-4.5 w-4.5 lg:h-8 lg:w-8'/>
                            <h4 className='font-bold text-primary'>Resumen profesional</h4>
                        </div>
                        <p className='text-chart-4 text-[12px] lg:text-[16px]'>Estudiante motivado y enérgico con experiencia en servicio al cliente y hospitalidad. Buscando oportunidades a tiempo parcial 
                            para aplicar mis habilidades de comunicación y trabajo en equipo. Rápido aprendizaje y actitud positiva.</p>
                    </div>

                    <div className='flex flex-col'>
                        <div className='flex gap-1 items-center text-[14px] lg:gap-2 lg:text-[24px]'>
                            <Zap className='text-primary h-4.5 w-4.5 lg:h-8 lg:w-8'/>
                            <h4 className='font-bold text-primary'>Cualidades</h4>
                        </div>
                        
                    </div>

                    <div className='flex flex-col gap-7 lg:gap-44 lg:flex-row'>
                        <div className='flex gap-1 items-center text-[14px] lg:gap-2 lg:text-[24px]'>
                            <Clock className='text-primary h-4.5 w-4.5 lg:h-8 lg:w-8'/>
                            <h4 className='font-bold text-primary'>Disponibilidad Horaria</h4>
                        </div>
                        <div className='flex items-center text-[14px] lg:gap-2 lg:text-[24px]'>
                            <Calendar className='text-primary h-4.5 w-4.5 lg:h-8 lg:w-8'/>
                            <h4 className='font-bold text-primary'>Jornada</h4>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 text-[14px] lg:gap-2 lg:text-[24px]'>
                        <div className='flex lg:gap-2'>
                            <Users className='text-primary h-4.5 w-4.5 lg:h-8 lg:w-8'/>
                            <h4 className='font-bold text-primary'>Reseñas</h4>
                        </div>
                        <div className='flex flex-col gap-3 lg:flex-row lg:justify-between'>
                            <Reviews/>
                            <Reviews/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page