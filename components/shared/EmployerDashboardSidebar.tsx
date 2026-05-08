"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Users, 
  LogOut,
  HelpCircle,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';

import NavLink from '../ui/NavLink';

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/empleador/dashboard' },
  { name: 'Perfil de Empresa', icon: User, href: '/empleador/perfil' },
  { name: 'Mis Ofertas', icon: Briefcase, href: '/empleador/ofertas' },
  { name: 'Crear Oferta', icon: PlusCircle, href: '/empleador/ofertas/crear' },
  { name: 'Buscar Talento', icon: Users, href: '/empleador/buscar-talento' },
];

export const EmployerDashboardSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_role");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    window.location.href = "/";
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Botón de Menú Móvil */}
      <button 
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2.5 bg-white/80 backdrop-blur-md rounded-xl shadow-md border border-gray-100 text-blue-900 active:scale-95 transition-all"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity" 
          onClick={closeMobile} 
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-100 z-50 flex flex-col transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Mobile Close Button */}
        <button 
          onClick={closeMobile} 
          className="lg:hidden absolute top-5 right-5 p-2 bg-gray-50 text-gray-500 rounded-xl hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Logo Area */}
        <div className="p-6 h-20 flex items-center">
          <Link href="/" className="flex items-center gap-2 group" onClick={closeMobile}>
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-500">
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
        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <div key={item.name} onClick={closeMobile}>
              <NavLink 
                icon={item.icon} 
                name={item.name} 
                link={item.href}
                exact={item.href === '/empleador/dashboard' || item.href === '/empleador/ofertas'}
              />
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-50 flex flex-col gap-2">
          <Link 
            href="/soporte"
            onClick={closeMobile}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
          >
            <HelpCircle size={20} />
            <span className="font-bold text-[14px]">Ayuda</span>
          </Link>
          <button 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className="font-bold text-[14px]">Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};
