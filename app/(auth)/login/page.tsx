"use client"
import { HeaderLR } from "@/components/shared/HeaderLR"
import { LoginForm } from "@/features/auth/login/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f7ff] p-6 relative overflow-hidden">
      <HeaderLR />
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <LoginForm />
      </div>
    </div>
  )
}
