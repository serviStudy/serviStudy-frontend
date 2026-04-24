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
import { motion } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { label: 'Candidatos Totales', value: '124', icon: Users, color: 'bg-blue-50 text-blue-600', trend: '+12%' },
  { label: 'Ofertas Activas', value: '8', icon: Briefcase, color: 'bg-green-50 text-green-600', trend: 'Estable' },
  { label: 'Visitas al Perfil', value: '2.4k', icon: TrendingUp, color: 'bg-purple-50 text-purple-600', trend: '+18%' },
  { label: 'Tiempo de Respuesta', value: '2d', icon: Clock, color: 'bg-orange-50 text-orange-600', trend: '-5%' },
];

export default function EmployerDashboard() {
  return (
    <div className="flex flex-col gap-10 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter">¡Hola de nuevo! 👋</h1>
          <p className="text-gray-400 font-bold text-lg mt-2">Aquí tienes un resumen de lo que está pasando hoy.</p>
        </div>
        <Link 
          href="/empleador/ofertas/crear"
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-[24px] font-black text-sm shadow-2xl shadow-green-900/20 transition-all active:scale-95 flex items-center gap-3 w-fit"
        >
          <Plus size={24} /> Crear Nueva Vacante
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-xl shadow-gray-200/40 hover:shadow-2xl transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-[20px] ${stat.color} shadow-inner transition-transform group-hover:scale-110`}>
                <stat.icon size={28} />
              </div>
              <span className={`text-[12px] font-black px-3 py-1.5 rounded-full ${
                stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-500'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-black text-gray-900 tracking-tight">{stat.value}</span>
              <span className="text-base font-bold text-gray-400 mt-2">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Actividad Reciente</h2>
            <button className="text-sm font-black text-green-600 hover:underline tracking-widest uppercase">Ver todo</button>
          </div>
          
          <div className="bg-white rounded-[48px] border border-gray-50 shadow-xl shadow-gray-200/40 overflow-hidden">
             {[1, 2, 3].map((item, i) => (
               <div key={i} className={`p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all cursor-pointer ${i !== 2 ? 'border-b border-gray-50' : ''} group`}>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[24px] bg-gray-50 flex items-center justify-center font-black text-gray-400 text-xl border border-gray-100 shadow-inner group-hover:bg-green-50 group-hover:text-green-600 transition-all">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-lg">Nuevo candidato aplicado a <span className="text-green-600">Mesero</span></p>
                      <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-wider">Hace {i + 1} horas</p>
                    </div>
                  </div>
                  <ArrowUpRight size={22} className="text-gray-300 group-hover:text-green-600 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
               </div>
             ))}
          </div>
        </div>

        {/* Tips / Suggestions */}
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight px-4">Consejos Pro</h2>
          <div className="bg-green-600 rounded-[48px] p-10 text-white relative overflow-hidden group shadow-2xl shadow-green-900/30">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
             <h3 className="text-2xl font-black mb-4 relative z-10">Mejora tu alcance</h3>
             <p className="text-base font-medium opacity-90 leading-relaxed mb-10 relative z-10">
               Las ofertas con imágenes del lugar de trabajo reciben un 40% más de aplicaciones de calidad.
             </p>
             <button className="bg-white text-green-600 px-8 py-4 rounded-[20px] font-black text-sm shadow-2xl relative z-10 hover:bg-gray-50 transition-all active:scale-95">
                Subir Fotos
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
