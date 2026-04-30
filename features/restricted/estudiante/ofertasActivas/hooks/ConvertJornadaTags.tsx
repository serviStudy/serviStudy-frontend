import React from 'react'

export const ConvertJornadaTags = (jornada: string): string => {
    const map: Record<string, string> = {
        FULL_TIME: "Tiempo completo",
        PART_TIME: "Medio tiempo",
        FLEXIBLE: "Flexible"
    }

    return map[jornada] ?? jornada;
}

