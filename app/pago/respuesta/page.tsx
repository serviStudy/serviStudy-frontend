import React, { Suspense } from "react";
import { RespuestaPago } from "@/features/pago/components/RespuestaPago";
import { Loader2 } from "lucide-react";

export default function PagoRespuestaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    }>
      <RespuestaPago />
    </Suspense>
  );
}
