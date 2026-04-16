"use client"
import { HeaderLR } from "@/components/shared/HeaderLR"
import { LoginForm } from "@/features/auth/login/components/LoginForm"
import { useLogin } from "@/features/auth/login/hooks/useLogin"

export default function LoginPage() {
  const loginState = useLogin()
  const { tipoUsuario } = loginState

  return (
    <div className="relative flex flex-col min-h-screen items-center pt-32 pb-12 px-4 md:justify-center md:pt-24 overflow-hidden">
      {/* BACKGROUND LAYERS FOR CROSS-FADE */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-linear-to-br from-blue-300 via-blue-50 to-white ${
        tipoUsuario === "estudiante" ? "opacity-100" : "opacity-0"
      }`} />
      <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-linear-to-br from-green-300 via-green-50 to-white ${
        tipoUsuario === "empresa" ? "opacity-100" : "opacity-0"
      }`} />

      <HeaderLR />
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500 mb-8">
        <LoginForm {...loginState} />
      </div>
    </div>
  )
}
