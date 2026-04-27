"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { motion, AnimatePresence } from 'framer-motion';

import NavLink from '../ui/NavLink';

const sidebarItems = [
    { name: 'Perfil estudiante', icon: User, href: '/estudiante/perfil' },
    { name: 'Ofertas', icon: Briefcase, href: '/estudiante/ofertasActivas' },
    { name: 'Empleadores', icon: Users, href: '/estudiante/empleadores' },
    { name: 'Suscripción', icon: LayoutDashboard, href: '/empleador/dashboard' },
    { name: 'Configuración', icon: Settings, href: '/empleador/configuracion' },
];

export const StudentSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Menu Button */}
            <button 
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-white rounded-xl shadow-md border border-gray-100 text-blue-900"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Backdrop for mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <aside className={`
                fixed left-0 top-0 h-screen bg-white border-r border-gray-100 z-[58] flex flex-col transition-all duration-300 ease-in-out
                ${isOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full lg:translate-x-0 lg:w-72'}
            `}>
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
                <nav className="flex-1 px-6 py-4 flex flex-col gap-3 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <div key={item.name} onClick={() => setIsOpen(false)}>
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
                <div className="p-6 border-t border-gray-50 flex flex-col gap-2">
                    <Link 
                        href="/soporte"
                        onClick={() => setIsOpen(false)}
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
        </>
    );
};
