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

export default function NavLink({icon: Icon, name, link}: ButtonNavProps) {
    const { isActive } = useActivePath();
    const active = isActive(link)
    
    return (
        <Button asChild className={`flex align-middle h-10 rounded-full py-0.5 px-3 
            ${active ? "bg-muted-foreground text-white" : "bg-muted text-green-800"}`}>
            <Link href={link} className="flex gap-2 items-center">
                <Icon className="w-5 h-6"/>
                <span className="font-semibold">{name}</span>
            </Link>
        </Button>
    )
}