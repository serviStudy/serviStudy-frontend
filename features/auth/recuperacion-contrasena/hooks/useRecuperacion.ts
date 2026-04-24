"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const useRecuperacion = () => {
    const router = useRouter()
    const [tipoUsuario, setTipoUsuario] = useState<"estudiante" | "empresa">("estudiante")
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [correo, setCorreo] = useState("")
    const [codigo, setCodigo] = useState(["", "", "", "", "", ""])
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    //Enviar correo
    const handleSendEmail = async () => {
        if (!correo.trim()) return
        setError(null)
        setLoading(true)
        try {
            const res = await fetch(
                `${API_URL}/auth/forgot-password?email=${encodeURIComponent(correo.trim())}`,
                { method: "POST" }
            )
            const data = await res.json()
            if (!res.ok || !data.success) {
                throw new Error(data.message || "No se pudo enviar el correo.")
            }
            toast.success("¡Código enviado! Revisa tu correo electrónico.")
            setStep(2)
        } catch (err: any) {
            const msg = err.message || "Error al enviar el correo."
            setError(msg)
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    // Verificar código
    const handleVerifyCode = () => {
        const code = codigo.join("")
        if (code.length < 6) return
        setError(null)
        setStep(3)
    }

    //Reenviar código
    const handleResendCode = async () => {
        setError(null)
        setLoading(true)
        try {
            const res = await fetch(
                `${API_URL}/auth/forgot-password?email=${encodeURIComponent(correo.trim())}`,
                { method: "POST" }
            )
            const data = await res.json()
            if (!res.ok || !data.success) {
                throw new Error(data.message || "No se pudo reenviar el código.")
            }
            setCodigo(["", "", "", "", "", ""])
            toast.success("¡Nuevo código enviado! Revisa tu correo.")
        } catch (err: any) {
            const msg = err.message || "Error al reenviar el código."
            setError(msg)
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    // Cambiar contraseña
    const handleChangePassword = async () => {
        if (!password || password !== confirmPassword) return
        setError(null)
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: correo.trim(),
                    code: codigo.join(""),
                    newPassword: password,
                }),
            })
            const data = await res.json()
            if (!res.ok || !data.success) {
                // Si el código es inválido, volvemos
                if (res.status === 400 || res.status === 401) {
                    setCodigo(["", "", "", "", "", ""])
                    setStep(2)
                    const msg = "El código ingresado es incorrecto o expiró. Intenta de nuevo."
                    setError(msg)
                    toast.error(msg)
                    return
                }
                throw new Error(data.message || "No se pudo cambiar la contraseña.")
            }
            toast.success("¡Contraseña actualizada con éxito! Redirigiendo al inicio de sesión...")
            setTimeout(() => router.push("/login"), 1500)
        } catch (err: any) {
            const msg = err.message || "Error al cambiar la contraseña."
            setError(msg)
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    return {
        tipoUsuario, setTipoUsuario,
        step, setStep,
        correo, setCorreo,
        codigo, setCodigo,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        loading,
        error,
        handleSendEmail,
        handleVerifyCode,
        handleResendCode,
        handleChangePassword,
    }
}
