"use client";

import { usePathname } from "next/navigation";

export function useActivePath (){
    const pathname = usePathname();

    const isActive = (href: string, exact = false) => {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    };

    return { pathname, isActive }
}