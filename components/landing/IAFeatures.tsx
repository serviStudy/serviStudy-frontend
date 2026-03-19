"use client";

import { useEffect, useState } from "react";
import { Sparkles, Mail,Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function AIFeatures() {
  const [progress, setProgress] = useState(0);

  // Animación suave para la barra de compatibilidad
  useEffect(() => {
    const timer = setTimeout(() => setProgress(92), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[40px] bg-linear-to-br from-blue-600 to-indigo-800 p-8 md:p-12 shadow-2xl">
          {/* Adorno visual de fondo */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Columna Izquierda: Texto e Info */}
            <div className="space-y-8 z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400 text-blue-900 shadow-lg">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white italic">
                  Inteligencia Artificial Integrada
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Notificaciones */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Mail className="h-5 w-5" />
                    <h3 className="text-lg">Notificaciones</h3>
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Algoritmos que trabajan 24/7 buscando el match perfecto para ti y enviándolo a tu bandeja de entrada.
                  </p>
                </div>

                {/* Búsqueda Semántica */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Zap className="h-5 w-5" />
                    <h3 className="text-lg">Búsqueda Semántica</h3>
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    No buscamos palabras, buscamos significados. Conectamos talento real con necesidades reales.
                  </p>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta de IA (Glassmorphism) */}
            <div className="relative z-10 flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-yellow-900 font-black text-xl shadow-inner">
                    AI
                  </div>
                  <p className="text-white italic font-medium">
                    Analizando compatibilidad...
                  </p>
                </div>

                <div className="space-y-4">
                  <Progress 
                    value={progress} 
                    className="h-3 bg-[#1e40af]" 
  
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/90">
                      Compatibilidad Detectada: {progress}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}