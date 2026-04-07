import { useState } from "react"

export const useTagSelection = () => {
    const [selection, setSelection] = useState({
        day: null,
        jornada: null
    })

    const toggleTag = (type: 'day' | 'jornada', tag: string) => {
        setSelection(prev => ({
            ...prev,
            [type]: prev[type] === tag ? null : tag
        }))
    }

    return {selection, toggleTag}
}
