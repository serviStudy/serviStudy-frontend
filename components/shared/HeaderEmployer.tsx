"use client";

import { useState, useEffect } from 'react';

import { BookOpen, CirclePlus, Info, MapPin, Menu, Search, Settings, User } from "lucide-react";
import Image from "next/image";
import NavLink from "../ui/NavLink";
import { useSidebar } from "../../hooks/useSidebar";
import { Sidebar } from "./Sidebar";
import Link from "next/link";
import { SuscriptionCard } from "./SuscriptionCard";
import { routes } from "@/type/routes";

interface props {
    name: string;
}

export const HeaderEmployer = ({ name }: props) => {
    const { open, openSidebar, closeSidebar } = useSidebar();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
                    ? "bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] py-2"
                    : "bg-background/95 backdrop-blur-md py-3"
                    }`}
            >
                {/* BRAND ACCENT LINE */}
                <div className={`absolute bottom-0 left-0 h-[2px] w-full transition-all duration-500 bg-linear-to-r from-blue-600 via-green-400 to-blue-600 opacity-60 ${isScrolled ? "scale-x-100" : "scale-x-0"
                    }`} />

                <div className="flex h-12 md:h-14 px-4 md:px-6 w-full items-center justify-between lg:px-16 mx-auto">

                    {/* logo */}
                    <div className="flex items-center gap-2 md:gap-3 transition-transform duration-300 hover:scale-[1.02]">
                        <Link href="/" className="flex items-center shrink-0">
                            <Image
                                src="/logo.jpg"
                                alt="Logo ServiStudy"
                                width={300}
                                height={300}
                                priority
                                className="h-10 w-auto md:h-12 lg:h-12 rounded-lg"
                            />
                        </Link>

                        <Link href="/" className="flex items-center">
                            <h1 className="text-blue-900 font-extrabold text-[18px] md:text-[22px] lg:text-[22px] tracking-tight">
                                Servi<span className="text-blue-500 transition-colors duration-500">Study</span>
                            </h1>
                        </Link>
                    </div>

                    {/* navbar desktop */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-6">
                        <NavLink icon={MapPin} name="Ofertas" link="/" />
                        <NavLink icon={User} name="Perfil Empleador" link="/" />
                        <NavLink icon={Search} name="Buscar Talento" link="/" />
                        <NavLink icon={CirclePlus} name="Publicar Oferta" link="/" />
                        <NavLink icon={BookOpen} name="Suscripción" link="/" />
                    </div>

                    {/* boton de menu */}
                    <button onClick={openSidebar} className="lg:hidden">
                        <Menu className="h-7 w-7 text-blue-600" />
                    </button>
                </div>
            </header>

            {/* sidebard de nabvar */}
            <Sidebar open={open} onClose={closeSidebar}>
                <div className="flex flex-col justify-between h-[90vh]">
                    <div>
                        <div className="pt-10 px-6 flex items-center gap-4 md:pt-20 md:px-10">
                            <div className="rounded-full bg-blue-300 h-14 w-14 md:h-17 md:w-17" />
                            <div className="flex flex-col gap-0">
                                <p className="font-semibold text-gray-700 md:text-[20px]">{name}</p>
                                <Link href='/estudiante/profile' className="text-gray-600 text-[13px] md:text-[15px]">Ver perfil</Link>
                            </div>
                        </div>
                        <div className="flex flex-col pt-6 gap-2 md:gap-6 lg:hidden">
                            <NavLink icon={MapPin} name="perfil" link={routes.empleador.profile} />
                            <NavLink icon={Search} name="Buscar Talento" link={routes.empleador.search} />
                            <NavLink icon={CirclePlus} name="Publicar Oferta" link={routes.empleador.oferta} />
                            <NavLink icon={BookOpen} name="Suscripción" link={routes.empleador.suscripcion} />
                        </div>

                        <SuscriptionCard />
                    </div>

                    <div className="flex flex-col gap-2 md:gap-4">
                        <div className="flex pl-6 md:px-10 gap-3 items-center">
                            <Settings className="text-gray-500 w-4.5 md:h-7" />
                            <p className="text-[14px] md:text-[18px] font-semibold text-gray-600">Ajustes</p>
                        </div>
                        <div className="flex px-6 md:px-10 gap-3 items-center">
                            <Info className="text-gray-500 w-4.5 md:h-7" />
                            <p className="text-[14px] md:text-[18px] font-semibold text-gray-600">Más informacion</p>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    );
};