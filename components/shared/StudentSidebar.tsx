"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    User,
    Briefcase,
    Users,
    LogOut,
    HelpCircle,
    Menu,
    X,
    CreditCard,
    Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import NavLink from '../ui/NavLink';

const allSidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/estudiante/dashboardStudent' },
    { name: 'Buscar Ofertas', icon: Briefcase, href: '/estudiante/ofertasActivas' },
    { name: 'Mis Postulaciones', icon: LayoutDashboard, href: '/estudiante/misPostulaciones' },
    { name: 'Suscripción', icon: CreditCard, href: '/estudiante/suscripcion' },
    { name: 'Perfil estudiante', icon: User, href: '/estudiante/perfil' },
    { name: 'Agente IA', icon: Sparkles, href: '/estudiante/agente' },
];

interface StudentSidebarProps {
    subscriptionStatus?: "ACTIVE" | "INACTIVE";
}

export const StudentSidebar = ({ subscriptionStatus }: StudentSidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_role");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
        window.location.href = "/";
    };

    const sidebarItems = allSidebarItems.filter(item => {
        // Dashboard solo para premium; Agente IA siempre visible (onboarding gratis)
        if (item.name === 'Dashboard' && subscriptionStatus !== 'ACTIVE') return false;
        return true;
    });

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-60 p-2 bg-white rounded-xl shadow-md border border-gray-100 text-blue-900"
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
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-55 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <aside className={`
                fixed left-0 top-0 h-screen z-58 flex flex-col transition-all duration-300 ease-in-out
                ${subscriptionStatus === 'ACTIVE'
                    ? "bg-white/80 backdrop-blur-xl border-r border-white/60 shadow-[4px_0_30px_rgba(0,0,0,0.02)]"
                    : "bg-white border-r border-gray-100"
                }
                ${isOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full lg:translate-x-0 lg:w-72'}
            `}>
                {/* Logo Area */}
                <div className="p-6">
                    <div className="flex items-center gap-2 group">
                        <div className="relative w-12 h-12 transition-transform group-hover:scale-110 duration-500">
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
                </div>

                {/* Navigation items */}
                <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <div key={item.name} onClick={() => setIsOpen(false)}>
                            <NavLink
                                icon={item.icon}
                                name={item.name}
                                link={item.href}
                                exact={item.href === '/estudiante/dashboardStudent'}
                                theme={subscriptionStatus === 'ACTIVE' ? 'gradient' : 'blue'}
                                isPremium={subscriptionStatus === 'ACTIVE'}
                            />
                        </div>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-6 border-t border-gray-50 flex flex-col gap-2">
                    
                    <button
                        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        onClick={handleLogout}
                    >
                        <LogOut size={22} />
                        <span className="font-bold text-[15px]">Cerrar Sesión</span>
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
