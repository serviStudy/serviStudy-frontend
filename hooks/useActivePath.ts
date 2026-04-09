"use client";

import { usePathname } from "next/navigation";

export function useActivePath (){
    const pathname = usePathname();

        const isActive = (href: string, { exact = false } = {}) => {
        if (!href) return false;

        // caso exacto de ruta
        if (exact){
            return pathname === href;
        }

        // caso normal (ruta o sub)
        return (pathname === href || pathname.startsWith(`${href}/`))
    }

    return { pathname, isActive }
}