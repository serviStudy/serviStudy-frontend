"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

import NavLink from '../ui/NavLink';

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/empleador/dashboard' },
  { name: 'Perfil de Empresa', icon: User, href: '/empleador/perfil' },
  { name: 'Mis Ofertas', icon: Briefcase, href: '/empleador/ofertas' },
  { name: 'Postulantes', icon: Users, href: '/empleador/selectOffer' },
  { name: 'Configuración', icon: Settings, href: '/empleador/configuracion' },
];

export const EmployerDashboardSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_role");
    window.location.href = "/";
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">

          <div className="relative w-8 h-8 transition-transform group-hover:scale-110 duration-500">
              <img 
                src="/logo.jpg" 
                alt="ServiStudy Logo" 
                className="w-full h-full object-contain mix-blend-multiply" 
              />
          </div>
          <span className="text-lg font-bold tracking-tighter">
            <span className="text-blue-900">Servi</span>
            <span className="text-blue-600">Study</span>
          </span>
        </Link>
        <button 
          onClick={() => setMobileOpen(true)} 
          className="p-2 bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-green-600 rounded-xl transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

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
                exact={item.href === '/empleador/dashboard'}
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
