"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useVerification } from "@/features/auth/verification/hooks/useVerification";
import { VerificationCard } from "@/features/auth/verification/components/VerificationCard";

function Content() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const { code, handleChange, handleVerify } = useVerification(email);

  return (
    <VerificationCard
      email={email}
      code={code}
      onChange={handleChange}
      onVerify={handleVerify}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <Content />
    </Suspense>
  );
}