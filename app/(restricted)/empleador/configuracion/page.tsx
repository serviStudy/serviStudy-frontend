"use client";
import React from 'react';
import { Settings, Shield, Bell, CreditCard } from 'lucide-react';

export default function ConfiguracionPage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div>
        <h1 className="text-3xl font-black text-black tracking-tight">Configuración</h1>
        <p className="text-gray-400 font-bold mt-1">Administra tu cuenta y preferencias del sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Seguridad', icon: Shield, desc: 'Contraseña y autenticación' },
          { title: 'Notificaciones', icon: Bell, desc: 'Alertas por correo y push' },
          { title: 'Suscripción', icon: CreditCard, desc: 'Planes y facturación' },
          { title: 'General', icon: Settings, desc: 'Idioma y zona horaria' },
        ].map((item) => (
          <div key={item.title} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
             <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-all">
                   <item.icon size={24} />
                </div>
                <div>
                   <h3 className="text-lg font-black text-black">{item.title}</h3>
                   <p className="text-sm font-bold text-gray-400">{item.desc}</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
