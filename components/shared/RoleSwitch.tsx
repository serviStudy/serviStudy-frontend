"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Building2, User } from 'lucide-react'

type TipoUsuario = "estudiante" | "empresa"
    type RoleSwitchProps = {
    tipoUsuario: TipoUsuario
    setTipoUsuario: (tipo: TipoUsuario) => void
    }

export const RoleSwitch = ({tipoUsuario, setTipoUsuario} : RoleSwitchProps) => {
    return (
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
            </Button>
        </div>
    </>
    )
}
