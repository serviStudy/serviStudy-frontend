"use client"
import { HeaderLR } from "@/components/shared/HeaderLR"
import { LoginForm } from "@/features/auth/login/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-6">
      <HeaderLR />
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <LoginForm />
      </div>
    </div>
  )
}
