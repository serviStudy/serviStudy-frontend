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
  X,
  CreditCard
} from 'lucide-react';

import NavLink from '../ui/NavLink';
import { useSubscriptionStatus } from '@/features/suscripcion/hooks/useSubscriptionStatus';

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/empleador/dashboard' },
  { name: 'Mis Ofertas', icon: Briefcase, href: '/empleador/ofertas' },
  { name: 'Crear Oferta', icon: PlusCircle, href: '/empleador/ofertas/crear' },
  { name: 'Buscar Talento', icon: Users, href: '/empleador/buscar-talento' },
  { name: 'Suscripción', icon: CreditCard, href: '/empleador/suscripcion' },
  { name: 'Perfil de Empresa', icon: User, href: '/empleador/perfil' },
];

export const EmployerDashboardSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { status: subStatus } = useSubscriptionStatus();
  
  const currentSub = subStatus?.currentSubscription;
  const isPremium = subStatus?.status === "ACTIVE" && !!currentSub;

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
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 group">

          <div className="relative w-8 h-8 transition-transform group-hover:scale-110 duration-500">
            <img
              src="/logoServer.png"
              alt="ServiStudy Logo"
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          <span className="text-2xl font-bold tracking-tighter">
            <span className="text-blue-900">Servi</span>
            <span className="text-blue-600">Study</span>
          </span>
        </div>
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
      <aside className={`fixed left-0 top-0 h-screen w-72 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
        isPremium
          ? "bg-white/80 backdrop-blur-xl border-r border-white/60 shadow-[4px_0_30px_rgba(0,0,0,0.02)]"
          : "bg-white border-r border-gray-100"
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Mobile Close Button */}
        <button
          onClick={closeMobile}
          className="lg:hidden absolute top-5 right-5 p-2 bg-gray-50 text-gray-500 rounded-xl hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Logo Area */}
        <div className="p-6 h-20 flex items-center">
          <div className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-500">
              <img
                src="/logoServer.png"
                alt="ServiStudy Logo"
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <span className="text-2xl font-bold tracking-tighter">
              <span className="text-blue-900">Servi</span>
              <span className="text-green-600">Study</span>
            </span>
          </div>
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
                isPremium={isPremium}
              />
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-50 flex flex-col gap-2">
          
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className="font-bold text-[14px]">Cerrar Sesión</span>
          </button>
        </div>

        <footer>
          <div className="w-full bg-white text-gray-400 p-5 text-center flex-col md:p-2.5">
            <p className="text-[12px]">
              &copy; {new Date().getFullYear()} ServiStudy. Todos los derechos reservados.
            </p>
            <p className="text-[10px]">
              Conectando talento estudiantil con oportunidades.
            </p>
          </div>
        </footer>
      </aside>
    </>
  );
};
