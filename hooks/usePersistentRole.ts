"use client"
import { useState, useEffect } from "react"

export type TipoUsuario = "estudiante" | "empresa"

export const usePersistentRole = () => {
    const [tipoUsuario, setTipoUsuarioState] =
        useState<TipoUsuario>("estudiante")

    useEffect(() => {
        const savedRole = localStorage.getItem("user_role") as TipoUsuario

        if (
        savedRole &&
        (savedRole === "estudiante" || savedRole === "empresa")
        ) {
        setTipoUsuarioState(savedRole)
        }
    }, [])

    const setTipoUsuario = (newRole: TipoUsuario) => {
        setTipoUsuarioState(newRole)
        localStorage.setItem("user_role", newRole)
        window.dispatchEvent(new Event("userRoleChanged"))
    }

    useEffect(() => {
        const handleRoleChange = () => {
        const savedRole = localStorage.getItem(
            "user_role"
        ) as TipoUsuario

        if (
            savedRole &&
            (savedRole === "estudiante" || savedRole === "empresa")
        ) {
            setTipoUsuarioState(savedRole)
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