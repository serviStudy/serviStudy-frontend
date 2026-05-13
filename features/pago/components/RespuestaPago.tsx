"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface TransactionData {
  x_response: string;
  x_transaction_id: string;
  x_amount: number;
  x_currency_code: string;
  x_description: string;
  x_transaction_date: string;
}

export function RespuestaPago() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TransactionData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const refPayco = searchParams.get("ref_payco");

    if (!refPayco) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchTransactionStatus = async () => {
      try {
        const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${refPayco}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error validando referencia ePayco", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionStatus();
  }, [searchParams]);

  // Obtener la ruta del dashboard según el rol
  const getDashboardPath = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return "/login";
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const decoded = JSON.parse(jsonPayload);
      const role = decoded.role || decoded.X_User_Role || "";
      
      if (role.includes("EMPLOYER")) return "/empleador/dashboard";
      if (role.includes("STUDENT")) return "/estudiante/dashboard";
      return "/dashboard";
    } catch {
      return "/login";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
          <p className="text-slate-600 font-medium">Verificando el estado de tu pago...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-md shadow-xl border-slate-200">
          <CardContent className="pt-10 pb-8 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Referencia Inválida</h2>
            <p className="text-slate-500 mb-8">
              No se pudo encontrar la información de este pago o la referencia no existe.
            </p>
            <Button onClick={() => router.push("/")} className="w-full">
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const status = data.x_response;
  const isSuccess = status === "Aceptada";
  const isPending = status === "Pendiente";
  const isFailed = status === "Rechazada" || status === "Fallida";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="text-center pb-2 pt-8">
          <div className="flex justify-center mb-6">
            {isSuccess && (
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            )}
            {isFailed && (
              <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
            )}
            {isPending && (
              <div className="h-20 w-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-10 w-10 text-yellow-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">
            {isSuccess && "¡Pago Exitoso!"}
            {isFailed && "Pago Rechazado"}
            {isPending && "Pago en Proceso"}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {isSuccess && "Tu suscripción ha sido procesada correctamente. Ya puedes disfrutar de tus beneficios."}
            {isFailed && "Hubo un problema procesando tu tarjeta. Por favor intenta nuevamente."}
            {isPending && "Tu pago está siendo verificado. Te notificaremos cuando se apruebe."}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-6 pb-8">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Referencia</span>
              <span className="font-medium text-slate-900">{data.x_transaction_id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Descripción</span>
              <span className="font-medium text-slate-900">{data.x_description}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Fecha</span>
              <span className="font-medium text-slate-900">{new Date(data.x_transaction_date).toLocaleDateString()}</span>
            </div>
            <div className="h-px bg-slate-200 my-2" />
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Total pagado</span>
              <span className="text-xl font-bold text-slate-900">
                ${data.x_amount.toLocaleString()} {data.x_currency_code}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {isFailed ? (
              <Button onClick={() => router.back()} className="w-full bg-blue-600 hover:bg-blue-700">
                Intentar de nuevo
              </Button>
            ) : (
              <Button 
                onClick={() => router.push(getDashboardPath())} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Ir a mi Dashboard
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
