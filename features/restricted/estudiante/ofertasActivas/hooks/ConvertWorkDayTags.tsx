import React from 'react'
import { FormatToSpanish } from './FormatToSpanish'

export const ConvertWorkDayTags = (days: string[]): string[] => {
    if (!days || days.length === 0) return []

    const normalized = [...days].sort()

    const weekdays = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY"
    ]

    const weekends = [
        "SATURDAY",
        "SUNDAY"
    ]

    const isWeekdays = weekdays.every((day) => normalized.includes(day)) && normalized.length === 5
    const isWeekends = weekends.every((day) => normalized.includes(day)) && normalized.length == 2
    const isFlexible = normalized.length >= 2 && !isWeekdays && !isWeekends

    if (isWeekdays) return ["Entre semana"]
    if (isWeekends) return ["Fines de semana"]
    if (isFlexible) return ["Específicos"]

    return normalized.map(FormatToSpanish);
}
