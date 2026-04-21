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
            ${active ? "text-green-500 bg-[#d6fdde9d] lg:bg-muted lg:text-green-700" : "text-green-600 lg:text-white align-middle lg:bg-green-500" }`}
            variant="none">
            <Link href={link} className="flex w-full justify-start text-left gap-4 lg:gap-2 lg:items-center">
                <Icon className="w-6! md:h-5.5!"/>
                <span className="font-semibold md:text-[18px] lg:text-[15px]">{name}</span>
            </Link>
        </Button>
    )
}