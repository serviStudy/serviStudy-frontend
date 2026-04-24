"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";
import { useActivePath } from "@/hooks/useActivePath";
import { motion } from "framer-motion";

interface ButtonNavProps {
    icon: LucideIcon;
    name: string;
    link: string;
    exact?: boolean
}

export default function NavLink({ icon: Icon, name, link, exact = false }: ButtonNavProps) {
    const { isActive } = useActivePath();
    const active = isActive(link, { exact })

    return (
        <Button asChild className={`
            rounded-xl transition-all duration-300 px-6 py-4 h-auto w-full justify-start
            ${active 
                ? "bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700" 
                : "bg-transparent text-gray-600 hover:bg-green-50 hover:text-green-600 border-transparent" 
            }`}
            variant="none">
            <Link href={link} className="flex w-full justify-start items-center gap-4">
                <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? "scale-110" : ""}`} />
                <span className={`font-semibold text-base tracking-tight ${active ? "text-white" : "text-gray-600"}`}>{name}</span>
            </Link>
        </Button>
    )
}