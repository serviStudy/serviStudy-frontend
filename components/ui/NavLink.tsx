"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";
import { motion } from "framer-motion";
import { useActivePath } from "../shared/useActivePath";

interface ButtonNavProps {
    icon: LucideIcon;
    name: string;
    link: string;
    exact?: boolean;
    theme?: "green" | "blue";
}

export default function NavLink({ icon: Icon, name, link, exact = false, theme = "green" }: ButtonNavProps) {
    const { isActive } = useActivePath();
    const active = isActive(link, { exact });

    const activeClasses = theme === "green" 
        ? "bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
        : "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700";

    const inactiveClasses = theme === "green"
        ? "bg-transparent text-gray-600 hover:bg-green-50 hover:text-green-600 border-transparent"
        : "bg-transparent text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-transparent";

    return (
        <Button asChild className={`
            rounded-xl transition-all duration-300 px-6 py-4 h-auto w-full justify-start
            ${active ? activeClasses : inactiveClasses}`}
            variant="none">
            <Link href={link} className="flex w-full justify-start items-center gap-4">
                <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? "scale-110" : ""}`} />
                <span className={`font-semibold text-base tracking-tight ${active ? "text-white" : "text-gray-600"}`}>{name}</span>
            </Link>
        </Button>
    )
}