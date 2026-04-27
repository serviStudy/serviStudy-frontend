"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

import NavLink from '../ui/NavLink';

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/empleador/dashboard' },
  { name: 'Perfil de Empresa', icon: User, href: '/empleador/perfil' },
  { name: 'Mis Ofertas', icon: Briefcase, href: '/empleador/ofertas' },
  { name: 'Candidatos', icon: Users, href: '/empleador/candidatos' },
  { name: 'Configuración', icon: Settings, href: '/empleador/configuracion' },
];

export const EmployerDashboardSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-100 z-50 flex flex-col hidden lg:flex">
      {/* Logo Area */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12 transition-transform group-hover:scale-110 duration-500">
              <img 
                src="/logo.jpg" 
                alt="ServiStudy Logo" 
                className="w-full h-full object-contain mix-blend-multiply" 
              />
          </div>
          <span className="text-2xl font-bold tracking-tighter">
            <span className="text-blue-900">Servi</span>
            <span className="text-blue-600">Study</span>
          </span>
        </Link>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-6 py-4 flex flex-col gap-3">
        {sidebarItems.map((item) => (
          <NavLink 
            key={item.name} 
            icon={item.icon} 
            name={item.name} 
            link={item.href}
            exact={item.href === '/empleador/dashboard'}
          />
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-gray-50 flex flex-col gap-2">
        <Link 
          href="/soporte"
          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all"
        >
          <HelpCircle size={22} />
          <span className="font-bold text-[15px]">Ayuda</span>
        </Link>
        <button 
          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
          onClick={() => {/* logout logic */}}
        >
          <LogOut size={22} />
          <span className="font-bold text-[15px]">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
