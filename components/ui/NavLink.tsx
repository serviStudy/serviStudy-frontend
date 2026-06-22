"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { useActivePath } from "../shared/useActivePath";

interface ButtonNavProps {
    icon: LucideIcon;
    name: string;
    link: string;
    exact?: boolean;
    isPremium?: boolean;
    theme?: "green" | "blue" | "gradient";
}

export default function NavLink({ icon: Icon, name, link, exact = false, isPremium = false, theme = "green" }: ButtonNavProps) {
    const { isActive } = useActivePath();
    const active = isActive(link, { exact });

    const activeClasses = theme === "gradient"
        ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg shadow-blue-600/20 hover:opacity-90"
        : theme === "green"
        ? "bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
        : "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700";

    const premiumActiveClasses =
        "bg-green-500 text-white shadow-[0_8px_30px_rgba(59,130,246,0.25)] hover:shadow-lg hover:-translate-y-0.5";

    const inactiveClasses = theme === "gradient"
        ? "bg-transparent text-gray-600 hover:bg-slate-50 hover:text-emerald-600 border-transparent"
        : theme === "green"
        ? "bg-transparent text-gray-600 hover:bg-green-50 hover:text-green-600 border-transparent"
        : "bg-transparent text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-transparent";

    return (
        <Link
            href={link}
            className={`
                flex items-center gap-4 relative z-10
                overflow-hidden rounded-xl transition-all duration-300 px-6 h-12 w-full justify-start
                ${active
                    ? isPremium
                        ? premiumActiveClasses
                        : activeClasses
                    : inactiveClasses
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
