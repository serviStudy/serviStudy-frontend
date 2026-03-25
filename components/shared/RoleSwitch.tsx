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
        <div className="flex justify-center gap-2 bg-gray-200 p-2 rounded-lg h-11 md:h-13 w-fit mx-auto">
            <Button
            className={
                tipoUsuario === "estudiante"
                ? "bg-primary text-white h-7 md:h-9 text-[12px] md:text-[14px] lg:text-[15px]"
                : "bg-white text-black h-7 md:h-9 text-[12px] md:text-[14px] lg:text-[15px] border hover:bg-gray-100"
            }
            onClick={() => setTipoUsuario("estudiante")}>
                <User></User>
                Estudiante
            </Button>

            <Button
            className={
                tipoUsuario === "empresa"
                ? "bg-green-600 hover:bg-green-700 text-white h-7 md:h-9 text-[12px] md:text-[14px] lg:text-[15px]"
                : "bg-white text-black border hover:bg-gray-100 h-7 md:h-9 text-[12px] md:text-[14px] lg:text-[15px]"
            }
            onClick={() => setTipoUsuario("empresa")}>
                <Building2></Building2>
                Empresa
            </Button>

        </div>
    </>
    )
}
