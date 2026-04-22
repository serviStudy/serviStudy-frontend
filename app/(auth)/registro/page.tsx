"use client"
import { HeaderLR } from "@/components/shared/HeaderLR"
import { RegisterForm } from "@/features/auth/register/components/RegisterForm"
import { useRegisterForm } from "@/features/auth/register/hooks/useRegisterForm"

const Page = () => {
    const registerState = useRegisterForm();
    const { tipoUsuario } = registerState;

    return (
        <div className="relative flex flex-col min-h-screen items-center pt-28 pb-12 px-4 md:pt-32 md:justify-center transition-all duration-1000 ease-in-out overflow-hidden">
            {/* BACKGROUND LAYERS FOR CROSS-FADE */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-linear-to-br from-blue-300 via-blue-50 to-white ${
                tipoUsuario === "estudiante" ? "opacity-100" : "opacity-0"
            }`} />
            <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-linear-to-br from-green-300 via-green-50 to-white ${
                tipoUsuario === "empresa" ? "opacity-100" : "opacity-0"
            }`} />

            <HeaderLR />
            <div className={`relative z-10 w-full max-w-md mx-auto animate-in fade-in zoom-in duration-500 transition-all duration-500 mb-8 ${
                tipoUsuario === "estudiante" ? "" : "dark:filter-none"
            }`}>
                <RegisterForm {...registerState} />
            </div>
        </div>
    )
}

export default Page