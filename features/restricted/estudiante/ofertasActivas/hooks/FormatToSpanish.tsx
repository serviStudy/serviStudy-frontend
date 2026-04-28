import React from 'react'

export const FormatToSpanish = (day: string): string => {
    const map: Record<string, string> = {
        MONDAY: "Lunes",
        TUESDAY: "Martes",
        WEDNESDAY: "Miércoles",
        THURSDAY: "Jueves",
        FRIDAY: "Viernes",
        SATURDAY: "Sábado",
        SUNDAY: "Domingo"
    }
    
    return map[day] ?? day
}
