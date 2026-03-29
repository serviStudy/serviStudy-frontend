"use client";

import { BookOpen, CirclePlus, MapPin, Search, User } from "lucide-react"
import Image from "next/image"
import NavLink from "../ui/NavLink"

export const HeaderEmployer = () => {
    return (
        <div className="bg-white w-full top-0 fixed z-1 backdrop-blur-2xl" >
            <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
                <div className="flex mx-auto h-16 px-4 md:px-6 w-full">
                    <div className="flex items-center">

                        {/* logo */}
                        <div className="flex px-9 items-center shrink-0 gap-1.5 md:gap-3">
                            <Image
                                src="/logo.jpg"
                                alt="Logo ServiStudy"
                                width={300}          
                                height={300}
                                priority
                                className="h-12.5 w-auto object-contain" 
                            />
                            <div className="flex">
                                <h1 className="text-[#1e40af] font-extrabold text-xl md:text-2xl">Servi
                                <span className="text-blue-500 font-bold text-xl md:text-2xl">Study</span></h1>
                            </div>
                        </div>

                        {/* botones de barra de navegación */}
                        <div className="absolute left-1/2 transform items-center -translate-x-1/2">
                            <div className="flex gap-5">
                                <NavLink icon={MapPin} name="Ofertas" link="/estudiante/editProfile"/>
                                <NavLink icon={User} name="Perfil Empleador" link="/estudiante/profile"/>
                                <NavLink icon={Search} name="Buscar Talento" link="/"/>
                                <NavLink icon={CirclePlus} name="Publicar Oferta" link="/"/>
                                <NavLink icon={BookOpen} name="Suscripción" link="/"/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
