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

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/empleador/dashboard' },
  { name: 'Perfil de Empresa', icon: User, href: '/empleador/perfil' },
  { name: 'Mis Ofertas', icon: Briefcase, href: '/empleador/ofertas' },
  { name: 'Candidatos', icon: Users, href: '/empleador/candidatos' },
  { name: 'Configuración', icon: Settings, href: '/empleador/configuracion' },
];

export const EmployerDashboardSidebar = () => {
  const pathname = usePathname();

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
          <span className="text-2xl font-black tracking-tighter">
            <span className="text-[#1a3683]">Servi</span>
            <span className="text-[#3b82f6]">Study</span>
          </span>
        </Link>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/empleador/dashboard' && pathname.startsWith(item.href));
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="relative group"
            >
              <div className={`
                flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300
                ${isActive 
                  ? 'bg-green-50 text-green-700' 
                  : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}
              `}>
                <item.icon size={22} className={isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'} />
                <span className="font-bold text-[15px]">{item.name}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-1.5 h-8 bg-green-600 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
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
