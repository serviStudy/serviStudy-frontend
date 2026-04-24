"use client";
import React from 'react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Candidatos Totales', value: '124', icon: Users, color: 'bg-blue-50 text-blue-600', trend: '+12%' },
  { label: 'Ofertas Activas', value: '8', icon: Briefcase, color: 'bg-green-50 text-green-600', trend: 'Estable' },
  { label: 'Visitas al Perfil', value: '2.4k', icon: TrendingUp, color: 'bg-purple-50 text-purple-600', trend: '+18%' },
  { label: 'Tiempo de Respuesta', value: '2d', icon: Clock, color: 'bg-orange-50 text-orange-600', trend: '-5%' },
];

export default function EmployerDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black tracking-tight">¡Hola de nuevo! 👋</h1>
          <p className="text-gray-400 font-bold mt-1">Aquí tienes un resumen de lo que está pasando hoy.</p>
        </div>
        <Link 
          href="/empleador/ofertas/crear"
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-green-900/20 transition-all active:scale-95 flex items-center gap-2 w-fit"
        >
          <Plus size={20} /> Crear Nueva Vacante
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-[11px] font-black px-2 py-1 rounded-full ${
                stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-black">{stat.value}</span>
              <span className="text-sm font-bold text-gray-400 mt-1">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-black">Actividad Reciente</h2>
            <button className="text-sm font-bold text-green-600 hover:underline">Ver todo</button>
          </div>
          
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
             {[1, 2, 3].map((item, i) => (
               <div key={i} className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer ${i !== 2 ? 'border-b border-gray-50' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-black text-gray-400">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div>
                      <p className="font-bold text-black text-[15px]">Nuevo candidato aplicado a <span className="text-green-600">Mesero</span></p>
                      <p className="text-xs text-gray-400 font-medium">Hace {i + 1} horas</p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-gray-300" />
               </div>
             ))}
          </div>
        </div>

        {/* Tips / Suggestions */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-black text-black">Consejos Pro</h2>
          <div className="bg-green-600 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-xl shadow-green-900/10">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
             <h3 className="text-lg font-black mb-3 relative z-10">Mejora tu alcance</h3>
             <p className="text-sm font-medium opacity-90 leading-relaxed mb-6 relative z-10">
               Las ofertas con imágenes del lugar de trabajo reciben un 40% más de aplicaciones de calidad.
             </p>
             <button className="bg-white text-green-700 px-6 py-2.5 rounded-xl font-black text-[13px] shadow-lg relative z-10 hover:bg-green-50 transition-all">
                Subir Fotos
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
