"use client";
import React from 'react';
import { Users, Search, Filter } from 'lucide-react';

export default function CandidatosPage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div>
        <h1 className="text-3xl font-black text-black tracking-tight">Candidatos</h1>
        <p className="text-gray-400 font-bold mt-1">Gestiona las aplicaciones a tus vacantes activas.</p>
      </div>

      <div className="bg-white rounded-[32px] p-12 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
          <Users size={40} className="text-gray-200" />
        </div>
        <h2 className="text-xl font-black text-black mb-2">Aún no hay candidatos</h2>
        <p className="text-gray-400 font-bold max-w-sm mx-auto">
          Publica una oferta de trabajo para empezar a recibir aplicaciones de estudiantes calificados.
        </p>
      </div>
    </div>
  );
}
