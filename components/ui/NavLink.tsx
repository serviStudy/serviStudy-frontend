"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";
import { useActivePath } from "@/hooks/useActivePath";

interface ButtonNavProps{
    icon: LucideIcon;
    name: string;
    link: string;
    exact?: boolean
}

export default function NavLink({icon: Icon, name, link, exact = false}: ButtonNavProps) {
    const { isActive } = useActivePath();
    const active = isActive(link, { exact })
    
    return (
        <Button asChild className={`
            rounded-full transition-all duration-300 px-8 py-5 h-auto
            ${active 
                ? "bg-[#28a745] text-white shadow-lg shadow-green-500/20 hover:bg-[#1e7e34] hover:scale-105" 
                : "bg-green-50 text-[#28a745] hover:bg-green-100 hover:scale-102 border border-green-100" 
            }`}
            variant="none">
            <Link href={link} className="flex w-full justify-start items-center gap-2.5">
                <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? "scale-110" : ""}`} />
                <span className="font-bold text-[14px] lg:text-[14px] tracking-tight">{name}</span>
            </Link>
        </Button>
    )
}