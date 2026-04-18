"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useVerification } from "@/features/auth/verification/hooks/useVerification";
import { VerificationCard } from "@/features/auth/verification/components/VerificationCard";
import { HeaderLR } from "@/components/shared/HeaderLR";

function Content() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const role = searchParams.get("role") as "estudiante" | "empresa" | null;
  const tipoUsuario = role || "estudiante";

  const { code, handleChange, handleVerify } = useVerification(email);

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
      
      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-right duration-500 mb-8">
        <VerificationCard
          email={email}
          code={code}
          onChange={handleChange}
          onVerify={handleVerify}
          tipoUsuario={tipoUsuario}
        />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <Content />
    </Suspense>
  );
}