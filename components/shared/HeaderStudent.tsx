"use client";

import { BookOpen, Info, MapPin, Menu, Search, Settings, User} from "lucide-react";

import Image from "next/image";
import NavLink from "../ui/NavLink";
import { useSidebar } from "../../hooks/useSidebar";
import { Sidebar } from "./Sidebar";
import Link from "next/link";
import { SuscriptionCard } from "./SuscriptionCard";

interface props {
    name: string;
}

export const HeaderStudent = ( { name }: props ) => {
    const { open, openSidebar, closeSidebar } = useSidebar()

    return (
        <>
        <div className="bg-white w-full fixed top-0 z-50 shadow-sm">
            <header className="border-b">
                <div className="flex h-16 px-4 md:px-6 w-full items-center justify-between lg:px-16 lg:justify-stretch">

                    {/* logo */}
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.jpg"
                            alt="Logo ServiStudy"
                            width={300}
                            height={300}
                            className="w-auto h-12 md:h-14 lg:h-14"
                        />
                        <h1 className="text-blue-900 font-extrabold text-[19px] md:text-[24px] lg:text-[24px]">
                            Servi<span className="text-blue-500">Study</span>
                        </h1>
                    </div>

                    {/* navbar desktop */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-6 md:right-32">
                        <NavLink icon={MapPin} name="Ofertas" link="/" />
                        <NavLink icon={User} name="Mi Perfil" link="/estudiante/perfil"/>
                        <NavLink icon={Search} name="Empleadores" link="/" />
                        <NavLink icon={BookOpen} name="Suscripción" link="/" />
                    </div>

                    {/* boton de menu */}
                    <button onClick={openSidebar} className="lg:hidden">
                        <Menu className="h-7 w-7 text-blue-600" />
                    </button>
                </div>
            </header>
        </div>

        {/* sidebard de nabvar */}
        <Sidebar open={open} onClose={closeSidebar}>
            <div className="flex flex-col justify-between h-[90vh]">
                <div>
                    <div className="pt-10 px-6 flex items-center gap-4 md:pt-20 md:px-10">
                        <div className="rounded-full bg-blue-300 h-14 w-14 md:h-17 md:w-17"/>
                        <div className="flex flex-col gap-0">
                            <p className="font-semibold text-gray-700 md:text-[20px]">{name}</p>
                            <Link href='/estudiante/perfil' className="text-gray-600 text-[13px] md:text-[15px]">Ver perfil</Link>
                        </div>
                    </div> 
                    <div className="flex flex-col pt-6 gap-2 md:gap-6 lg:hidden">
                        <NavLink icon={MapPin} name="Ofertas" link="/estudiante/perfil" />
                        <NavLink icon={Search} name="Empleadores" link="/" />
                        <NavLink icon={BookOpen} name="Suscripción" link="/" />
                    </div>

                    <SuscriptionCard/>
                </div>

                <div className="flex flex-col gap-2 md:gap-4">
                    <div className="flex pl-6 md:px-10 gap-3 items-center">
                        <Settings className="text-gray-500 w-4.5 md:h-7"/>
                        <p className="text-[14px] md:text-[18px] font-semibold text-gray-600">Ajustes</p>
                    </div>
                    <div className="flex px-6 md:px-10 gap-3 items-center">
                        <Info className="text-gray-500 w-4.5 md:h-7"/>
                        <p className="text-[14px] md:text-[18px] font-semibold text-gray-600">Más informacion</p>
                    </div>
                </div>
            </div>
        </Sidebar>
        </>
    );
};