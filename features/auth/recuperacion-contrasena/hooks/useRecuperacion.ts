import { useState } from "react"

export const useRecuperacion = () => {
    const [tipoUsuario, setTipoUsuario] = useState<"estudiante" | "empresa">("estudiante")
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [correo, setCorreo] = useState("")
    const [codigo, setCodigo] = useState(["", "", "", "", "", ""])
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSendEmail = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setStep(2)
        }, 800)
    }

    const handleVerifyCode = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setStep(3)
        }, 800)
    }

    const handleChangePassword = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            window.location.href = "/login"
        }, 800)
    }

    return {
        tipoUsuario, setTipoUsuario,
        step, setStep,
        correo, setCorreo,
        codigo, setCodigo,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        loading,
        handleSendEmail,
        handleVerifyCode,
        handleChangePassword
    }
}
