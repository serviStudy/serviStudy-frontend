"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Building2, User } from 'lucide-react'

type TipoUsuario = "estudiante" | "empresa"
type RoleSwitchProps = {
    tipoUsuario: TipoUsuario
    setTipoUsuario: (tipo: TipoUsuario) => void
}

export const RoleSwitch = ({ tipoUsuario, setTipoUsuario }: RoleSwitchProps) => {
    return (
<<<<<<< HEAD
        <>
        <div className="flex justify-center gap-2 bg-gray-100 p-1.5 rounded-2xl h-11 md:h-12 w-fit mx-auto border border-gray-200">
            <Button
            className={
                tipoUsuario === "estudiante"
                ? "bg-[#143285] hover:bg-[#0f2870] text-white h-full px-6 rounded-xl text-sm font-bold shadow-sm"
                : "bg-transparent text-gray-500 h-full px-6 rounded-xl text-sm font-bold hover:bg-gray-200/50"
            }
            onClick={() => setTipoUsuario("estudiante")}>
                <User size={18} className="mr-2" />
                Estudiante
            </Button>

            <Button
            className={
                tipoUsuario === "empresa"
                ? "bg-[#143285] hover:bg-[#0f2870] text-white h-full px-6 rounded-xl text-sm font-bold shadow-sm"
                : "bg-transparent text-gray-500 h-full px-6 rounded-xl text-sm font-bold hover:bg-gray-200/50"
            }
            onClick={() => setTipoUsuario("empresa")}>
                <Building2 size={18} className="mr-2" />
                Empresa
=======
        <div className="flex justify-center gap-2 bg-muted/30 p-1.5 rounded-xl border border-border w-fit mx-auto shadow-sm">
            <Button
                variant={tipoUsuario === "estudiante" ? "default" : "ghost"}
                className={`rounded-lg transition-all duration-500 flex items-center gap-2 px-3 md:px-4 h-9 md:h-10 ${
                    tipoUsuario === "estudiante"
                        ? "shadow-md bg-primary text-white"
                        : "hover:bg-muted/50 text-gray-500"
                }`}
                onClick={() => setTipoUsuario("estudiante")}
            >
                <User className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="font-semibold text-xs md:text-[14px]">Estudiante</span>
            </Button>

            <Button
                variant={tipoUsuario === "empresa" ? "default" : "ghost"}
                className={`rounded-lg transition-all duration-500 flex items-center gap-2 px-3 md:px-4 h-9 md:h-10 ${
                    tipoUsuario === "empresa"
                        ? "shadow-md bg-green-600 text-white"
                        : "hover:bg-muted/50 text-gray-500"
                }`}
                onClick={() => setTipoUsuario("empresa")}
            >
                <Building2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="font-semibold text-xs md:text-[14px]">Empresa</span>
>>>>>>> feature/santi
            </Button>
        </div>
    )
}
