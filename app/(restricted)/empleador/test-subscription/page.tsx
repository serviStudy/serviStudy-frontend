"use client";

import React from 'react';
import { useSubscriptionStatus } from '@/features/suscripcion/hooks/useSubscriptionStatus';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Server } from 'lucide-react';

export default function TestSubscriptionPage() {
  const { status, loading, error } = useSubscriptionStatus();

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <Server size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Test Backend de Suscripción</h1>
        </div>
        <Link href="/empleador/dashboard" className="text-blue-600 hover:underline flex items-center gap-2 font-medium">
          <ArrowLeft size={16} /> Volver al Dashboard
        </Link>
      </div>

      <p className="text-slate-500 bg-blue-50 p-4 rounded-xl border border-blue-100">
        Esta página muestra la respuesta cruda (RAW) del endpoint <code className="bg-white text-blue-800 px-2 py-1 rounded font-mono shadow-sm">/api/subscriptions/me</code>. Utilízala para verificar la información exacta que está devolviendo el backend (estado, plan activo, historial) y confirmar que la suscripción se haya registrado correctamente en la base de datos tras el pago.
      </p>

      <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
          <h2 className="text-2xl font-bold text-slate-800">Datos de la Petición</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-bold transition-all active:scale-95"
          >
            <RefreshCw size={16} /> Volver a Consultar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Cargando (Loading)</p>
            <p className="text-2xl font-black text-slate-700">{loading ? "Sí..." : "Completado"}</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Error Reportado</p>
            <p className={`text-xl font-black ${error ? "text-red-600" : "text-green-600"}`}>
              {error || "Ningún error"}
            </p>
          </div>
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Estado (Status)</p>
            <p className={`text-2xl font-black ${
              status?.status === 'ACTIVE' ? 'text-green-600' : 
              status?.status === 'EXPIRED' ? 'text-orange-600' : 
              status?.status === 'NO_SUBSCRIPTION' ? 'text-slate-500' : 'text-blue-600'
            }`}>
              {status?.status || "N/A"}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4">Respuesta JSON Cruda del Backend</h3>
        <div className="bg-[#0f172a] rounded-2xl p-6 overflow-x-auto shadow-inner">
          {loading ? (
            <div className="flex items-center gap-3 text-slate-400 font-mono text-sm">
              <RefreshCw className="animate-spin w-4 h-4" />
              Esperando respuesta del servidor...
            </div>
          ) : (
            <pre className="text-[#38bdf8] font-mono text-sm whitespace-pre-wrap leading-relaxed">
              {JSON.stringify(status, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
