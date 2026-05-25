"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { useActivePath } from "../shared/useActivePath";

interface ButtonNavProps {
    icon: LucideIcon;
    name: string;
    link: string;
    exact?: boolean
    isPremium?: boolean
}

export default function NavLink({ icon: Icon, name, link, exact = false, isPremium = false }: ButtonNavProps) {
    const { isActive } = useActivePath();
    const active = isActive(link, { exact })

    return (
        <Link 
            href={link} 
            className={`
                flex items-center gap-4 relative z-10
                overflow-hidden rounded-xl transition-all duration-300 px-6 h-12 w-full justify-start
                ${active 
                    ? isPremium 
                        ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-[0_8px_30px_rgba(59,130,246,0.25)] hover:shadow-lg hover:-translate-y-0.5" 
                        : "bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700" 
                    : "bg-transparent text-gray-600 hover:bg-gray-50 hover:text-green-600" 
                }
            `}
        >
            <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? "scale-110" : ""}`} />
            <span className={`font-bold text-[15px] tracking-tight ${active ? "text-white" : "text-gray-600"}`}>
                {name}
            </span>
        </Link>
    )
}