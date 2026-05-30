"use client"
import { useState, useEffect, useCallback } from "react"

export type TipoUsuario = "estudiante" | "empresa"

export const usePersistentRole = () => {
    const [tipoUsuario, setTipoUsuarioState] =
        useState<TipoUsuario>("estudiante")

    useEffect(() => {
        const savedRole = localStorage.getItem("user_role")
        if (savedRole) {
            const normalized = savedRole.toUpperCase()
            if (normalized === "STUDENT" || normalized === "ESTUDIANTE") {
                setTipoUsuarioState("estudiante")
            } else if (normalized === "EMPLOYER" || normalized === "EMPRESA") {
                setTipoUsuarioState("empresa")
            }
        }
    }, [])

    const setTipoUsuario = useCallback((newRole: TipoUsuario) => {
        setTipoUsuarioState(newRole)
        localStorage.setItem("user_role", newRole)
        window.dispatchEvent(new Event("userRoleChanged"))
    }, [])

    useEffect(() => {
        const handleRoleChange = () => {
            const savedRole = localStorage.getItem("user_role")
            if (savedRole) {
                const normalized = savedRole.toUpperCase()
                if (normalized === "STUDENT" || normalized === "ESTUDIANTE") {
                    setTipoUsuarioState("estudiante")
                } else if (normalized === "EMPLOYER" || normalized === "EMPRESA") {
                    setTipoUsuarioState("empresa")
                }
            }
        }

        window.addEventListener("userRoleChanged", handleRoleChange)
        window.addEventListener("storage", handleRoleChange)

        return () => {
            window.removeEventListener(
                "userRoleChanged",
                handleRoleChange
            )
            window.removeEventListener(
                "storage",
                handleRoleChange
            )
        }
    }, [])

    return { tipoUsuario, setTipoUsuario }
}